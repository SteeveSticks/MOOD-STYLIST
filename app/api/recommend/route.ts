import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { mood } = await req.json();

    const prompt = `
    You are a fashion stylist.

   First, determine if the person is male or female based on this mood description: "${mood}". 

   If you can't tell, default to female.

    Then, suggest 3 stylish outfit ideas specifically for that gender and mood. Each outfit should:
    - Mention items (e.g., shirt, pants, shoes, accessories)
    - Explain the reason behind each item briefly
    - Add relevant emojis
    - Keep the format friendly, aesthetic, and concise

   Return it in a clear and nicely formatted list.
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
