const Discord = require("discord.js")
const client = new Discord.Client()
const authtoken = process.env['authtoken']
const list = client.guilds.cache["thingy here"]; 
var tokenList = process.env['avTokens']
const fetch = require('node-fetch')
const fs = require('fs')
const http = require('http')
var prefix = "inj: "
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
console.clear();
client.on("message", msg => {
  if (msg.content.toLowerCase() == prefix.toLowerCase() + "log channel to console") {
    msg.channel.send("Channel logged to console.");
    console.log(msg.channel)
  }else if(msg.content.toLowerCase().includes(prefix.toLowerCase() + "debug")){
    msg.channel.send("Message logged to console.")
    console.log(msg);
  }else if(msg.content.toLowerCase() == prefix.toLowerCase() + "logallmembers"){
    if(JSON.parse(fs.readFileSync('info.json'))["admins"].includes(msg.author.id)){
    msg.channel.send("g")
    }else{
      msg.channel.send("You are not an admin!")
    }
  } else if(msg.content.toLowerCase().includes(prefix.toLowerCase() + "createregcode")){
      if(JSON.parse(fs.readFileSync('info.json'))["admins"].includes(msg.author.id)){
    if(msg.mentions.users.size == 0){
      msg.channel.send('You have to mention a user!')
    }else{
      msg.channel.send("Fetching a new auth token from server...");
      let mentions = msg.mentions.users.entries()
      async function getAKey (){
     let key = await fetch('https://inject0r.littleclaw.repl.co/token', {
          method: 'GET',
          headers: {
            'token':authtoken
          }
        })
        return await key.text();
      };

      getAKey().then(recievedToken => {
        try{
        let embed = new Discord.MessageEmbed()
      embed.setTitle('Registration token!')
      embed.setColor('#0053f6')
      embed.setURL('https://inject0r.littleclaw.repl.co/register')
      embed.setAuthor('inject0r.xyz bot', 'https://inject0r.littleclaw.repl.co/logo.png');
      embed.setDescription('Your registration token has been created! Find the current bookmark in the BOOKMARK.md!');
      embed.addFields(
        {name: 'Your registration token is:', value: recievedToken},
        {name: 'Register at:', value: 'https://inject0r.littleclaw.repl.co/register'},
      )
      embed.setThumbnail('https://inject0r.littleclaw.repl.co/logo.png')
      embed.setTimestamp();
      embed.setFooter('Bot created by littleclaw', 'https://inject0r.littleclaw.repl.co/logo.png')
    mentions.next().value[1].send(embed);
    //#0053f6

    msg.channel.send("Registration token successfully sent to user!");
        }catch(err){
          msg.channel.send("An error occured, and the registration token could not be sent. Error logged to Console.");
          console.log(err);
        }
      });

    }
  }else{
    msg.channel.send("You are not an admin!")
  }
  }

})

client.login(authtoken)
function requestListener(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	// declare CORS policies and type of data
	if (req.headers["access-control-request-method"])
		res.setHeader('Access-Control-Allow-Methods', req.headers["access-control-request-method"]);
	if (req.headers['access-control-request-headers'])
		res.setHeader("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
	if (req.method.toLowerCase() === "options") {
		res.writeHead(200, "OK");
		res.end();
		return;
	}
res.writeHead(200, {
		'Content-Type': 'text/html',
		'Access-Control-Allow-Origin': '*'
	});

    res.write(fs.readFileSync('website.html', "utf8"))
    console.log(`${req.method} request recieved to site!`)
	res.end();
};
(function() {
	http.createServer(requestListener).listen(8080, () => console.log("Discord bot - web server initialized"));
})();
