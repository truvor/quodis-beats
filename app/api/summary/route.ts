import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openRouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = await generateText({
    model: openRouter.chat('meta-llama/llama-4-maverick:free'),
    prompt: messages,
  });

  return new Response(JSON.stringify(result), {
    headers: {'Content-Type': 'application/json'}
  });
}
