import { getCurrentSession, LogInUser, registerUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";
import zod from "zod"; 
import SignUp from "@/components/auth/SignUp";

const SignUpSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

const SignUpPage = async () => {
  const {user}= await getCurrentSession();

  if (user) {
     return redirect("/"); 
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const action = async (prevState: any, formData: FormData) => {
    "use server";
    const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      return { 
                 message: "Invalid data", 
            };
    }

    const { email, password } = parsed.data;
    const { user, error } = await registerUser(email, password);

    if (error) {
      return {message: error};
    } else if (user) {
        await LogInUser(email,password);
        return redirect("/");
    }

    return { message: "An unexpected error occurred", success: false };
  };

  return <SignUp action={action} />;
};

export default SignUpPage;