from http.server import BaseHTTPRequestHandler
import json
import anthropic
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

client = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
      self.send_response(200)
      self.end_headers()
      self.wfile.write(b"ok")