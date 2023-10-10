import telebot
from telebot import types

token = "6630716558:AAFAb2rnZBwTF__v0bzYQ6QYwK3Obg6nUW4"
bot = telebot.TeleBot(token, parse_mode="HTML")


def inline_keybord():
    markup = types.InlineKeyboardMarkup()
    url = types.WebAppInfo("https://stickman135.github.io/Sushi_menu/")
    button = types.InlineKeyboardButton(text="ОтКрЫтЬ сТрАнИцУ", web_app=url)
    markup.add(button)
    return markup


@bot.message_handler(commands=["start"])
def send_welcome(message: types.Message):
    bot.send_message(message.chat.id, "Chose 1 game", reply_markup=inline_keybord())
    

bot.infinity_polling()
