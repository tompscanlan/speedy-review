from http.server import BaseHTTPRequestHandler
import json
import anthropic
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
      self.send_response(200)
      self.send_header('Content-Type', 'text/html')
      self.end_headers()
      with open('index.html', 'rb') as file:
          self.wfile.write(file.read())