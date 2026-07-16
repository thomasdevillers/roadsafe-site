"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Minus, Plus, Send, Trash2 } from "lucide-react";
import { products } from "@/lib/site-data";
import { PENDING_QUOTE_CONVERSION_KEY } from "@/lib/analytics";

type ProductLine = {
  product: string;
  quantity: number;
  intent: "rental" | "purchase";
};

type FormMode = "guided" | "single";

const steps = ["Requirement", "Contact"];

export function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const initialSelection = useMemo(
    () => products.find((product) => product.slug === initialProduct)?.slug || "",
    [initialProduct]
  );
  const initialIntent = useMemo(
    () =>
      products.find((product) => product.slug === initialProduct)?.availability === "purchase"
        ? "purchase"
        : "rental",
    [initialProduct]
  );
  const [mode, setMode] = useState<FormMode>("guided");
  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<ProductLine[]>([
    { product: initialSelection, quantity: 1, intent: initialIntent }
  ]);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const selectedLines = lines.filter((line) => line.product);
  const hasRental = selectedLines.some((line) => line.intent === "rental");
  const hasPurchase = selectedLines.some((line) => line.intent === "purchase");

  function updateLine(index: number, update: Partial<ProductLine>) {
    setLines((current) =>
      current.map((line, lineIndex) =>
        lineIndex === index ? { ...line, ...update } : line
      )
    );
  }

  function updateProduct(index: number, productSlug: string) {
    const availability = products.find((product) => product.slug === productSlug)?.availability;
    updateLine(index, {
      product: productSlug,
      intent: availability === "purchase" ? "purchase" : "rental"
    });
  }

  function addLine() {
    setLines((current) => [...current, { product: "", quantity: 1, intent: "rental" }]);
  }

  function removeLine(index: number) {
    setLines((current) =>
      current.length === 1
        ? [{ product: "", quantity: 1, intent: "rental" }]
        : current.filter((_, lineIndex) => lineIndex !== index)
    );
  }

  function goNext(form: HTMLFormElement) {
    const currentPanel = form.querySelector<HTMLElement>(`[data-step="${step}"]`);
    const inputs = Array.from(
      currentPanel?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        "input, select, textarea"
      ) || []
    );
    const valid = inputs.every((input) => input.reportValidity());
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      products: lines
        .filter((line) => line.product)
        .map((line) => ({
          product: products.find((product) => product.slug === line.product)?.name || line.product,
          quantity: line.quantity,
          availability: line.intent
        })),
      rentalPeriod: hasRental ? form.get("rentalPeriod") : "Purchase only",
      requiredDate: form.get("requiredDate"),
      projectLocation: form.get("projectLocation"),
      company: form.get("company"),
      contactName: form.get("contactName"),
      email: form.get("email"),
      phone: form.get("phone"),
      notes: form.get("notes"),
      website: form.get("website")
    };

    if (!payload.products.length) {
      setStatus("error");
      setError("Select at least one product.");
      setMode("guided");
      setStep(0);
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "The quote could not be submitted.");
      try {
        sessionStorage.setItem(
          PENDING_QUOTE_CONVERSION_KEY,
          JSON.stringify({
            reference: result.reference,
            productCount: payload.products.length,
            hasRental,
            hasPurchase
          })
        );
      } catch {
        // Conversion measurement must never prevent a successful quote request.
      }
      window.location.assign(`/quote-confirmation?ref=${encodeURIComponent(result.reference)}`);
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The quote could not be submitted. Please try again."
      );
    }
  }

  return (
    <div className="quote-form-shell">
      <div className="quote-mode">
        <div>
          <p>Quick quote</p>
          <span>Choose equipment, then add only the details you know.</span>
        </div>
        <div className="segmented-control" aria-label="Quote form layout">
          <button
            type="button"
            aria-pressed={mode === "guided"}
            onClick={() => setMode("guided")}
          >
            Guided
          </button>
          <button
            type="button"
            aria-pressed={mode === "single"}
            onClick={() => setMode("single")}
          >
            Single page
          </button>
        </div>
      </div>

      {mode === "guided" && (
        <ol className="quote-progress" aria-label="Quote progress">
          {steps.map((label, index) => (
            <li
              key={label}
              className={index === step ? "is-current" : index < step ? "is-complete" : ""}
              aria-current={index === step ? "step" : undefined}
            >
              <span>{index < step ? <Check aria-hidden="true" /> : index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      )}

      <form className={`quote-form quote-form--${mode}`} onSubmit={submit}>
        <input
          className="honeypot"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <section
          className="form-panel"
          data-step="0"
          hidden={mode === "guided" && step !== 0}
        >
          <div className="form-panel__heading">
            <span>01</span>
            <div>
              <h2>Select the equipment.</h2>
              <p>Add each product, choose rent or purchase, and set the quantity.</p>
            </div>
          </div>
          <div className="product-lines">
            {lines.map((line, index) => (
              <div className="product-line" key={`${index}-${lines.length}`}>
                <label>
                  <span>Product {index + 1}</span>
                  <select
                    value={line.product}
                    onChange={(event) => updateProduct(index, event.target.value)}
                    required={index === 0}
                    aria-label={`Product ${index + 1}`}
                  >
                    <option value="">Select equipment</option>
                    {products.map((product) => (
                      <option key={product.slug} value={product.slug}>
                        {product.name} — {product.availability === "both"
                          ? "Rent or purchase"
                          : product.availability === "purchase"
                            ? "Purchase only"
                            : "Rental only"}
                      </option>
                    ))}
                  </select>
                </label>
                {!line.product ? (
                  <div className="intent-summary intent-summary--empty">
                    <span>Requirement</span>
                    <strong>Choose product</strong>
                  </div>
                ) : products.find((product) => product.slug === line.product)?.availability ===
                  "both" ? (
                    <label className="intent-field">
                      <span>Requirement</span>
                      <select
                        value={line.intent}
                        onChange={(event) =>
                          updateLine(index, {
                            intent: event.target.value as ProductLine["intent"]
                          })
                        }
                        aria-label={`Requirement for product ${index + 1}`}
                      >
                        <option value="rental">Rent</option>
                        <option value="purchase">Purchase</option>
                      </select>
                    </label>
                  ) : (
                  <div className="intent-summary">
                    <span>Requirement</span>
                    <strong>
                      {line.intent === "purchase" ? "Purchase only" : "Rental only"}
                    </strong>
                  </div>
                )}
                <label className="quantity-field">
                  <span>Quantity</span>
                  <div>
                    <button
                      type="button"
                      aria-label={`Decrease quantity for product ${index + 1}`}
                      onClick={() =>
                        updateLine(index, { quantity: Math.max(1, line.quantity - 1) })
                      }
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={line.quantity}
                      onChange={(event) =>
                        updateLine(index, { quantity: Math.max(1, Number(event.target.value)) })
                      }
                      aria-label={`Quantity for product ${index + 1}`}
                      required
                    />
                    <button
                      type="button"
                      aria-label={`Increase quantity for product ${index + 1}`}
                      onClick={() => updateLine(index, { quantity: line.quantity + 1 })}
                    >
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                </label>
                <button
                  className="remove-line"
                  type="button"
                  aria-label={`Remove product ${index + 1}`}
                  onClick={() => removeLine(index)}
                >
                  <Trash2 aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <button className="add-product" type="button" onClick={addLine}>
            <Plus aria-hidden="true" />
            Add another product
          </button>
        </section>

        <section
          className="form-panel"
          data-step="0"
          hidden={mode === "guided" && step !== 0}
        >
          <div className="form-panel__heading">
            <span>Optional</span>
            <div>
              <h2>
                {hasPurchase && !hasRental
                  ? "Define the order."
                  : hasPurchase
                    ? "Define the project and order."
                    : "Define the project."}
              </h2>
              <p>Everything in this section is optional. Estimates are enough.</p>
            </div>
          </div>
          <div className="form-grid">
            {hasRental && (
              <label>
                <span>
                  Rental period
                  {hasPurchase && <small>Rental items only</small>}
                </span>
                <select name="rentalPeriod" defaultValue="Not sure yet">
                  <option>Not sure yet</option>
                  <option>Less than 1 week</option>
                  <option>1–4 weeks</option>
                  <option>1–3 months</option>
                  <option>More than 3 months</option>
                </select>
              </label>
            )}
            <label>
              <span>Required date <small>Optional</small></span>
              <input name="requiredDate" type="date" />
            </label>
            <label className="field-wide">
              <span>Project location <small>Optional</small></span>
              <input
                name="projectLocation"
                type="text"
                placeholder="Town, province or site address"
              />
            </label>
            <label className="field-wide">
              <span>Additional requirements <small>Optional</small></span>
              <textarea
                name="notes"
                rows={5}
                placeholder="Site conditions, programme notes or anything else we should know"
              />
            </label>
          </div>
        </section>

        <section
          className="form-panel"
          data-step="1"
          hidden={mode === "guided" && step !== 1}
        >
          <div className="form-panel__heading">
            <span>02</span>
            <div>
              <h2>Where should we respond?</h2>
              <p>Only your name and email are required.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              <span>Company <small>Optional</small></span>
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label>
              <span>Contact name</span>
              <input name="contactName" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Phone <small>Optional</small></span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
          </div>
        </section>

        <div className="form-actions">
          {mode === "guided" && step > 0 && (
            <button
              className="button button--outline"
              type="button"
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
            >
              <ArrowLeft aria-hidden="true" />
              Back
            </button>
          )}
          {mode === "guided" && step < steps.length - 1 ? (
            <button
              className="button"
              type="button"
              onClick={(event) => goNext(event.currentTarget.form!)}
            >
              Continue
              <ArrowRight aria-hidden="true" />
            </button>
          ) : (
            <button className="button" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <LoaderCircle className="spinner" aria-hidden="true" />
                  Sending
                </>
              ) : (
                <>
                  Submit quote request
                  <Send aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
        {(mode === "single" || step === steps.length - 1) && (
          <p className="quote-assurance">
            No account needed. We use your details only to respond to this request. See our{" "}
            <Link href="/privacy-policy">privacy policy</Link>.
          </p>
        )}
        <div className="form-status" aria-live="polite">
          {status === "error" && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}
