import { Tweetv2FieldsParams, TwitterApi as TwitterClient } from 'twitter-api-v2'
import { z } from 'zod'
import { parseTweetResponse } from './helpers/parseTweetResponse'
import { Tweet } from './schemas/tweet.schema'

export type TweetOptions = {
  censorProfanity: boolean
}

export class TwitterApi extends TwitterClient {
  async getTweet(
    id: string,
    options: TweetOptions = { censorProfanity: false }
  ): Promise<Tweet> {
    try {
      twitterId.parse(id)
      const response = await this.v2.singleTweet(id, tweetFields)
      const tweet = parseTweetResponse(response, options)
      return tweet
    } catch (e) {
      throw new Error(`Error getting tweet: ${e}`)
    }
  }
}

const twitterId = z.string().refine((id) => Number.isInteger(+id))

const tweetFields: Partial<Tweetv2FieldsParams> = {
  'tweet.fields': [
    'author_id',
    'public_metrics',
    'created_at',
    'entities',
    'referenced_tweets',
  ],
  'user.fields': ['name', 'verified', 'profile_image_url'],
  'media.fields': ['preview_image_url', 'url', 'width', 'height'],
  'poll.fields': ['options', 'voting_status'],
  expansions: [
    'attachments.media_keys',
    'author_id',
    'attachments.poll_ids',
    'referenced_tweets.id',
    'referenced_tweets.id.author_id',
  ],
}
