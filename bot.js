const tmi = require("tmi.js");
const got = require("got");
const res = require("./chatters.json");

const chatters = []
  .concat(res.chatters.vips)
  .concat(res.chatters.moderators)
  .concat(res.chatters.broadcaster)
  .concat(res.chatters.viewers);

const opts = {
  identity: {
    username: "botadeu",
    password: "",
  },
  channels: ["lluan__", "viiicc_"],
};

const client = new tmi.client(opts);

const onMessageHandler = (channel, userstate, message, self) => {
  if (self) {
    return;
  }
  const comando = message.trim();
  if (comando.includes("&ping")) {
    client.say(channel, `catTongue pong`);
    console.log("ping '-'", message);
  }
  if (comando.includes("&add")) {
    const canal = message.replace("&add", "").trim();
    client.join(canal);
  }
  if (comando.includes("&massping")) {
    const mensagem = message.replace("&massping", "").trim();
    chatters.map((nome) => client.say(channel, `${nome} ${mensagem}`));
  }
  if (comando.includes("tchau botadeu")) {
    client.say(channel, "peepoHappier tchau!");
  }
  if (comando.includes("&mod")) {
    const canal = message.replace("&mod", "").trim();
    client.say(channel, `/mod ${canal}`);
  }
};

const onConnectedHandler = (addr, port) => {
  console.log(`conectei ao ${addr}:${port}`);
};

client.on("message", onMessageHandler);
client.on("connect", onConnectedHandler);

client.connect();
