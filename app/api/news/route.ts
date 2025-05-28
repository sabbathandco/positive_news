import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { anthropic } from '@/lib/anthropic';

const POSITIVE_PROMPT = `
You are a helpful assistant that curates uplifting, inspiring, solution‑focused news.
Please return JSON array with objects:
{
  "title": string,
  "url": string,
  "summary": string (<= 200 chars),
  "image_url": string | null,
  "source": string
}
Fetch stories that:
- Exclude anything about Trump, Israel, or Russia.
- Skew at least 3× positive vs negative tone.
- Favor categories: art & design, health & wellness, food, local events, music, nature, surfing, skateboarding, travel, yoga, meditation, fitness, fashion, technology, AI.
Output strictly JSON – no markdown.
Return {{SIZE}} items, fresh within last 48h.
`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || '0');
  const size = Number(searchParams.get('size') || '10');

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-search-preview',
      web_search_options: {},
      messages: [
        {
          role: 'user',
          content: POSITIVE_PROMPT.replace('{{SIZE}}', size.toString()),
        },
      ],
    });

    let jsonText = completion.choices[0].message.content.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json?|```/g, '').trim();
    }
    const items = JSON.parse(jsonText);

    // Fallback image via anthropic if missing
    const withImages = await Promise.all(
      items.map(async (item: any) => {
        if (item.image_url) return item;
        try {
          const res = await anthropic.messages.create({
            model: 'claude-opus-4-20250514',
            max_tokens: 100,
            messages: [
              { role: 'user', content: `Provide a royalty‑free image URL related to: ${item.title}` },
            ],
          });
          const url = res.content[0]?.text?.match(/https?:\S+/)?.[0] || null;
          return { ...item, image_url: url };
        } catch {
          return { ...item, image_url: null };
        }
      })
    );

    return NextResponse.json(withImages);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}