
import { Step } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    title: "1. The 'Clean' Slate",
    description: "Android 4.2 is slow. We need to strip it to the bare bones.",
    details: [
      "Factory Reset the phone from Settings > Backup & Reset.",
      "Skip Google Sign-in (it's slow and mostly broken on older versions).",
      "Disable 'S-Voice' and all pre-installed Samsung bloatware.",
      "Enable 'Developer Options' and set all Animation Scales to OFF."
    ],
    tips: "Every megabyte of RAM counts. The S7582 only has 768MB!",
    icon: "🧹"
  },
  {
    id: 2,
    title: "2. The Modern Portal",
    description: "The stock browser is obsolete. We need a modern engine.",
    details: [
      "Sideload an APK of 'Kiwi Browser' or 'Firefox Focus' via SD Card.",
      "Go to Settings > Display and set Screen Timeout to 'Never' or 30 minutes.",
      "Install 'Activity Launcher' to create a shortcut for a full-screen web view."
    ],
    tips: "Kiwi Browser allows Chromium features even on older Android versions.",
    icon: "🌍"
  },
  {
    id: 3,
    title: "3. Host & Deploy",
    description: "Put this code online so your phone can access it.",
    details: [
      "Push this code to a GitHub Repository.",
      "Enable 'GitHub Pages' in the repository settings.",
      "Open the generated URL (e.g., https://harsh1991mishra.github.io/project-phoenix) on your S7582 browser.",
      "Tap 'Menu' > 'Add to Home Screen' to create the 'AI Assistant' app icon."
    ],
    tips: "Hosting on GitHub Pages is free and works perfectly for this assistant interface.",
    icon: "🚀"
  },
  {
    id: 4,
    title: "4. Hardware Modding",
    description: "Make it a portable desktop assistant.",
    details: [
      "Attach a magnetic phone holder to your desk or a 3D-printed stand.",
      "Use a high-quality Micro-USB cable for constant power.",
      "Optional: Connect a small Bluetooth speaker or use the 3.5mm jack for better AI voice quality."
    ],
    tips: "Old batteries can be unreliable; keep it plugged in to act as a 24/7 smart display.",
    icon: "🛠️"
  }
];

export const PORTFOLIO_LINKS = {
  github: "https://github.com/harsh1991mishra",
  website: "https://harsh1991mishra.github.io/",
  linkedin: "https://www.linkedin.com/in/harsh1991mishra/"
};
