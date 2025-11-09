'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    sex: '',
    ageGroup: '',
    symptoms: '',
    conditions: '',
    allergies: '',
    medications: '',
    onset: '',
    better: '',
    worse: '',
    severity: '',
    tried: ''
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('myAIDoctorForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage whenever form changes
  useEffect(() => {
    localStorage.setItem('myAIDoctorForm', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    const emptyForm = {
      email: '',
      sex: '',
      ageGroup: '',
      symptoms: '',
      conditions: '',
      allergies: '',
      medications: '',
      onset: '',
      better: '',
      worse: '',
      severity: '',
      tried: ''
    };
    setFormData(emptyForm);
    localStorage.removeItem('myAIDoctorForm');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data and redirect to results page
    localStorage.setItem('myAIDoctorForm', JSON.stringify(formData));
    router.push('/results');
  };

  const startDictation = (fieldName: string) => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData({
          ...formData,
          [fieldName]: formData[fieldName as keyof typeof formData] + ' ' + transcript
        });
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

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
          My AI Doctor
        </h1>

        {/* Info Box */}
        <div className="bg-[#e3f0ff] border-l-4 border-[#38506a] p-6 mb-8 rounded-r-lg">
          <p className="mb-3 text-[#38506a]">
            <strong>My AI Doctor</strong> provides personalized, educational summaries based on the information you enter. It is{' '}
            <u>not a substitute for professional medical care</u>. Always consult a clinician for diagnosis or treatment.
          </p>
          <p className="mb-3 text-[#38506a]">
            Free users get one summary and one follow-up. Subscribers enjoy unlimited use.
          </p>
          <p className="mb-3 text-[#38506a]">
            This page remembers your answers on <em>this device only</em> to help you continue where you left off. You can clear them anytime.
          </p>
          <p className="mb-3 text-[#38506a]">
            You can type or click <strong>🎤 Speak</strong> to use your voice.
          </p>
          <p className="text-[#38506a]">
            <strong>Press Enter</strong> to move to the next field. Use <strong>Shift+Enter</strong> if you want a new line inside a box.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 mb-6">
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-[#38506a] font-semibold mb-2">
              Your Email (required to track access)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter the email you want to use for access (e.g., name@example.com)."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
          </div>

          {/* Sex and Age Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="sex" className="block text-[#38506a] font-semibold mb-2">
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
              >
                <option value="">Select one…</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other / Prefer not to say</option>
              </select>
            </div>
            <div>
              <label htmlFor="ageGroup" className="block text-[#38506a] font-semibold mb-2">
                Age Group
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
              >
                <option value="">Select one…</option>
                <option>Child (0–12)</option>
                <option>Teen (13–17)</option>
                <option>Adult (18–39)</option>
                <option>Middle Age (40–64)</option>
                <option>Older Adult (65+)</option>
              </select>
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-6">
            <label htmlFor="symptoms" className="block text-[#38506a] font-semibold mb-2">
              Describe your symptoms
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Describe what you feel in detail (where, how it started, timing, triggers, associated signs such as fever, nausea, cough, rash, etc.). The more details you provide, the more specific your educational summary will be."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={() => startDictation('symptoms')}
                className="px-4 py-2 bg-[#e3f0ff] text-[#38506a] rounded-md hover:bg-[#d0e5ff] transition-colors"
              >
                🎤 Speak
              </button>
            </div>
          </div>

          {/* Existing conditions */}
          <div className="mb-6">
            <label htmlFor="conditions" className="block text-[#38506a] font-semibold mb-2">
              Existing conditions
            </label>
            <textarea
              id="conditions"
              name="conditions"
              value={formData.conditions}
              onChange={handleChange}
              placeholder="List any medical conditions you have (for example: diabetes, asthma, high blood pressure, migraines). If none, type 'None'."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={() => startDictation('conditions')}
                className="px-4 py-2 bg-[#e3f0ff] text-[#38506a] rounded-md hover:bg-[#d0e5ff] transition-colors"
              >
                🎤 Speak
              </button>
            </div>
          </div>

          {/* Allergies */}
          <div className="mb-6">
            <label htmlFor="allergies" className="block text-[#38506a] font-semibold mb-2">
              Allergies
            </label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Allergies to medications, foods, or other items (for example: penicillin, peanuts, latex). If none, type 'None'."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={() => startDictation('allergies')}
                className="px-4 py-2 bg-[#e3f0ff] text-[#38506a] rounded-md hover:bg-[#d0e5ff] transition-colors"
              >
                🎤 Speak
              </button>
            </div>
          </div>

          {/* Current medications */}
          <div className="mb-6">
            <label htmlFor="medications" className="block text-[#38506a] font-semibold mb-2">
              Current medications
            </label>
            <textarea
              id="medications"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              placeholder="List the names and doses of medications or supplements you take (for example: metformin 500 mg twice daily; vitamin D 1000 IU daily). If none, type 'None'."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={() => startDictation('medications')}
                className="px-4 py-2 bg-[#e3f0ff] text-[#38506a] rounded-md hover:bg-[#d0e5ff] transition-colors"
              >
                🎤 Speak
              </button>
            </div>
          </div>

          {/* When did it start */}
          <div className="mb-6">
            <label htmlFor="onset" className="block text-[#38506a] font-semibold mb-2">
              When did it start?
            </label>
            <input
              type="text"
              id="onset"
              name="onset"
              value={formData.onset}
              onChange={handleChange}
              placeholder="When did your current symptoms start (for example: 2 days ago, last night, this morning, 3 weeks ago)?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
          </div>

          {/* What makes it better */}
          <div className="mb-6">
            <label htmlFor="better" className="block text-[#38506a] font-semibold mb-2">
              What makes it better?
            </label>
            <input
              type="text"
              id="better"
              name="better"
              value={formData.better}
              onChange={handleChange}
              placeholder="List anything that improves your symptoms (for example: rest, ice/heat, certain positions, meals, ibuprofen). If unsure, type 'Not sure'."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
          </div>

          {/* What makes it worse */}
          <div className="mb-6">
            <label htmlFor="worse" className="block text-[#38506a] font-semibold mb-2">
              What makes it worse?
            </label>
            <input
              type="text"
              id="worse"
              name="worse"
              value={formData.worse}
              onChange={handleChange}
              placeholder="List anything that worsens your symptoms (for example: movement, certain foods, deep breaths, activity). If unsure, type 'Not sure'."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
          </div>

          {/* Severity */}
          <div className="mb-6">
            <label htmlFor="severity" className="block text-[#38506a] font-semibold mb-2">
              Severity (1–10)
            </label>
            <input
              type="text"
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              placeholder="How severe are your symptoms on a scale from 1 to 10, where 10 is the most severe pain or discomfort you can imagine?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
          </div>

          {/* What have you tried */}
          <div className="mb-6">
            <label htmlFor="tried" className="block text-[#38506a] font-semibold mb-2">
              What have you tried?
            </label>
            <textarea
              id="tried"
              name="tried"
              value={formData.tried}
              onChange={handleChange}
              placeholder="Treatments or remedies you have already tried (for example: acetaminophen 500 mg, ice pack, rest, hydration, antihistamines). Include approximate doses and results if known."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38506a] focus:border-transparent"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={() => startDictation('tried')}
                className="px-4 py-2 bg-[#e3f0ff] text-[#38506a] rounded-md hover:bg-[#d0e5ff] transition-colors"
              >
                🎤 Speak
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-6 p-4 bg-[#fff4e6] border border-[#9f5c2b] rounded-md">
            <p className="text-[#9f5c2b] font-medium">
              ⏳ Please complete all fields you can. After clicking <strong>Submit for Summary</strong>, wait a few moments while your educational summary is generated.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear saved answers
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#0066cc] text-white font-semibold rounded-md hover:bg-[#0052a3] transition-colors flex-1 sm:flex-initial"
            >
              Submit for Summary
            </button>
          </div>
        </form>

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
