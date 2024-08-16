#!/usr/bin/env python3
import sys
import requests
import os
import subprocess

MICROSERVICE_URL = "https://speedy-review.vercel.app/analyze-commit"


def get_staged_diff():
    return subprocess.check_output(['git', 'diff', '--cached']).decode('utf-8')

def get_commit_message(commit_msg_file):
    with open(commit_msg_file, 'r') as f:
        return f.read()

def update_commit_message(commit_msg_file, new_message):
    with open(commit_msg_file, 'w') as f:
        f.write(new_message)


def main():
    # Get inputs
    commit_msg_file = sys.argv[1]
    staged_diff = get_staged_diff()
    current_msg = get_commit_message(commit_msg_file)

    api_key = os.environ.get('SPEEDYREVIEW_API_KEY')
    if not api_key:
        print("Warning: SPEEDYREVIEW_API_KEY environment variable not set. Proceeding without authentication.")
    
    # Get suggested comment
    try:
        response = requests.post(MICROSERVICE_URL, json={
            'diff': staged_diff,
            'current_message': current_msg,
            'api_key': api_key
        })
        response.raise_for_status()
        result = response.json()

        if result['status'] == 'success':

            update_commit_message(commit_msg_file, result['message'])
            print("Commit message updated based on analysis.")
            sys.exit(0)
        else:
            # I'm not sure how we get here, so dump everything
            import pprint
            print("result was not success: ")
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
        print("Using original commit message.")
        sys.exit(1)
        
if __name__ == "__main__":
    sys.exit(main())