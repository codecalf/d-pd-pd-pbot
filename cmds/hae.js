const fs = require("fs");
module.exports.run = async (bot, msg, args) => {
	const voice = msg.member.voice;
	
	const path = "./audiofiles/hae/";
	let pathsToAudio = [];
	fs.readdir(path, async (err, files) => {
		let oggFiles = files.filter(f => f.split(".").pop() == "ogg");
		pathsToAudio = oggFiles.map(i => path + i);
	
		const audioIndex = Math.floor(Math.random() * pathsToAudio.length);
		const pathToAudio = pathsToAudio[audioIndex];

		const connection = await voice.channel?.join();
		const dispatcher = connection?.play(pathToAudio);
	});


	
};

module.exports.info = {
	name: "hä"
}
