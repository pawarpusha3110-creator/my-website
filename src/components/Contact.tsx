import { useState, type FormEvent } from "react";
import { cn } from "@/utils/cn";
import { Reveal, RevealText } from "./Reveal";

type Status = "idle" | "sending" | "sent";

const SERVICES = [
  "Intelligent Website",
  "AI Customer Experience",
  "Business Automation",
  "Digital Systems",
  "Not sure yet",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Tell us a little about your project";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3.5 font-sans text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-muted/50 focus:border-brand focus:ring-4 focus:ring-brand/12";

  return (
    <section id="contact" className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-20 h-[420px] w-[420px] rounded-full bg-brand/12 blur-[120px]" />

      <div className="relative mx-auto max-w-[1340px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* left — copy & details */}
          <div>
            <p className="mb-5 inline-flex items-center gap-2 font-sans text-[12.5px] font-medium uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-8 bg-brand" />
              Get in touch
            </p>
            <RevealText
              text="Let's build your digital solution."
              className="block font-display text-[9vw] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[3.3rem]"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted sm:text-[17px]">
                Tell us about your business and what you want to achieve. We&apos;ll reply
                within one business day with a clear next step.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 space-y-5">
              {[
                {
                  label: "Email",
                  value: "hello@zolvex.ai",
                  href: "mailto:hello@zolvex.ai",
                  icon: (
                    <>
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ),
                },
                {
                  label: "Response time",
                  value: "Within 1 business day",
                  icon: (
                    <>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ),
                },
                {
                  label: "Support",
                  value: "24/7 after launch",
                  icon: (
                    <>
                      <path d="M20 7H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ),
                },
              ].map((d) => (
                <div key={d.label} className="group flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink/10 bg-white text-brand transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      {d.icon}
                    </svg>
                  </span>
                  <div>
                    <p className="font-sans text-[11.5px] uppercase tracking-[0.18em] text-muted">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-display text-[15px] font-semibold text-ink transition-colors hover:text-brand"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-display text-[15px] font-semibold text-ink">
                        {d.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* right — form */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-6 shadow-xl shadow-ink/5 sm:p-9">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-400 to-brand" />

              {status === "sent" ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand/12 text-brand">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3 className="mb-2.5 font-display text-2xl font-bold text-ink">
                    Message received.
                  </h3>
                  <p className="max-w-xs font-sans text-[15px] leading-relaxed text-muted">
                    Thanks {form.name.split(" ")[0] || "there"} — we&apos;ll be in touch
                    within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", company: "", service: "", message: "" });
                    }}
                    className="mt-7 rounded-full border border-ink/15 px-6 py-2.5 font-sans text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-sans text-[13px] font-medium text-ink"
                      >
                        Full name <span className="text-brand">*</span>
                      </label>
                      <input
                        id="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Jane Doe"
                        className={cn(
                          inputBase,
                          errors.name ? "border-red-400 ring-2 ring-red-100" : "border-ink/12",
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1.5 font-sans text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-sans text-[13px] font-medium text-ink"
                      >
                        Email <span className="text-brand">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="jane@company.com"
                        className={cn(
                          inputBase,
                          errors.email ? "border-red-400 ring-2 ring-red-100" : "border-ink/12",
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1.5 font-sans text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block font-sans text-[13px] font-medium text-ink"
                      >
                        Business name
                      </label>
                      <input
                        id="company"
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                        placeholder="Your business name"
                        className={cn(inputBase, "border-ink/12")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="mb-2 block font-sans text-[13px] font-medium text-ink"
                      >
                        What do you need?
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => set("service", e.target.value)}
                        className={cn(inputBase, "border-ink/12 cursor-pointer appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23605954' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                        }}
                      >
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="mb-2 block font-sans text-[13px] font-medium text-ink"
                      >
                        Project details <span className="text-brand">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Tell us about your business, what you want to build and your timeline…"
                        className={cn(
                          inputBase,
                          "resize-none",
                          errors.message ? "border-red-400 ring-2 ring-red-100" : "border-ink/12",
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1.5 font-sans text-xs text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative mt-7 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand px-8 py-4 font-sans text-[15px] font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/40 disabled:cursor-wait disabled:opacity-80 sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      {status === "sending" ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              opacity="0.25"
                            />
                            <path
                              d="M22 12a10 10 0 00-10-10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Build Your Digital Solution
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M5 12h14M13 5l7 7-7 7"
                                stroke="currentColor"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 group-hover:translate-x-0" />
                  </button>

                  <p className="mt-4 font-sans text-xs leading-relaxed text-muted">
                    By submitting you agree to be contacted about your enquiry. We never
                    share your details.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
