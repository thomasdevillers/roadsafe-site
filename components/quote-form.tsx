"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Minus, Plus, Send, Trash2 } from "lucide-react";
import { products } from "@/lib/site-data";

type ProductLine = {
  product: string;
  quantity: number;
};

type FormMode = "guided" | "single";

const steps = ["Equipment", "Project", "Contact"];

export function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const initialSelection = useMemo(
    () => products.find((product) => product.slug === initialProduct)?.slug || "",
    [initialProduct]
  );
  const [mode, setMode] = useState<FormMode>("guided");
  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<ProductLine[]>([
    { product: initialSelection, quantity: 1 }
  ]);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const selectedProducts = lines
    .map((line) => products.find((product) => product.slug === line.product))
    .filter((product) => Boolean(product));
  const hasRental = selectedProducts.some(
    (product) => product?.availability === "rental"
  );
  const hasPurchase = selectedProducts.some(
    (product) => product?.availability === "purchase"
  );

  function updateLine(index: number, update: Partial<ProductLine>) {
    setLines((current) =>
      current.map((line, lineIndex) =>
        lineIndex === index ? { ...line, ...update } : line
      )
    );
  }

  function addLine() {
    setLines((current) => [...current, { product: "", quantity: 1 }]);
  }

  function removeLine(index: number) {
    setLines((current) =>
      current.length === 1
        ? [{ product: "", quantity: 1 }]
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
          availability:
            products.find((product) => product.slug === line.product)?.availability ||
            "rental"
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
          <p>Form layout</p>
          <span>Use the guided steps or view everything together.</span>
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
              <p>Add as many products as the project requires.</p>
            </div>
          </div>
          <div className="product-lines">
            {lines.map((line, index) => (
              <div className="product-line" key={`${index}-${lines.length}`}>
                <label>
                  <span>Product {index + 1}</span>
                  <select
                    value={line.product}
                    onChange={(event) => updateLine(index, { product: event.target.value })}
                    required={index === 0}
                    aria-label={`Product ${index + 1}`}
                  >
                    <option value="">Select equipment</option>
                    {products.map((product) => (
                      <option key={product.slug} value={product.slug}>
                        {product.name} — {product.availability === "purchase" ? "Purchase" : "Rental"}
                      </option>
                    ))}
                  </select>
                  {line.product && (
                    <small
                      className={`availability-tag availability-tag--${
                        products.find((product) => product.slug === line.product)
                          ?.availability || "rental"
                      }`}
                    >
                      {products.find((product) => product.slug === line.product)
                        ?.availability === "purchase"
                        ? "Purchase only"
                        : "Rental equipment"}
                    </small>
                  )}
                </label>
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
          data-step="1"
          hidden={mode === "guided" && step !== 1}
        >
          <div className="form-panel__heading">
            <span>02</span>
            <div>
              <h2>
                {hasPurchase && !hasRental
                  ? "Define the order."
                  : hasPurchase
                    ? "Define the project and order."
                    : "Define the project."}
              </h2>
              <p>Approximate details are enough to begin.</p>
            </div>
          </div>
          <div className="form-grid">
            {hasRental && (
              <label>
                <span>
                  Rental period
                  {hasPurchase && <small>Rental items only</small>}
                </span>
                <select name="rentalPeriod" required defaultValue="">
                  <option value="" disabled>
                    Select a duration
                  </option>
                  <option>Less than 1 week</option>
                  <option>1–4 weeks</option>
                  <option>1–3 months</option>
                  <option>More than 3 months</option>
                  <option>Not sure yet</option>
                </select>
              </label>
            )}
            <label>
              <span>Required date</span>
              <input name="requiredDate" type="date" required />
            </label>
            <label className="field-wide">
              <span>Project location</span>
              <input
                name="projectLocation"
                type="text"
                placeholder="Town, province or site address"
                required
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
          data-step="2"
          hidden={mode === "guided" && step !== 2}
        >
          <div className="form-panel__heading">
            <span>03</span>
            <div>
              <h2>Where should we respond?</h2>
              <p>Quote requests are reviewed the same business day.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              <span>Company</span>
              <input name="company" type="text" autoComplete="organization" required />
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
              <span>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" required />
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
        <div className="form-status" aria-live="polite">
          {status === "error" && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}
