import Anthropic from 'anthropic';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});