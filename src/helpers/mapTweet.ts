import type {
  TweetV2,
  UserV2,
  MediaObjectV2,
  PollV2,
  TweetEntityUrlV2,
} from 'twitter-api-v2'
import {
  authorSchema,
  mediaSchema,
  pollSchema,
  Tweet,
  TweetAuthor,
  TweetMedia,
  TweetMetrics,
  TweetPoll,
  TweetUrl,
  urlSchema,
} from '../schemas/tweet.schema'
import type { TweetOptions } from '../twitterApi'
import { TextFormatter } from './formatText'

export const mapTweet = (
  tweet: TweetV2,
  options: TweetOptions
): Omit<Tweet, 'author' | 'media' | 'quotedTweet'> => {
  const { time, date } = formatDateAndTime(new Date(tweet.created_at ?? Date.now()))
  const urls = mapUrls(tweet.entities?.urls)
  const formatter = new TextFormatter(tweet, options)

  const trailingUrl = formatter.findTrailingUrl()

  return {
    createdAtTime: time,
    createdAtDate: date,
    id: tweet.id,
    text: formatter.format(),
    metrics: mapMetrics(tweet),
    urls,
    expandedUrl: trailingUrl?.title ? mapUrls([trailingUrl])?.at(0) : undefined,
  }
}

export const mapMetrics = (tweet: TweetV2): TweetMetrics => {
  const { public_metrics } = tweet
  return {
    likeCount: public_metrics?.like_count ?? 0,
    retweetCount: public_metrics?.retweet_count ?? 0,
    // @ts-ignore: No view count support yet from twitter-api-v2
    viewCount: public_metrics?.impression_count,
  }
}

export const mapAuthor = (author: UserV2): TweetAuthor => {
  // _normal is only 48x48 which looks bad on high-res displays.
  // _bigger is 73x73 and looks better.
  const profileImageUrl = author.profile_image_url?.replace('_normal', '_bigger')

  const rawAuthor = {
    id: author.id,
    name: author.name.trim(),
    profileImageUrl: profileImageUrl,
    username: author.username.trim(),
    verified: Boolean(author.verified),
  }

  const validatedAuthor = authorSchema.parse(rawAuthor)

  return validatedAuthor
}

export const mapMedia = (media: MediaObjectV2[]): TweetMedia[] | undefined => {
  return media?.map((mediaItem) => {
    const rawMediaItem = {
      url: (mediaItem.url || mediaItem.preview_image_url) as string,
      type: mediaItem.type as TweetMedia['type'],
      width: mediaItem.width ?? 0,
      height: mediaItem.height ?? 0,
    }

    const validatedMediaItem = mediaSchema.parse(rawMediaItem)
    return validatedMediaItem
  })
}

export const mapUrls = (urls?: TweetEntityUrlV2[]): TweetUrl[] | undefined => {
  return urls?.map((url) => {
    const rawUrl = {
      url: url.url,
      start: url.start,
      end: url.end,
      fullUrl: url.expanded_url,
      images: url.images,
      title: url.title,
      description: url.description,
    }
    const validatedUrl = urlSchema.parse(rawUrl)
    return validatedUrl
  })
}

export const mapQuote = ({
  tweet,
  author,
  options,
}: {
  tweet?: TweetV2
  author?: UserV2
  options: TweetOptions
}): Tweet | undefined => {
  if (!tweet) return undefined
  if (!author) return undefined
  return {
    ...mapTweet(tweet, options),
    author: mapAuthor(author),
  }
}

export const mapPoll = (poll?: PollV2): TweetPoll | undefined => {
  if (!poll) return undefined

  const rawPoll = {
    id: poll.id,
    votingStatus: poll.voting_status || 'closed',
    options: poll.options,
  }

  const validatedPoll = pollSchema.parse(rawPoll)
  return validatedPoll
}

export const map = Object.freeze({
  tweet: mapTweet,
  author: mapAuthor,
  media: mapMedia,
  quote: mapQuote,
  urls: mapUrls,
  poll: mapPoll,
})

export const formatDateAndTime = (date: Date) => {
  if (!(date instanceof Date)) {
    throw new Error(`Invalid date`)
  }

  return {
    date: date.toLocaleDateString('en-US', {
      dateStyle: 'medium',
    }),
    time: date.toLocaleTimeString('en-US', { timeStyle: 'short' }),
  }
}
