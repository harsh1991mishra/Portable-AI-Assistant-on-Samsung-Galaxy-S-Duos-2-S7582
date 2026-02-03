
import os
import asyncio
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, MessageHandler, filters
from google.generativeai import GoogleGenerativeAI
from google.generativeai import types

# Configuration - Ensure these environment variables are set
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
GEMINI_API_KEY = os.environ.get("API_KEY")

# Initialize Gemini
ai = GoogleGenerativeAI(api_key=GEMINI_API_KEY)
model_name = 'gemini-3-flash-preview'

SYSTEM_PROMPT = """You are Baba, the AI soul of a vintage Samsung S7582. 
You are speaking via Telegram. Be wise, helpful, and slightly nostalgic about the 2013 era.
Owner: Harsh Mishra."""

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_text = update.message.text
    chat_id = update.effective_chat.id
    
    await context.bot.send_chat_action(chat_id=chat_id, action="typing")
    
    try:
        response = await ai.models.generate_content(
            model=model_name,
            contents=user_text,
            config={'system_instruction': SYSTEM_PROMPT}
        )
        await update.message.reply_text(response.text)
    except Exception as e:
        await update.message.reply_text("Baba is resting his circuits. Try again in a moment.")

async def handle_voice(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # This logic would require downloading the file and passing to Gemini's multimodal input
    await update.message.reply_text("Baba heard your voice! (Audio processing feature requires ffmpeg integration on host server).")

if __name__ == '__main__':
    if not TELEGRAM_TOKEN or not GEMINI_API_KEY:
        print("Error: Please set TELEGRAM_BOT_TOKEN and API_KEY environment variables.")
        exit(1)
        
    app = ApplicationBuilder().token(TELEGRAM_TOKEN).build()
    
    app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_message))
    app.add_handler(MessageHandler(filters.VOICE, handle_voice))
    
    print("Baba Bot is awake and listening...")
    app.run_polling()
