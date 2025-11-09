'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  sex: string;
  ageGroup: string;
  symptoms: string;
  conditions: string;
  allergies: string;
  medications: string;
  onset: string;
  better: string;
  worse: string;
  severity: string;
  tried: string;
}

interface AIResponse {
  summary: string;
  possibleConditions: Array<{
    name: string;
    description: string;
  }>;
  selfCare: string[];
  warningSign: string[];
}

interface FollowUpQA {
  question: string;
  answer: string;
  timestamp: Date;
}

export default function Results() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpHistory, setFollowUpHistory] = useState<FollowUpQA[]>([]);
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUpError, setFollowUpError] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('myAIDoctorForm');
    if (savedData) {
      const data = JSON.parse(savedData);
      setFormData(data);
      generateSummary(data);
    } else {
      setLoading(false);
    }

    // Load follow-up history from localStorage
    const savedHistory = localStorage.getItem('myAIDoctorFollowUpHistory');
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setFollowUpHistory(history.map((qa: FollowUpQA) => ({
          ...qa,
          timestamp: new Date(qa.timestamp)
        })));
      } catch (err) {
        console.error('Failed to load follow-up history:', err);
      }
    }
  }, []);

  // Save follow-up history to localStorage whenever it changes
  useEffect(() => {
    if (followUpHistory.length > 0) {
      localStorage.setItem('myAIDoctorFollowUpHistory', JSON.stringify(followUpHistory));
    }
  }, [followUpHistory]);

  const generateSummary = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setAiResponse(result.data);
      } else {
        setError(result.error || 'Failed to generate summary');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!followUpQuestion.trim()) {
      return;
    }

    try {
      setFollowUpLoading(true);
      setFollowUpError(null);

      const response = await fetch('/api/follow-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: followUpQuestion,
          formData,
          previousSummary: aiResponse?.summary
        }),
      });

      const result = await response.json();

      if (result.success) {
        const newQA: FollowUpQA = {
          question: followUpQuestion,
          answer: result.answer,
          timestamp: new Date()
        };

        setFollowUpHistory([...followUpHistory, newQA]);
        setFollowUpQuestion('');
      } else {
        setFollowUpError(result.error || 'Failed to get answer');
      }
    } catch (err) {
      console.error('Error:', err);
      setFollowUpError('Failed to process your question. Please try again.');
    } finally {
      setFollowUpLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#38506a] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-[#38506a]">Generating your educational summary...</h2>
          <p className="text-gray-600 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#38506a] mb-4">Error Generating Summary</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => formData && generateSummary(formData)}
              className="px-6 py-3 bg-[#0066cc] text-white font-semibold rounded-md hover:bg-[#0052a3] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-white border-2 border-[#38506a] text-[#38506a] font-semibold rounded-md hover:bg-[#f0f4f8] transition-colors"
            >
              Return to Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#38506a] mb-4">No data found</h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#0066cc] text-white font-semibold rounded-md hover:bg-[#0052a3] transition-colors"
          >
            Return to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-start mb-6">
          <Image
            src="https://ext.same-assets.com/3389048425/3730764874.png"
            alt="My AI Doctor logo"
            width={64}
            height={64}
            className="rounded-2xl"
          />
          <Image
            src="https://ext.same-assets.com/3389048425/3398826486.jpeg"
            alt="Top Doctor badge"
            width={56}
            height={56}
            className="rounded-full"
          />
        </header>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#38506a] text-center mb-8">
          Your Educational Summary
        </h1>

        {/* Important Notice */}
        <div className="bg-[#fff4e6] border-l-4 border-[#9f5c2b] p-6 mb-8 rounded-r-lg">
          <p className="text-[#9f5c2b] font-semibold mb-2">
            ⚠️ Important Reminder
          </p>
          <p className="text-[#9f5c2b]">
            This is educational information only. It is <strong>not</strong> a diagnosis. Always consult with a qualified healthcare professional for proper medical advice, diagnosis, and treatment.
          </p>
        </div>

        {/* AI-Generated Summary Section */}
        {aiResponse && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm p-8 mb-6 border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">🤖</div>
              <h2 className="text-2xl font-bold text-[#38506a]">
                AI-Generated Educational Summary
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {aiResponse.summary}
            </p>
          </div>
        )}

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#38506a] mb-4 border-b-2 border-[#e3f0ff] pb-2">
            📋 Patient Information
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Patient Profile:</strong> {formData.sex}, {formData.ageGroup}
            </p>
            <p>
              <strong>Chief Complaint:</strong> {formData.symptoms || 'Not specified'}
            </p>
            <p>
              <strong>Onset:</strong> {formData.onset || 'Not specified'}
            </p>
            <p>
              <strong>Severity:</strong> {formData.severity ? `${formData.severity}/10` : 'Not specified'}
            </p>
            {formData.conditions && formData.conditions.toLowerCase() !== 'none' && (
              <p>
                <strong>Existing Conditions:</strong> {formData.conditions}
              </p>
            )}
            {formData.allergies && formData.allergies.toLowerCase() !== 'none' && (
              <p>
                <strong>Known Allergies:</strong> {formData.allergies}
              </p>
            )}
            {formData.medications && formData.medications.toLowerCase() !== 'none' && (
              <p>
                <strong>Current Medications:</strong> {formData.medications}
              </p>
            )}
          </div>
        </div>

        {/* Possible Conditions */}
        {aiResponse && aiResponse.possibleConditions && aiResponse.possibleConditions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-2xl font-bold text-[#38506a] mb-4 border-b-2 border-[#e3f0ff] pb-2">
              🔍 Possible Considerations
            </h2>
            <p className="text-gray-600 mb-4 italic">
              Based on the information provided, here are some educational considerations. This is not a diagnosis.
            </p>
            <div className="space-y-4">
              {aiResponse.possibleConditions.map((condition, index) => (
                <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800 mb-1">{condition.name}</h3>
                  <p className="text-gray-700">
                    {condition.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Self-Care Recommendations */}
        {aiResponse && aiResponse.selfCare && aiResponse.selfCare.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-2xl font-bold text-[#38506a] mb-4 border-b-2 border-[#e3f0ff] pb-2">
              💡 Self-Care Recommendations
            </h2>
            <ul className="space-y-3 text-gray-700">
              {aiResponse.selfCare.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* When to Seek Medical Care */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">
            🚨 When to Seek Medical Care
          </h2>
          <p className="text-red-700 mb-3 font-semibold">
            Seek immediate medical attention if you experience:
          </p>
          <ul className="space-y-2 text-red-700">
            {aiResponse && aiResponse.warningSign && aiResponse.warningSign.length > 0 ? (
              aiResponse.warningSign.map((warning, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{warning}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Severe or worsening symptoms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Difficulty breathing or shortness of breath</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Chest pain or pressure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Confusion, disorientation, or loss of consciousness</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>High fever (over 103°F/39.4°C) or fever that doesn't respond to treatment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Uncontrolled bleeding or severe injury</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Sudden weakness, numbness, or difficulty speaking</span>
                </li>
              </>
            )}
          </ul>
          <p className="text-red-700 mt-4 font-semibold">
            For non-emergency concerns, schedule an appointment with your primary care physician.
          </p>
        </div>

        {/* Follow-up Questions Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#38506a] border-b-2 border-[#e3f0ff] pb-2">
                💬 Ask Follow-Up Questions
              </h2>
            </div>
            {followUpHistory.length > 0 && (
              <button
                onClick={() => {
                  setFollowUpHistory([]);
                  localStorage.removeItem('myAIDoctorFollowUpHistory');
                }}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Clear History
              </button>
            )}
          </div>
          <p className="text-gray-600 mb-6">
            Have questions about your symptoms or the recommendations? Ask below and get educational information.
          </p>

          {/* Follow-up History */}
          {followUpHistory.length > 0 && (
            <div className="mb-6 space-y-4">
              {followUpHistory.map((qa, index) => (
                <div key={index} className="space-y-3">
                  {/* Question */}
                  <div className="flex justify-end">
                    <div className="bg-[#0066cc] text-white rounded-lg rounded-tr-none px-4 py-3 max-w-[80%]">
                      <p className="font-medium mb-1">You asked:</p>
                      <p>{qa.question}</p>
                      <p className="text-xs text-blue-100 mt-2">
                        {new Date(qa.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="flex justify-start">
                    <div className="bg-[#e3f0ff] text-gray-800 rounded-lg rounded-tl-none px-4 py-3 max-w-[80%]">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">🤖</span>
                        <p className="font-medium text-[#38506a]">AI Doctor:</p>
                      </div>
                      <p className="whitespace-pre-line">{qa.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {followUpError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{followUpError}</p>
            </div>
          )}

          {/* Question Form */}
          <form onSubmit={handleFollowUp} className="space-y-4">
            <div className="relative">
              <textarea
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="Ask a follow-up question about your symptoms or the recommendations..."
                rows={4}
                disabled={followUpLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {followUpLoading && (
                <div className="absolute top-2 right-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#38506a]"></div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {followUpHistory.length === 0
                  ? "Ask your first question"
                  : `${followUpHistory.length} question${followUpHistory.length > 1 ? 's' : ''} asked`}
              </p>
              <button
                type="submit"
                disabled={followUpLoading || !followUpQuestion.trim()}
                className="px-6 py-3 bg-[#0066cc] text-white font-semibold rounded-md hover:bg-[#0052a3] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {followUpLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Ask Question</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {followUpHistory.length === 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> You can ask questions like "What should I do if the pain gets worse?", "Are there any foods I should avoid?", or "When should I see a doctor?"
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white border-2 border-[#38506a] text-[#38506a] font-semibold rounded-md hover:bg-[#f0f4f8] transition-colors"
          >
            ← Back to Form
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-[#38506a] text-white font-semibold rounded-md hover:bg-[#2d3f54] transition-colors"
          >
            🖨️ Print Summary
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-700">
            <strong>Disclaimer:</strong> My AI Doctor provides educational information only and is <u>not</u> medical advice. It does not diagnose or treat conditions. If your symptoms are severe, rapidly worsening, or you notice red-flag signs (severe chest pain, trouble breathing, fainting, new weakness or numbness, uncontrolled bleeding, confusion), seek urgent care or call your local emergency number.
          </p>
        </div>
      </div>
    </div>
  );
}
