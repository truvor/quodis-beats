"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, signup } from "./actions";
import { authSchema, type AuthSchemaType } from "./authSchema";

export type AuthFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AuthSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(authSchema),
  });

  const onSubmit = handleSubmit(async (data: AuthSchemaType, event?: any) => {
    const submitter = event?.nativeEvent?.submitter as
      | HTMLButtonElement
      | undefined;
    const action = submitter?.name;

    try {
      let response;
      if (action === "signup") {
        response = await signup(data);
      } else {
        response = await login(data);
      }

      if (response?.error) throw new Error(response.error);
    } catch (error) {
      console.log(error);
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
