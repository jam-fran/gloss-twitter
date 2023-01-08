import { z } from 'zod'

export const mediaSchema = z.object({
  height: z.number().int().nonnegative(),
  width: z.number().int().nonnegative(),
  url: z.string().url(),
  type: z.enum(['animated_gif', 'photo', 'video']),
})

export const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  profileImageUrl: z.string().url(),
  username: z.string(),
  verified: z.boolean(),
})

export const urlSchema = z.object({
  start: z.number().int().nonnegative(),
  end: z.number().int().nonnegative(),
  url: z.string().url(),
  fullUrl: z.string().url().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  images: mediaSchema.omit({ type: true }).array().optional(),
})

export const pollSchema = z.object({
  id: z.string(),
  votingStatus: z.enum(['closed', 'active', 'open']),
  options: z
    .object({
      position: z.number().int().nonnegative(),
      label: z.string(),
      votes: z.number().int().nonnegative(),
    })
    .array(),
})

export const metricsSchema = z.object({
  likeCount: z.number().int().nonnegative().default(0),
  retweetCount: z.number().int().nonnegative().default(0),
  viewCount: z.number().int().nonnegative().default(0),
})

export const singleTweetSchema = z.object({
  id: z.string(),
  createdAtDate: z.string(),
  createdAtTime: z.string(),
  text: z.string(),
  author: authorSchema,
  metrics: metricsSchema,
  media: mediaSchema.array().optional(),
  urls: urlSchema.array().optional(),
  expandedUrl: urlSchema.optional(),
  poll: pollSchema.optional(),
})

export const quotedTweetSchema = z.object({
  quotedTweet: singleTweetSchema.omit({ media: true }).optional(),
})

export const tweetSchema = singleTweetSchema.merge(quotedTweetSchema)

export type Tweet = z.infer<typeof tweetSchema>
export type TweetAuthor = z.infer<typeof authorSchema>
export type TweetMedia = z.infer<typeof mediaSchema>
export type TweetUrl = z.infer<typeof urlSchema>
export type TweetPoll = z.infer<typeof pollSchema>
export type TweetMetrics = z.infer<typeof metricsSchema>
