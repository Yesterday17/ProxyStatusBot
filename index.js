const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const SERVER_IP = process.env.SERVER_IP;
const CHECKER_ADDR = process.env.CHECKER_ADDR;
const DD_PADDING =
  true &&
  process.env.DD_PADDING &&
  process.env.DD_PADDING.toUpperCase() !== "OFF" &&
  process.env.DD_PADDING.toUpperCase() !== "FALSE";
const MTPROXY_PASS = process.env.MTPROXY_PASS;

const ADMIN_ID = process.env.ADMIN_ID;
const GROUP_ID = process.env.GROUP_ID;
const SUPER_GROUP_ID = process.env.SUPER_GROUP_ID;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const MTProxyAddr = port =>
  `https://t.me/proxy?server=${SERVER_IP}&port=${port}&secret=${
    DD_PADDING ? "dd" : ""
  }${MTPROXY_PASS}`;

// Matches "/proxy"
bot.onText(/\/proxy/, (msg, match) => {
  fetch(CHECKER_ADDR)
    .then(data => data.json())
    .then(json => {
      if (msg.chat.type === "private" && msg.chat.id.toString() !== ADMIN_ID)
        return;
      if (msg.chat.type === "group" && msg.chat.id.toString() !== GROUP_ID)
        return;
      if (
        msg.chat.type === "supergroup" &&
        msg.chat.id.toString() !== SUPER_GROUP_ID
      )
        return;

      let min = undefined;
      // const blocked = [];
      for (let port in json.ports) {
        if (!json.ports[port].ping) {
          // blocked.push(port);
          continue;
        }
        if (min === undefined || json.ports[port].avg < min.avg) {
          min = json.ports[port];
          min.port = port;
        }
      }
      bot.sendMessage(
        msg.chat.id,
        `Ping: ${json.ping ? "可用" : "不可用"}\n推荐端口: ${
          min.port
        }\n测试平均延迟: ${min.avg}\nMTProxy链接: ${MTProxyAddr(min.port)}`
      );
    });
});
