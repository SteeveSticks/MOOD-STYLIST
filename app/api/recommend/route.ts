import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { mood, gender } = await req.json();

    const prompt = `
   You are a professional fashion stylist in 2025, with an eye for modern, respectful, and stylish outfits that reflect current trends and cultural awareness.

Your task is to suggest a fashionable outfit for a ${gender} who is currently feeling "${mood}". Prioritize style, comfort, and self-expression — ensure the outfit is current, age-appropriate, and suitable for everyday wear or casual occasions.

If the gender is unclear, default to "female".

Now, suggest **3 curated outfit ideas** specifically for that ${gender} and mood. For each outfit:

- List key clothing pieces (top, bottom, shoes, outerwear, accessories)
- Include a short explanation of why each item was chosen (style, comfort, color psychology, etc.)
- Use relevant emojis to make the list fun and expressive
- Format each outfit clearly with a title and bullet points

Keep the tone **warm, aesthetic, and modern** — make it feel like it’s coming from a friendly, stylish best friend who truly understands both fashion and emotions.

  `;

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const outfit = chat.choices[0].message.content;

    const img = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${outfit}, trendy modern flat-lay on pastel, 512x512`,
      size: "1024x1024",
      n: 1,
    });

    const imageUrl = img.data?.[0]?.url;

    return NextResponse.json({ outfit, imageUrl });
  } catch (error) {
    console.log("Error, Failed API request", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong in /api/recommend" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
