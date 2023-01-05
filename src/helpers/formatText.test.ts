// import { TextFormatter } from './formatText'
// import tweets from '../../../../tests/data/tweets.json'
// import { type TweetV2 } from 'twitter-api-v2'

// describe(`TextFormatter`, () => {
//   let formatter: TextFormatter

//   describe('wrapTags()', () => {
//     beforeEach(() => {
//       formatter = new TextFormatter(tweets.hashtags.data as unknown as TweetV2)
//     })

//     it(`should wrap all hashtags in a span and preserve casing`, () => {
//       const formattedText = formatter.format()
//       expect(formattedText).toMatch(`<span>#GTA</span>`)
//       expect(formattedText).toMatch(`<span>#GTAV</span>`)
//       expect(formattedText).toMatch(`<span>#GTA5</span>`)
//       expect(formattedText).toMatch(`<span>#GTAOnline</span>`)
//       expect(formattedText).toMatch(`<span>#RockstarGames</span>`)
//     })

//     it(`should wrap cashtags in span and preserve casing`, () => {
//       formatter = new TextFormatter(tweets.cashtags.data as unknown as TweetV2)
//       const formattedText = formatter.format()
//       expect(formattedText).toMatch(`<span>$UBER</span>`)
//       expect(formattedText).toMatch(`<span>$M</span>`)
//       expect(formattedText).toMatch(`<span>$TSLA</span>`)
//     })
//   })

//   describe(`wrapUrls()`, () => {
//     beforeEach(() => {
//       formatter = new TextFormatter(tweets.urls.data as unknown as TweetV2)
//     })

//     it(`should replace twitter urls with display urls`, () => {
//       const formattedText = formatter.format()
//       expect(formattedText).toMatch(tweets.urls.data.entities!.urls[0].display_url)
//     })

//     it(`should wrap every url in a span`, () => {
//       const formattedText = formatter.format()
//       expect(formattedText).toMatch(
//         `<span>${tweets.urls.data.entities!.urls[0].display_url}</span>`
//       )
//     })
//   })

//   describe('wrapMentions()', () => {
//     beforeEach(() => {
//       formatter = new TextFormatter(tweets.mentions.data as unknown as TweetV2)
//     })

//     it(`should wrap all mentions in a span and preserve casing`, () => {
//       const formattedText = formatter.format()
//       expect(formattedText).toMatch(`<span>@Cristiano</span>`)
//       expect(formattedText).toMatch(`<span>@AlNassrFC</span>`)
//     })
//   })

//   describe('findTrailingUrls()', () => {
//     it(`should correctly return url at the end of a tweet`, () => {
//       formatter = new TextFormatter(tweets.trailingUrls.data as unknown as TweetV2)
//       const trailingUrl = formatter.findTrailingUrl()
//       expect(trailingUrl).toBe(tweets.trailingUrls.data.entities.urls[1])
//     })

//     it(`should return undefined if no urls are found`, () => {
//       formatter = new TextFormatter(tweets.basic.data)
//       const trailingUrl = formatter.findTrailingUrl()
//       expect(trailingUrl).toBeUndefined()
//     })
//   })

//   describe('removeTrailingUrls()', () => {
//     beforeEach(() => {
//       formatter = new TextFormatter(tweets.trailingUrls.data as unknown as TweetV2)
//     })

//     it(`should recursively remove trailing urls`, () => {
//       const formattedText = formatter.format()
//       expect(formattedText).not.toMatch('https://t.co/FYFGN958sZ')
//       expect(formattedText).not.toMatch('https://t.co/3IbwvzD7o7')
//     })
//   })

//   describe(`formatSpecialCharacters()`, () => {
//     beforeEach(() => {
//       formatter = new TextFormatter(tweets.specialCharacters.data)
//     })

//     it(`should correctly parse ampersands`, () => {
//       const formattedText = formatter.format()
//       expect(formattedText).toBe(
//         'AHH...Stahhp. I coulda dropped mah A&W Root Beer, Cherry Pie, and Coca-Cola Life'
//       )
//     })
//   })

//   describe('censorProfanity()', () => {
//     it(`should remove profanity if censorProfanity setting is enabled`, () => {
//       formatter = new TextFormatter(tweets.profanity.data as unknown as TweetV2, {
//         censorProfanity: true,
//       })
//       const formattedText = formatter.format()
//       expect(formattedText).toBe(
//         `This is like the Armageddon of football games. Technically not great and there’s no plot at all but s**t it’s entertaining.`
//       )
//     })

//     it(`should not remove profanity if censorProfanity setting is disabled`, () => {
//       formatter = new TextFormatter(tweets.profanity.data as unknown as TweetV2, {
//         censorProfanity: false,
//       })
//       const formattedText = formatter.format()
//       expect(formattedText).toBe(tweets.profanity.data.text)
//     })
//   })
// })
