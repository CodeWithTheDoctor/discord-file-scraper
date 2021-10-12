//Code written by TheDoctor :D
const { Client, Intents, Channel, MessageManager } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function scraper(channel) {
    let last_id;

    while (true) {
        const options = { limit: 100};
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        messages.map(msg => {
            if(msg.attachments.size > 0) {
                msg.attachments.map(attachment => console.log(attachment.attachment))
            }
        });
        last_id = messages.last().id;

        if (messages.size != 100) {
            break;
        }
    }
}

client.on('messageCreate', (message) => {
    if(message.content === "Hi") {
        message.reply({
            content: "Hello there."
        })
    }
    else if(message.content === "!scrape") {
        scraper(message.channel);
    }
})

client.login(''); //Put your discord bot's token in the ''
