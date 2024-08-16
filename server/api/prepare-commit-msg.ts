import { defineEventHandler, readBody, send } from "h3";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();
const { ANTHROPIC_API_KEY, SPEEDYREVIEW_API_KEY , ANTHROPIC_MODEL, ANTHROPIC_TEMPERATURE, ANTHROPIC_MAX_TOKENS } = process.env;

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

interface RequestBody {
  diff: string;
  current_message: string;
  api_key: string;
}

export default defineEventHandler(async (event) => {
  if (event.method !== "POST" && event.method !== "GET") {
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

Diff:
{diff}

Current commit message:
{current_message}

Generate a concise and informative commit message based on the changes in the diff and the current message. Only return the commit message, no other text, and no wrapping punctuation or tags.

use bullet points instead of paragraphs.

If formatting is needed, use markdown, unless JSON or other format makes more sense.

A commit message should follow these guidelines:
1. The first line must be a summary of the commit, limited to 50 characters.
2. Include a blank line after the summary.
3. The body should provide a detailed explanation, with lines less than 80 characters.
4. Use Conventional Commit format listed below: prefix with a type (e.g., 'feat', 'fix'), followed by an optional scope, and a description.

If the commit is close to good, suggest minor improvements while maintaining the original intent.
Generate a concise and informative commit message based on the changes in the diff and the current message.
Only return the commit message, no other text.

## Conventional Commit message format:
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

1. Commits MUST be prefixed with a type, which consists of a noun, 'feat', 'fix', etc., followed
  by the OPTIONAL scope, OPTIONAL '!', and REQUIRED terminal colon and space.
1. The type 'feat' MUST be used when a commit adds a new feature to your application or library.
1. The type 'fix' MUST be used when a commit represents a bug fix for your application.
1. A scope MAY be provided after a type. A scope MUST consist of a noun describing a
  section of the codebase surrounded by parenthesis, e.g., 'fix(parser):'
1. A description MUST immediately follow the colon and space after the type/scope prefix.
The description is a short summary of the code changes, e.g., _fix: array parsing issue when multiple spaces were contained in string_.
1. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
1. A commit body is free-form and MAY consist of any number of newline separated paragraphs.
1. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of
 a word token, followed by either a ':<space>' or '<space>#' separator, followed by a string value (this is inspired by the
  [git trailer convention](https://git-scm.com/docs/git-interpret-trailers)).
1. A footer's token MUST use '-' in place of whitespace characters, e.g., 'Acked-by' (this helps differentiate
  the footer section from a multi-paragraph body). An exception is made for 'BREAKING CHANGE', which MAY also be used as a token.
1. A footer's value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer
  token/separator pair is observed.
1. Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the
  footer.
1. If included as a footer, a breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon, space, and description, e.g.,
_BREAKING CHANGE: environment variables now take precedence over config files_.
1. If included in the type/scope prefix, breaking changes MUST be indicated by a
  '!' immediately before the ':'. If '!' is used, 'BREAKING CHANGE:' MAY be omitted from the footer section,
  and the commit description SHALL be used to describe the breaking change.
1. Types other than 'feat' and 'fix' MAY be used in your commit messages, e.g., _docs: update ref docs._
1. The units of information that make up Conventional Commits MUST NOT be treated as case sensitive by implementors, with the exception of BREAKING CHANGE which MUST be uppercase.
1. BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE, when used as a token in a footer.

`;

  try {
    const response = await anthropic.messages.create({
      model: ANTHROPIC_MODEL as Anthropic.Messages.Model,
      max_tokens: ANTHROPIC_MAX_TOKENS,
      temperature: ANTHROPIC_TEMPERATURE,
      system:
        "You are an AI assistant that analyzes git diffs and user submitted commit messages and writes final commit messages.",
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
