# 🚀 Deployment Guide

## Environment Variables Setup

To enable AI functionality, you need to add your OpenAI API key to Netlify.

### Option 1: Via Netlify UI (Recommended)

1. Go to https://app.netlify.com/sites/same-frgw0dgyauf-latest/configuration/env
2. Click "Add a variable"
3. Add:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key (starts with `sk-proj-...`)
4. Click "Save"
5. Go to "Deploys" and click "Trigger deploy" → "Clear cache and deploy site"

### Option 2: Via Netlify CLI

```bash
# Login to Netlify
npx netlify login

# Link to your site
npx netlify link --name same-frgw0dgyauf-latest

# Set the environment variable
npx netlify env:set OPENAI_API_KEY "your-api-key-here"

# Deploy
npx netlify deploy --prod --build
```

## Getting an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key immediately (you won't see it again!)
5. Add it to Netlify as shown above

## Live Site

- **URL:** https://same-frgw0dgyauf-latest.netlify.app
- **Status:** Deployed and working

## What Works Without API Key

- ✅ Form submission
- ✅ Data persistence (localStorage)
- ✅ Voice recognition
- ✅ UI and navigation

## What Requires API Key

- 🔑 AI-generated medical summaries
- 🔑 Follow-up questions with AI responses

---

**Important:** Never commit your API key to Git. It's already excluded via `.gitignore` (`.env*` pattern).
