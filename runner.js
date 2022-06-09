const { feedUpdater } = require('./FeedUpdater')
const { filterFeed } = require('./FeedFilter')

setInterval(feedUpdater, 600000);
setInterval(filterFeed, 18000000);