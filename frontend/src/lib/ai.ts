import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "@firebase/ai";
import type { GenerativeModel } from "@firebase/ai";
import { buildSystemPrompt } from "./systemPrompt";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let cachedModel: GenerativeModel | null = null;

export function getChatModel(): GenerativeModel {
  if (cachedModel) return cachedModel;

  const app = initializeApp(firebaseConfig);
  const ai = getAI(app, { backend: new GoogleAIBackend() });

  cachedModel = getGenerativeModel(ai, {
    model: "gemini-3.5-flash-lite",
    systemInstruction: buildSystemPrompt(),
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 700,
    },
  });

  return cachedModel;
}
