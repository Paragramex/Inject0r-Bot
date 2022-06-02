const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client()
const authtoken = process.env['authtoken']
const list = client.guilds.cache["899479806415106058"];
const fetch = require('node-fetch')
const fs = require('fs')
const http = require('http')
var prefix = "inj:"
//application has started
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})
console.clear();

//og code START
client.on("message", msg => {
	
	if (msg.content.toLowerCase() == prefix.toLowerCase() + "logchannel") {
		msg.channel.send("Channel logged to console.");
		console.log(msg.channel)
	} else if (msg.content.toLowerCase().includes(prefix.toLowerCase() + "debug")) {
		msg.channel.send("Message logged to console.")
		console.log(msg);
	} else if (msg.content.toLowerCase() == prefix.toLowerCase() + "welcome") {
		if (JSON.parse(fs.readFileSync('info.json'))["admins"].includes(msg.author.id)) {

			msg.channel.send("Hello, Im iຖวē¢t0r, the bot! my job is to interface with discord and allow my maker, littleclaw, the power to control his project from discord")

		} else {
			msg.channel.send("[inject0r] You are not an admin!")
		}

	} else if (msg.content.toLowerCase().includes(prefix.toLowerCase() + "createregcode")) {
		if (JSON.parse(fs.readFileSync('info.json'))["admins"].includes(msg.author.id)) {
			if (msg.mentions.users.size == 0) {
				msg.channel.send('[inject0r] You have to mention a user!')
			} else {
				msg.channel.send("[inject0r] Fetching a new auth token from server...");
				let mentions = msg.mentions.users.entries()
				async function getAKey() {
					let key = await fetch('https://inject0r.littleclaw.repl.co/token', {
						method: 'GET',
						headers: {
							'token': authtoken
						}
					})
					return await key.text();
				};

				getAKey().then(recievedToken => {
					try {
						let embed = new Discord.MessageEmbed()
						embed.setTitle('Registration token!')
						embed.setColor('#0053f6')
						embed.setURL('https://inject0r.littleclaw.repl.co/register')
						embed.setAuthor('Thanks For Joining Us At Inject0r', 'https://inject0r.littleclaw.repl.co/logo.png');
						embed.setDescription('Your registration token has been created! Find the current bookmark when you register below.');
						embed.addFields(
							{ name: 'Your registration token is:', value: recievedToken },
							{ name: 'Register at:', value: 'https://inject0r.littleclaw.repl.co/register' },
						)
						embed.setThumbnail('https://inject0r.littleclaw.repl.co/logo.png')
						embed.setTimestamp();
						embed.setFooter('Bot created by littleclaw', 'https://inject0r.littleclaw.repl.co/logo.png')
						mentions.next().value[1].send(embed);
						//#0053f6

						msg.channel.send("[inject0r] Registration token successfully sent to user!");
					} catch (err) {
						msg.channel.send("An error occured, and the registration token could not be sent. Error logged to Console.");
						console.log(err);
					}
				});

			}
		} else {
			msg.channel.send("[inject0r] You are not an admin!")
		}
	}

	else if (msg.content.toLowerCase().includes(prefix.toLowerCase() + "recruit")) {
		if (JSON.parse(fs.readFileSync('info.json'))["admins"].includes(msg.author.id)) {
			if (msg.mentions.users.size == 0) {
				msg.channel.send('[inject0r] You have to mention a user to advertise to!')

			} else {
				msg.channel.send("[inject0r] Fetching a new auth token from server...");
				let mentions = msg.mentions.users.entries()
				async function getAKey() {
					let key = await fetch('https://inject0r.littleclaw.repl.co/token', {
						method: 'GET',
						headers: {
							'token': authtoken
						}
					})
					return await key.text();
				};

				getAKey().then(recievedToken => {
					try {
						let embed = new Discord.MessageEmbed()
						embed.setTitle('Important message:')
						embed.setColor('#f60014')
						embed.setURL('https://inject0r.littleclaw.repl.co/')
						embed.setAuthor('Hey, you have been selected to join a beta test!!', 'https://inject0r.littleclaw.repl.co/logo.png');
						embed.setDescription('You have been selected as one of a chosen few to participate in a closed-beta testing of something littleclaw has made. If you wish to join, than take the registeration token below and go to the link at the bottom of this message. Sign up and start your exclusive beta-testing access!!!');
						embed.addFields(
							{ name: 'Your one time use registration token is:', value: recievedToken },
							{ name: 'Register below at:', value: 'https://inject0r.littleclaw.repl.co/register' },
						)
						embed.setThumbnail('https://inject0r.littleclaw.repl.co/logo.png')
						embed.setTimestamp();
						embed.setFooter('who knows what the sniper monkeys think of...', 'https://inject0r.littleclaw.repl.co/logo.png')
						mentions.next().value[1].send(embed);
						//#0053f6

						msg.channel.send("[inject0r] Recruit message and registration token successfully sent to target user!");
					} catch (err) {
						msg.channel.send("An error occured, and the message and token could not be sent. Error probally was logged to Console.");
						console.log(err);
					}
				});

			}
		} else {
			msg.channel.send("[inject0r] You are not an admin!")
		}
	}
})
client.on('message', message => {
	if (message.content.includes('[inject0r]', 'inj:')) {
		message.delete({ timeout: 3000 });
	}
	if (message.content.includes('inj:')) {
		message.delete({ timeout: 2000 });
	}
});
//og code END

//NEW CODE START

client.on('guildMemberAdd', member => {
  const embed = new Discord.MessageEmbed()
    embed.setTitle('hello')
						embed.setColor('')
						embed.setURL('https://inject0r.littleclaw.repl.co/')
						embed.setAuthor('hello2', 'https://inject0r.littleclaw.repl.co/logo.png');
						embed.setDescription('Welcome to the inject0r server, ${member.user}\nYou are our ${member.guild.memberCount}th Member.');
						embed.addFields(
							{ name: 'Get inject0r by DMing @littleclaw'},
							{ name: 'Register below at:', value: 'https://inject0r.littleclaw.repl.co/register' },
						)
						embed.setThumbnail('https://inject0r.littleclaw.repl.co/logo.png')
						embed.setTimestamp();
						embed.setFooter('ah yes, children so tasty', 'https://inject0r.littleclaw.repl.co/logo.png')
						member.send(embed);
})
//NEW CODE END

//DO NOT EDIT BELOW IDIOT
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

	res.write(fs.readFileSync('index.html', "utf8"))
	console.log(`${req.method} request recieved to site!`)
	res.end();
};
(function() {
	http.createServer(requestListener).listen(8080, () => console.log("Discord bot - web server initialized"));
})();
