import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PlayerWrapper from "@/app/components/player-wrapper/player-wrapper";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <PlayerWrapper />;
}
