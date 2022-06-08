# JDRssDownloader

JDownloder 2 is a great tool, but since V1 has been missing a way to automatically download from RSS feeds, and filter downloads to only download HEVC files.

I have put together this simple project to allow me to do that, people may find useful.

You will need NodeJS installed, then you can checkout this repo.

## Configuration
There is a ``config-sample.json`` file that needs to be renamed to ``config.json``, after this you can update it with your required settings.

- JDUserName - Your MyJDownloader Username
- JDPassword - Your MyJdownloader Password
- RSSFeed - The url to the rss feed you want to watch (Only tested with - https://rlsbb.cc/feed/)
- Quality - Resolution of the download you want (720/1080/2160)
- Autostart - Tells JDownloader to add and start the downloads straight away (true/false)
- Shows - This needs to be a comma seperated list of the shows you want to check for.

## Execution
For basic usage you can just navigate into the folder and run -
- ``npm i`` to install the requirements.
- ``node main.js`` This will execute the process and add the links if they are found.

For advanced usage, you can set it to run every hour or something using a cron job, thats what I have setup.

## Issues

Not alot of testing has gone into this, and I threw it together today in about 2 hours, so there are bound to be issues, please open them and let me know if you find any.
