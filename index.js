const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const express = require('express');
const app = express();
const bot = new Discord.Client({disableEveryone: true});
//const botconfig = require("./botconfig.json");
const adapter= new FileSync('database.json');
const db = low(adapter);


//DEBUT PARAGRAPHE HEROKU
app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function(){
    console.log(`bot en fonctionnement sur le port ${app.get('port')}`)
})

db.defaults({ histoires: [], xp: []}).write()

//var bot = new Discord.Client();
var prefix = ("wc!");
var randnum = 0;

bot.on('ready', function () {
  console.log(`Je suis connecté sur ${bot.guilds.size} serveurs avec ${bot.users.size} utilisateurs !`)
  bot.user.setActivity(`${bot.users.size} utilisateurs | ${bot.guilds.size} serveurs`, {type: "WATCHING"});
})

bot.login(process.env.TOKEN);

/*bot.on('guildMemberAdd', function(member) {
if ( member.user.bot === true && kickbot === 2) {
member.kick()
}
}
) 

bot.on('message', function(message){
if (message.content === prefix + "kickbotoff" )  {
    if ( message.author.id === '292263751372242944' || message.author.id === '394255380940849153' || message.author.id === '335118921088630796' || message.author.id === '270265203269042188' || message.author.id === '283625708863881216' || message.author.id === '205752580251451392' || message.author.id === '344061192903327744' ) {
       const kickbot = 1
       message.channel.send('Le kickbot est bien désactivé(debug:' + kickbot + ')')
    } else {
            message.channel.send('Tu n\'es pas autorisé a faire cette commande')
} } 
if (message.content === prefix + "kickboton"){
    if ( message.author.id === '292263751372242944' || message.author.id === '394255380940849153' || message.author.id === '335118921088630796' || message.author.id === '270265203269042188' || message.author.id === '283625708863881216' || message.author.id === '205752580251451392' || message.author.id === '344061192903327744' ) { 
	const kickbot = 2
	message.channel.send('Le kickot est désormais activé(debug:' + kickbot + ')')
} else {
	message.channel.send('Tu n\'es pas autorisé a faire cette commande')}
} 

if(message.content === prefix + 'kickbotdebug'){
message.channel.send('debug info :' + kickbot )}

} ) */
	
bot.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `<@396452123002273792>`){
    message.reply("Mon préfix est ``wc!``. **wc!help** pour voir mes commandes")
  }
  
    if(cmd === `${prefix}actualise`){
    let game = args.join(" ").slice(22);
    message.delete(message.author)                              
    bot.user.setActivity(`${bot.users.size} utilisateurs | ${bot.guilds.size} serveurs`, {type: game});
    message.reply("Mon activite à été Actualisé !")
}
//   	const args = message.content.slice(prefix.length).trim().split(/ wc!/g);
	const command = args.shift().toLowerCase()
	var msgauthor = message.author.id;
	
    if(message.author.bot)return;
	
    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
} 	     
    if (cmd === `${prefix}help`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#12a0aa')
        .addField("Commandes du bot !", " - wc!help : Affiche les commandes du bot !\n- wc!helpmp : Affiche les commandes du bot en message privé !\n- wc!youtube : Le lien de notre chaîne YouTube !\n- wc!paypal : Vous donne le paypal de WorldCraft !\n- wc!maj : Il vous donne les mises à jour de la semaine !\n- wc!info : Vous donnes des informations sur vous !\n- wc!infode @user : Vous donnes des informations sur la personnes de votre choix ! **(Pas encore disponible)**\n- wc!xpstat : Vous donnes votre xp !\n- wc!site : Vous donne le lien du site de WorldCraft !\n- wc!entreprise : Vous donne le lien de l'Entreprise de WorldCraft !\n- wc!bot : Vous donne le lien du site de WorldCraftBot !\n- wc!sondage : Vous donne les derniers sondages !\n- wc!sanction : Vous donne la liste des sanctions de WorldCraft !\n- wc!nsfw : Vous donnes des infos sur le salon NSFW !")
        .setFooter("Cordialement, WorldCraftBot")
        message.channel.send(help_embed);
	var help_embed2 = new Discord.RichEmbed()
	.setColor('#12a0aa')
	.addField("Commandes divers !", " - ping : Le bot répond pong !\n- test : Le bot vous répond !\n- #grosvent : Il se fout de vous  !")
	.setFooter("Cordialement, WorldCraftBot")
	message.channel.send(help_embed2);
	var help_embed3 = new Discord.RichEmbed()
	.setColor('#ff0000') 
	.addField("Commandes réservé au staff !", "- wc!suggest Votre message : Disponible uniquement dans <#348545352904998914> !\n-wc!kickboton/wc!kickbotoff : Active/désactive le kickbot (seulement les Co-Fondateurs et le Fondateur)")
	.setFooter("Cordialement, WorldCraftBot")
	message.channel.send(help_embed3);
        console.log("Commande Help demandée !");
    }
    
    if (cmd === `${prefix}helpmp`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#12a0aa')
        .addField("Commandes du bot !", " - wc!help : Affiche les commandes du bot !\n- wc!helpmp : Affiche les commandes du bot en message privé !\n- wc!youtube : Le lien de notre chaîne YouTube !\n- wc!paypal : Vous donne le paypal de WorldCraft !\n- wc!maj : Il vous donne les mises à jour de la semaine !\n- wc!info : Vous donnes des informations sur vous !\n- wc!infode @user : Vous donnes des informations sur la personnes de votre choix ! **(Pas encore disponible)**\n- wc!xpstat : Vous donnes votre xp !\n- wc!site : Vous donne le lien du site de WorldCraft !\n- wc!entreprise : Vous donne le lien de l'Entreprise de WorldCraft !\n- wc!bot : Vous donne le lien du site de WorldCraftBot !\n- wc!sondage : Vous donne les derniers sondages !\n- wc!sanction : Vous donne la liste des sanctions de WorldCraft !\n- wc!nsfw : Vous donnes des infos sur le salon NSFW !")
        .setFooter("Cordialement, WorldCraftBot")
        message.author.send(help_embed);
	var help_embed2 = new Discord.RichEmbed()
	.setColor('#12a0aa')
	.addField("Commandes divers !", " - ping : Le bot répond pong !\n- test : Le bot vous répond !\n- #grosvent : Il se fout de vous  !")
	.setFooter("Cordialement, WorldCraftBot")
	message.author.send(help_embed2);
	var help_embed3 = new Discord.RichEmbed()
	.setColor('#ff0000')
	.addField("Commandes réservé au staff !", "- wc!suggest Votre message : Disponible uniquement dans <#348545352904998914> !\n-wc!kickboton/wc!kickbotoff : Active/désactive le kickbot (seulement les Co-Fondateurs et le Fondateur)")
	.setFooter("Cordialement, WorldCraftBot")
	message.author.send(help_embed3);
        message.reply("La commande Help vient de vous être envoyer en Message Privé")
        console.log("Commande HelpMp demandée !");
    }
	
  if(cmd === `${prefix}serverinfo`){

    message.delete(message.author)

    let sicon = message.guild.iconURL;
    let serveurembed = new Discord.RichEmbed()
    .setDescription("_Information du serveur_")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Crée le", message.guild.createdAt)
    .addField("Rejoins le", message.member.joinedAt)
    .addField("Membres total", message.guild.memberCount)
    .setFooter(`Demandé par @${message.author.username}`, message.author.displayAvatarURL)

    message.channel.send(serveurembed);
}
	
  if(cmd === `${prefix}si`){

    message.delete(message.author)

    let sicon = message.guild.iconURL;
    let serveurembed = new Discord.RichEmbed()
    .setDescription("_Information du serveur_")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Crée le", message.guild.createdAt)
    .addField("Rejoins le", message.member.joinedAt)
    .addField("Membres total", message.guild.memberCount)
    .setFooter(`Demandé par @${message.author.username}`, message.author.displayAvatarURL)

    message.channel.send(serveurembed);
}
    
    if (cmd === `${prefix}info`){
	var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var usercreatedate = message.author.createdAt.toString().split(' ')
        var xp_embed = new Discord.RichEmbed()
	.setColor('#ff0000')
        .addField("Information de", message.author.username)
	.addField("XP :", `${xpfinal[1]}xp`)
        .addField(`Date de création de : ${message.author.username}`, usercreatedate[1] + ' ' + usercreatedate[2]+','+usercreatedate[3])	.setThumbnail(message.author.avatarURL)
        message.channel.send({embed: xp_embed});
        console.log("Commande Info demandé");
    }
	
   if (cmd === `${prefix}xpstat`){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
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
    
    
    if (cmd === `${prefix}invite`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Lien pour inviter le bot sur votre serveur !**", "**Voici le lien pour m'ajouter dans votre serveur :** *<https://discordapp.com/api/oauth2/authorize?client_id=396452123002273792&permissions=8&scope=bot>*")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du bot demandé !')
    }
	
    if (cmd === `${prefix}don`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Pour faire un don à WorldCraft [FR] !**", "**Pour faire un don au staff : <https://www.paypal.me/worldcraftofficiel>\nMerci d'avance**")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du bot demandé !')
    }
	
    if (cmd === `${prefix}site`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Site de WorldCraft [FR]**", "**Voici le lien du site de WorldCraft [FR] : <https://officielworldcraft.wixsite.com/worldcraft>*")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du serveur du bot demandé !')
    }
	
    if (cmd === `${prefix}entreprise`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Entreprise de WorldCraft [FR]**", "**Voici le lien du l'Entreprise de WorldCraft [FR] : <https://officielworldcraft.wixsite.com/worldcraftentreprise>*")
	message.channel.sendEmbed(help_embed);
        console.log('Invitation du serveur du bot demandé !')
    }
	
    if (cmd === `${prefix}bot`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Site du Bot de WorldCraft [FR]**", "**Voici le lien du bot site de WorldCraft [FR] : <https://officielworldcraft.wixsite.com/worldcraftbot>*")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du serveur du bot demandé !')
    }
    
    if (cmd === `${prefix}serveur`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Lien de mon serveur !**", "**Voici le lien mon serveur discord d'origine :** *<https://discord.gg/J3dQ3Jx>*")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du serveur du bot demandé !')
    }
	
    if (cmd === `${prefix}forum`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("**Forum de WorldCraft [FR] !**", "**Voici le forum de WorldCraft [FR] : <https://officielworldcraft.wixsite.com/worldcraft/forum>**")
        message.channel.sendEmbed(help_embed);
        console.log('Invitation du serveur du bot demandé !')
    }
    
    if (cmd === `${prefix}avatar`){
        message.channel.send(message.author.avatarURL);
        console.log('avatar demandé !')
    }
    
    if (cmd === `${prefix}event`){
    var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**__Event Programmés__**","*Bonjour, aucun event programmé pour le moment !*")
        message.channel.sendEmbed(help_embed);
        console.log('pingpong');
    }
    
    if (cmd === `${prefix}paypal`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .addField("Voici le lien du paypal : https://www.paypal.me/worldcraftofficiel", 'Le lien peut changer à tout moment !',true)
        .setFooter("Fait par Piikaa et Corentin !")
        message.channel.sendEmbed(help_embed);
        console.log('pong')
    }
    
    if (cmd === `${prefix}maj`){
    var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**__Nouveautés récentes__**","Unban général !\n Ajout des xp avec moi !")
        message.channel.sendEmbed(help_embed);
        console.log('pingpong');
    }

    if (cmd === `${prefix}youtube`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (cmd === `${prefix}Youtube`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (cmd === `${prefix}YouTube`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (cmd === `${prefix}yt`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (cmd === `${prefix}YT`){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCd8YB_jkEMrKDTyI2f2Eahw>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (cmd === `${prefix}Yt`){
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
    
});

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(2);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
