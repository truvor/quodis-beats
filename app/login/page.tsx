import { adminFlag } from "@/lib/flags";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const isAdminFlagEnabled = (await adminFlag()) as boolean;

  return <LoginForm isAdminFlagEnabled={isAdminFlagEnabled} />;
}
