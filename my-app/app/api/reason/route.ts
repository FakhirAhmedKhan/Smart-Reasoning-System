import { NextRequest, NextResponse } from "next/server";

type Step = {
  title: string;
  reason: string;
  result: string;
};

type AIResponse = {
  steps: Step[];
  finalAnswer: string;
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.Google_Key;

    if (!apiKey) {
      console.error("API Key missing");
      return NextResponse.json(
        { error: "Server configuration error. API Key missing." },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { problem } = body;

    if (
      !problem ||
      typeof problem !== "string" ||
      problem.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid input. 'problem' must be a non-empty string." },
        { status: 400 },
      );
    }

    const prompt = `
Break the problem into steps.
Explain why each step makes sense.
Return ONLY valid JSON in this format:

{
 "steps":[
   {"title":"","reason":"","result":""}
 ],
 "finalAnswer":""
}

Problem:
${problem}
`;

    const aiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a structured reasoning engine. Always return valid JSON only.\n\n${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!aiRes.ok) {
      const errorText = await aiRes.text();
      console.error("Google AI Request Failed:", aiRes.status, errorText);
      return NextResponse.json(
        { error: "AI request failed", details: errorText, status: aiRes.status },
        { status: 500 },
      );
    }

    const aiData = await aiRes.json();
    const rawContent = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      console.error("Invalid AI Response Format:", JSON.stringify(aiData));
      return NextResponse.json(
        { error: "Invalid AI response format." },
        { status: 500 },
      );
    }

    // Improve JSON cleaning
    const cleanedContent = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: AIResponse;

    try {
      parsed = JSON.parse(cleanedContent);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      console.error("Raw Content:", rawContent); // Log the raw content to see what's wrong
      return NextResponse.json(
        { error: "Failed to parse AI JSON response.", raw: rawContent },
        { status: 500 },
      );
    }

    if (
      !parsed ||
      !Array.isArray(parsed.steps) ||
      typeof parsed.finalAnswer !== "string"
    ) {
      console.error("Invalid Structure:", parsed);
      return NextResponse.json(
        { error: "AI returned invalid structure." },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error("Reason API Error:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
