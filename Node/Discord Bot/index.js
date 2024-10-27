const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// task, add the url shortener into this

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    message.reply({
      content: `Generating the url for: ` + url,
    });
  }
  if (!message.author.bot) {
    message.reply({
      content: "Hi from bot",
    });
  }
});

client.on("interactionCreate", (interaction) => {
  interaction.reply({
    content: "Pong macha",
  });
});
client.login(process.env.DISCORD_API_KEY);
