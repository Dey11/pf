"use client";

import { contactFormAction } from "@/actions/contact-form";
import { useState, useTransition } from "react";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setError(null);
      const result = await contactFormAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div>
      <form
        className="flex w-full max-w-lg flex-col gap-3"
        action={handleSubmit}
      >
        <div className="flex gap-2">
          <input
            type="text"
            id="name"
            placeholder="full name*"
            className="w-full rounded-md border border-gray-300 p-2"
            name="name"
          />
          <input
            type="tel"
            id="phone"
            placeholder="phone"
            className="w-full rounded-md border border-gray-300 p-2"
            name="phone"
          />
        </div>
        <input
          type="email"
          id="email"
          placeholder="email*"
          className="w-full rounded-md border border-gray-300 p-2"
          name="email"
        />
        <textarea
          id="subject"
          placeholder="subject*"
          className="w-full rounded-md border border-gray-300 p-2"
          name="subject"
        />

        <button
          type="submit"
          className="bg-secondary hover:bg-secondary/80 h-8 cursor-pointer rounded-md disabled:opacity-50"
          disabled={isPending}
        >
          submit
        </button>
      </form>
      {error && <p className="pt-2 text-center text-red-500">{error}</p>}
    </div>
  );
}
