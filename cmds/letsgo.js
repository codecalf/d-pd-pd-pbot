const fs = require("fs");
module.exports.run = async (bot, msg, args) => {
	if(args[0] !== "go") return;
	const voice = msg.member.voice;
	
	

		const connection = await voice.channel?.join();
		const dispatcher = connection?.play("./audiofiles/letsgo.mp3");


	
};

module.exports.info = {
	name: "let's"
}
