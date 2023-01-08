import { createContext, useContext } from 'react'
import { type TweetOptions } from '../schemas/tweetOptions.schema'

export const TweetOptionsContext = createContext<TweetOptions | undefined>(undefined)

export const useTweetOptions = () => {
  const tweetOptions = useContext(TweetOptionsContext)

  if (!tweetOptions)
    throw new Error(`useTweetOptions must be used within TweetOptionsContext provider.`)

  return tweetOptions
}
