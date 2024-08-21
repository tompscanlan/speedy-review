#!/usr/bin/env python3
import sys
import requests
import os
import subprocess
import pprint

SPEEDYREVIEW_ENDPOINT_URL = os.getenv("SPEEDYREVIEW_ENDPOINT_URL")
if not SPEEDYREVIEW_ENDPOINT_URL:
    print("Error: SPEEDYREVIEW_ENDPOINT_URL environment variable not set.")
    sys.exit(1)

api_key = os.environ.get('SPEEDYREVIEW_API_KEY')
if not api_key:
    print("Warning: SPEEDYREVIEW_API_KEY environment variable not set. Proceeding without authentication.")

def get_staged_diff():
    try:
        return subprocess.check_output(['git', 'diff', '--cached']).decode('utf-8')
    except subprocess.CalledProcessError:
        print("Error: Failed to get staged diff.")
        return None

def get_commit_message(commit_msg_file):
    with open(commit_msg_file, 'r') as f:
        return f.read()

def update_commit_message(commit_msg_file, new_message):
    with open(commit_msg_file, 'w') as f:
        f.write(new_message)

def get_prior_commit_diff():
    # Get the diff of the last commit
    try:
        return subprocess.check_output(['git', 'diff', 'HEAD^', 'HEAD']).decode('utf-8')
    except subprocess.CalledProcessError:
        print("Error: Failed to get diff of the last commit.")
        return None

def main():
    # Get inputs
    commit_msg_file = sys.argv[1]
    staged_diff = get_staged_diff()
    prior_diff = get_prior_commit_diff()
    diff = staged_diff if staged_diff else prior_diff
    
    if not diff:
        print("No diff found, exiting.")
        sys.exit(1)
    current_msg = get_commit_message(commit_msg_file)

    # Get suggested comment
    try:
        response = requests.post(SPEEDYREVIEW_ENDPOINT_URL, json={
            'diff': diff,
            'current_message': current_msg,
            'api_key': api_key
        }, timeout=30)
        response.raise_for_status()
        result = response.json()

        pprint.pprint(result)
        if result.get('statusCode') == 200:
            update_commit_message(commit_msg_file, result['message'])
            print("Commit message updated based on analysis.")
            sys.exit(0)
        else:
            print("Result was not success: ")
            pprint.pprint(result)
            sys.exit(1)
    except requests.ConnectionError:
        print("Error: Unable to connect to the microservice.")
        sys.exit(1)
    except requests.Timeout:
        print("Error: Request to microservice timed out.")
        sys.exit(1)
    except requests.RequestException as e:
        print(f"Error communicating with microservice: {e}")
        sys.exit(1)
        
if __name__ == "__main__":
    sys.exit(main())