
# 🤖 Project Baba: The AI Phoenix
> Transforming a vintage Samsung Galaxy S Duos 2 (GT-S7582) into a modern, Gemini-powered AI Assistant.

![Project Status](https://img.shields.io/badge/Status-Active-orange)
![Recycle](https://img.shields.io/badge/Sustainability-High-green)
![AI](https://img.shields.io/badge/Brain-Gemini_3.0-blue)

## 🌟 Overview
Project **Baba** is a sustainable hardware revival project. By leveraging the **Google Gemini API**, we breathe new life into 2013-era hardware, turning an obsolete Samsung smartphone into a sophisticated AI home companion.

### 🚀 Key Features
- **Voice-to-Voice Interaction**: Talk to Baba naturally via the browser.
- **Real-time Grounding**: Uses Google Search to answer questions about the world today.
- **Multi-Modal Bot**: A companion Telegram Bot (`baba.ai`) that accepts text and voice commands.
- **Edge Computing (Lite)**: Optimized for 768MB RAM devices via specialized browser environments.
- **Wisdom Engine**: A custom system instruction that gives Baba a "wise, storytelling grandfather" personality.

## 🛠️ Hardware Requirements
- **Device**: Samsung Galaxy S Duos 2 (S7582) or any Android 4.2+ device.
- **RAM**: 768MB (Stripped OS recommended).
- **Browser**: [Kiwi Browser](https://kiwibrowser.com/) (Required for modern JS/WASM support).

## 📦 Installation & Deployment

### 1. Web Terminal
1. Fork this repository.
2. Add your `API_KEY` to GitHub Secrets.
3. Deploy to **GitHub Pages**.
4. Open the URL in Kiwi Browser on your S7582.

### 2. Telegram Bot (`baba.ai`)
1. Create a bot via `@BotFather` on Telegram.
2. Run the `bot/baba_bot.py` script on a server or your local PC.
3. Use the `/start` command to begin talking to Baba remotely.

## 🧩 Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons.
- **AI Core**: @google/genai (Gemini 3.0 Flash).
- **Voice**: Web Speech API & Gemini TTS.
- **Hosting**: GitHub Pages & GitHub Actions.

## 🤝 Contribution
Project Baba is open-source. Help us reduce e-waste by expanding support for more legacy devices!

---
*Created by [Harsh Mishra](https://github.com/harsh1991mishra)*
