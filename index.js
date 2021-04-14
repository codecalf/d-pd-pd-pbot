const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

async function playSound(channel) {
	const connection = await channel.join()
	const dispatcher = connection.play("./doep.oga");
}

bot.on("voiceStateUpdate", (oldMemberState, newMemberState) => {
	const oldMemberChannel = oldMemberState.channel;
	const newMemberChannel = newMemberState.channel;

	if (!oldMemberChannel) {
		//User joins Channel
		playSound(newMemberChannel);
	} else if (!newMemberChannel) {
		//User leaves Channel
	} else if(newMemberChannel.id != oldMemberChannel.id) {
		//User changes Channel
		playSound(newMemberChannel);
	}
});
bot.login(config.token);
