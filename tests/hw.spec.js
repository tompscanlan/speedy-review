import { describe, it, expect } from 'vitest'
import { createServer } from 'http'
import { defineEventHandler, createApp, createEvent } from 'h3'
import handler from '../server/api/index.js'

describe('API Endpoint2', () => {
    it('should return Hello World message', async () => {
      const result = await handler()
      expect(result).toEqual({ message: 'Hello World' })
    })
  })

describe('API Endpoint', () => {
    it('should return Hello World message', async () => {
  const server = createServer(handler);
  const port = 3000;

  server.listen(port, async () => {
      const response = await fetch(`http://localhost:${port}`);
      const result = await response.json();
      expect(result).toEqual({ message: 'Hello World' });
      server.close();
  });
  })
})