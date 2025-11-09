import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    const prompt = `You are a medical education assistant. Based on the following patient information, provide an educational summary. This is NOT a diagnosis, but educational information only.

Patient Information:
- Sex: ${formData.sex}
- Age Group: ${formData.ageGroup}
- Symptoms: ${formData.symptoms}
- Onset: ${formData.onset || 'Not specified'}
- Severity (1-10): ${formData.severity || 'Not specified'}
- Existing Conditions: ${formData.conditions || 'None'}
- Allergies: ${formData.allergies || 'None'}
- Current Medications: ${formData.medications || 'None'}
- What makes it better: ${formData.better || 'Not specified'}
- What makes it worse: ${formData.worse || 'Not specified'}
- What has been tried: ${formData.tried || 'Nothing yet'}

Please provide:
1. A brief summary of the symptoms and key information
2. 2-3 possible conditions that could explain these symptoms (for educational purposes only)
3. 4-5 general self-care recommendations
4. Specific warning signs that would require immediate medical attention

Format your response as a JSON object with the following structure:
{
  "summary": "Brief summary text",
  "possibleConditions": [
    {
      "name": "Condition name",
      "description": "Educational description"
    }
  ],
  "selfCare": [
    "Self-care recommendation 1",
    "Self-care recommendation 2"
  ],
  "warningSign": [
    "Warning sign 1",
    "Warning sign 2"
  ]
}

Remember: This is educational information only, not medical advice. Always emphasize the importance of consulting healthcare professionals.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical education assistant. You provide educational information only, not medical diagnoses or treatment advice. Always remind users to consult healthcare professionals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const parsedResponse = JSON.parse(aiResponse || '{}');

    return NextResponse.json({
      success: true,
      data: parsedResponse
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate summary. Please try again.'
      },
      { status: 500 }
    );
  }
}
