
import { Step } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    title: "1. Hardware Strip-Down",
    description: "Prepare the S7582 for ultra-lean operation.",
    details: [
      "Factory Reset via Recovery Mode (Vol Up + Home + Power).",
      "Disable 'Google Play Services' if possible to save 200MB RAM.",
      "Install 'Nova Launcher' or 'FLauncher' for a minimalist UI.",
      "Set animations to 0x in Developer Settings."
    ],
    tips: "Every megabyte of RAM counts on the S7582's 768MB limit.",
    icon: "⚙️"
  },
  {
    id: 2,
    title: "2. Browser Uplift",
    description: "Bridge the gap between 2013 and 2025.",
    details: [
      "Download Kiwi Browser APK (v116+ supported).",
      "Sideload via USB Debugging or SD Card.",
      "Enable 'Desktop Site' by default for better rendering.",
      "Kiwi provides the V8 engine Baba needs to think."
    ],
    tips: "The stock browser will fail; Kiwi is your only window to the modern web.",
    icon: "🌐"
  },
  {
    id: 3,
    title: "3. Deploy to GitHub",
    description: "Give Baba a home on the cloud.",
    details: [
      "Push this code to your GitHub Repository.",
      "Set your API_KEY in GitHub Repository Secrets.",
      "Enable GitHub Pages under Settings > Pages.",
      "Wait for the green checkmark on your Actions tab."
    ],
    tips: "Deployment takes about 2 minutes. Once done, your URL is live globally.",
    icon: "🚀"
  },
  {
    id: 4,
    title: "4. Telegram Bot (baba.ai)",
    description: "Control your phone assistant from anywhere.",
    details: [
      "Message @BotFather on Telegram to create 'baba_assistant_bot'.",
      "Get your BOT_TOKEN and add it to your server environment.",
      "Run the provided Python script in the /bot folder.",
      "Now you can text or voice command Baba from your primary phone!"
    ],
    tips: "The Telegram Bot uses the same AI brain as the phone, keeping the personality consistent.",
    icon: "📱"
  }
];

export const PORTFOLIO_LINKS = {
  github: "https://github.com/harsh1991mishra",
  website: "https://harsh1991mishra.github.io/",
  linkedin: "https://www.linkedin.com/in/harsh1991mishra/"
};
