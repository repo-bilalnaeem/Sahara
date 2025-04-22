import OpenAI from "openai";

const API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY;

if (!API_KEY) {
  throw new Error(
    "Missing OpenAI API Key. Please set EXPO_PUBLIC_OPENAI_KEY in your .env"
  );
}

export async function POST(request: Request) {
  try {
    const { text, voice = "nova" } = await request.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Missing text input" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const openai = new OpenAI({ apiKey: API_KEY });

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice,
      input: text,
      response_format: "mp3",
    });

    // Convert the response to an ArrayBuffer
    const arrayBuffer = await mp3.arrayBuffer();

    // Return directly as a binary response
    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=\"speech.mp3\"",
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate speech" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
