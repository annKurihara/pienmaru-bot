const { token } = require('./config.json');
const { Client, Intents, MessageEmbed } = require('discord.js');
const { evaluate } = require('mathjs');
const Memer = require('random-jokes-api')


const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
] });
const prefix = 'pn';

client.once('ready', () => onClientReady());
function onClientReady() {
    console.log("Pienmaru is ready!");
    // Set presence status
    client.user.setStatus("online");  //online or idle
    // Set activities or custom status
    client.user.setActivity("mom working OwO", {
        type: "WATCHING", //PLAYING: WATCHING: LISTENING: STREAMING:
        //name: `Emakku lagi pien`
    })
    // Listen to Messages in the channel
    client.on('message', (message) => onMessageReceived(message));
}
// Upon a message being received, handle how we interact
function onMessageReceived(message) {
    // Reply list; to be randomized if someone said "the magic word"
    var pienAnsLib = ['pien 🥺', 'pnpnpn', 'pi pi pi', 'PIEEENNN 🥺']
    var pienAns = pienAnsLib[Math.floor(Math.random() * pienAnsLib.length)]

    // Trigger list
    const PIEN = ['pien']
    const pipi = ['pn', 'pi', 'pipi', 'pi pi']
    const wat = ['gmn', 'gmn gmn', 'hah gmn', 'wat']
    const noice = ['n1', 'nice', 'noice', 'naisu', 'n0ice', 'nc']
    const yay = ['ayy', 'yay']

    if (PIEN.indexOf(message.content.toLowerCase()) !== -1) {
        message.reply(pienAns);
    }
    if (pipi.indexOf(message.content.toLowerCase()) !== -1) {
        let reactPien = '🥺'
        const customPien = message.guild.emojis.cache.find(emoji => 
            emoji.name === 'pieeennn');
        if (customPien !== undefined) {
           reactPien = customPien
        }
        message.react(reactPien);
        // message.react('901047771782598668');
        // if you wanna react with specific emoji ID
    }
    if (wat.indexOf(message.content.toLowerCase()) !== -1) {
        let reactPika = '😦'
        const customPika = message.guild.emojis.cache.find(emoji =>
            emoji.name === 'pikachuface');
        if (customPika !== undefined) {
            reactPika = customPika
        }
        message.react(reactPika);
    }
    if (noice.indexOf(message.content.toLowerCase()) !== -1) {
        let reactNoice = '👌'
        const customNoice = message.guild.emojis.cache.find(emoji =>
            emoji.name === 'pikacheer');
        if (customNoice !== undefined) {
            reactNoice = customNoice
        }
        message.react(reactNoice);
    }
    if (yay.indexOf(message.content.toLowerCase()) !== -1) {
        let reactYay = '🥳'
        const customYay = message.guild.emojis.cache.find(emoji =>
            emoji.name === 'pandakkn');
        if (customYay !== undefined) {
            reactYay = customYay
        }    
        message.react(reactYay);
    }
    // TODO: make library for OwO

    if (message.content.startsWith(prefix)) {
        // slices off prefix from message, trims extra whitespace,
        // then returns our array of words from the message
        const args = message.content.substr(prefix.length).trim().split(' ')

        // splits off the first word from the array, which will be our command
        // TODO: use switch-case instead
        const command = args.shift().toLowerCase()
        if(command === 'calc') {
            pienMath = evaluate(args[0])
            message.reply(pienMath.toString())
        }
        else if(command === 'joke') {
            let jokes = Memer.joke()
            message.reply(jokes);
        }
        else if(command === 'pun'){
            let puns = Memer.pun()
            message.reply(puns);
        }
        else if (command === 'meme') {
            let meme = Memer.meme()
            let embed = new MessageEmbed()
            .setTitle(meme.title)
            .setImage(meme.url)
            
            message.reply({ embeds: [embed] })
        }
        else if (command === 'cats') {
            let cats = Memer.cat()
            let embed = new MessageEmbed()
            .setImage(cats)

            message.reply({ embeds: [embed] })
        }
    }
}
// Login Method
client.login(token);