import { openai } from '@ai-sdk/openai'
import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { streamObject } from 'ai'
import { schema } from '~/schema'

export const action = async ({ request }: ActionFunctionArgs) => {
  const prompt = await request.text()
  const result = await streamObject({
    model: openai('gpt-4o', {}),
    schema,
    prompt: `You are a helpful AI assistant. You are helping a user with a question. The results are output one by one in separate artifacts. The user asks: "${prompt}"`,
    onFinish: ({ usage, object }) => {
      console.log({
        prompt,
        object,
        usage,
      })
    },
  })

  return result.toTextStreamResponse()
}
