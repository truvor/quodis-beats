import { adminFlag } from "@/lib/flags";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const isAdminFlagEnabled = (await adminFlag()) as boolean;
  console.log("isAdminFlagEnabled", isAdminFlagEnabled);
  return <>
    <h1>Admin Flag: {String(isAdminFlagEnabled)}</h1>
    <LoginForm isAdminFlagEnabled={isAdminFlagEnabled} /></>;
}
