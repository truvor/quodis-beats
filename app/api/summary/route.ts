import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export async function POST() {
  const openRouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = await generateText({
    model: openRouter.chat('mistralai/mistral-nemo:free'),
    prompt: process.env.SUMMARY_PROMPT,
  });

  return new Response(JSON.stringify(result), {
    headers: {'Content-Type': 'application/json'}
  });
}
