import { getCurrentSession, LogInUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";  // ✅ Correct import
import SignUp from "@/components/auth/SignUp";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignUpPage = async () => {
  const session = await getCurrentSession();

  if (session?.user) {
    redirect("/"); // ✅ No need to return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const action = async (prevState: any, formData: FormData) => {
    "use server";
    const parsed = schema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      return { message: "Invalid data", status: 400 };
    }

    const { email, password } = parsed.data;
    const { user, error } = await LogInUser(email, password);

    if (error) {
      return { message: error, status: 400 };
    } else if (user) {
      redirect("/layout"); // ✅ Only call once
    }
  };

  return <SignUp action={action} />;
};

export default SignUpPage;