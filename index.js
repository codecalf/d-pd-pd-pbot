const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const https = require("https");

async function playSound(channel) {
	const connection = await channel.join()
	const dispatcher = connection.play("./doep.oga");
}

bot.on("message", async msg => {
	if (msg.author.bot) return;
	if (msg.content.includes("yo momma")) {
		https.get('https://api.yomomma.info/', (response) => {
  			let json = '';

  			// called when a data chunk is received.
  			response.on('data', (chunk) => {
    				json += chunk;
  			});

  			// called when the complete response is received.
  			response.on('end', () => {
				return msg.channel.send(JSON.parse(json).joke);
			});

			}).on("error", (error) => {
  				console.log("Error: " + error.message);
			});
	}
});

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
