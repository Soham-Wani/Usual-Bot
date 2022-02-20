//https://discord.com/api/oauth2/authorize?client_id=928874082756345917&permissions=275146861639&scope=bot
//TD1: get logs from https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
//TD2: guild work for add, subtract
//TD3: New log system for kick, timeout
//TD4: ban comm.
const mySecret = process.env['DISCORD_TOKEN'];
const Discord = require('discord.js');
const client = new Discord.Client({
	intents: ["GUILD_MESSAGES", "GUILDS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"],
	partials: ['CHANNEL']
});
var _0x874b = ["\x66\x75\x63\x6B", "\x64\x69\x63\x6B", "\x61\x73\x73", "\x62\x69\x74\x63\x68", "\x77\x61\x6E\x6B", "\x70\x75\x73\x73\x79", "\x63\x75\x6E\x74", "\x6E\x69\x67\x67\x65\x72", "\x6E\x69\x67\x67\x61", "\x74\x69\x74\x74\x69\x65\x73", "\x74\x69\x64\x64\x69\x65\x73", "\x63\x6F\x63\x6B", "\x62\x6F\x6E\x65\x72", "\x63\x75\x6D", "\x62\x75\x6D", "\x73\x65\x78", "\x7A\x68\x61\x74\x75", "\x7A\x68\x61\x76", "\x6C\x61\x75\x64\x79\x61", "\x6C\x61\x76\x64\x79\x61", "\x62\x6F\x6F\x62", "\x70\x65\x6E\x69\x73", "\x76\x61\x67\x69\x6E\x61", "\x67\x61\x6E\x64", "\x63\x68\x6F\x74", "\x63\x68\x75\x74", "\x62\x68\x6F\x73\x61\x64", "\x70\x6F\x72\x6E", "\x63\x69\x62\x61\x69", "\x73\x74\x66\x75", "\x77\x74\x66", "\x77\x68\x6F\x72\x65", "\x76\x69\x72\x67\x69\x6E", "\x62\x75\x74\x74", "\x73\x75\x63\x6B\x65\x72", "\x61\x6E\x61\x6C", "\x70\x65\x64\x6F", "\x67\x61\x79", "\x6C\x65\x73\x62\x69\x61\x6E", "\x6C\x65\x73\x62\x6F", "\x63\x68\x6F\x64", "\x6D\x61\x64\x61\x72"];
let blacklisted = [_0x874b[0], _0x874b[1], _0x874b[2], _0x874b[3], _0x874b[4], _0x874b[5], _0x874b[6], _0x874b[7], _0x874b[8], _0x874b[9], _0x874b[10], _0x874b[11], _0x874b[12], _0x874b[13], _0x874b[14], _0x874b[15], _0x874b[16], _0x874b[17], _0x874b[18], _0x874b[19], _0x874b[20], _0x874b[21], _0x874b[22], _0x874b[23], _0x874b[24], _0x874b[25], _0x874b[26], _0x874b[27], _0x874b[28], _0x874b[29], _0x874b[30], _0x874b[31], _0x874b[32], _0x874b[33], _0x874b[34], _0x874b[35], _0x874b[36], _0x874b[37], _0x874b[38], _0x874b[39], _0x874b[40], _0x874b[41]]
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
	if(foundInText === true && message.channel.type !== 'DM' && !message.channel.nsfw) {
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
});
/* Moderation */
client.on("message", async message => {
	if(message.content.includes('.gg') || message.content.includes('http') || message.content.includes('.com')) {
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
		} else if(message.content.toLowerCase().includes("yee") || message.content.toLowerCase().includes("wee")) {
			message.channel.send(`stop`)
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
				const helpEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Help (${prefix}help)`).setDescription(`**Current list of commands:** \n${prefix}help\n${prefix}info\n${prefix}spam\n\n**For admins:**\n${prefix}clean\n${prefix}kick\n${prefix}timeout`);
				message.channel.send({
					embeds: [helpEmbed]
				}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
			}
			//info
			else if(message.content.toLowerCase() === `${prefix}info`) {
				const infoEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Info (${prefix}info)`).setDescription(`I am currently a basic Discord bot, but I will soon come up with jokes, facts and much more! Type __${prefix}help__ to get a list of commands. \n\n**Features:**\n• Easy to understand.\n• Wide variety of innovative commands.\n• Hassle free moderation.\n• Deletes bad or profane words.\n• Never kicks, bans or timeouts members on its own.\nMore exciting features yet to come...\n\n**Credits:**\nDeveloper and owner: Pseudonymous123#5921`);
				message.channel.send({
					embeds: [infoEmbed]
				}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
			}
			//clean
			else if(message.content.toLowerCase() == `${prefix}clean links` && !message.author.bot && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
				const Channel = message.channel;
				const Messages = await Channel.messages.fetch({
					limit: 100
				});
				Messages.forEach(msg => {
					if(msg.content.includes('discord.gg') || msg.content.includes('http') || msg.content.includes('discordapp.com/invite/')) {
						if(!msg.member.permissions.has("ADMINISTRATOR") && !(msg.channel.name.includes("promot") || msg.channel.name.includes("advertise")) && msg.channel.type !== 'DM') {
							msg.delete().catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
						}
					}
				});
				message.channel.send("Previous 100 messages have been cleaned!");
			} else if(message.content == `${prefix}clean words` && !message.author.bot && !message.channel.nsfw && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
				const Channel = message.channel;
				const Messages = await Channel.messages.fetch({
					limit: 100
				});
				Messages.forEach(msg => {
					for(var i in blacklisted) {
						if(msg.content.toLowerCase().replace(/[^a-z]/g, "").includes(blacklisted[i].toLowerCase())) {
							msg.delete().catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
						}
					}
				});
				message.channel.send("Previous 100 messages have been cleaned!");
			} else if(message.content.toLowerCase() === `${prefix}clean` && !message.author.bot && message.member.permissions.has("ADMINISTRATOR") && message.channel.type !== 'DM') {
				const cleanEmbed = new MessageEmbed().setColor('#0c0c66').setTitle(`Clean (${prefix}clean)`).setDescription(`Using this command, administrators can easily clean previous messages making them free from bad words or unwanted links sent by members other than the admin. \n\nTyping __${prefix}clean links__ will delete all links from previous 100 messages except for the ones sent by the admin.\nTyping __${prefix}clean words__ will delete all bad words from previous 100 messages.`);
				message.channel.send({
					embeds: [cleanEmbed]
				}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
			} else if(message.content.toLowerCase().startsWith(`${prefix}clean`) && !message.member.permissions.has("ADMINISTRATOR")) {
				message.channel.send("You can't do that either. You need Administrator permissions!")
			}
			//spam
			else if(message.content.toLowerCase().startsWith(`${prefix}spam`) && !message.content.includes('@') && message.channel.name.includes("spam") && message.content !== `${prefix}spam`) {
				const args = message.content.split(" ");
				if(args[0] == `${prefix}spam`) {
					if(!args[1]) return message.channel.send(`Please type a number, type __${prefix}spam__ to know more.`);
					if(isNaN(args[1])) return message.channel.send(`Please type a number, type __${prefix}spam__ to know more.`);
					if(args[1] > 20) return message.channel.send(`Please type realistic numbers (<20), type __${prefix}spam__ to know more.`);
					if(!args[2]) return message.channel.send(`Also include what should I spam, type __${prefix}spam__ to know more.`);
					const amountOfMessages = args[1];
					let messageToSend = [...args];
					messageToSend.shift();
					messageToSend.shift();
					messageToSend = messageToSend.join(" ");
					for(let i = 0; i < amountOfMessages; i++) {
						message.channel.send(messageToSend);
						spammed.add(message.author.id);
						setTimeout(() => {
							spammed.delete(message.author.id);
						}, 2 * 60 * 1000);
					}
				} else if(message.content.toLowerCase().startsWith(`${prefix}spam`) && message.author.id === '912297357339660309' && message.content.includes('@') && message.channel.name.includes("spam")) {
					message.channel.send('Haha, nice try!')
				} else if(message.content.toLowerCase().startsWith(`${prefix}spam`) && !message.channel.name.includes("spam")) {
					message.channel.send(`Nah! You can't spam here!`)
				} else if(message.channel.name.includes("spam") && message.content == `${prefix}spam`) {
					const spamEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Spam (${prefix}spam)`).setDescription(`Using the ${prefix}spam command correctly will spam any message upto 20 times.\n\nTyping __${prefix}spam 10 hello__ will spam 10 hellos.`);
					message.channel.send({
						embeds: [spamEmbed]
					}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
				}
				//kick
				else if(message.content.toLowerCase().startsWith(`${prefix}kick`) && message.content.includes('@') && message.content !== `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id !== '912297357339660309') {
					const args = message.content.split(" ");
					if(args[0] == `${prefix}kick`) {
						if(!args[2]) return message.channel.send(`Please include a valid reason. Type __${prefix}kick__ to know more.`);
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
					message.channel.send(`Please include whom to kick? Type __${prefix}kick__ to know more.`)
				} else if(message.content.toLowerCase() == `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR")) {
					const kickEmbed = new MessageEmbed().setColor('#0c0c66').setTitle(`Kick (${prefix}kick)`).setDescription(`Using the ${prefix}kick command allows people with Administrator permissions to kick members easily.\n\nTyping __${prefix}kick @person reason__ will kick that person for mentioned reason.`);
					message.channel.send({
						embeds: [kickEmbed]
					}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
				} else if(message.content.toLowerCase().startsWith(`${prefix}kick`) && !message.member.permissions.has("ADMINISTRATOR")) {
					message.channel.send("You thought you could do that? You need Administrator permissions lol!")
				} else if(message.content.toLowerCase().startsWith(`${prefix}kick`) && message.content.includes('@') && message.content !== `${prefix}kick` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id == '912297357339660309') {
					message.channel.send("I can't betray my master!")
				}
				//timeout
				else if(message.content.toLowerCase().startsWith(`${prefix}timeout`) && message.content.includes('@') && message.content !== `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR")) {
					const args = message.content.split(" ");
					if(args[0] == `${prefix}timeout`) {
						if(isNaN(args[2]) || !args[2]) return message.channel.send(`Please include a valid time period. Type __${prefix}timeout__ to know more.`);
						if(!args[3]) return message.channel.send(`Please include a valid reason. Type __${prefix}timeout__ to know more.`);
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
					message.channel.send(`Please include whom to timeout? Type __${prefix}timeout__ to know more.`)
				} else if(message.content.toLowerCase() == `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR")) {
					const timeoutEmbed = new MessageEmbed().setColor('#0c0c66').setTitle(`Timeout (${prefix}timeout)`).setDescription(`Using the ${prefix}timeout command allows people with Administrator permissions to timeout members easily.\n\nTyping __${prefix}timeout @person time reason__ will kick that person for mentioned time (in minutes) for mentioned reason.`);
					message.channel.send({
						embeds: [timeoutEmbed]
					}).catch(error => message.channel.send("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
				} else if(message.content.toLowerCase().startsWith(`${prefix}timeout`) && !message.member.permissions.has("ADMINISTRATOR")) {
					message.channel.send("You thought you could do that? You need Administrator permissions lol!")
				} else if(message.content.toLowerCase().startsWith(`${prefix}timeout`) && message.content.includes('@') && message.content !== `${prefix}timeout` && message.member.permissions.has("ADMINISTRATOR") && message.mentions.members.first().id == '912297357339660309') {
					message.channel.send("I can't betray my master!")
				}
			});
