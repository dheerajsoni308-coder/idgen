import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client
// Note: We initialize inside the handler to ensure environment variables are loaded
function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        throw new Error("GEMINI_API_KEY is not set or is using the default placeholer in .env.local");
    }
    return new GoogleGenAI({ apiKey });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { imageBase64 } = body;

        if (!imageBase64) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const ai = getGeminiClient();

        // Strip the data:image/xxx;base64, prefix if present
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

        const prompt = `You are an expert React and Tailwind CSS developer. 
I am giving you an image of a physical ID card or an ID card design. 
I need you to write the complete HTML and Tailwind CSS code needed to recreate this EXACT visual layout from scratch. Do not use the image as a background. 
Instead, draw the boxes, headers, footer, colors, and typography using HTML divs and Tailwind classes.

Use the following placeholders exactly where the student's data should go:
{{photoUrl}} (use this as the src in an <img> tag for the portrait)
{{name}}, {{idNumber}}, {{dob}}, {{bloodGroup}}, {{phone}}, {{department}}, {{fatherName}}, {{address}}

If the image shows specific labels like "Name:", "D.O.B:", or "Blood Group:", be sure to include those labels in the HTML next to the placeholders just like they appear in the image. Add proper positioning, fonts, and colors to match the look.

Return a JSON object containing a single string property named "html". Nothing else.
Example:
{
  "html": "<div class='w-[2.125in] h-[3.375in] bg-white border border-gray-300 rounded-lg flex flex-col items-center overflow-hidden'><div class='w-full bg-blue-600 text-white text-center py-2 font-bold'>SCHOOL NAME</div><img src='{{photoUrl}}' class='w-24 h-32 object-cover mt-4 border' /><div class='w-full p-4 text-xs space-y-1'><div class='flex'><span class='font-bold w-12'>Name</span><span class='font-semibold'>: {{name}}</span></div></div></div>"
}

Return ONLY valid JSON. Return no markdown backticks like \`\`\`json.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                prompt,
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: 'image/jpeg' // We'll assume jpeg/png, the model handles both
                    }
                }
            ],
            config: {
                responseMimeType: "application/json",
            }
        });

        const textResponse = response.text;
        if (!textResponse) {
            throw new Error("Empty response from AI");
        }

        // Safety: strip markdown ```json and ``` if the model included it
        const cleanedText = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Safety: parse the json
        const parsedLayout = JSON.parse(cleanedText);

        return NextResponse.json(parsedLayout);

    } catch (error: any) {
        console.error("Gemini API Error details:", error);
        const errMessage = error?.message || error?.toString() || 'Error generating layout from image';
        return NextResponse.json({ error: errMessage }, { status: 500 });
    }
}
