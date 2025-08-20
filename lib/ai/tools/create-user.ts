import { tool } from 'ai';
import { z } from 'zod';

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:3001';

export const createUser = tool({
  description: 'Create a new user in the Supabase database',
  inputSchema: z.object({
    email: z.string().describe('User\'s email address'),
    firstName: z.string().describe('User\'s first name'),
    lastName: z.string().describe('User\'s last name'),
    phone: z.string().optional().describe('User\'s phone number'),
    password: z.string().optional().describe('User\'s password (will be hashed)'),
    metadata: z.record(z.any()).optional().describe('Additional user metadata')
  }),
  execute: async ({ email, firstName, lastName, phone, password, metadata }) => {
    try {
      const response = await fetch(`${MCP_SERVER_URL}/supabase/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phone,
          password,
          metadata
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`User creation failed: ${error.error || response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },
});
