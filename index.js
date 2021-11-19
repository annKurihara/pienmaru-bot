const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');
const { evaluate } = require('mathjs')

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
] });

const prefix = '/pn'

client.once('ready', () => onClientReady());

    function onClientReady()
    {
        console.log("Discord bot is ready!");
        // Set presence status
        client.user.setPresence({
            status: "online",  //You can show online, idle....
        })
        // Set activities or custom status
        client.user.setActivity({
            type: "WATCHING", //PLAYING: WATCHING: LISTENING: STREAMING:
            name: `Emakku lagi pien`
        })
        // Listen to Messages in the channel
        client.on('message', (message) => onMessageReceived(message));

    }

    // Upon a message being received, handle how we interact
    function onMessageReceived(message) 
    {
        // Randomize reply if someone said "the magic word"
        var pienAnsLib = ['pien 🥺', 'pnpnpn', 'pi pi pi', 'PIEEENNN 🥺']
        var pienAns = pienAnsLib[Math.floor(Math.random() * pienAnsLib.length)]
        
            // Trigger library
        const PIEN = ['pien']
        const pipi = ['pn', 'pi', 'pipi', 'pi pi']
        const gmn = ['gmn', 'gmn gmn', 'hah gmn']
        const noice = ['n1', 'nice', 'noice', 'naisu', 'n0ice']

        if (PIEN.indexOf(message.content.toLowerCase()) !== -1)
            {
                message.reply(pienAns);
            }

        if (pipi.indexOf(message.content.toLowerCase()) !== -1)
            {
                const reactionEmoji = message.guild.emojis.cache.find(emoji => 
                    emoji.name === 'pieeennn');
                message.react(reactionEmoji);
                // message.react('901047771782598668');  
                // if you wanna react with specific emoji ID
            }
        
        if (gmn.indexOf(message.content.toLowerCase()) !== -1)
            {
                const reactPika = message.guild.emojis.cache.find(emoji => 
                    emoji.name === 'pikachuface');
                message.react(reactPika);
            }

        if (noice.indexOf(message.content.toLowerCase()) !== -1)
            {
                const reactNoice = message.guild.emojis.cache.find(emoji => 
                    emoji.name === 'pikacheer');
                message.react(reactNoice);
            }
            //TODO: make library for OwO
        
        

        if (message.content.startsWith(prefix)) 
            {
                // slices off prefix from message, trims extra whitespace, 
                // then returns our array of words from the message
                const args = message.content.substr(prefix.length).trim().split(' ')

                // splits off the first word from the array, which will be our command
                const command = args.shift().toLowerCase()
                    if(command === 'calc')
                    {
                        pienMath = evaluate(args[0])
                        message.reply(pienMath.toString())
                    }
                }
    }


// Login Method
client.login(token);
