import { createContext, useContext } from 'react'
import type { Tweet } from '../schemas/tweet.schema'

export const TweetContext = createContext<Tweet | undefined>(undefined)

export const useTweet = () => {
  const tweet = useContext(TweetContext)

  if (!tweet) throw new Error(`useTweet must be used within TweetContext provider.`)

  return tweet
}
