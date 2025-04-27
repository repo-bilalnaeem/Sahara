import OpenAI from "openai";
import {
  sinhalaAlphabets,
  tamilAlphabets,
  hindiAlphabets,
  teluguAlphabets,
} from "./utils/languages";

const API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY;

if (!API_KEY) {
  throw new Error(
    "Missing OpenAI API Key. Please set OPENAI_API_KEY in your .env"
  );
}

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File;

//     const openai = new OpenAI({ apiKey: API_KEY });

//     const response = await openai.audio.transcriptions.create({
//       file,
//       model: "whisper-1",
//     });

//     return Response.json({ text: response.text });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Failed to transcibe" });
//   }

//   // const transcription = await OpenAI.Audio.Transcriptions.
// }

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    const openai = new OpenAI({ apiKey: API_KEY });

    const transcriptionResponse = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
    });

    let text = transcriptionResponse.text;

    const containsLanguage = (text: string, alphabets: string[]) => {
      return alphabets.some((char) => text.includes(char));
    };

    const isHindi = containsLanguage(text, hindiAlphabets);
    const isTamil = containsLanguage(text, tamilAlphabets);
    const isTelugu = containsLanguage(text, teluguAlphabets);
    const isSinhala = containsLanguage(text, sinhalaAlphabets);

    if (isHindi || isTamil || isTelugu || isSinhala) {
      // Translate to Urdu using GPT
      const translationResponse = await openai.chat.completions.create({
        model: "gpt-4", // or "gpt-3.5-turbo" if you want cheaper
        messages: [
          {
            role: "system",
            content:
              "You are a translator. Translate the user's message into Urdu while keeping its original meaning.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3,
      });

      text = translationResponse.choices[0].message.content || text;
    }

    return Response.json({ text });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to transcribe or translate" });
  }
}
