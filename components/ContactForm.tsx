"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { Messages } from "@/lib/messages";

type ContactFormProps = {
  messages: Messages["contact"];
};

type Status = "idle" | "sending" | "success" | "error" | "missing";

const fieldClass =
  "w-full rounded-xl border border-white/50 bg-white/50 px-3 py-2.5 text-sm outline-none ring-brand backdrop-blur-sm transition focus:bg-white/80 focus:ring-2";

export function ContactForm({ messages }: ContactFormProps) {
  const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
  const [status, setStatus] = useState<Status>(apiUrl ? "idle" : "missing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!apiUrl) {
      setStatus("missing");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "missing") {
    return (
      <GlassPanel className="p-5 text-sm text-muted">{messages.missingApi}</GlassPanel>
    );
  }

  return (
    <GlassPanel className="mx-auto max-w-xl p-5 sm:p-7">
      <form onSubmit={onSubmit} className="space-y-4">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          {messages.name}
        </label>
        <input
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {messages.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {messages.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={fieldClass}
        />
      </div>

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? messages.sending : messages.submit}
      </Button>

      {status === "success" ? (
        <p className="text-sm text-brand-deep" role="status">
          {messages.success}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-brand" role="alert">
          {messages.error}
        </p>
      ) : null}
      </form>
    </GlassPanel>
  );
}
