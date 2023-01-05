import type { TweetEntityHashtagV2, TweetV2 } from 'twitter-api-v2'
import Filter from 'bad-words'
import { type TweetOptions } from '../twitterApi'

export class TextFormatter {
  private tweet: TweetV2
  private options?: TweetOptions
  public formattedText = ''

  constructor(tweet: TweetV2, options?: TweetOptions) {
    this.tweet = tweet
    this.formattedText = tweet.text
    this.options = options
  }

  public format() {
    this.removeTrailingUrls()
    this.wrapUrls()
    this.wrapMentions()
    this.wrapTags('#')
    this.wrapTags('$')
    this.formatSpecialCharacters()
    this.options?.censorProfanity && this.censorProfanity()
    return this.formattedText
  }

  private censorProfanity() {
    const replaceRegex = /(?<=.).+(?=.)/
    const placeHolder = (str: string) => '*'.repeat(str.length)
    // @ts-ignore: bad-words types package error
    const filter = new Filter({ replaceRegex, placeHolder })
    this.formattedText = filter.clean(this.formattedText)
  }

  findTrailingUrl() {
    const { entities } = this.tweet
    const { length } = [...this.formattedText] // Account for emojis
    return entities?.urls?.find((url) => url.end === length)
  }

  private formatSpecialCharacters() {
    this.formattedText = this.formattedText.replace(/&amp;/g, '&')
  }

  private removeTrailingUrls() {
    const { entities } = this.tweet
    if (!entities?.urls || !entities.urls.length) return
    const trailingUrl = this.findTrailingUrl()
    if (!trailingUrl) return
    this.formattedText = this.formattedText.replace(trailingUrl.url, '').trim()
    this.removeTrailingUrls()
  }

  private wrapUrls() {
    const { entities } = this.tweet
    if (!entities?.urls || !entities.urls.length) return
    let wrappedText = this.formattedText
    entities.urls.forEach((url) => {
      wrappedText = wrappedText.replaceAll(url.url, `<span>${url.display_url}</span>`)
    })
    this.formattedText = wrappedText
  }

  private wrapMentions() {
    const { entities } = this.tweet
    if (!entities?.mentions || !entities.mentions.length) return
    let wrappedText = this.formattedText
    entities.mentions.forEach((mention) => {
      const regex = new RegExp(`@${mention.username}\\b`, 'ig')
      wrappedText = wrappedText.replace(regex, (match) => `<span>${match}</span>`)
    })
    this.formattedText = wrappedText
  }

  private wrapTags(prefix: '#' | '$') {
    const { entities } = this.tweet
    let tags: TweetEntityHashtagV2[] = []

    if (prefix == '#') {
      if (!entities?.hashtags || !entities.hashtags.length) return
      tags = entities.hashtags
    }

    if (prefix == '$') {
      if (!entities?.cashtags || !entities.cashtags.length) return
      tags = entities.cashtags
    }

    let wrappedText = this.formattedText
    tags
      // Handle edge cases where one tag is substring of another
      // e.g. #Hello #HelloExample
      .sort((a, b) => b.tag.length - a.tag.length)
      .forEach((tag) => {
        const regex = new RegExp(`\\${prefix}${tag.tag}\\b`, 'ig')
        wrappedText = wrappedText.replace(regex, (match) => `<span>${match}</span>`)
      })
    this.formattedText = wrappedText
  }
}
