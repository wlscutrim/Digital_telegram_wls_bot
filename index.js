const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');
const token = '1399427092:AAE9zikP4SCTNUIKWJThrjgOr1j3f7XCcG4';

const bot = new TelegramBot(token,{polling: true});

bot.on('message', async function(msg){
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(),msg.text);

    let responseText = dfResponse.text;

    if (dfResponse.intent == 'Treino específico'){
        responseText = await youtube.searchVideoURL(responseText,dfResponse.fields.corpo.stringValue);
    }
    
    bot.sendMessage(chatId,responseText);
});
