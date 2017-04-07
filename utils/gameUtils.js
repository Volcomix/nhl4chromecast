export const formatFeed = ({ feedName, mediaFeedType, callLetters }) => {
  if (feedName) {
    return feedName
  } else {
    let name = mediaFeedType[0] + mediaFeedType.slice(1).toLowerCase()
    if (callLetters) {
      return `${name} (${callLetters})`
    } else {
      return name
    }
  }
}