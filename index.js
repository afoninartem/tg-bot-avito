const token = "5139123473:AAFWfcXbXUXG99kg4xwaTmJvG1t5e_GSVMI";
const TelegramApi = require("node-telegram-bot-api");
const bot = new TelegramApi(token, { polling: true });
bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/help", description: "Инструкция по эксплуатации" },
  { command: "/saved", description: "Сохраненные объявления" },
  { command: "/detecting", description: "Активные подписки" },
  { command: "/deleteall", description: "Удалить все подписки" },
  // { command: "/whoami", description: "Проверить свой логин" },
]);
const buttons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Ваши подписки", callback_data: "1" }, { text: "Инструкция", callback_data: "2" }],
      [{ text: "Сохраненные объявления", callback_data: "3" }],
      [{ text: "Удалить все подписки", callback_data: "4" }],
      // [],
    ],
  }),
};

const start = () => {
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
    if (text === "/detecting") {
      return bot.sendMessage(chatId, "Вы подписались:");
    }
    if (text === "/deleteall") {
      return bot.sendMessage(chatId, "Точно удалить все подписки?");
    }
    return bot.sendMessage(
      chatId,
      "Пожалуйста, воспользуйтесь доступными командами."
    );
  });
};

bot.on("callback_query", msg => {
  console.log(msg)
})

start();
