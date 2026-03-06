import { flag, dedupe } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';
import { createClient } from "@/utils/supabase/server";

type Entity = {
    user?: {
        id: string;
    };
};

const identify = dedupe(async (): Promise<Entity> => {
    const supabase = await createClient();
    const { data: { session } = {} } = await supabase.auth.getSession();

    return {
        user: session?.user
            ? {
                id: session.user.id
            }
            : undefined
    };
});

export const adminFlag = flag({
    key: "admin",
    identify,
    adapter: vercelAdapter()
});