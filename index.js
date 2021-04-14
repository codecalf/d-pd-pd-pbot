const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

async function playSound(channel) {
	const connection = await channel.join()
	const dispatcher = connection.play("./doep.mp3");
}

bot.on("voiceStateUpdate", (oldMemberState, newMemberState) => {
	const oldMemberChannel = oldMemberState.channel;
	const newMemberChannel = newMemberState.channel;

	if (oldMemberChannel == undefined) {
		//User joins Channel
		playSound(newMemberChannel);
	} else if (newMemberChannel == undefined) {
		//User leaves Channel
	} else {
		//User changes Channel
		playSound(newMemberChannel);
	}
});
bot.login(config.token);
