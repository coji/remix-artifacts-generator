import { z } from 'zod'
export const schema = z.object({
  shortReply: z.string(),
  artifacts: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
      contnet: z.string(),
    }),
  ),
  callToAction: z.object({
    message: z.string(),
    candidates: z.array(
      z.object({
        buttonText: z.string(),
        action: z.string(),
      }),
    ),
  }),
})
