var _0x874b = ["\x66\x75\x63\x6B", "\x64\x69\x63\x6B", "\x61\x73\x73", "\x62\x69\x74\x63\x68", "\x77\x61\x6E\x6B", "\x70\x75\x73\x73\x79", "\x63\x75\x6E\x74", "\x6E\x69\x67\x67\x65\x72", "\x6E\x69\x67\x67\x61", "\x74\x69\x74\x74\x69\x65\x73", "\x74\x69\x64\x64\x69\x65\x73", "\x63\x6F\x63\x6B", "\x62\x6F\x6E\x65\x72", "\x63\x75\x6D", "\x62\x75\x6D", "\x73\x65\x78", "\x7A\x68\x61\x74\x75", "\x7A\x68\x61\x76", "\x6C\x61\x75\x64\x79\x61", "\x6C\x61\x76\x64\x79\x61", "\x62\x6F\x6F\x62", "\x70\x65\x6E\x69\x73", "\x76\x61\x67\x69\x6E\x61", "\x67\x61\x6E\x64", "\x63\x68\x6F\x74", "\x63\x68\x75\x74", "\x62\x68\x6F\x73\x61\x64", "\x70\x6F\x72\x6E", "\x63\x69\x62\x61\x69", "\x73\x74\x66\x75", "\x77\x74\x66", "\x77\x68\x6F\x72\x65", "\x76\x69\x72\x67\x69\x6E", "\x62\x75\x74\x74", "\x73\x75\x63\x6B\x65\x72", "\x61\x6E\x61\x6C", "\x70\x65\x64\x6F", "\x67\x61\x79", "\x6C\x65\x73\x62\x69\x61\x6E", "\x6C\x65\x73\x62\x6F", "\x63\x68\x6F\x64", "\x6D\x61\x64\x61\x72"];
let blacklisted = [_0x874b[0], _0x874b[1], _0x874b[2], _0x874b[3], _0x874b[4], _0x874b[5], _0x874b[6], _0x874b[7], _0x874b[8], _0x874b[9], _0x874b[10], _0x874b[11], _0x874b[12], _0x874b[13], _0x874b[14], _0x874b[15], _0x874b[16], _0x874b[17], _0x874b[18], _0x874b[19], _0x874b[20], _0x874b[21], _0x874b[22], _0x874b[23], _0x874b[24], _0x874b[25], _0x874b[26], _0x874b[27], _0x874b[28], _0x874b[29], _0x874b[30], _0x874b[31], _0x874b[32], _0x874b[33], _0x874b[34], _0x874b[35], _0x874b[36], _0x874b[37], _0x874b[38], _0x874b[39], _0x874b[40], _0x874b[41]]



/* Bad words
client.on("message", async message => {
    const user = message.author;
    let foundInText = false;
    if (message.author.bot) return;
    if (message.content.length < 17) {
        for (var i in blacklisted) {
            if (message.content.toLowerCase().replace(/[^a-z]/g, "").replace(/ /g, "").includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
    } else if (message.content.length >= 17) {
        for (var i in blacklisted) {
            if (message.content.toLowerCase().replace(/[^a-z]/g, "").includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
    }
    if (message.content.includes('🖕')) foundInText = true;
    if (message.content.toLowerCase().includes('pass') || message.content.toLowerCase().includes('g and') || message.content.toLowerCase().includes('as s') || message.content.toLowerCase().includes('wassup')) foundInText = false;
    if (foundInText === true && message.channel.type !== 'DM' && !message.channel.nsfw) {
        message.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
        console.log(message.content, message.author);
        if (message.author.id !== client.user.id) {
            message.channel.send(`${user} You can't send that here!`);
        }
        if (!message.author.bot) {
            message.author.send(`You can be banned for using bad or profane words or emojis on servers. Don\'t use them, ever!`);
        }
    } else if (foundInText === true && message.channel.type == 'DM') {
        message.channel.send(`You will abuse me personally now?\nಠ﹏ಠ`)
    }
    /* No DMs
    else if (message.channel.type == 'DM' && message.author.id !== client.user.id && foundInText == false && !message.content.startsWith(prefix)) {
        message.channel.send("I can\'t talk to everyone on DMs. Please get on a Discord server to talk to me!")
    } else if (message.channel.type == 'DM' && message.author.id !== client.user.id && foundInText == false && message.content.startsWith(prefix)) {
        message.channel.send("You can't use commands in DMs. Please get on a Discord server to use commands!")
    }
});*/




        //clean
        else if (message.content.toLowerCase().startsWith(`${prefix}clean`)) {
            if (!message.member.permissions.has(`ADMINISTRATOR`)) return message.reply(`You need Administrator permissions to use this command.`);
            if (message.content.toLowerCase().startsWith(`${prefix}clean l`)) {
                const Channel = message.channel;
                const Messages = await Channel.messages.fetch({
                    limit: 100
                });
                Messages.forEach(msg => {
                    if (msg.content.toLowerCase().includes('discord.')) {
                        if (!msg.member.permissions.has("ADMINISTRATOR") && !(msg.channel.name.includes("promot") || msg.channel.name.includes("advertise"))) {
                            msg.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
                        }
                    }
                });
                message.channel.send("Previous 100 messages have been cleaned!");
            } else if (message.content.toLowerCase().startsWith(`${prefix}clean w`)) {
                const Channel = message.channel;
                const Messages = await Channel.messages.fetch({
                    limit: 100
                });
                Messages.forEach(msg => {
                    for (var i in blacklisted) {
                        if (msg.content.toLowerCase().replace(/[^a-z]/g, "").includes(blacklisted[i].toLowerCase())) {
                            msg.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages / Read Message History `."));
                        }
                    }
                });
                message.channel.send("Previous 100 messages have been cleaned!");
            } else if (message.content.toLowerCase().replace(/ /g, "") == `${prefix}clean`) {
                const cleanEmbed = new MessageEmbed().setColor('#0c0c46').setTitle(`Clean (${prefix}clean)`).setDescription(`Using this command, administrators can easily clean previous messages making them free from bad words or unwanted links sent by members other than the admin. \n\nTyping __${prefix}clean links__ will delete all links from previous 100 messages except for the ones sent by the admin.\nTyping __${prefix}clean words__ will delete all bad words from previous 100 messages.`);
                message.reply({
                    embeds: [cleanEmbed]
                }).catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Embed Links `."));
            }
        }




/* else if (message.content.toLowerCase().startsWith(`${prefix}spam`)) {
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
        } */
