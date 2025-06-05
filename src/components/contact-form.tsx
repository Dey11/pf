"use client";

export default function ContactForm() {
  return (
    <form className="flex w-full max-w-lg flex-col gap-3">
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
        className="bg-secondary hover:bg-secondary/80 h-8 cursor-pointer rounded-md"
      >
        submit
      </button>
    </form>
  );
}
