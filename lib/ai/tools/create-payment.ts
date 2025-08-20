import { tool } from 'ai';
import { z } from 'zod';

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:3001';

export const createPayment = tool({
  description: 'Create a new payment using Square payment processing',
  inputSchema: z.object({
    amount: z.number().describe('Payment amount in cents (e.g., 1000 for $10.00)'),
    currency: z.string().default('USD').describe('Currency code'),
    sourceId: z.string().describe('Payment source ID (card token, etc.)'),
    locationId: z.string().describe('Square location ID for the payment'),
    referenceId: z.string().optional().describe('Optional reference ID for tracking'),
    note: z.string().optional().describe('Optional note for the payment'),
    buyerEmailAddress: z.string().optional().describe('Buyer\'s email address')
  }),
  execute: async ({ amount, currency, sourceId, locationId, referenceId, note, buyerEmailAddress }) => {
    try {
      const response = await fetch(`${MCP_SERVER_URL}/square/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          sourceId,
          locationId,
          referenceId,
          note,
          buyerEmailAddress
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Payment creation failed: ${error.error || response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  },
});
