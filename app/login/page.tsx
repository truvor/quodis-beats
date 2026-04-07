"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthSchemaType } from "./authSchema";
import { createClient } from "@/utils/supabase/client";

export type AuthFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AuthSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(authSchema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: AuthSchemaType, event?: any) => {
    const submitter = event?.nativeEvent?.submitter as
      | HTMLButtonElement
      | undefined;
    const action = submitter?.name;
    const supabase = createClient();

    try {
      setMessage(null);
      let error = null;
      const result = authSchema.safeParse(data);
      if (!result.success) {
        error = result.error;
      }
      if (error) {
        throw new Error(error.message);
      }

      if (action === "signup") {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp(data);
        if (signUpError) throw new Error(signUpError.message);

        // When autoconfirm is off, Supabase returns a fake user with an empty identities array
        // if the user already exists, to prevent email enumeration. We handle this explicitly.
        if (signUpData.user?.identities?.length === 0) {
          throw new Error("User already exists");
        }

        setMessage({ text: "Confirm Email", type: "success" });
        reset();
        return;
      } else {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword(data);
        if (signInError || !signInData.session) {
          setMessage({ text: signInError?.message || "Not signed in", type: "error" });
          return;
        }
        router.push("/admin");
      }
    } catch (error: any) {
      setMessage({ text: error.message || "An error occurred", type: "error" });
    }
    reset();
  });

  return (
    <form
      className={`flex flex-col items-left
bg-white rounded-lg shadow-sm border border-gray-200 py-6 px-20 space-y-6
max-w-sm mx-auto`}
      onSubmit={onSubmit}
    >
      {message && (
        <div
          className={`text-sm font-medium rounded-md p-3 w-full text-center ${message.type === "success"
            ? "text-green-600 bg-green-50"
            : "text-red-600 bg-red-50"
            }`}
        >
          {message.text}
        </div>
      )}
      <div className="flex flex-col items-start">
        <label className="text-gray-500" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="border-b-1 text-gray-600 w-full"
          type="email"
          autoFocus
          autoComplete="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col items-start">
        <label className="text-gray-500" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="border-b-1 text-gray-600 w-full"
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex justify-around w-full">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          name="login"
          disabled={isSubmitting || !isValid}
        >
          Log in
        </button>
        <button
          className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          name="signup"
          disabled={isSubmitting || !isValid}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}