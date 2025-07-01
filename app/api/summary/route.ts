import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

type errorType = { lastError: { statusCode: number } };

export async function POST() {
  const openRouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  let result;
  try {
    result = await generateText({
      model: openRouter.chat('mistralai/mistral-nemo:free'),
      prompt: process.env.SUMMARY_PROMPT,
    });
  } catch (err) {
    result = {
      status: (err as errorType).lastError.statusCode,
      errorMessage: 'Summary queries reached the limit',
    };
  }

  return new Response(JSON.stringify(result), {
    headers: {'Content-Type': 'application/json'}
  });
}
