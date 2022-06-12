const { Client } = require('discord.js-selfbot-v13');
const { getVoiceConnection , joinVoiceChannel } = require('@discordjs/voice');
const client = new Client({
    patchVoice:true
}); // All partials are loaded automatically
const {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
} = require('@discordjs/voice');


client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.login("KEY");
let onSozvon = false


client.on("message",(m)=>{
    if(m.content.toLowerCase().includes("негр")) return playMuzon(m.member.voice.channel,'./music/nigga.mp3')
    if(m.content.toLowerCase().includes("машин")) return playMuzon(m.member.voice.channel,'./music/mashina.mp3')
    if(m.content.toLowerCase().includes("еб")) return playMuzon(m.member.voice.channel,'./music/ebi.mp3')
})

async function playMuzon(channel,path){
    if(!onSozvon){
    if(!channel) return
    onSozvon = true
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    let player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Play,
        },
    });
    const resource = createAudioResource(path);
    player.play(resource);
    connection.subscribe(player);
    player.on("stateChange",(a)=>{
        if(a.status == "playing"){
            connection.disconnect()
            onSozvon = false
        }
    })
}}
