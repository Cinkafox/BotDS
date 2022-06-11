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
const play = require('play-dl');


client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.login("KEY");
let onSozvon = false


client.on("message",(m)=>{
    console.log(m)
    if(!m.content.toLowerCase().includes("негр")) return
    let channel = m.member.voice.channel
    playMuzon(channel)
    
})

async function playMuzon(channel){
    if(!onSozvon){
    if(!channel) return
    onSozvon = true
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    let stream = await play.stream('https://www.youtube.com/watch?v=f3HdUiD3mZE');
    let resource = createAudioResource(stream.stream, {
        inputType: stream.type,
    });
    let player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Play,
        },
    });
    player.play(resource);
    connection.subscribe(player);
    player.on("stateChange",(a)=>{
        if(a.status == "playing"){
            connection.disconnect()
            onSozvon = false
        }
    })
}}
