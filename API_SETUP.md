# OpenAI API Setup Instructions

## How to Get Your OpenAI API Key

1. **Create an OpenAI Account**
   - Go to https://platform.openai.com
   - Sign up or log in to your account

2. **Generate an API Key**
   - Navigate to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (you won't be able to see it again!)

3. **Add the Key to Your Project**
   - Open the `.env.local` file in the project root
   - Replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   ```

4. **Restart the Development Server**
   - Stop the current dev server (Ctrl+C)
   - Run `bun run dev` again
   - The API will now work with real AI-generated medical summaries

## Important Notes

- **Keep your API key secure** - Never commit it to version control
- **API Usage Costs** - OpenAI charges for API usage. We're using `gpt-4o-mini` which is cost-effective
- **Rate Limits** - Free tier accounts have rate limits. Consider upgrading if needed
- **.env.local is gitignored** - Your API key won't be accidentally committed

## Testing Without an API Key

If you don't have an API key yet, the app will show an error message. You can:
1. Get a free API key from OpenAI (includes free credits)
2. Or modify the API route to return mock data for testing

## Estimated Costs

Using `gpt-4o-mini`:
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens
- Each summary generation costs approximately $0.01-0.02

For a free-tier project or testing, OpenAI provides $5 in free credits.
