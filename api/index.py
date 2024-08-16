from http.server import BaseHTTPRequestHandler
import json
import anthropic
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

client = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        diff = data['diff']
        current_message = data['current_message']
        api_key = data['api_key']

        if api_key != "12345":
            self.send_response(401)
            self.end_headers()
            self.wfile.write(b"Unauthorized")
            return
        
        prompt = f"""# Analyze the following git diff and suggest a commit message:

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
4. Use Conventional Commit format listed below: prefix with a type (e.g., `feat`, `fix`), followed by an optional scope, and a description.

If the commit is close to good, suggest minor improvements while maintaining the original intent.
Generate a concise and informative commit message based on the changes in the diff and the current message.
Only return the commit message, no other text.

## Conventional Commit message format:
The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

1. Commits MUST be prefixed with a type, which consists of a noun, `feat`, `fix`, etc., followed
  by the OPTIONAL scope, OPTIONAL `!`, and REQUIRED terminal colon and space.
1. The type `feat` MUST be used when a commit adds a new feature to your application or library.
1. The type `fix` MUST be used when a commit represents a bug fix for your application.
1. A scope MAY be provided after a type. A scope MUST consist of a noun describing a
  section of the codebase surrounded by parenthesis, e.g., `fix(parser):`
1. A description MUST immediately follow the colon and space after the type/scope prefix.
The description is a short summary of the code changes, e.g., _fix: array parsing issue when multiple spaces were contained in string_.
1. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
1. A commit body is free-form and MAY consist of any number of newline separated paragraphs.
1. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of
 a word token, followed by either a `:<space>` or `<space>#` separator, followed by a string value (this is inspired by the
  [git trailer convention](https://git-scm.com/docs/git-interpret-trailers)).
1. A footer's token MUST use `-` in place of whitespace characters, e.g., `Acked-by` (this helps differentiate
  the footer section from a multi-paragraph body). An exception is made for `BREAKING CHANGE`, which MAY also be used as a token.
1. A footer's value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer
  token/separator pair is observed.
1. Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the
  footer.
1. If included as a footer, a breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon, space, and description, e.g.,
_BREAKING CHANGE: environment variables now take precedence over config files_.
1. If included in the type/scope prefix, breaking changes MUST be indicated by a
  `!` immediately before the `:`. If `!` is used, `BREAKING CHANGE:` MAY be omitted from the footer section,
  and the commit description SHALL be used to describe the breaking change.
1. Types other than `feat` and `fix` MAY be used in your commit messages, e.g., _docs: update ref docs._
1. The units of information that make up Conventional Commits MUST NOT be treated as case sensitive by implementors, with the exception of BREAKING CHANGE which MUST be uppercase.
1. BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE, when used as a token in a footer.

"""

        try:
            response = client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=300,
                temperature=0.7,
                system="You are an AI assistant that analyzes git diffs and user submitted commit messages and writes final commit messages.",
                messages=[{"role": "user", "content": prompt}]
            )
            suggested_message = response.content[0].text.strip()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'success',
                'message': suggested_message
            }).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': str(e)
            }).encode())

    def do_GET(self):
      self.send_response(405)
      self.end_headers()
      self.wfile.write(b"Method not allowed")