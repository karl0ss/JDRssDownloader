# JDRssDownloader

JDownloader 2 is a great tool, but since V1 has been missing a way to automatically download from RSS feeds, and filter downloads to only download HEVC files.

I have put together this simple project to allow me to do that, people may find useful.

- Automatically check RSS feed and send to JDownloader
- Uses MyJDownloader API to allow running on separate system
- Local file cache of RSS feed
- Specify time to check RSS feed
- Specify time to check file cache to send links to JDownloader
- Ability to add multiple shows to check for
- Ability to check for different qualities per show you are looking for
  

You will need NodeJS installed, then you can checkout this repo.

## Configuration
There is a ``config-sample.json`` file that needs to be renamed to ``config.json``, after this you can update it with your required settings.

- JDUserName - Your MyJDownloader Username
- JDPassword - Your MyJDownloader Password
- RSSFeed - The url to the rss feed you want to watch (Only tested with - https://rlsbb.cc/feed/)
- RSSFeedRefreshMins - How often to poll your rss feed down to local file cache
- JDPostLinksMins": How often to check your file cache for your shows and send found links to JDownloader
- Autostart - Tells JDownloader to add and start the downloads straight away (true/false)
- Shows - This needs to be a comma separated list of json objects of the show and quality you want to check for.

An example shown below

```
{
    "JDUserName": "User",
    "JDPassword": "Pass",
    "RSSFeed": "https://rlsbb.cc/feed/",
    "RSSFeedRefreshMins": 10,
    "JDPostLinksMins": 180,
    "Autostart": false,
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

## Execution
For basic usage you can just navigate into the folder and run -
- ``npm i`` to install the requirements.
- ``node JDRssDownloader.js`` This will execute the process and add the links if they are found.

My suggestion would be to use pm2 so it can run "in the background"

## Issues

Not alot of testing has gone into this, and I threw it together today in about 2 hours, so there are bound to be issues, please open them and let me know if you find any.
