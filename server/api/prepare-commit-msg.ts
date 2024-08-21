import { defineEventHandler, readBody, send } from "h3";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();
const {
  ANTHROPIC_API_KEY,
  SPEEDYREVIEW_API_KEY,
  ANTHROPIC_MODEL,
  ANTHROPIC_TEMPERATURE,
  ANTHROPIC_MAX_TOKENS,
} = process.env;

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

const VICTOR = `Generate a concise and informative commit message based on the changes in the diff and the current message.
Parse comments for intent, and include links or issue numbers in the commit message.

Important: Don't just summarize the changes; deduce the reasons behind them and incorporate that into the commit message. Do Not create reasons. Look for them in the code comments.

Only return the commit message, no other text, and no wrapping punctuation or tags.
Do not include commentary on the commit, only the commit itself. 

Use bullet points instead of paragraphs for clarity.

If formatting is needed, use markdown, unless JSON or another format is more appropriate.

A commit message should adhere to the following guidelines:
1. The first line must summarize the commit, limited to 50 characters or less.
2. Include a blank line after the summary.
3. The body should provide a detailed explanation, with lines less than 80 characters long.
4. Follow the Conventional Commit format: prefix with a type (e.g., 'feat', 'fix'), followed by an optional scope, and a description.

## Conventional Commit message format:

1. Commits MUST be prefixed with a type, which consists of a noun, 'feat', 'fix', etc., followed by the OPTIONAL scope, OPTIONAL '!', and REQUIRED terminal colon and space.
2. The type 'feat' MUST be used for new features.
3. The type 'fix' MUST be used for bug fixes.
4. A scope MAY be provided after a type, consisting of a noun describing a section of the codebase in parentheses, e.g., 'fix(parser):'.
5. A description MUST immediately follow the colon and space after the type/scope prefix.
6. A longer commit body MAY follow the short description, beginning one blank line after it.
7. One or more footers MAY be provided after the body, each consisting of a token followed by a separator and a string value.
8. Breaking changes MUST be indicated in the type/scope prefix or as an entry in the footer.
9. If included as a footer, a breaking change MUST consist of 'BREAKING CHANGE: description'.
10. Types other than 'feat' and 'fix' MAY be used, e.g., 'docs: update ref docs.'.
11. The units of information in Conventional Commits MUST NOT be case sensitive, except for 'BREAKING CHANGE'.
12. BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE in footers.`;
interface RequestBody {
  diff: string;
  current_message: string;
  api_key: string;
}

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return { statusCode: 405, body: { message: "Method not allowed" } };
  }

  let data: RequestBody;
  try {
    data = await readBody(event);
    // console.log('data: ' + data)
  } catch (error) {
    return {
      statusCode: 400,
      body: { message: "Invalid request body: " + error },
    };
  }

  const { diff, current_message, api_key } = data;

  if (api_key !== SPEEDYREVIEW_API_KEY) {
    return { statusCode: 401, body: { message: "Unauthorized api_key" } };
  }

  const prompt = `# Analyze the following git diff and suggest a commit message:

## Diff:
${diff}

## Current commit message:
${current_message}

## Rules for making a good commit message
${VICTOR}`;


  try {
    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL as Anthropic.Messages.Model,
      max_tokens: Number(ANTHROPIC_MAX_TOKENS),
      temperature: Number(ANTHROPIC_TEMPERATURE),
      system:
        "You are an AI assistant that analyzes git diffs and user submitted commit messages and writes final commit messages. Remember that commit messages are mostly about why the changes were made.",
      messages: [{ role: "user", content: prompt }],
    });

    const message = response.content[0].text as string;

    if (!message) {
      return {
        statusCode: 400,
        message: "No message generated",
      };
    }
    return {
      statusCode: 200,

      message: message,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Internal server error: " + error,
    };
  }
});
