//https://discord.com/api/oauth2/authorize?client_id=928874082756345917&permissions=275146861639&scope=bot
//TD?: Reply pings
//TD8: MUSIC, GAW
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
    client.guilds.cache.forEach(async guild => {
        let invites = await guild.fetchInvites();
        if (guild.vanityURLCode) invites.set(guild.vanityURLCode, await guild.fetchVanityData());
        client.guildInvites.set(guild.id, invites);
    });
});
client.on('inviteCreate', (invite) => {
    let invites = await invite.guild.fetchInvites();
    if (invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData());
    client.guildInvites.set(invite.guild.id, invites);
});
client.login(process.env.DISCORD_TOKEN);
process.on('unhandledRejection', error => {
    console.error(`${error}`);
});
client.on("guildMemberAdd", async member => {
    if (member.partial) member = await member.fetch();
    let guildData = await client.data.getGuildDB(member.guild.id);
    const cachedInvites = client.guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
    if (usedInvite.inviter.id == member.id) return;
    if ((guildData.join.enabled === true) && !(guildData.join.channel === null)) {
        let joinChannel = await member.guild.channels.cache.find(channel => channel.name.includes('log'))
        if (member.user.bot) {
            let toSend = await guildData.join.messageBot
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
            return joinChannel.send(toSend).catch(err => console.log(err))
        }
        if (!usedInvite) {
            let toSend = await guildData.join.messageUnknown
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
            return joinChannel.send(toSend).catch(err => console.log(err))
        }
        if (usedInvite.code === member.guild.vanityURLCode) {
            let userData = await client.data.getUserDB("VANITY", member.guild.id, member.id)
            let toSend = await guildData.join.messageFake
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
                .replace(/\{code\}/g, usedInvite.code)
                .replace(/\{invites\}/g, userData.invites + 1)
            joinChannel.send(toSend).catch(err => console.log(err))
        } else {
            let userData = await client.data.getUserDB(usedInvite.inviter.id, member.guild.id, member.id)
            if ((Date.now() - member.user.createdTimestamp) < guildData.fake * 24 * 60 * 60 * 1000) {
                let toSend = await guildData.join.messageFake
                    .replace(/\{member:username\}/g, member.user.username)
                    .replace(/\{member:mention\}/g, member.toString())
                    .replace(/\{member:tag\}/g, member.user.tag)
                    .replace(/\{inviter:username\}/g, usedInvite.inviter.username)
                    .replace(/\{inviter:mention\}/g, usedInvite.inviter.toString())
                    .replace(/\{inviter:tag\}/g, usedInvite.inviter.tag)
                    .replace(/\{code\}/g, usedInvite.code)
                joinChannel.send(toSend).catch(err => console.log(err))
            } else {
                let toSend = await guildData.join.messageCorrect
                    .replace(/\{member:username\}/g, member.user.username)
                    .replace(/\{member:mention\}/g, member.toString())
                    .replace(/\{member:tag\}/g, member.user.tag)
                    .replace(/\{inviter:username\}/g, usedInvite.inviter.username)
                    .replace(/\{inviter:mention\}/g, usedInvite.inviter.toString())
                    .replace(/\{inviter:tag\}/g, usedInvite.inviter.tag)
                    .replace(/\{code\}/g, usedInvite.code)
                    .replace(/\{invites\}/g, userData.invites + 1)
                joinChannel.send(toSend).catch(err => console.log(err))
            }
        }
    }
    if (member.user.bot) return
    if (!usedInvite) return
    if (usedInvite.code === member.guild.vanityURLCode) {
        let userData = await client.data.getUserDB("VANITY", member.guild.id, member.id)
        userData.invites++
        userData.invites_join++
        return userData.save()
    }
    let userData = await client.data.getUserDB(usedInvite.inviter.id, member.guild.id, member.id)
    if ((Date.now() - member.user.createdTimestamp) < guildData.fake * 24 * 60 * 60 * 1000) {
        userData.invites_fake++
        return userData.save()
    }
    userData.invites++
    userData.invites_join++
    userData.save()
    if (guildData.ranks) {
        for (const [nbInv, roleID] of Object.entries(guildData.ranks)) {
            if (userData.invites >= nbInv) {
                let inviterMember = member.guild.member(usedInvite.inviter.id)
                if (!inviterMember) return;
                if (!inviterMember.roles.cache.find(r => r.id === roleID)) {
                    inviterMember.roles.add(member.guild.roles.cache.find(r => r.id === roleID))
                }
            }
            
        }
    }
    return 
        member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ joined the server using the invite code __` + usedInvite.code + `__ from __` + invite.inviter.tag + `__ which has __` + inv.uses `__ uses.`);
});
client.on("guildMemberAdd", async member => {
    if(member.user.bot) return;
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
    else if (message.author.id !== client.user.id && message.channel.type == 'DM' && !message.author.bot && !message.content.startsWith(`${prefix}`)) {
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
            if (!message.member.permissions.has(`ADMINISTRATOR`)) return message.reply(`You need Administrator permissions to use this command.`);
            if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}delete`) {
                const deleteEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Delete (${prefix}delete)`).setDescription(`Using this command, administrators can easily delete upto 100 previous messages for any reason (I won't judge!)\n\nTyping __${prefix}delete 20__ will delete 20 previous messages`);
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
                        if (!message.mentions.members.first().bannable) return message.reply(`Sorry! I cannot ban this person.`);
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
                message.reply(`I am missing the or \`Ban Members\` permissions.`);
            }
        }
        //kick
        else if (message.content.toLowerCase().startsWith(`${prefix}kick`)) {
            if (!message.member.permissions.has(`ADMINISTRATOR`)) return message.reply(`You need Administrator permissions to use this command.`);
            const args = message.content.split(" ");
            if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}kick`) {
                const kickEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Kick (${prefix}kick)`).setDescription(`Using the ${prefix}kick command allows people with Administrator permissions to kick members easily.\n\nTyping __${prefix}kick @person reason__ will kick that person for mentioned reason.`);
                message.reply({
                    embeds: [kickEmbed]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            } else {
                if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                if (message.mentions.members.first().id == `undefined` || !message.mentions.members.first()) return message.reply(`Please enter a valid user to ban! Type __${prefix}kick__ to know more.`);
                if (!args[2]) return message.reply(`Please include a valid reason. Type __${prefix}kick__ to know more.`);
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                var member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.reply(`Bye Bye! __` + member.tag + `__ has been successfully kicked!`).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Kick Members `."));
                    member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.tag + `__ has been kicked from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                }).catch(error => message.reply("Heck! I couldn't kick this member because I don't have `Kick Members` permission or the user is a bot or an admin."));
            }
        }
        //timeout
        else if (message.content.toLowerCase().startsWith(`${prefix}timeout`)) {
            if (!message.member.permissions.has(`ADMINISTRATOR`)) return message.reply(`You need Administrator permissions to use this command.`);
            const args = message.content.split(" ");
            if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}timeout`) {
                const timeoutEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Timeout (${prefix}timeout)`).setDescription(`Using the ${prefix}timeout command allows people with Administrator permissions to timeout members easily.\n\nTyping __${prefix}timeout @person time reason__ will timeout that person for mentioned time (in minutes) for mentioned reason.`);
                message.reply({
                    embeds: [timeoutEmbed]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            } else {
                if (message.mentions.members.first().id == me) return message.reply("I can't betray my master!");
                if (isNaN(args[2]) || !args[2]) return message.reply(`Please include a valid time period. Type __${prefix}timeout__ to know more.`);
                if (!args[3]) return message.reply(`Please include a valid reason. Type __${prefix}timeout__ to know more.`);
                let time = args[2] * 60 * 1000;
                let messageToSend = [...args];
                messageToSend.shift();
                messageToSend.shift();
                messageToSend.shift();
                messageToSend = messageToSend.join(" ");
                var member = message.mentions.members.first();
                member.timeout(time, messageToSend).then((member) => {
                    message.reply(`Bye Bye! __${member}__ has been successfully timedout!`).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Timeout Members `."));
                    member.guild.channels.cache.find(channel => channel.name.includes('log')).send(`__` + member.user.tag + `__ has been timedout from the server by __` + message.author.tag + `__ for __` + messageToSend + `__`);
                }).catch(error => message.reply("Heck! I couldn't timeout this member because I don't have `Timeout Members` permission or the user is a bot or an admin."));
            }
        }
    }
});
