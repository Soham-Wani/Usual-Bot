//https://discord.com/api/oauth2/authorize?client_id=928874082756345917&permissions=275146861639&scope=bot
const mySecret = process.env['DISCORD_TOKEN'];
const Discord = require('discord.js');
const client = new Discord.Client({
	intents: ["GUILD_MESSAGES", "GUILDS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"],
	partials: ['CHANNEL']
});
const keep_alive = require('./keep_alive.js');
const {
	MessageEmbed
} = require('discord.js');
let prefix = ",";
client.on('ready', () => {
	console.log('Live! Yay!');
	client.user.setActivity("For ,info", {
		type: "WATCHING"
	});
});
client.login(process.env.DISCORD_TOKEN);
process.on('unhandledRejection', error => {
	console.error('err');
});
/* Bad words */
client.on("message", async message => {
	const user = message.author;
	var _0x2d55 = ["\x66\x75\x63\x6B", "\x64\x69\x63\x6B", "\x61\x73\x73", "\x62\x69\x74\x63\x68", "\x77\x61\x6E\x6B", "\x70\x75\x73\x73\x79", "\x63\x75\x6E\x74", "\x6E\x69\x67\x67\x65\x72", "\x6E\x69\x67\x67\x61", "\x74\x69\x74\x74\x69\x65\x73", "\x74\x69\x64\x64\x69\x65\x73", "\x63\x6F\x63\x6B", "\x62\x6F\x6E\x65\x72", "\x63\x75\x6D", "\x62\x75\x6D", "\x73\x65\x78", "\x7A\x68\x61\x74\x75", "\x7A\x61\x76\x61\x64\x79\x61", "\x6C\x61\x75\x64\x79\x61", "\x6C\x61\x76\x64\x79\x61", "\x62\x6F\x6F\x62", "\x70\x65\x6E\x69\x73", "\x76\x61\x67\x69\x6E\x61", "\x67\x61\x6E\x64", "\x63\x68\x6F\x74", "\x63\x68\x75\x74", "\x62\x68\x6F\x73\x61\x64", "\x70\x6F\x72\x6E", "\x63\x69\x62\x61\x69", "\x73\x74\x66\x75", "\x77\x74\x66", "\x77\x68\x6F\x72\x65", "\x76\x69\x72\x67\x69\x6E", "\x62\x75\x74\x74", "\x73\x75\x63\x6B\x65\x72", "\x61\x6E\x61\x6C", "\uD83D\uDD95"];
	let blacklisted = [_0x2d55[0], _0x2d55[1], _0x2d55[2], _0x2d55[3], _0x2d55[4], _0x2d55[5], _0x2d55[6], _0x2d55[7], _0x2d55[8], _0x2d55[9], _0x2d55[10], _0x2d55[11], _0x2d55[12], _0x2d55[13], _0x2d55[14], _0x2d55[15], _0x2d55[16], _0x2d55[17], _0x2d55[18], _0x2d55[19], _0x2d55[20], _0x2d55[21], _0x2d55[22], _0x2d55[23], _0x2d55[24], _0x2d55[25], _0x2d55[26], _0x2d55[27], _0x2d55[28], _0x2d55[29], _0x2d55[30], _0x2d55[31], _0x2d55[32], _0x2d55[33], _0x2d55[34], _0x2d55[35], _0x2d55[36]]
	let foundInText = false;
	if(message.content.length < 17) {
		for(var i in blacklisted) {
			if(message.content.toLowerCase().replace(/[^a-z]/g, "").replace(/ /g, "").includes(blacklisted[i].toLowerCase())) foundInText = true;
		}
	} else if(message.content.length >= 17) {
		for(var i in blacklisted) {
			if(message.content.toLowerCase().replace(/[^a-z]/g, "").includes(blacklisted[i].toLowerCase())) foundInText = true;
		}
	}
	if(message.content.includes('🖕')) foundInText = true;
	if(message.content.toLowerCase().includes('pass') || message.content.toLowerCase().includes('g and') || message.content.toLowerCase().includes('as s') || message.content.toLowerCase().includes('wassup')) foundInText = false;
	if(foundInText === true && message.channel.type !== 'DM') {
		message.delete().catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
		console.log(message.content, message.author);
		if(message.author.id !== client.user.id) {
			message.channel.send(`${user} You can't send that here!`);
		}
		if(!message.author.bot) {
			message.author.send(`You can be banned for using bad or profane words or emojis on servers. Don\'t use them, ever!`);
		}
	} else if(foundInText === true && message.channel.type == 'DM') {
		message.channel.send(`You will abuse me personally now?\nಠ﹏ಠ`)
	}
	/* No DMs */
	else if(message.channel.type == 'DM' && message.author.id !== client.user.id && foundInText == false && !message.content.startsWith(prefix)) {
		message.channel.send("I can\'t talk to everyone on DMs. Please get on a Discord server to talk to me!")
	} else if(message.channel.type == 'DM' && message.author.id !== client.user.id && foundInText == false && message.content.startsWith(prefix)) {
		message.channel.send("You can't use commands in DMs. Please get on a Discord server to use commands!")
	}
if (message.content.includes(`clean`)) {
        const Channel = message.channel;
        const Messages = await Channel.messages.fetch({limit: 100});

        Messages.forEach(msg => {
            for(var i in blacklisted) {
			if(message.content.toLowerCase().replace(/[^a-z]/g, "").includes(blacklisted[i].toLowerCase())) msg.delete()
		}
        });

        message.channel.send("ed");
    };
});
/* Moderation */
client.on("message", async message => {
	if(message.content.includes('discord.gg') || message.content.includes('http') || message.content.includes('discordapp.com/invite/')) {
		if(!message.member.permissions.has("ADMINISTRATOR") && !(message.channel.name.includes("promot") || message.channel.name.includes("advertise")) && message.channel.type !== 'DM') {
			message.delete().catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
			message.channel.send(`Nah! You can't promote here!`);
		}
	}
	/* Stats */
	else if(message.author.id === '912297357339660309' && message.content == `${prefix}stats` && message.channel.type !== 'DM') {
		message.channel.send({
			embeds: [
				new MessageEmbed().setDescription(client.guilds.cache.map(g => `Guild Name: ${g.name}\nTotal Members: ${g.members.cache.size}\nGuild ID: ${g.id}`).join('\n\n'))
			]
		});
	}
});
/* General */
client.on("message", async message => {
	if(message.author.id !== client.user.id && message.channel.type !== 'DM' && !message.author.bot) {
		if(message.content.toLowerCase() == "hi" || message.content.toLowerCase() == "hello" || message.content.toLowerCase() == "hello!" || message.content.toLowerCase() == "hi!" || message.content.toLowerCase() == "hey!" || message.content.toLowerCase() == "hey" || message.content.toLowerCase() == "heya!" || message.content.toLowerCase() == "heya" || message.content.toLowerCase() == "namaste" || message.content.toLowerCase() == "hola" || message.content.toLowerCase() == "hola!" || message.content.toLowerCase() == "namaste!") {
			message.channel.send(`Hello!`)
		} else if(message.content.toLowerCase() == "yo" || message.content.toLowerCase() == "sup") {
			message.channel.send(`Sup?`)
		} else if(message.content.toLowerCase().startsWith("ping")) {
			message.channel.send(`Pong!`)
		} else if(message.content.toLowerCase().startsWith("pong")) {
			message.channel.send(`Ping!`)
		} else if(message.content.toLowerCase().includes("bruh")) {
			message.channel.send(`Big Bruh Momento`)
		} else if(message.content.toLowerCase().includes("haha") || message.content.toLowerCase().includes("huehue") || message.content.toLowerCase().includes("lol")) {
			message.channel.send(`Lol!`)
		} else if(message.content.toLowerCase().includes("bye")) {
			message.channel.send(`Bye!`)
		} else if(message.content.toLowerCase() === `i hate you`) {
			message.channel.send(`Sorry but I consider my haters, my motivators!`)
		} else if(message.content.toLowerCase().includes(`are you mad`)) {
			message.channel.send(`Nah bro! I am not you!`)
		}
	}
});
/* Commands */
client.on("message", async message => {
	if(message.author.id == client.user.id || message.channel.type == 'DM' || message.author.bot || !message.content.startsWith(prefix)) return;
	//wrong
	if(message.content.startsWith(`${prefix} `)) {
		message.channel.send(`Please type a valid command!`)
	}
	//help
	else if(message.content.toLowerCase() === `${prefix}help`) {
		const helpEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Help (${prefix}help)`).setDescription(`Current list of commands: \n${prefix}help\n${prefix}info\n${prefix}spam\n\nFor admins:\n${prefix}kick\n${prefix}timeout`);
		message.channel.send({
			embeds: [helpEmbed]
		}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
	}
	//info
	else if(message.content.toLowerCase() === `${prefix}info`) {
		const infoEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Info (${prefix}info)`).setDescription(`I am currently a basic Discord bot, but I will soon come up with jokes, facts and much more! \n\nFeatures:\n• Easy to understand.\n• Wide variety of innovative commands.\n• Hassle free moderation.\n• Deletes bad or profane words.\n• Never kicks, bans or timeouts members on its own.\nMore exciting features yet to come...\n\nType \"${prefix}help\" to get a list of commands.`);
		message.channel.send({
			embeds: [infoEmbed]
		}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
	}
	//spam
	else if(message.content.toLowerCase().startsWith(`${prefix}spam`) && !message.content.includes('@') && message.channel.name.includes("spam") && message.content !== `${prefix}spam`) {
		const args = message.content.split(" ");
		if(args[0] == `${prefix}spam`) {
			if(!args[1]) return message.channel.send(`Please type a number, type \"${prefix}spam\" to know more.`);
			if(isNaN(args[1])) return message.channel.send(`Please type a number, type ",spam" to know more.`);
			if(args[1] > 20) return message.channel.send(`Please type realistic numbers (<20), type \"${prefix}spam\" to know more.`);
			if(!args[2]) return message.channel.send(`Also include what should I spam, type \"${prefix}spam\" to know more.`);
			const amountOfMessages = args[1];
			let messageToSend = [...args];
			messageToSend.shift();
			messageToSend.shift();
			messageToSend = messageToSend.join(" ");
			for(let i = 0; i < amountOfMessages; i++) {
				message.channel.send(messageToSend);
			}
		}
	} else if(message.content.toLowerCase().startsWith(`${prefix}spam`) && message.author.id === '912297357339660309' && message.content.includes('@') && message.channel.name.includes("spam")) {
		message.channel.send('Haha, nice try!')
	} else if(message.content.toLowerCase().startsWith(`${prefix}spam`) && !message.channel.name.includes("spam")) {
		message.channel.send(`Nah! You can't spam here!`)
	} else if(message.content.toLowerCase().startsWith(`${prefix}spam`) && !message.content.includes('@') && message.channel.name.includes("spam") && message.content == `${prefix}spam`) {
		const spamEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Spam (${prefix}spam)`).setDescription(`Using the ${prefix}spam command correctly will spam any message upto 20 times.\n\nTyping \"${prefix}spam 10 hello\" will spam 10 hellos.`);
		message.channel.send({
			embeds: [spamEmbed]
		}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
	}
	//kick
	else if(message.content.toLowerCase().startsWith(`${prefix}kick`) && message.content.includes('@') && message.content !== `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR")) {
		const args = message.content.split(" ");
		if(args[0] == `${prefix}kick`) {
			if(!args[2]) return message.channel.send(`Please include a valid reason. Type \"${prefix}kick\" to know more.`);
			let messageToSend = [...args];
			messageToSend.shift();
			messageToSend.shift();
			messageToSend = messageToSend.join(" ");
			var member = message.mentions.members.first();
			member.kick().then((member) => {
				message.channel.send("Bye Bye! " + member.displayName + " has been successfully kicked!");
				const channeltosend = member.guild.channels.cache.find(channel => channel.name.includes('log'));
				channeltosend.send(member.displayName + " was kicked from the server for: " + messageToSend);
			}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Kick Members `."));
		}
	} else if(message.content.toLowerCase().startsWith(`${prefix}kick`) && !message.content.includes('@') && message.content !== `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR")) {
		message.channel.send(`Please include whom to kick? Type \"${prefix}kick\" to know more.`)
	} else if(message.content == `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR")) {
		const kickEmbed = new MessageEmbed().setColor('#0000ff').setTitle(`Kick (${prefix}kick)`).setDescription(`Using the ${prefix}kick command allows people with Administrator permissions to kick members easily.\n\nTyping \"${prefix}kick @person reason\" will kick that person for mentioned reason.`);
		message.channel.send({
			embeds: [kickEmbed]
		}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
	} else if(message.content.toLowerCase().startsWith(`${prefix}kick`) && !message.member.permissions.has("ADMINISTRATOR")) {
		message.channel.send("You thought you could do that? You need Administrator permissions lol!")
	}
	//timeout
	else if(message.content.toLowerCase().startsWith(`${prefix}timeout`) && message.content.includes('@') && message.content !== `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR")) {
		const args = message.content.split(" ");
		if(args[0] == `${prefix}kick`) {
			if(isNaN(args[2]) || !args[2]) return message.channel.send(`Please include a valid time period. Type \"${prefix}timeout\" to know more.`);
			if(!args[3]) return message.channel.send(`Please include a valid reason. Type \"${prefix}timeout\" to know more.`);
			let time = args[2] * 60 * 1000;
			let messageToSend = [...args];
			messageToSend.shift();
			messageToSend.shift();
			messageToSend.shift();
			messageToSend = messageToSend.join(" ");
			var member = message.mentions.members.first();
			member.timeout(time, messageToSend).then((member) => {
				message.channel.send("Bye Bye! " + `${member}` + " has been successfully timed out for " + args[2] + " minutes!");
				const channeltosend = member.guild.channels.cache.find(channel => channel.name.includes('log'));
				channeltosend.send(`${member}` + " was timedout from the server for " + args[2] + " minutes for: " + messageToSend);
			}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Timeout Members `."));
		}
	} else if(message.content.toLowerCase().startsWith(`${prefix}timeout`) && !message.content.includes('@') && message.content !== `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR")) {
		message.channel.send(`Please include whom to timeout? Type \"${prefix}timeout\" to know more.`)
	} else if(message.content == `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR")) {
		const timeoutEmbed = new MessageEmbed().setColor('#0000ff').setTitle(`Timeout (${prefix}timeout)`).setDescription(`Using the ${prefix}timeout command allows people with Administrator permissions to timeout members easily.\n\nTyping \"${prefix}timeout @person time reason\" will kick that person for mentioned time (in minutes) for mentioned reason.`);
		message.channel.send({
			embeds: [timeoutEmbed]
		}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
	} else if(message.content.toLowerCase().startsWith(`${prefix}timeout`) && !message.member.permissions.has("ADMINISTRATOR")) {
		message.channel.send("You thought you could do that? You need Administrator permissions lol!")
	}
});
//Trying New Game
