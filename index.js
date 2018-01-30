const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const express = require('express');
const app = express();

const adapter= new FileSync('database.json');
const db = low(adapter);


//DEBUT PARAGRAPHE HEROKU
app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function(){
    console.log(`bot en fonctionnement sur le port ${app.get('port')}`)
})

db.defaults({ histoires: [], xp: []}).write()

var bot = new Discord.Client();
var prefix = ("wc!");
var randnum = 0;

bot.on('ready', () => {
    bot.user.setPresence({game: { name: '[wc!help] Bot Officiel de WorldCraft, https://discord.gg/J3dQ3Jx', type: 0}})
    console.log("Bot Ready !");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {

    if(message.author.bot)return;
        
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Commandes du bot !", " - wc!help : Affiche les commandes du bot !\n- wc!helpmp : Affiche les commandes du bot en message privé !\n- wc!youtube : Le lien de notre chaîne YouTube !\n- wc!paypal : Vous donne le paypal de WorldCraft !\n- wc!maj : Il vous donne les mises à jour de la semaine !\n- wc!info : Vous donnes des informations sur vous !\n- wc!infode @user : Vous donnes des informations sur la personnes de votre choix ! **(Pas encore disponible)**\n- wc!xpstat : Vous donnes votre xp !")
        .addField("Commandes divers !", " - ping : Le bot répond pong !\n- test : Le bot vous répond !\n- #grosvent : Il se fout de vous  !")
        .setFooter("Cordialement, WorldCraftBot")
        message.channel.send(help_embed);
        console.log("Commande Help demandée !");
    }
    
    if (message.content === prefix + "helpmp"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Commandes du bot !", " - wc!help : Affiche les commandes du bot !\n- wc!helpmp : Affiche les commandes du bot en message privé !\n- wc!youtube : Le lien de notre chaîne YouTube !\n- wc!paypal : Vous donne le paypal de WorldCraft !\n- wc!maj : Il vous donne les mises à jour de la semaine !\n- wc!info : Vous donnes des informations sur vous !\n- wc!infode @user : Vous donnes des informations sur la personnes de votre choix ! **(Pas encore disponible)**\n- wc!xpstat : Vous donnes votre xp !")
        .addField("Commandes divers !", " - ping : Le bot répond pong !\n- test : Le bot vous répond !\n- #grosvent : Il se fout de vous :wink: !")
        .setFooter("Cordialement, WorldCraftBot")
        message.author.send(help_embed);
        message.reply("La commande Help vient de vous être envoyer en Message Privé")
        console.log("Commande HelpMp demandée !");
    }
    
    if (message.content === prefix + "info"){
        var usercreatedate = message.author.createdAt.toString().split(' ')
        var xp_embed = new Discord.RichEmbed()
	.setColor('#ff0000')
        .setTitle(`Information de ${message.author.username}`)
        .addField("Date de création de ${message.author.username}", usercreatedate[1] + ' ' + usercreatedate[2]+','+usercreatedate[3], true)
	.setThumbnail(message.author.avatarURL)
        message.author.send(help_embed);
        console.log("Commande Info demandé");
    }
	
   if (message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
        .setTitle(`XP de ${message.author.username}`)
        .setDescription("Voici tout vos xp !")
        .addField("XP :", `${xpfinal[1]}xp`)
	.setThumbnail(message.author.avatarURL)
        message.channel.send({embed: xp_embed});
	console.log("Commande xpstat demandé");
   }
    

    if (message.content === "ping"){
        message.channel.send(":ping_pong: pong");
        console.log('ping pong')
    }
    
        if (message.content === "#grosvent"){
        message.channel.send("Ouais c'est le cas de la dire !");
        console.log('Gros vent')
    }
        
    if (message.content === "test"){
        message.reply("Tout est bon !");
        console.log('Test !')
    }

    if (message.content === "t moche"){
        message.reply("Euh, tu t'es vu toi ?");
        console.log('Tu es moche !')
    }
    
    
    if (message.content === prefix + "invite"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Lien pour inviter le bot sur votre serveur !**", "**Voici le lien pour m'ajouter dans votre serveur :** *<https://discordapp.com/api/oauth2/authorize?client_id=396452123002273792&permissions=8&scope=bot>*")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du bot demandé !')
    }
    
    if (message.content === prefix + "serveur"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Lien de mon serveur !**", "**Voici le lien mon serveur discord d'origine :** *<https://discord.gg/J3dQ3Jx>*")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du serveur du bot demandé !')
    }
    
    if (message.content === prefix + "avatar"){
        message.channel.send(message.author.avatarURL);
        console.log('avatar demandé !')
    }
    
    if (message.content === prefix + "event"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**__Event Programmés__**","*Bonjour, aucun event programmé pour le moment !*")
        message.channel.sendEmbed(help_embed);
        console.log('pingpong');
    }
    
    if (message.content === prefix + "paypal"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("Voici le lien du paypal : https://www.paypal.me/worldcraftofficiel", 'Le lien peut changer à tout moment !',true)
        .setFooter("Fait par Piikaa et Corentin !")
        message.channel.sendEmbed(help_embed);
        console.log('pong')
    }
    
    if (message.content === prefix + "maj"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**__Nouveautés récentes__**","Unban général !")
        message.channel.sendEmbed(help_embed);
        console.log('pingpong');
    }

    if (message.content === prefix + "youtube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "Youtube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "YouTube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "yt"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "YT"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "Yt"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }
    

    if (message.content === "Comment vas-tu WorldCraftBot?"){
        random();

        if (randnum == 1){
            message.reply("Merci je vais très bien !");
            console.log(randnum);
        }

        if (randnum == 2){
            message.reply("Je ne vais pas très bien, merci de te soucier de moi !");
            console.log(randnum);
        }

    }
    
    
    
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){

        case "newstory":
        var value = message.content.substr(10);
        var author = message.author;
        var number = db.get('histoires').map('id').value();
        console.log(value);
        message.reply("Ajout de l'histoire à la base de données")

        db.get('histores')
            .push({ story_value: value, story_author: author}).write()
        
        break;
    }
    
});

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(2);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
