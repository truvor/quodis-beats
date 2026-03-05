import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PlayerWrapper from "@/app/components/player-wrapper/player-wrapper";

export default async function AdminPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-4xl font-bold text-[#b5a37b]">Store</h1>
        <p className="text-xl text-gray-400">Coming Soon</p>
      </div>
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <PlayerWrapper />;
}
