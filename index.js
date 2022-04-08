//https://discord.com/api/oauth2/authorize?client_id=928874082756345917&permissions=275146861639&scope=bot
//TD?: Reply pings
//TDD: sticky messages
//TDD: UPDATE LOGS, URGENT!!!
//TD8: MUSIC, GAW
//TDT: Reaction roles
//TDN: lock unlock, addrole removerole , server locketc.
const mySecret = process.env['DISCORD_TOKEN'];
const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client({
    intents: ["GUILD_MESSAGES", "GUILDS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"],
    partials: ['CHANNEL']
});
const keep_alive = require('./keep_alive.js');
const {
    MessageEmbed
} = require('discord.js');
let prefix = ",";
let me = '912297357339660309';
const spamcooldown = new Set();
const sendcooldown = new Set();
client.on('ready', () => {
    console.log('Live! Yay!');
    client.user.setActivity("For ,info", {
        type: "WATCHING"
    });
});
client.login(process.env.DISCORD_TOKEN);
process.on('unhandledRejection', error => {
    console.error(`${error}`);
});
client.on("guildCreate", guild => {
    const welcomeEmbed = new MessageEmbed().setColor('#0c0c46').setDescription(`Thank you for adding me to ${guild.name}!\n\nMy prefix is\`${prefix}\`. Type \`${prefix}info\` to get started. Also commands don't work in DMs, so don't try them here!\n\nAlso, you can join the official \[Discord server\]\(https://discord.gg/ADm2u27TFs\) for support or just for fun!`);
    guild.fetchAuditLogs({
        type: "BOT_ADD",
        limit: 1
    }).then(log => {
        log.entries.first().executor.send({
            embeds: [welcomeEmbed]
        });
    });
});
client.on("guildMemberAdd", async member => {
    if (member.user.bot) {
        member.guild.channels.cache.find(channel => channel.name.includes('log')).send({
            embeds: [new MessageEmbed().setColor('#00ff00').setDescription(`__` + member.user.tag + `__ was added to the server.`)]
        });
    } else {
        member.guild.channels.cache.find(channel => channel.name.includes('log')).send({
            embeds: [new MessageEmbed().setColor('#00ff00').setDescription(`__` + member.user.tag + `__ joined the server.`)]
        });
    }
});
client.on("guildMemberAdd", async member => {
    member.guild.channels.cache.find(channel => channel.name.includes('welcome')).send({
        embeds: [new MessageEmbed().setColor('#00ff00').setTitle(`Welcome ` + member.user.tag).setDescription(`Hey ${member}! Hope you enjoy!`).setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)]
    });
});
client.on("guildMemberRemove", async member => {
    if (member.user.bot) {
        member.guild.channels.cache.find(channel => channel.name.includes('log')).send({
            embeds: [new MessageEmbed().setColor('#ff0000').setDescription(`__` + member.user.tag + `__ was removed from the server.`)]
        });
    } else {
        member.guild.channels.cache.find(channel => channel.name.includes('log')).send({
            embeds: [new MessageEmbed().setColor('#ff0000').setDescription(`__` + member.user.tag + `__ left the server.`)]
        });
    }
});
client.on("guildMemberRemove", async member => {
    member.guild.channels.cache.find(channel => channel.name.includes('bye')).send({
        embeds: [new MessageEmbed().setColor('#ff0000').setTitle(`Goodbye ` + member.user.tag).setDescription(member.user.tag + ` is no more with us!`).setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256`)]
    });
});
client.on("message", async message => {
    const bot = message.guild.members.cache.get(client.user.id);
    /* No Promotion */
    if (message.content.toLowerCase().includes('http') && message.guild.id == 912957696641228830) {
        if (!message.member.permissions.has("ADMINISTRATOR") && !(message.channel.name.includes("promot") || message.channel.name.includes("advertise")) && message.channel.type !== 'DM' && !message.author.bot) {
            message.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
            message.channel.send(`${message.author} Nah! No links!`);
        }
    }
    /* Pings */
    else if (message.content.includes('<@928874082756345917>') && !message.content.startsWith(`${prefix}`)) {
        const pingEmbed = new MessageEmbed().setColor('#0c0c46').setDescription(`Who pinged me? Anyways, thank you for having me here!\n\nMy prefix is \`${prefix}\`\nType \`${prefix}info\` to get started.\n\n\[Official Discord Server\]\(https://discord.gg/ADm2u27TFs\)\n\[Invite Me\]\(https://discord.com/api/oauth2/authorize?client_id=928874082756345917&permissions=275146861639&scope=bot\)`);
        message.reply({
            embeds: [pingEmbed]
        });
    }
    /* Replies */
    else if (message.channel.name.toLowerCase().includes("usual") && message.author.id !== client.user.id && message.channel.type !== 'DM' && !message.author.bot && !message.content.startsWith(`${prefix}`)) {
        if (message.content.toLowerCase() == "hi" || message.content.toLowerCase() == "hello" || message.content.toLowerCase() == "hello!" || message.content.toLowerCase() == "hi!" || message.content.toLowerCase() == "hey!" || message.content.toLowerCase() == "hey" || message.content.toLowerCase() == "heya!" || message.content.toLowerCase() == "heya" || message.content.toLowerCase() == "namaste" || message.content.toLowerCase() == "hola" || message.content.toLowerCase() == "hola!" || message.content.toLowerCase() == "namaste!") {
            message.reply(`Hello!`)
        } else if (message.content.toLowerCase() == "yo" || message.content.toLowerCase() == "sup") {
            message.reply(`Sup?`)
        } else if (message.content.toLowerCase().startsWith("ping")) {
            message.reply(`Pong!`)
        } else if (message.content.toLowerCase().startsWith("pong")) {
            message.reply(`Ping!`)
        } else if (message.content.toLowerCase().includes("bruh")) {
            message.reply(`Big Bruh Momento`)
        } else if (message.content.toLowerCase().includes("haha") || message.content.toLowerCase().includes("huehue") || message.content.toLowerCase().includes("lol")) {
            message.reply(`Lol!`)
        } else if (message.content.toLowerCase().includes("bye")) {
            message.reply(`Bye!`)
        } else if (message.content.toLowerCase() === `i hate you`) {
            message.reply(`Sorry but I consider my haters, my motivators!`)
        } else if (message.content.toLowerCase().includes(`are you mad`)) {
            message.reply(`Nah bro! I am not you!`)
        } else if (message.content.toLowerCase().includes("yee") || message.content.toLowerCase().includes("wee")) {
            message.reply(`Stop!`)
        }
    }
    /* Commands */
    else if (message.author.id !== client.user.id && message.channel.type !== 'DM' && !message.author.bot && message.content.startsWith(`${prefix}`)) {
        //stats
        if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}stats`) {
            if (message.author.id !== me) return message.reply('You thought you are a dev? Lol! Only devs can use this command.');
            message.channel.send(`${client.user.username}'s Server Count: ${client.guilds.cache.size} Severs`)
            message.channel.send({
                embeds: [
                    new MessageEmbed().setColor('#0000ff').setDescription(client.guilds.cache.map(g => `Guild Name: ${g.name}\nTotal Members: ${g.memberCount}\nGuild ID: ${g.id}`).join('\n\n'))
                ]
            });
            client.guilds.cache.forEach(guild => {
                guild.channels.cache.filter(x => x.type != "category").random().createInvite().then(inv => console.log(`${guild.name} \(${inv.url}\)`));
            });
        }
        //shutdown
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}shutdown`) {
            if (message.author.id !== me) return message.reply('You thought you are a dev? Lol! Only devs can use this command.');
            message.channel.send(`Usual Bot, signing off...`)
            process.exit();
        }
        //help
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}help`) {
            const helpEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Help (\`${prefix}help\`)`).setDescription(`**General (Everyone)** \n\`${prefix}help\n${prefix}info\n${prefix}send\n${prefix}ping\`\n\n**Fun (Everyone)**\n\`${prefix}fact\n${prefix}joke\`\n\n**Moderation (Admins)**\n\`${prefix}setup\n${prefix}delete\n${prefix}slowmode\n${prefix}ban\n${prefix}kick\n${prefix}timeout \(being fixed\)\``);
            message.reply({
                embeds: [helpEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //info
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}info`) {
            const infoEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Info (\`${prefix}info\`)`).setDescription(`I am currently a basic Discord moderation bot, but I will soon come up with jokes, facts, music and much more! Type \`${prefix}help\` to get a list of commands. To get started with moderation, type \`${prefix}setup\`. \n\n**Features:**\n• Easy to understand.\n• Wide variety of innovative commands.\n• Hassle free moderation.\n• Never kicks, bans or timeouts members on its own.\n• Responsive support.\nMore exciting features yet to come...\n\n**Credits:**\nDeveloper and owner: Pseudonymous123#5921`);
            message.reply({
                embeds: [infoEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //send
        else if (message.content.toLowerCase().startsWith(`${prefix}send`)) {
            if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}send`) {
                const sendEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Send (\`${prefix}send\`)`).setDescription(`No one is perfect. Neither am I. Use \`${prefix}send\` command to report bugs, suggest improvements, send ideas for me to my master. Don't send anything except suggestions, reports and bugs. Misusing this command can get you a ban from the bot.\n\nTyping \`${prefix}send message\` will send your message to my master and he will revert to you soon!`);
                message.reply({
                    embeds: [sendEmbed]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            } else {
                if (sendcooldown.has(message.author.id)) return message.reply(`Slow down bud! You have used this command recently. To avoid spam, you can use this command again after some time.`);
                client.users.fetch('912297357339660309', false).then((dev) => {
                    dev.send(message.content + ' by ' + message.author.tag);
                });
                message.reply(`Thank you, your message has been sent!`);
                sendcooldown.add(message.author.id);
                setTimeout(() => {
                    sendcooldown.delete(message.author.id);
                }, 24 * 60 * 60 * 1000);
            }
        }
        //ping
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}ping`) {
            const pingEmbed = new MessageEmbed().setColor('#0000ff').setDescription("**Bot Latency:** " + "`" + `${Date.now() - message.createdTimestamp}ms` + "`" + "\n**API Latency:** `" + `${Math.round(client.ws.ping)}ms` + "`").setFooter(`Bot Latency means time I took to react.\nAPI Latency means time Discord took to send my message.`);
            message.reply({
                embeds: [pingEmbed]
            });
        }
        //fact
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}fact`) {
            axios.get('https://uselessfacts.jsph.pl/random.txt?language=en').then(response => {
                message.reply({
                    embeds: [new MessageEmbed().setColor('#0c0c46').setDescription(response.data + `\n`).setFooter(`Generated by ${prefix}fact command.`)]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            });
        }
        //joke https://geek-jokes.sameerkumar.website/api
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}joke`) {
            axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt&type=single').then(response => {
                message.reply({
                    embeds: [new MessageEmbed().setColor('#0c0c46').setDescription(response.data + `\n`).setFooter(`Generated by ${prefix}joke command. \n(P.S.: Even I don't understand some jokes!)`)]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            });
        }
        //tictactoe
        /* else if (message.content.toLowerCase().startsWith(`${prefix}tictactoe`) || message.content.toLowerCase().startsWith(`${prefix}ttt`)) {
            const args = message.content.split(" ");
            if (!args[1] && args[0].toLowerCase().replace(/ /g, "") == `${prefix}tictactoe`) {
                const tictactoeEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Tic Tac Toe \(\`${prefix}tictactoe\`\)`).setDescription(`Play Tic Tac Toe with your friends!.\n\nTyping \`${prefix}tictactoe @person\` will start a tic Tac Toe game with the mentioned person.\n\nAliases: \`${prefix}ttt\``);
                message.reply({
                    embeds: [tictactoeEmbed]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            } else {
                const opponent = message.mentions.users.first();
                if (message.mentions.members.first().id == `undefined` || !opponent || !message.content.includes(`@`)) return message.reply(`Please enter a valid user to play with!`);
                const {
                    TicTacToe
                } = require('djs-games')
                const game = new TicTacToe({
                    message: message,
                    opponent: opponent,
                    xEmoji: '❌', // The Emote for X
                    oEmoji: '0️⃣', // The Emote for O
                    xColor: 'PRIMARY',
                    oColor: 'PRIMARY', // The Color for O
                    embedDescription: 'Tic Tac Toe', // The Description of the embed
                })
                game.start()
            }
        } */
        //tictactoe
        else if (message.content.toLowerCase().startsWith(`${prefix}tictactoe`) || message.content.toLowerCase().startsWith(`${prefix}ttt`)) {
            const {
                MessageActionRow,
                MessageButton,
                MessageEmbed
            } = require('discord.js');

            class TicTacToe {

                /**
                 * @name TicTacToe
                 * @kind constructor
                 * @param {Object} options options
                 * @param {String} [options.xEmoji] x emoji
                 * @param {any} [options.message] the discord message
                 * @param {String} [options.xColor] x button color
                 * @param {String} [options.oEmoji] o emoji
                 * @param {String} [options.oColor] o button color
                 * @param {String} [options.embedDescription] embedDescription
                 * @param {any} [options.opponent] const opponent = <Message>.mentions.members.first() (NOT CHANGEABLE)
                 */

                constructor(options) {
                    if (!options.xEmoji) throw new TypeError('Missing argument: xEmoji')
                    if (typeof options.xEmoji !== 'string') throw new TypeError('Error: xEmoji must be a string')

                    if (!options.oEmoji) throw new TypeError('Missing argument: oEmoji')
                    if (typeof options.oEmoji !== 'string') throw new TypeError('Error: oEmoji must be a string')

                    if (!options.xColor) throw new TypeError('Missing argument: xColor')
                    if (typeof options.xColor !== 'string') throw new TypeError('Error: xColor must be a string')

                    if (!options.oColor) throw new TypeError('Missing argument: oColor')
                    if (typeof options.oColor !== 'string') throw new TypeError('Error: oColor must be a string')

                    if (!options.opponent) throw new TypeError('Error: Missing argument opponent')

                    if (!options.message) throw new TypeError('Error: Missing argument message')

                    this.message = options.message;
                    this.xEmoji = options.xEmoji
                    this.oEmoji = options.oEmoji
                    this.opponent = options.opponent
                    this.xColor = options.xColor
                    this.oColor = options.oColor
                    this.embedDescription = options.embedDescription
                }
                async start() {
                    let a1 = '⬜'
                    let a2 = '⬜'
                    let a3 = '⬜'
                    let b1 = '⬜'
                    let b2 = '⬜'
                    let b3 = '⬜'
                    let c1 = '⬜'
                    let c2 = '⬜'
                    let c3 = '⬜'

                    function getRandomString(length) {
                        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        var result = '';
                        for (var i = 0; i < length; i++) {
                            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
                        }
                        return result
                    }
                    let a11 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let a22 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let a33 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let b11 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let b22 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let b33 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let c11 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let c22 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
                    let c33 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))

                    let player = 0;
                    const author = this.message.author.id
                    const member = this.opponent
                    const authorName = this.message.author.username

                    const midDuel = new Set()

                    if (midDuel.has(author)) {
                        return this.message.channel.send(`You're currently in a duel`)
                    } else if (midDuel.has(member.id)) {
                        return this.message.channel.send(`<@${member.id}> is currently in a duel`)
                    }
                    if (member.id === this.message.client.user.id) {
                        return this.message.channel.send("You can't duel me lmfao")
                    }
                    const gameData = [{
                            member: this.message.author,
                            em: this.xEmoji,
                            color: this.xColor
                        },
                        {
                            member: member,
                            em: this.oEmoji,
                            color: this.oColor
                        }
                    ];
                    let Embed = new MessageEmbed()
                        .setDescription(this.embedDescription || `🎮 ${authorName} VS ${this.opponent.username} 🎮`)
                        .setColor(3426654)
                    let A1 = new MessageButton()
                        .setCustomId(a11)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let A2 = new MessageButton()
                        .setCustomId(a22)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let A3 = new MessageButton()
                        .setCustomId(a33)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let B1 = new MessageButton()
                        .setCustomId(b11)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let B2 = new MessageButton()
                        .setCustomId(b22)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let B3 = new MessageButton()
                        .setCustomId(b33)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let C1 = new MessageButton()
                        .setCustomId(c11)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let C2 = new MessageButton()
                        .setCustomId(c22)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    let C3 = new MessageButton()
                        .setCustomId(c33)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                    this.message.channel.send({
                        embeds: [Embed],
                        components: [{
                                type: 1,
                                components: [
                                    A1, A2, A3
                                ]
                            },
                            {
                                type: 1,
                                components: [
                                    B1, B2, B3
                                ]
                            },
                            {
                                type: 1,
                                components: [
                                    C1, C2, C3
                                ]
                            },
                        ]
                    }).then(async (msg) => {
                        midDuel.add(author)
                        midDuel.add(member.id)
                        const gameFilter = m => m.user.id === this.message.author.id || m.user.id === this.opponent.id

                        const gameCollector = msg.createMessageComponentCollector({
                            gameFilter,
                            componentType: 'BUTTON'
                        });



                        gameCollector.on('collect', async btn => {
                            if (btn.customId == a11 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        a1 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    A1 = new MessageButton()
                                        .setCustomId(a11)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == a22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        a2 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    A2 = new MessageButton()
                                        .setCustomId(a22)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == a33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        a3 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    A3 = new MessageButton()
                                        .setCustomId(a33)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == b11 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {

                                    try {
                                        b1 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    B1 = new MessageButton()
                                        .setCustomId(b11)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == b22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        b2 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    B2 = new MessageButton()
                                        .setCustomId(b22)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == b33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        b3 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    B3 = new MessageButton()
                                        .setCustomId(b33)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == c11 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        c1 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    C1 = new MessageButton()
                                        .setCustomId(c11)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == c22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        c2 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    C2 = new MessageButton()
                                        .setCustomId(c22)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == c33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        c3 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                            this.message.channel.send(`Tie!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    C3 = new MessageButton()
                                        .setCustomId(c33)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })
                                }
                            } else {
                                return btn.reply({
                                    content: "Wait for Opponent!",
                                    ephemeral: true
                                })
                            }


                        })

                    })
                }

            }
        }
        //spam
        else if (message.content.toLowerCase().startsWith(`${prefix}spam`)) {
            const spamEmbed = new MessageEmbed().setColor('#eeeeee').setDescription(`Sorry! This command is being deprecated for abuse.`);
            message.reply({
                embeds: [spamEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //setup
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}setup`) {
            const setupEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Setup (\`${prefix}setup\`)`).setDescription(`Being optional, by doing the following steps, you can get most out of Usual Bot:\n\n• Having a channel with the word 'welcome' in its name will allow the bot to automatically post welcome messages in that channel.\n\n• Similarly, having a channel with the word 'bye' in its name will allow the bot to automatically post leaving messages in that channel.\n\n• You can have welcome and leaving messages in one channel only if the channel name has both the words 'welcome' and 'bye'.\n\n• Having a channel with the word 'log' in its name will allow the bot to automatically maintain a log of events happening on the server.\n\n• To make the bot interactive with members, you can make a channel with the word 'usual' in it. The bot can mildly interact with members like replying to the word 'Hi' with 'Hello!' and so on!\n\n• Use the commands from \`${prefix}help\` and you are good to go! You can contact developers for any help by using \`${prefix}send\` command.`);
            message.reply({
                embeds: [setupEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //slowmode
        else if (message.content.toLowerCase().startsWith(`${prefix}slowmode`) || message.content.toLowerCase().startsWith(`${prefix}sm`) || message.content.toLowerCase().startsWith(`${prefix}slow`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`MANAGE_CHANNELS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`MANAGE_CHANNELS`)) {
                    const args = message.content.split(" ");
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}slowmode`) {
                        const slowmodeEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Slowmode (\`${prefix}slowmode\`)`).setDescription(`Using the \`${prefix}slowmode\` command allows to change slowmode of a channel easily.\n\nTyping \`${prefix}slowmode 5\` will change the slowmode to 5 seconds. It can be set to a maximum of 21600 seconds.\n\nAliases: \`${prefix}sm\` \`${prefix}slow\``);
                        message.reply({
                            embeds: [slowmodeEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 0) return message.reply(`Please include a valid time in seconds. Type \`${prefix}slowmode\` to know more.`);
                        var duration = args[1];
                        var member = message.author;
                        message.channel.setRateLimitPerUser(duration).then((member) => {
                            message.reply(`Slowmode of the channel successfully set to \`${duration}\` seconds.`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`Slowmode of channel  __<#${message.channel.id}>__ set to __${duration}__ seconds by __` + message.author.tag + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Manage Channels\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Manage Channels\` permission.`);
            }
        }
        //delete
        else if (message.content.toLowerCase().startsWith(`${prefix}delete`) || message.content.toLowerCase().startsWith(`${prefix}del`) || message.content.toLowerCase().startsWith(`${prefix}purge`)) {
            if (message.channel.name.includes("log")) return message.reply(`I create history, I don't support in deleting history. I cannot delete logs!`);
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`MANAGE_MESSAGES`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`MANAGE_MESSAGES`)) {
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}delete`) {
                        const deleteEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Delete \(\`${prefix}delete\`\)`).setDescription(`Using this command, moderators can easily delete upto 100 previous messages for any reason (I won't judge!). And don't worry, this command will not delete pinned messages!\n\nTyping \`${prefix}delete 20\` will delete 20 previous messages.\n\nAliases: \`${prefix}del\` \`${prefix}purge\``);
                        message.reply({
                            embeds: [deleteEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        const Channel = message.channel;
                        const args = message.content.split(" ");
                        if (args[1] > 100 || isNaN(args[1]) || args[1] == 0) return message.reply(`Please type realistic numbers \(<100 and not 0\) or a number atleast. Type \`${prefix}delete\` to know more.`);
                        if (args[1] == 1) return message.reply(`Come on! You really want me to delete a single message?`);
                        const Messages = await Channel.messages.fetch({
                            limit: args[1]
                        }).then(fetched => {
                            const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                            message.channel.bulkDelete(notPinned, true);
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
                        message.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__${args[1]}__ messages deleted from __<#${message.channel.id}>__ by __` + message.author.tag + `__`);
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Manage Messages\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the or \`Manage Messages\` permissions.`);
            }
        }
        //ban
        else if (message.content.toLowerCase().startsWith(`${prefix}ban`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`BAN_MEMBERS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`BAN_MEMBERS`)) {
                    const args = message.content.split(" ");
                    if (!args[1] && args[0].toLowerCase().replace(/ /g, "") == `${prefix}ban`) {
                        const banEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Ban \(\`${prefix}ban\`\)`).setDescription(`Using the \`${prefix}ban\` command you can ban members easily.\n\nTyping \`${prefix}ban @person reason\` will ban that person for mentioned reason.`);
                        message.reply({
                            embeds: [banEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (message.mentions.members.first().id == `undefined` || !message.mentions.members.first() || !message.content.includes(`@`)) return message.reply(`Please enter a valid user to ban! Type \`${prefix}ban\` to know more.`);
                        if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                        if (message.mentions.members.first().id == message.author.id) return message.reply(`You cannot ban yourself idiot!`);
                        if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.reply(`You cannot ban someone with a role higher than or equal to you.`);
                        if (!message.mentions.members.first().bannable) return message.reply(`Sorry! I cannot ban a person with a role higher than or equal to me.`);
                        if (!args[2]) return message.reply(`Please include a valid reason. Type \`${prefix}ban\` to know more.`);
                        let messageToSend = [...args];
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend = messageToSend.join(" ");
                        var member = message.mentions.members.first();
                        member.ban({
                            reason: messageToSend
                        }).then((member) => {
                            message.reply(`Bye Bye! __` + member.user.tag + `__ has been successfully banned!`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ has been banned from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Ban Members\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Ban Members\` permission.`);
            }
        }
        //kick
        else if (message.content.toLowerCase().startsWith(`${prefix}kick`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`KICK_MEMBERS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`KICK_MEMBERS`)) {
                    const args = message.content.split(" ");
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}kick`) {
                        const kickEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Kick (\`${prefix}kick\`)`).setDescription(`Using the \`${prefix}kick\` command you can kick members easily.\n\nTyping \`${prefix}kick @person reason\` will kick that person for mentioned reason.`);
                        message.reply({
                            embeds: [kickEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (message.mentions.members.first().id == `undefined` || !message.mentions.members.first() || !message.content.includes(`@`)) return message.reply(`Please enter a valid user to kick! Type \`${prefix}kick\` to know more.`);
                        if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                        if (message.mentions.members.first().id == message.author.id) return message.reply(`You cannot kick yourself idiot!`);
                        if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.reply(`You cannot kick someone with a role higher than or equal to you.`);
                        if (!message.mentions.members.first().bannable) return message.reply(`Sorry! I cannot kick a person with a role higher than or equal to me.`);
                        if (!args[2]) return message.reply(`Please include a valid reason. Type \`${prefix}kick\` to know more.`);
                        let messageToSend = [...args];
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend = messageToSend.join(" ");
                        var member = message.mentions.members.first();
                        member.kick({
                            reason: messageToSend
                        }).then((member) => {
                            message.reply(`Bye Bye! __` + member.user.tag + `__ has been successfully kicked!`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ has been kicked from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Kick Members\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Kick Members\` permission.`);
            }
        }
        //timeout
        else if (message.content.toLowerCase().startsWith(`${prefix}timeout`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`TIMEOUT_MEMBERS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`TIMEOUT_MEMBERS`)) {
                    const args = message.content.split(" ");
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}timeout`) {
                        const timeoutEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Timeout (\`${prefix}timeout\`)`).setDescription(`Using the \`${prefix}timeout\` command allows you to timeout members easily.\n\nTyping \`${prefix}timeout @person time reason\` will timeout that person for mentioned time (in minutes) for mentioned reason.`);
                        message.reply({
                            embeds: [timeoutEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (message.mentions.members.first().id == `undefined` || !message.mentions.members.first() || !message.content.includes(`@`)) return message.reply(`Please enter a valid user to timeouy! Type \`${prefix}timeout\` to know more.`);
                        if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                        if (message.mentions.members.first().id == message.author.id) return message.reply(`You cannot timeout yourself idiot!`);
                        if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.reply(`You cannot timeout someone with a role higher than or equal to you.`);
                        if (!message.mentions.members.first().bannable) return message.reply(`Sorry! I cannot timeout a person with a role higher than or equal to me.`);
                        if (isNaN(args[2]) || !args[2]) return message.reply(`Please include a valid time period. Type \`${prefix}timeout\` to know more.`);
                        if (!args[3]) return message.reply(`Please include a valid reason. Type \`${prefix}timeout\` to know more.`);
                        let time = args[2] * 60 * 1000;
                        let messageToSend = [...args];
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend = messageToSend.join(" ");
                        var member = message.mentions.members.first();
                        member.timeout(time, messageToSend).then((member) => {
                            message.reply(`Bye Bye! __${member}__ has been successfully timedout!`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ has been timedout from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Timeout Members\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Timeout Members\` permission.`);
            }
        }
    }
    /* Dank Memer */
    else if (message.channel.name.includes("buying")) {
        if (message.content.toLowerCase().replace(/ /g, "").includes(`selling`) || message.content.toLowerCase().replace(/ /g, "").includes(`buyingcash`)) {
            message.delete().then((msg) => msg.channel.send(`${user} Selling ads don't belong here!`));
        }
    } else if (message.channel.name.includes("selling")) {
        if (message.content.toLowerCase().replace(/ /g, "").includes(`buying`) || message.content.toLowerCase().replace(/ /g, "").includes(`sellingcash`) || message.content.toLowerCase().replace(/ /g, "").includes(`sellingmycash`)) {
            message.delete().then((msg) => msg.channel.send(`${user} Buying ads don't belong here!`));
        }
    }
});
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == b22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        b2 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    B2 = new MessageButton()
                                        .setCustomId(b22)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == b33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        b3 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    B3 = new MessageButton()
                                        .setCustomId(b33)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == c11 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        c1 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    C1 = new MessageButton()
                                        .setCustomId(c11)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == c22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        c2 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    C2 = new MessageButton()
                                        .setCustomId(c22)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })

                                }
                            } else if (btn.customId == c33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                    btn.reply('That spot is already occupied.')
                                } else {
                                    try {
                                        c3 = gameData[player].em
                                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                                            player = (player + 1) % 2;
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {

                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                                            this.message.channel.send(`${gameData[player].member} wins!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                            this.message.channel.send(`Tie!`)
                                            gameCollector.stop()
                                            midDuel.delete(author)
                                            midDuel.delete(member.id)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                    player = (player + 1) % 2;
                                    C3 = new MessageButton()
                                        .setCustomId(c33)
                                        .setStyle(gameData[player].color)
                                        .setEmoji(gameData[player].em)
                                        .setDisabled()
                                    msg.edit({
                                        embeds: [Embed],
                                        components: [{
                                                type: 1,
                                                components: [
                                                    A1, A2, A3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    B1, B2, B3
                                                ]
                                            },
                                            {
                                                type: 1,
                                                components: [
                                                    C1, C2, C3
                                                ]
                                            },
                                        ]
                                    })
                                }
                            } else {
                                return btn.reply({
                                    content: "Wait for Opponent!",
                                    ephemeral: true
                                })
                            }


                        })

                    })
                }

            }
        }
        //spam
        else if (message.content.toLowerCase().startsWith(`${prefix}spam`)) {
            const spamEmbed = new MessageEmbed().setColor('#eeeeee').setDescription(`Sorry! This command is being deprecated for abuse.`);
            message.reply({
                embeds: [spamEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //setup
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}setup`) {
            const setupEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Setup (\`${prefix}setup\`)`).setDescription(`Being optional, by doing the following steps, you can get most out of Usual Bot:\n\n• Having a channel with the word 'welcome' in its name will allow the bot to automatically post welcome messages in that channel.\n\n• Similarly, having a channel with the word 'bye' in its name will allow the bot to automatically post leaving messages in that channel.\n\n• You can have welcome and leaving messages in one channel only if the channel name has both the words 'welcome' and 'bye'.\n\n• Having a channel with the word 'log' in its name will allow the bot to automatically maintain a log of events happening on the server.\n\n• To make the bot interactive with members, you can make a channel with the word 'usual' in it. The bot can mildly interact with members like replying to the word 'Hi' with 'Hello!' and so on!\n\n• Use the commands from \`${prefix}help\` and you are good to go! You can contact developers for any help by using \`${prefix}send\` command.`);
            message.reply({
                embeds: [setupEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //slowmode
        else if (message.content.toLowerCase().startsWith(`${prefix}slowmode`) || message.content.toLowerCase().startsWith(`${prefix}sm`) || message.content.toLowerCase().startsWith(`${prefix}slow`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`MANAGE_CHANNELS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`MANAGE_CHANNELS`)) {
                    const args = message.content.split(" ");
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}slowmode`) {
                        const slowmodeEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Slowmode (\`${prefix}slowmode\`)`).setDescription(`Using the \`${prefix}slowmode\` command allows to change slowmode of a channel easily.\n\nTyping \`${prefix}slowmode 5\` will change the slowmode to 5 seconds. It can be set to a maximum of 21600 seconds.\n\nAliases: \`${prefix}sm\` \`${prefix}slow\``);
                        message.reply({
                            embeds: [slowmodeEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 0) return message.reply(`Please include a valid time in seconds. Type \`${prefix}slowmode\` to know more.`);
                        var duration = args[1];
                        var member = message.author;
                        message.channel.setRateLimitPerUser(duration).then((member) => {
                            message.reply(`Slowmode of the channel successfully set to \`${duration}\` seconds.`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`Slowmode of channel  __<#${message.channel.id}>__ set to __${duration}__ seconds by __` + message.author.tag + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Manage Channels\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Manage Channels\` permission.`);
            }
        }
        //delete
        else if (message.content.toLowerCase().startsWith(`${prefix}delete`) || message.content.toLowerCase().startsWith(`${prefix}del`) || message.content.toLowerCase().startsWith(`${prefix}purge`)) {
            if (message.channel.name.includes("log")) return message.reply(`I create history, I don't support in deleting history. I cannot delete logs!`);
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`MANAGE_MESSAGES`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`MANAGE_MESSAGES`)) {
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}delete`) {
                        const deleteEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Delete \(\`${prefix}delete\`\)`).setDescription(`Using this command, moderators can easily delete upto 100 previous messages for any reason (I won't judge!). And don't worry, this command will not delete pinned messages!\n\nTyping \`${prefix}delete 20\` will delete 20 previous messages.\n\nAliases: \`${prefix}del\` \`${prefix}purge\``);
                        message.reply({
                            embeds: [deleteEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        const Channel = message.channel;
                        const args = message.content.split(" ");
                        if (args[1] > 100 || isNaN(args[1]) || args[1] == 0) return message.reply(`Please type realistic numbers \(<100 and not 0\) or a number atleast. Type \`${prefix}delete\` to know more.`);
                        if (args[1] == 1) return message.reply(`Come on! You really want me to delete a single message?`);
                        const Messages = await Channel.messages.fetch({
                            limit: args[1]
                        }).then(fetched => {
                            const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                            message.channel.bulkDelete(notPinned, true);
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
                        message.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__${args[1]}__ messages deleted from __<#${message.channel.id}>__ by __` + message.author.tag + `__`);
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Manage Messages\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the or \`Manage Messages\` permissions.`);
            }
        }
        //ban
        else if (message.content.toLowerCase().startsWith(`${prefix}ban`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`BAN_MEMBERS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`BAN_MEMBERS`)) {
                    const args = message.content.split(" ");
                    if (!args[1] && args[0].toLowerCase().replace(/ /g, "") == `${prefix}ban`) {
                        const banEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Ban \(\`${prefix}ban\`\)`).setDescription(`Using the \`${prefix}ban\` command you can ban members easily.\n\nTyping \`${prefix}ban @person reason\` will ban that person for mentioned reason.`);
                        message.reply({
                            embeds: [banEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (message.mentions.members.first().id == `undefined` || !message.mentions.members.first() || !message.content.includes(`@`)) return message.reply(`Please enter a valid user to ban! Type \`${prefix}ban\` to know more.`);
                        if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                        if (message.mentions.members.first().id == message.author.id) return message.reply(`You cannot ban yourself idiot!`);
                        if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.reply(`You cannot ban someone with a role higher than or equal to you.`);
                        if (!message.mentions.members.first().bannable) return message.reply(`Sorry! I cannot ban a person with a role higher than or equal to me.`);
                        if (!args[2]) return message.reply(`Please include a valid reason. Type \`${prefix}ban\` to know more.`);
                        let messageToSend = [...args];
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend = messageToSend.join(" ");
                        var member = message.mentions.members.first();
                        member.ban({
                            reason: messageToSend
                        }).then((member) => {
                            message.reply(`Bye Bye! __` + member.user.tag + `__ has been successfully banned!`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ has been banned from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Ban Members\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Ban Members\` permission.`);
            }
        }
        //kick
        else if (message.content.toLowerCase().startsWith(`${prefix}kick`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`KICK_MEMBERS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`KICK_MEMBERS`)) {
                    const args = message.content.split(" ");
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}kick`) {
                        const kickEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Kick (\`${prefix}kick\`)`).setDescription(`Using the \`${prefix}kick\` command you can kick members easily.\n\nTyping \`${prefix}kick @person reason\` will kick that person for mentioned reason.`);
                        message.reply({
                            embeds: [kickEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (message.mentions.members.first().id == `undefined` || !message.mentions.members.first() || !message.content.includes(`@`)) return message.reply(`Please enter a valid user to kick! Type \`${prefix}kick\` to know more.`);
                        if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                        if (message.mentions.members.first().id == message.author.id) return message.reply(`You cannot kick yourself idiot!`);
                        if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.reply(`You cannot kick someone with a role higher than or equal to you.`);
                        if (!message.mentions.members.first().bannable) return message.reply(`Sorry! I cannot kick a person with a role higher than or equal to me.`);
                        if (!args[2]) return message.reply(`Please include a valid reason. Type \`${prefix}kick\` to know more.`);
                        let messageToSend = [...args];
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend = messageToSend.join(" ");
                        var member = message.mentions.members.first();
                        member.kick({
                            reason: messageToSend
                        }).then((member) => {
                            message.reply(`Bye Bye! __` + member.user.tag + `__ has been successfully kicked!`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ has been kicked from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Kick Members\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Kick Members\` permission.`);
            }
        }
        //timeout
        else if (message.content.toLowerCase().startsWith(`${prefix}timeout`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`TIMEOUT_MEMBERS`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`TIMEOUT_MEMBERS`)) {
                    const args = message.content.split(" ");
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}timeout`) {
                        const timeoutEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Timeout (\`${prefix}timeout\`)`).setDescription(`Using the \`${prefix}timeout\` command allows you to timeout members easily.\n\nTyping \`${prefix}timeout @person time reason\` will timeout that person for mentioned time (in minutes) for mentioned reason.`);
                        message.reply({
                            embeds: [timeoutEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        if (message.mentions.members.first().id == `undefined` || !message.mentions.members.first() || !message.content.includes(`@`)) return message.reply(`Please enter a valid user to timeouy! Type \`${prefix}timeout\` to know more.`);
                        if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                        if (message.mentions.members.first().id == message.author.id) return message.reply(`You cannot timeout yourself idiot!`);
                        if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.reply(`You cannot timeout someone with a role higher than or equal to you.`);
                        if (!message.mentions.members.first().bannable) return message.reply(`Sorry! I cannot timeout a person with a role higher than or equal to me.`);
                        if (isNaN(args[2]) || !args[2]) return message.reply(`Please include a valid time period. Type \`${prefix}timeout\` to know more.`);
                        if (!args[3]) return message.reply(`Please include a valid reason. Type \`${prefix}timeout\` to know more.`);
                        let time = args[2] * 60 * 1000;
                        let messageToSend = [...args];
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend.shift();
                        messageToSend = messageToSend.join(" ");
                        var member = message.mentions.members.first();
                        member.timeout(time, messageToSend).then((member) => {
                            message.reply(`Bye Bye! __${member}__ has been successfully timedout!`);
                            member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ has been timedout from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                        });
                    }
                } else {
                    message.reply(`You need \`Administrator\` or \`Timeout Members\` permissions to use this command.`);
                }
            } else {
                message.reply(`I am missing the \`Timeout Members\` permission.`);
            }
        }
    }
    /* Dank Memer */
    else if (message.channel.name.includes("buying")) {
        if (message.content.toLowerCase().replace(/ /g, "").includes(`selling`) || message.content.toLowerCase().replace(/ /g, "").includes(`buyingcash`)) {
            message.delete().then((msg) => msg.channel.send(`${user} Selling ads don't belong here!`));
        }
    } else if (message.channel.name.includes("selling")) {
        if (message.content.toLowerCase().replace(/ /g, "").includes(`buying`) || message.content.toLowerCase().replace(/ /g, "").includes(`sellingcash`) || message.content.toLowerCase().replace(/ /g, "").includes(`sellingmycash`)) {
            message.delete().then((msg) => msg.channel.send(`${user} Buying ads don't belong here!`));
        }
    }
});
