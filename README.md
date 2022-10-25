# JDRssDownloader

JDownloader 2 is a great tool, but since V1 has been missing a way to automatically download from RSS feeds, and filter downloads to only download what you want, in my case 720p HEVC files, MeGusta rips by preference.

I have put together this simple project to allow me to do that, people may find useful.

- Automatically check an RSS feed and send to JDownloader
- Uses MyJDownloader API to allow running on separate system
- Local file cache of RSS feed
- Specify time to check RSS feed
- Specify time to check file cache to send links to JDownloader
- Ability to add multiple shows to check for
- Ability to check for different qualities per show you are looking for
- Ability to turn OFF only HEVC search

# Configuration

There is a `config-sample.json` file that needs to be renamed to `config.json`, after this you can update it with your required settings.

- JDUserName - Your MyJDownloader Username
- JDPassword - Your MyJDownloader Password
- AdminPassword - Password to be set for the WebUI
- WebUIPort - Port for the WebUI to run on
- RSSFeed - The url to the rss feed you want to watch (Only tested with - rlsbb)
- RSSFeedRefreshMins - How often to poll your rss feed down to local file cache
- JDPostLinksMins - How often to check your file cache for your shows and send found links to JDownloader
- Autostart - Tells JDownloader to add and start the downloads straight away (true/false)
- OnlyHEVC - If false, this will download any files that it finds on the post that matches the quality (true/false)
- TelegramBot - Set to true if you wish to have updates sent via telegramBot
- TelegramBotID - Set this to the id you recieve from TheBotFather
- TelegramChatID - Chat or Group ID for the bot to send messages to
- Shows - This needs to be a comma separated list of json objects of the show and quality you want to check for.

An example shown below

```
{
    "JDUserName": "User",
    "JDPassword": "Pass",
    "AdminPassword":"",
    "WebUIPort": 3100,
    "RSSFeed": "https://mypage.com/feed/",
    "RSSFeedRefreshMins": 10,
    "JDPostLinksMins": 180,
    "Autostart": false,
    "OnlyHEVC": true,
    "TelegramBot": true,
    "TelegramBotID":"",
    "TelegramChatID":123456789,
    "Shows": [
        {
            "Name": "Obi-Wan Kenobi",
            "Quality": "1080"
        },
        {
            "Name": "Taskmaster",
            "Quality": "720"
        }
    ]
}
```

# Running

## Release Version

Either download the version on the releases, as well as the `config-sample.json` and run execute, this is the simplest way, but may not be the latest code, and will not run in the background

## Source Version

You will need NodeJS installed, then you can checkout this repo.

For basic usage you can just navigate into the folder and run -

- `npm i` to install the requirements.
- `node JDRssDownloader.js` This will execute the process and add the links if they are found.

My suggestion would be to use pm2 so it can run "in the background"

# Issues

Not alot of testing has gone into this, and I threw it together in a few hours, and only for my use case, so there are bound to be issues, please open them and let me know if you find any.

# Future

I have some ideas to make this a bit smarter and I want to add the ability to look at multiple RSS feeds, this seems quite easy, and I will do in the next couple of weeks.

# Thanks

Thank for all the people who made any of the modules that I used to create this.
