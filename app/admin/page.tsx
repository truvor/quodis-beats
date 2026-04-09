import { Activity } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BeatGallery from "@/app/components/beat-gallery/beat-gallery";
import { adminFlag } from "@/lib/flags";

export default async function AdminPage() {
  const isAdminFlagEnabled = await adminFlag();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <Activity mode={isAdminFlagEnabled ? "visible" : "hidden"}>
      <BeatGallery />
    </Activity>
  );
}
