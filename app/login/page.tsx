import { adminFlag } from "@/lib/flags";
import LoginForm from "./login-form";
import { useEffect } from "react";

export default async function LoginPage() {
  const isAdminFlagEnabled = (await adminFlag()) as boolean;
  useEffect(() => {
    console.log("isAdminFlagEnabled", isAdminFlagEnabled);
  }, [isAdminFlagEnabled]);
  return <LoginForm isAdminFlagEnabled={isAdminFlagEnabled} />;
}
