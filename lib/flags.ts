import { flag } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

export const adminFlag = flag({
    key: "admin",
    adapter: vercelAdapter()
});