import { type TweetV2SingleResult, TwitterV2IncludesHelper } from 'twitter-api-v2'
import { type TweetOptions } from '../twitterApi'
import { tweetSchema, type Tweet } from '../schemas/tweet.schema'
import { map } from './mapTweet'

export const parseTweetResponse = (
  result: TweetV2SingleResult,
  options: TweetOptions
): Tweet => {
  const { data: tweet, errors } = result
  if (errors?.length) throw new Error(errors[0].detail)
  const includes = new TwitterV2IncludesHelper(result)
  const author = includes.author(tweet)
  const media = includes.medias(tweet)
  const quotedTweet = includes.quote(tweet)
  const quotedTweetAuthor = quotedTweet ? includes.author(quotedTweet) : undefined
  const poll = includes.poll(tweet)

  if (!author) throw new Error(`Tweet author required but not found.`)

  const rawTweet = {
    ...map.tweet(tweet, options),
    author: map.author(author),
    media: map.media(media),
    quotedTweet: map.quote({
      tweet: quotedTweet,
      author: quotedTweetAuthor,
      options,
    }),
    poll: map.poll(poll),
  }

  const validatedTweet = tweetSchema.parse(rawTweet)

  return validatedTweet
}
