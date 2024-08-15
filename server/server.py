from flask import Flask, request, jsonify
import anthropic
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
client = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))

@app.route('/analyze-commit', methods=['POST'])
def analyze_commit():
    data = request.json
    diff = data['diff']
    current_message = data['current_message']

    prompt = f"""Analyze the following git diff and suggest a commit message:

Diff:
{diff}

Current commit message:
{current_message}

Please provide a concise and informative commit message based on the changes in the diff.
If the current message is already good, you can suggest keeping it or making minor improvements.
"""

    try:
        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=300,
            temperature=0.7,
            system="You are an AI assistant that analyzes git diffs and suggests commit messages.",
            messages=[{"role": "user", "content": prompt}]
        )
        suggested_message = response.content[0].text.strip()

        return jsonify({
            'status': 'success',
            'message': suggested_message
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
