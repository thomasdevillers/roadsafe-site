import { NextResponse } from "next/server";
import { Resend } from "resend";

type QuoteProduct = {
  product: string;
  quantity: number;
  availability: "rental" | "purchase";
};

type QuotePayload = {
  products?: QuoteProduct[];
  rentalPeriod?: string;
  requiredDate?: string;
  projectLocation?: string;
  company?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  website?: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function quoteReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `RST-${date}-${suffix}`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: QuotePayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const required = [
    payload.rentalPeriod,
    payload.requiredDate,
    payload.projectLocation,
    payload.company,
    payload.contactName,
    payload.email,
    payload.phone
  ];
  if (
    !payload.products?.length ||
    required.some((value) => !String(value || "").trim()) ||
    !isValidEmail(String(payload.email))
  ) {
    return NextResponse.json(
      { message: "Complete all required quote fields." },
      { status: 422 }
    );
  }

  const reference = quoteReference();
  const productsHtml = payload.products
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.quantity)} ×</strong> ${escapeHtml(item.product)} <em>(${item.availability === "purchase" ? "Purchase" : "Rental"})</em></li>`
    )
    .join("");
  const detailsHtml = `
    <h2>Equipment</h2>
    <ul>${productsHtml}</ul>
    <h2>Project</h2>
    ${payload.rentalPeriod === "Purchase only" ? "" : `<p><strong>Rental period:</strong> ${escapeHtml(payload.rentalPeriod)}</p>`}
    <p><strong>Required date:</strong> ${escapeHtml(payload.requiredDate)}</p>
    <p><strong>Location:</strong> ${escapeHtml(payload.projectLocation)}</p>
    <p><strong>Additional requirements:</strong><br>${escapeHtml(payload.notes || "None provided").replaceAll("\n", "<br>")}</p>
    <h2>Contact</h2>
    <p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
    <p><strong>Name:</strong> ${escapeHtml(payload.contactName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[Roadsafe quote ${reference}]`, payload);
      return NextResponse.json({ reference, simulated: true });
    }
    return NextResponse.json(
      { message: "Email delivery is not configured. Please call Roadsafe directly." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.QUOTE_FROM_EMAIL ||
    "Roadsafe Traffic <quotes@roadsafe.co.za>";
  const to = process.env.QUOTE_TO_EMAIL || "nicki@roadsafe.co.za";

  try {
    await Promise.all([
      resend.emails.send({
        from,
        to,
        replyTo: String(payload.email),
        subject: `Quote request ${reference} — ${payload.company}`,
        html: `<h1>New Roadsafe quote request</h1><p>Reference: <strong>${reference}</strong></p>${detailsHtml}`
      }),
      resend.emails.send({
        from,
        to: String(payload.email),
        replyTo: to,
        subject: `Roadsafe received your request — ${reference}`,
        html: `
          <h1>We have received your request.</h1>
          <p>Hi ${escapeHtml(payload.contactName)},</p>
          <p>Roadsafe Traffic will review your equipment requirement and respond the same business day.</p>
          <p>Your reference is <strong>${reference}</strong>.</p>
          ${detailsHtml}
          <p>Need to add something? Reply to this email or call 066 000 8887.</p>
        `
      })
    ]);
  } catch (error) {
    console.error("Quote email failed", error);
    return NextResponse.json(
      { message: "Email delivery failed. Please call Roadsafe directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ reference });
}
