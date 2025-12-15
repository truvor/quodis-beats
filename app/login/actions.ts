"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { authSchema, type AuthSchemaType } from "./authSchema";

async function handleAuth(
  formData: AuthSchemaType,
  operation: (
    supabase: any,
    data: AuthSchemaType,
  ) => Promise<{ error?: { message?: string } | null }>,
) {
  const result = authSchema.safeParse(formData);
  if (!result.success) {
    return { formData, error: "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await operation(supabase, result.data);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function login(formData: AuthSchemaType) {
  return handleAuth(formData, (supabase, data) =>
    supabase.auth.signInWithPassword(data),
  );
}

export async function signup(formData: AuthSchemaType) {
  return handleAuth(formData, (supabase, data) => supabase.auth.signUp(data));
}
