import { adminFlag } from "@/lib/flags";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const isAdminFlagEnabled = (await adminFlag()) as boolean;
  console.log("isAdminFlagEnabled", isAdminFlagEnabled);
  return <LoginForm isAdminFlagEnabled={isAdminFlagEnabled} />;
}
