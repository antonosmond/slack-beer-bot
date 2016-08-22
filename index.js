"use strict";

let botkit = require("botkit");

if (!process.env.SLACK_API_TOKEN) {
  throw new Error("Missing environment variable: SLACK_API_TOKEN");
}

let controller = botkit.slackbot({
  debug: false
});

controller.spawn({
  token: process.env.SLACK_API_TOKEN
}).startRTM(function(err) {
  if (err) { throw err; }
});

controller.hears(["beer"], ["ambient"], function(bot, message) {
  bot.api.users.list({}, (err, data) => {
    if (err) { throw err; }
    let members = data.members.filter(m => {
      return m.name !== "slackbot" && m.deleted === false && m.is_bot === false;
    });
    let user = members[Math.floor(Math.random() * members.length)];
    bot.reply(message, {
      username: "BeerBot",
      text: `Yeah! ${user.real_name} said they're buying! :grinning:`,
      icon_emoji: ":beers:",
    });
  });
});
