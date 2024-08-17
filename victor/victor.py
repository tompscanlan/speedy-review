#!/usr/bin/env python3

# checkout_and_suggest.py
import sys
import requests
import os
import subprocess
import pprint

MICROSERVICE_URL = os.getenv("MICROSERVICE_URL")
if not MICROSERVICE_URL:
    print("Error: MICROSERVICE_URL environment variable not set.")
    sys.exit(1)

api_key = os.environ.get('SPEEDYREVIEW_API_KEY')
if not api_key:
    print("Warning: SPEEDYREVIEW_API_KEY environment variable not set. Proceeding without authentication.")

def checkout_commit(commit_hash):
    try:
        subprocess.check_call(['git', 'checkout', commit_hash])
    except subprocess.CalledProcessError:
        print("Error: Failed to checkup the rev suggested")
        sys.exit(1)


def get_commit_message(commit_hash):
    print("git log -1 --pretty=%B", commit_hash);

    try:
        message = subprocess.check_output(['git', 'log', '-1', '--pretty=%B', commit_hash]).decode('utf-8')
        return message
    except subprocess.CalledProcessError:
        print("Error: Failed to get git log.")
        sys.exit(1)

def suggest_commit_message(commit_hash):
    current_msg = get_commit_message(commit_hash)
    try:
        response = requests.post(MICROSERVICE_URL, json={
            'current_message': current_msg,
            'api_key': api_key
        })
        response.raise_for_status()
        result = response.json()
        return result['message'] if result['statusCode'] == 200 else None
    except requests.RequestException as e:
        print(f"Error communicating with microservice: {e}")
        return None

def update_commit_message(commit_hash, new_message):
    original_message = get_commit_message(commit_hash)
    combined_message = f"{new_message}\n---\n\nOriginal commit message:\n{original_message}"
    print("git commit --amend -m", combined_message);
    try:
        subprocess.check_call(['git', 'commit', '--amend', '-m', combined_message])
    except subprocess.CalledProcessError:
        print("Error: Failed to update commit message.")
        sys.exit(1)
def main():
    if len(sys.argv) != 2:
        print("Usage: python checkout_and_suggest.py <commit_hash>")
        sys.exit(1)

    commit_hash = sys.argv[1]
    
    print("git rev-parse HEAD");
    original_commit = subprocess.check_output(['git', 'rev-parse', 'HEAD']).decode('utf-8').strip()

    checkout_commit(commit_hash)
    suggested_message = suggest_commit_message(commit_hash)

    if suggested_message:
        print("Suggested commit message:", suggested_message)
        confirm = input("Do you want to update the commit message? (yes/no): ").strip().lower()
        if confirm in ['yes', 'y']:
            update_commit_message(commit_hash, suggested_message)  # Update the commit message
            print("Commit message updated.")
        else:
            print("Reverting to original commit...")
            print("git checkout", original_commit);
            try:
                subprocess.check_call(['git', 'checkout', original_commit])  # Revert to the original commit
            except subprocess.CalledProcessError as e:
                print(f"Error reverting to original commit: {e}")
                sys.exit(1)

            print("Back to original commit.")
    else:
        print("Could not get a suggested commit message.")
        print("git checkout", original_commit);
        subprocess.check_call(['git', 'checkout', original_commit])  # Revert to the original commit
        print("Back to original commit.")

if __name__ == "__main__":
    sys.exit(main())