import { describe, it, expect, vi } from "vitest";
import prepareCommitMsg from "../server/api/prepare-commit-msg";
import { createEvent } from "h3";
import { ServerResponse, IncomingMessage } from "http";

// Mock the Anthropic SDK
vi.mock("@anthropic-ai/sdk", () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [{ text: "This is a good commit messege" }],
      }),
    },
  })),
}));

describe("prepare-commit-msg", () => {
  it("should fail when not post", async () => {
    // Mock the IncomingMessage
    const incomingMessage = {
      method: "GET",
      url: "/prepare-commit-msg",
      headers: {
        "Content-Type": "application/json",
      },
    } as unknown as IncomingMessage;

    // Mock the ServerResponse
    const serverResponse = {
      statusCode: 500,
      setHeader: vi.fn(),
      end: vi.fn(),
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: "moo",
      },
    } as unknown as ServerResponse;

    const event = createEvent(incomingMessage, serverResponse);

    const response = await prepareCommitMsg(event);
    //   console.log(response)
    //   console.log(serverResponse)
    expect(response).toEqual({
      statusCode: 405,
      body: {
        message: "Method not allowed",
      },
    });
  });

  it("should return api key is required", async () => {
    // Mock the IncomingMessage
    const incomingMessage = {
      method: "POST",
      url: "/prepare-commit-msg",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        diff: "this is a difference between two files in terms of content, like: removing a line",
        current_message: "current message",
        api_key: "test_key",
      },
    } as unknown as IncomingMessage;

    // Mock the ServerResponse
    const serverResponse = {
      statusCode: 200,
      setHeader: vi.fn(),
      end: vi.fn(),
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: "moo",
      },
    } as unknown as ServerResponse;

    const event = createEvent(incomingMessage, serverResponse);

    const response = await prepareCommitMsg(event);
    //   console.log(response)
    expect(response).toEqual({
      body: {
        message: "Unauthorized api_key",
      },
      statusCode: 401,
    });
  });

  it("should return a string when posting a commit", async () => {
    // Mock the IncomingMessage
    const incomingMessage = {
      method: "POST",
      url: "/prepare-commit-msg",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        diff: "this is a difference between two files in terms of content, like: removing a line",
        current_message: "current git commit message",
        api_key: "12345",
      },
    } as unknown as IncomingMessage;

    // Mock the ServerResponse
    const serverResponse = {
      statusCode: 200,
      setHeader: vi.fn(),
      end: vi.fn(),
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: "moo",
      },
    } as unknown as ServerResponse;

    const event = createEvent(incomingMessage, serverResponse);

    const response = await prepareCommitMsg(event);
    console.log(response);
    expect(response).toEqual({
      statusCode: 200,
      message: "This is a good commit messege",
    });
  });
});
