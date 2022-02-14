const token = "5139123473:AAFWfcXbXUXG99kg4xwaTmJvG1t5e_GSVMI";
const TelegramApi = require("node-telegram-bot-api");
const bot = new TelegramApi(token, { polling: true });

// const scrapped = require("./scrapper");
// console.log(scrapped())


const answer = {
  manual: "Здесь будет инструкция",
  saved: "Вы сохранили:",
  follow: "Вы подписались:",
  deleteall: "Точно удалить все подписки?",
};

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/help", description: "Инструкция по эксплуатации" },
  { command: "/saved", description: "Сохраненные объявления" },
  { command: "/follow", description: "Активные подписки" },
  { command: "/deleteall", description: "Удалить все подписки" },
]);
const buttons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Ваши подписки", callback_data: "follow" },
        { text: "Инструкция", callback_data: "manual" },
      ],
      [{ text: "Сохраненные объявления", callback_data: "saved" }],
      [{ text: "Удалить все подписки", callback_data: "deleteall" }],
    ],
  }),
};

const start = () => {
  bot.on("polling_error", (msg) => console.log(msg));
  bot.on("message", async (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
      return bot.sendMessage(
        chatId,
        `Приветствую тебя, ${msg.from.first_name} ${msg.from.last_name}. Этот бот поможет тебе отслеживать объявления на Avito.`,
        buttons
      );
    }
    if (text === "/help") {
      return bot.sendMessage(chatId, "Здесь будет инструкция");
    }
    if (text === "/saved") {
      return bot.sendMessage(chatId, "Вы сохранили:");
    }
    if (text === "/follow") {
      return bot.sendMessage(chatId, "Вы подписались:");
    }
    if (text === "/deleteall") {
      return bot.sendMessage(chatId, "Точно удалить все подписки?");
    }
    // if (text.includes("11")) return bot.sendMessage(chatId, "Это условие работает")
    if (msg.entities[0].type === "url") {
      console.log(`бот получил ссылку ${text}`)

      if (text.includes("www.avito.ru")) {
        // console.log(`ССЫЛКА НА АВИТО - ${text}`)
        module.exports = text;

      } else {
        return bot.sendMessage(chatId, "Это не Авито. Пожалуйста, дайте ссылку на Авито.")
      }
    } else {
      return bot.sendMessage(chatId, "Это не ссылка")
    }
    // return bot.sendMessage(
    //   chatId,
    //   "Пожалуйста, воспользуйтесь доступными командами."
    // );
  });
};

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  console.log(data, answer[data]);
  bot.sendMessage(chatId, answer[data]);
});

start();
