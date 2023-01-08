import { z } from 'zod'

export const tweetOptionsSchema = z.object({
  darkMode: z.boolean().default(false),
  showBranding: z.boolean().default(true),
  showMedia: z.boolean().default(true),
  showMetrics: z.boolean().default(true),
  themeId: z.number().int().optional(),
})

export type TweetOptions = z.infer<typeof tweetOptionsSchema>
