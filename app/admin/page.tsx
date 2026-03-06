import { Activity } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PlayerWrapper from "@/app/components/player-wrapper/player-wrapper";
import { adminFlag } from "@/lib/flags";

export default async function AdminPage() {
  const isAdminFlagEnabled = await adminFlag();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className={`flex flex-col items-center justify-center ${isAdminFlagEnabled ? "py-12" : "min-h-[50vh]"} space-y-4`}>
        <h1 className="text-4xl font-bold text-[#b5a37b]">Store</h1>
        <p className="text-xl text-gray-400">Coming Soon</p>
      </div>
      <Activity mode={isAdminFlagEnabled ? "visible" : "hidden"}>
        <PlayerWrapper />
      </Activity>
    </>
  );
}
