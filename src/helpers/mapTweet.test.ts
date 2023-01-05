// import {
//   MediaObjectV2,
//   TweetEntityUrlV2,
//   TweetV2,
//   TweetV2SingleResult,
//   TwitterV2IncludesHelper,
//   UserV2,
// } from 'twitter-api-v2'
// import { mapAuthor, mapMedia, mapTweet, mapUrls } from './mapTweet'
// import tweets from '../../../../tests/data/tweets.json'
// import { type TweetOptions } from '../twitterApi'
// import { formatDateAndTime } from './mapTweet'

// // TODO: Add more robust tests

// describe('Tweet mapping', () => {
//   describe('mapTweet()', () => {
//     let basicTweet: TweetV2
//     let options: TweetOptions

//     beforeEach(() => {
//       basicTweet = tweets.basic.data
//       options = { censorProfanity: false }
//     })

//     it(`should correctly format date and time`, () => {
//       const result = mapTweet(basicTweet, options)
//       if (!basicTweet.created_at) throw new Error(`Invalid tweet: created_at is required`)
//       expect(result.createdAtTime).toBe(
//         formatDateAndTime(new Date(basicTweet.created_at)).time
//       )
//       expect(result.createdAtDate).toBe(
//         formatDateAndTime(new Date(basicTweet.created_at)).date
//       )
//     })
//   })

//   describe('mapAuthor()', () => {
//     let author: UserV2

//     beforeEach(() => {
//       const includes = new TwitterV2IncludesHelper(tweets.hashtags)
//       author = includes.author(tweets.hashtags.data as unknown as TweetV2) as UserV2
//     })

//     it(`should replace profile image url with a bigger version`, () => {
//       const result = mapAuthor(author)
//       expect(result.profileImageUrl).toMatch(/_bigger/)
//       expect(result.profileImageUrl).not.toMatch(/_normal/)
//     })

//     it('should populate all expected fields and types', () => {
//       const result = mapAuthor(author)
//       expect(result).toHaveProperty('id')
//       expect(result).toHaveProperty('name')
//       expect(result).toHaveProperty('profileImageUrl')
//       expect(result).toHaveProperty('username')
//       expect(result).toHaveProperty('verified')

//       expect(result.id).toBeTypeOf('string')
//       expect(result.profileImageUrl).toBeTypeOf('string')
//       expect(result.username).toBeTypeOf('string')
//       expect(result.name).toBeTypeOf('string')
//       expect(result.verified).toBeTypeOf('boolean')
//     })

//     it('should trim any extra spaces in name and username', () => {
//       author.username = `  ${author.username}  `
//       author.name = `  ${author.name}  `
//       const result = mapAuthor(author)
//       expect(result.name.charAt(0)).not.toBe(' ')
//       expect(result.name.charAt(-1)).not.toBe(' ')
//       expect(result.username.charAt(0)).not.toBe(' ')
//       expect(result.username.charAt(-1)).not.toBe(' ')
//     })
//   })

//   describe('mapMedia()', () => {
//     let media: MediaObjectV2[]

//     beforeEach(() => {
//       const includes = new TwitterV2IncludesHelper(
//         tweets.twoPhotos as unknown as TweetV2SingleResult
//       )
//       media = includes.medias(
//         tweets.twoPhotos.data as unknown as TweetV2
//       ) as MediaObjectV2[]
//     })

//     it(`should map all provided media object`, () => {
//       const result = mapMedia(media)
//       expect(result).toHaveLength(media.length)
//     })

//     it('should populate all expected fields and types', () => {
//       const result = mapMedia(media)
//       const firstItem = result?.[0]
//       expect(firstItem).toHaveProperty('url')
//       expect(firstItem).toHaveProperty('type')
//       expect(firstItem).toHaveProperty('width')
//       expect(firstItem).toHaveProperty('height')

//       expect(firstItem?.url).toBeTypeOf('string')
//       expect(['video', 'photo', 'animated_gif']).toContain(firstItem?.type)
//       expect(firstItem?.width).toBeTypeOf('number')
//       expect(firstItem?.height).toBeTypeOf('number')
//     })
//   })

//   describe('mapUrls()', () => {
//     let urls: TweetEntityUrlV2[]

//     beforeEach(() => {
//       urls = tweets.urls.data.entities.urls as unknown as TweetEntityUrlV2[]
//     })

//     it(`should map all provided media object`, () => {
//       const result = mapUrls(urls)
//       expect(result).toHaveLength(urls.length)
//     })

//     it('should populate all expected fields and types', () => {
//       const result = mapUrls(urls)
//       const firstItem = result?.[0]
//       expect(firstItem).toHaveProperty('url')
//       expect(firstItem).toHaveProperty('start')
//       expect(firstItem).toHaveProperty('end')
//       expect(firstItem).toHaveProperty('fullUrl')
//       expect(firstItem).toHaveProperty('images')
//       expect(firstItem).toHaveProperty('title')
//       expect(firstItem).toHaveProperty('description')

//       expect(firstItem?.url).toBeTypeOf('string')
//       expect(firstItem?.start).toBeTypeOf('number')
//       expect(firstItem?.end).toBeTypeOf('number')
//     })
//   })
// })
