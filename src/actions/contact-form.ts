"use server";

import { prisma } from "@/lib/prisma";

export async function contactFormAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const subject = formData.get("subject") as string;

    console.log(name, email, phone, subject);

    if (!name || !email || !subject) {
      return {
        error: "Please fill in all fields",
      };
    }

    await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message: subject,
      },
    });

    return {
      success: "Message sent successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
}
