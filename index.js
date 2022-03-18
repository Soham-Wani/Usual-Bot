//https://discord.com/api/oauth2/authorize?client_id=928874082756345917&permissions=275146861639&scope=bot
//TD?: Reply pings
//TD8: MUSIC, GAW
//TDN: Cannot ,delete in logs
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
client.on("guildMemberAdd", async member => {
    if (!member.user.bot) {
        member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ joined the server.`);
    } else {
        member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ was added to the server.`);
    }
});
client.on("guildMemberAdd", async member => {
    if (member.user.bot) return;
    member.guild.channels.cache.find(channel => channel.name.includes('welcome')).send(`Welcome ${member}! Hope you enjoy!`);
});
client.on("message", async message => {
    const bot = message.guild.members.cache.get(client.user.id);
    /* No Promotion */
    if (message.content.includes('discord.')) {
        if (!message.member.permissions.has("ADMINISTRATOR") && !(message.channel.name.includes("promot") || message.channel.name.includes("advertise")) && message.channel.type !== 'DM' && !message.author.bot) {
            message.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
            message.channel.send(`${message.author} Nah! No links!`);
        }
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
            message.reply(`stop`)
        }
    }
    /* Commands */
    else if (message.author.id !== client.user.id && message.channel.type !== 'DM' && !message.author.bot && message.content.startsWith(`${prefix}`)) {
        //stats
        if (message.content.toLowerCase().startsWith(`${prefix}stats`)) {
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
        //wrong
        else if (message.content.startsWith(`${prefix} `)) {
            message.reply(`Please type a valid command!`)
        }
        //help
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}help`) {
            const helpEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Help (\`${prefix}help\`)`).setDescription(`**Current list of commands:\n\nGeneral (Everyone)** \n\`${prefix}help\n${prefix}info\n${prefix}send\n${prefix}spam\`\n\n**Moderation (Admins)**\n\`${prefix}ban\n${prefix}delete\n${prefix}kick\n${prefix}timeout\``);
            message.reply({
                embeds: [helpEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //info
        else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}info`) {
            const infoEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Info (\`${prefix}info\`)`).setDescription(`I am currently a basic Discord moderation bot, but I will soon come up with jokes, facts and much more! Type \`${prefix}help\` to get a list of commands. \n\n**Features:**\n• Easy to understand.\n• Wide variety of innovative commands.\n• Hassle free moderation.\n• Never kicks, bans or timeouts members on its own.\n• Responsive support.\nMore exciting features yet to come...\n\n**Credits:**\nDeveloper and owner: Pseudonymous123#5921`);
            message.reply({
                embeds: [infoEmbed]
            }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
        }
        //send
        else if (message.content.toLowerCase().startsWith(`${prefix}send`)) {
            if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}send`) {
                const sendEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Send (\`${prefix}send\`)`).setDescription(`No one is perfect. Neither am I. Use \`${prefix}send\` command ro report bugs, suggest improvements, send ideas for me to my master.\n\nTyping \`${prefix}send message\` will send your message to my master and he will revert to you soon!`);
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
        //spam
        else if (message.content.toLowerCase().startsWith(`${prefix}spam`)) {
            if (!message.channel.name.includes("spam")) return message.reply(`Nah! You can't spam here! You can only spam in a channel with the name including the word 'spam'.`);
            const args = message.content.split(" ");
            if (message.content == `${prefix}spam`) {
                const spamEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Spam (\`${prefix}spam\`)`).setDescription(`Using the \`${prefix}spam\` command correctly will spam any message upto 20 times.\n\nTyping \`${prefix}spam 10 hello\` will spam 10 hellos.`);
                message.reply({
                    embeds: [spamEmbed]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            } else if (message.content !== `${prefix}spam`) {
                if (spamcooldown.has(message.author.id)) return message.reply(`Slow down! You can use this command after 2 minutes!`);
                if (message.content.includes('@') && message.author.id !== me) return message.reply(`You can't spam ping someone!`);
                if (!args[1]) return message.reply(`Please type a number. Type \`${prefix}spam\` to know more.`);
                if (isNaN(args[1])) return message.reply(`Please type how many times to spam. Type \`${prefix}spam\` to know more.`);
                if (args[1] > 20) return message.reply(`Please type realistic numbers (<20). Type \`${prefix}spam\` to know more.`);
                if (!args[2]) return message.reply(`Also include what should I spam. Type \`${prefix}spam\` to know more.`);
                const amountOfMessages = args[1];
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                for (let i = 0; i < amountOfMessages; i++) {
                    message.channel.send(messageToSend);
                }
                spamcooldown.add(message.author.id);
                setTimeout(() => {
                    spamcooldown.delete(message.author.id);
                }, 2 * 60 * 1000);
            }
        }
        //delete
        else if (message.content.toLowerCase().startsWith(`${prefix}delete`)) {
            if (bot.permissions.has(`ADMINISTRATOR`) || bot.permissions.has(`MANAGE_MESSAGES`)) {
                if (message.member.permissions.has(`ADMINISTRATOR`) || message.member.permissions.has(`MANAGE_MESSAGES`)) {
                    if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}delete`) {
                        const deleteEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Delete (${prefix}delete)`).setDescription(`Using this command, administrators can easily delete upto 100 previous messages for any reason (I won't judge!). And don't worry, this command will not delete pinned messages!\n\nTyping __${prefix}delete 20__ will delete 20 previous messages`);
                        message.reply({
                            embeds: [deleteEmbed]
                        }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
                    } else {
                        const Channel = message.channel;
                        const args = message.content.split(" ");
                        if (args[1] > 100 || isNaN(args[1])) return message.reply(`Please type realistic numbers \(<100\) or a number atleast. Type __${prefix}delete__ to know more.`);
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
                        const banEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Ban \(\`${prefix}ban\`\)`).setDescription(`Using the \`${prefix}ban\` command allows people with Administrator permissions to ban members easily.\n\nTyping \`${prefix}ban @person reason\` will ban that person for mentioned reason.`);
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
                        const kickEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Kick (\`${prefix}kick\`)`).setDescription(`Using the \`${prefix}kick\` command allows people with Administrator permissions to kick members easily.\n\nTyping \`${prefix}kick @person reason\` will kick that person for mentioned reason.`);
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
                        const timeoutEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Timeout (\`${prefix}timeout\`)`).setDescription(`Using the \`${prefix}timeout\` command allows people with Administrator permissions to timeout members easily.\n\nTyping \`${prefix}timeout @person time reason\` will timeout that person for mentioned time (in minutes) for mentioned reason.`);
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
});
