const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const https = require("https");
const fs = require("fs");

//Loading commands
bot.commands = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);
	
	let jsFiles = files.filter(f => f.split(".").pop() === "js");
	if (jsFiles.length == 0) return console.log("No cmds loaded");
	
	jsFiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i+1}: ${f} loaded!`);	
		bot.commands.set(props.info.name, props);
	});
});

async function playSound(channel, file_path) {
	const connection = await channel.join()
	const dispatcher = connection.play(file_path);
}

bot.on("ready", async () => {
	console.log("bot ready");
});

bot.on("message", async msg => {
	if(msg.author.bot) return; 
	
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

	const messageArray = msg.content.split(" ");
	const command = messageArray[0].slice(bot.commandPrefix.length);
	const args = messageArray.slice(1);

	//if(!msg.content.startsWith(bot.commandPrefix)) return;
	cmd = bot.commands.get(command);
	if(cmd) cmd.run(bot, msg, args);	
});

bot.on("voiceStateUpdate", (oldMemberState, newMemberState) => {
	const oldMemberChannel = oldMemberState.channel;
	const newMemberChannel = newMemberState.channel;

	if (!oldMemberChannel) {
		//User joins Channel
		playSound(newMemberChannel, "./doep.oga");
	} else if (!newMemberChannel) {
		//User leaves Channel
		playSound(oldMemberChannel, "./egal.mp3");
	} else if(newMemberChannel.id != oldMemberChannel.id) {
		//User changes Channel
		playSound(newMemberChannel, "./doep.oga");
	}
});
bot.login(config.token);
