'use server';

/**
 * @fileOverview Emulates realistic price movements using generative AI based on historical price data.
 *
 * - emulatePriceTrends - A function that handles the price trend emulation process.
 * - EmulatePriceTrendsInput - The input type for the emulatePriceTrends function.
 * - EmulatePriceTrendsOutput - The return type for the emulatePriceTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmulatePriceTrendsInputSchema = z.object({
  history: z.array(
    z.object({
      timestamp: z.string(),
      open: z.number(),
      high: z.number(),
      low: z.number(),
      close: z.number(),
    })
  ).describe('Historical price data as an array of OHLCV (Open, High, Low, Close, Volume) objects.'),
});
export type EmulatePriceTrendsInput = z.infer<typeof EmulatePriceTrendsInputSchema>;

const EmulatePriceTrendsOutputSchema = z.array(
  z.object({
    timestamp: z.string(),
    price: z.number(),
  })
).describe('Array of emulated price points with timestamp and price.');
export type EmulatePriceTrendsOutput = z.infer<typeof EmulatePriceTrendsOutputSchema>;

export async function emulatePriceTrends(input: EmulatePriceTrendsInput): Promise<EmulatePriceTrendsOutput> {
  return emulatePriceTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emulatePriceTrendsPrompt',
  input: {schema: EmulatePriceTrendsInputSchema},
  output: {schema: EmulatePriceTrendsOutputSchema},
  prompt: `You are a financial analyst tasked with emulating realistic price movements for a given historical price series.

  Given the following historical price data, generate a series of new, realistic price points that subtly deviate from the original data, mimicking live market conditions.  The output should have a timestamp and a price.

  Historical Data:
  {{#each history}}
  - Timestamp: {{this.timestamp}}, Open: {{this.open}}, High: {{this.high}}, Low: {{this.low}}, Close: {{this.close}}
  {{/each}}
  `,
});

const emulatePriceTrendsFlow = ai.defineFlow(
  {
    name: 'emulatePriceTrendsFlow',
    inputSchema: EmulatePriceTrendsInputSchema,
    outputSchema: EmulatePriceTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
