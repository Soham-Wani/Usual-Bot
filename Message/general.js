client.on("message", async message => {
    /* No Promotion */
    if (message.content.includes('discord.')) {
        if (!message.member.permissions.has("ADMINISTRATOR") && !(message.channel.name.includes("promot") || message.channel.name.includes("advertise")) && message.channel.type !== 'DM') {
            message.delete().catch(error => message.reply("Heck! I couldn't work as intended because of: `" + ` ${error}` + ": Manage Messages `."));
            message.channel.send(`${message.author} Nah! You can't promote here!`);
        }
    }
    /* Stats */
    else if (message.author.id == me && message.content == `${prefix}stats` && message.channel.type !== 'DM') {
        message.channel.send({
            embeds: [
                new MessageEmbed().setColor('#0000ff').setDescription(client.guilds.cache.map(g => `Guild Name: ${g.name}\nTotal Members: ${g.members.cache.size}\nGuild ID: ${g.id}`).join('\n\n'))
            ]
        });
        client.users.fetch('912297357339660309', false).then((dev) => {
            dev.send('hello world');
        });
    } else if (message.author.id !== me && message.content == `${prefix}stats` && message.channel.type !== 'DM') {
        message.reply('You thought you are a dev? Lol! Only devs can use this command');
    }
    /* General */
    else if (message.author.id !== client.user.id && message.channel.type !== 'DM' && !message.author.bot && !message.content.startsWith(`${prefix}`)) {
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
});
