import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { question, formData, previousSummary } = await request.json();

    if (!question || !question.trim()) {
      return NextResponse.json(
        { success: false, error: 'Question is required' },
        { status: 400 }
      );
    }

    const contextPrompt = `You are a helpful medical education assistant. A patient has asked a follow-up question about their symptoms.

Patient Information:
- Sex: ${formData.sex}
- Age Group: ${formData.ageGroup}
- Symptoms: ${formData.symptoms}
- Existing Conditions: ${formData.conditions || 'None'}
- Current Medications: ${formData.medications || 'None'}

Previous Summary:
${previousSummary || 'No previous summary available'}

Patient's Follow-Up Question:
${question}

Please provide a helpful, educational response to their question. Remember:
1. This is educational information only, not medical advice
2. Encourage them to consult healthcare professionals for diagnosis and treatment
3. Be empathetic and supportive
4. Provide clear, easy-to-understand information
5. If the question is about serious symptoms, remind them to seek immediate medical care

Provide your response in a friendly, conversational tone.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a compassionate medical education assistant. You provide educational information only, not medical diagnoses or treatment advice. Always remind users to consult healthcare professionals for proper medical care."
        },
        {
          role: "user",
          content: contextPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      answer: aiResponse
    });

  } catch (error) {
    console.error('Error processing follow-up question:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process your question. Please try again.'
      },
      { status: 500 }
    );
  }
}
