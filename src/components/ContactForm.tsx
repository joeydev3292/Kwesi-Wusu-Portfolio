"use client";

import { useState, type FormEvent } from "react";

function autoResize(e: React.FormEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget;
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          _gotcha: data.get("_gotcha"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong");
      }

      setStatus("success");
      setMessage("Thanks for reaching out. I'll get back to you soon.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Failed to send message."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg" noValidate>
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="_gotcha">Leave this empty</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-light text-white/60 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-base placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-light text-white/60 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-base placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-light text-white/60 mb-1">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-base placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-light text-white/60 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          onInput={autoResize}
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-base placeholder-white/30 focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-accent text-white px-8 py-3 rounded text-sm font-medium tracking-wider hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {status === "sending" ? "SENDING..." : "SEND"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
