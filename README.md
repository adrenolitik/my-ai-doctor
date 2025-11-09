# My AI Doctor - Medical Symptom Checker

[![GitHub](https://img.shields.io/badge/GitHub-adrenolitik/my--ai--doctor-blue?logo=github)](https://github.com/adrenolitik/my-ai-doctor)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?logo=netlify)](https://same-frgw0dgyauf-latest.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)](https://openai.com)

A comprehensive medical symptom checker web application powered by AI. This application helps users understand their symptoms and provides educational information about possible conditions and self-care recommendations.

⚠️ **IMPORTANT DISCLAIMER**: This application provides educational information only and is NOT a substitute for professional medical care. Always consult a qualified healthcare professional for diagnosis and treatment.

## 🌟 Features

### 1. **Comprehensive Symptom Form**
- Detailed patient information collection
- Multiple field types (text, textarea, select)
- Voice recognition for easier input
- Auto-save functionality (localStorage)
- Responsive design

### 2. **AI-Powered Medical Summaries**
- Real-time AI analysis using OpenAI GPT-4o-mini
- Personalized educational summaries
- Possible condition considerations
- Self-care recommendations
- Warning signs for immediate medical attention

### 3. **Follow-Up Questions**
- Interactive chat interface
- Context-aware AI responses
- Question history with timestamps
- Unlimited questions capability
- Local storage persistence

### 4. **User Experience**
- Clean, professional medical interface
- Loading animations and states
- Error handling with retry options
- Print-friendly summary page
- Mobile responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adrenolitik/my-ai-doctor.git
   cd my-ai-doctor
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up OpenAI API Key**
   - Create an account at https://platform.openai.com
   - Generate an API key at https://platform.openai.com/api-keys
   - Create/edit `.env.local` file:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Step 1: Fill Out the Form
1. Enter your email (required for tracking)
2. Select your sex and age group
3. Describe your symptoms in detail
4. Provide information about:
   - Existing medical conditions
   - Allergies
   - Current medications
   - When symptoms started
   - What makes it better/worse
   - Severity level (1-10)
   - Treatments already tried

### Step 2: Get Your Summary
1. Click "Submit for Summary"
2. Wait for AI to generate your educational summary
3. Review the comprehensive analysis including:
   - AI-generated summary
   - Patient information
   - Possible considerations
   - Self-care recommendations
   - Warning signs

### Step 3: Ask Follow-Up Questions
1. Scroll to the "Ask Follow-Up Questions" section
2. Type your question
3. Click "Ask Question"
4. Get context-aware AI responses
5. Ask as many questions as needed

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Runtime**: Bun
- **Deployment**: Netlify-ready

## 📁 Project Structure

```
my-ai-doctor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-summary/route.ts  # AI summary generation
│   │   │   └── follow-up/route.ts         # Follow-up questions
│   │   ├── results/
│   │   │   └── page.tsx                   # Results page
│   │   ├── page.tsx                       # Main form
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── lib/
│       └── utils.ts
├── .env.local                             # Environment variables
├── API_SETUP.md                           # API setup guide
└── README.md
```

## 💰 Cost Estimation

Using OpenAI GPT-4o-mini:
- **Input**: ~$0.15 per 1M tokens
- **Output**: ~$0.60 per 1M tokens
- **Per summary**: ~$0.01-0.02
- **Per follow-up**: ~$0.005-0.01

OpenAI provides $5 in free credits for new accounts.

## 🔒 Privacy & Security

- Patient data is stored only in browser localStorage
- No data is sent to external servers (except OpenAI for processing)
- API keys are secured in environment variables
- No user tracking or analytics (by default)

## 🎨 Customization

### Change Colors
Edit the color codes in `src/app/page.tsx` and `src/app/results/page.tsx`:
- Primary blue: `#38506a`
- Light background: `#f8f9fb`
- Button blue: `#0066cc`

### Modify AI Prompts
Edit the prompts in:
- `src/app/api/generate-summary/route.ts` - Main summary prompt
- `src/app/api/follow-up/route.ts` - Follow-up question prompt

## 🚀 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   bun run build
   ```

2. **Deploy**
   - The project includes `netlify.toml` configuration
   - Connect your repository to Netlify
   - Add `OPENAI_API_KEY` to Netlify environment variables
   - Deploy!

## 📝 License

This project is for educational purposes. Please ensure compliance with medical regulations and OpenAI's usage policies in your jurisdiction.

## 🆘 Support

For issues or questions:
- Check the `API_SETUP.md` file for API configuration
- Review the `.same/todos.md` for feature roadmap
- Contact Same support at support@same.new

## 🙏 Acknowledgments

- Built with Same - https://same.new
- Powered by OpenAI GPT-4o-mini
- Design inspired by My AI Doctor

---

**Remember**: This is educational software. Always consult healthcare professionals for medical advice!
