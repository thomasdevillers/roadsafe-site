import { NextResponse } from "next/server";

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

type BrevoEmail = {
  apiKey: string;
  sender: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name?: string;
  };
  replyTo: {
    email: string;
    name?: string;
  };
  subject: string;
  htmlContent: string;
};

async function sendBrevoEmail({
  apiKey,
  sender,
  to,
  replyTo,
  subject,
  htmlContent
}: BrevoEmail) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      sender,
      to: [to],
      replyTo,
      subject,
      htmlContent
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(
      `Brevo rejected the email (${response.status}): ${responseBody.slice(0, 500)}`
    );
  }
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

  const apiKey = process.env.BREVO_API_KEY;
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

  const sender = {
    email: process.env.BREVO_SENDER_EMAIL || "quotes@roadsafe.co.za",
    name: process.env.BREVO_SENDER_NAME || "Roadsafe Traffic"
  };
  const quoteRecipient = process.env.QUOTE_TO_EMAIL || "nicki@roadsafe.co.za";
  const customerEmail = String(payload.email);
  const customerName = String(payload.contactName);

  try {
    await Promise.all([
      sendBrevoEmail({
        apiKey,
        sender,
        to: { email: quoteRecipient, name: "Roadsafe Traffic" },
        replyTo: { email: customerEmail, name: customerName },
        subject: `Quote request ${reference} — ${payload.company}`,
        htmlContent: `<h1>New Roadsafe quote request</h1><p>Reference: <strong>${reference}</strong></p>${detailsHtml}`
      }),
      sendBrevoEmail({
        apiKey,
        sender,
        to: { email: customerEmail, name: customerName },
        replyTo: { email: quoteRecipient, name: "Roadsafe Traffic" },
        subject: `Roadsafe received your request — ${reference}`,
        htmlContent: `
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
