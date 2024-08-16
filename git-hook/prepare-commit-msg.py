#!/usr/bin/env python3
import sys
import git_utils

def main():
    commit_msg_file = sys.argv[1]
    staged_diff = git_utils.get_staged_diff()
    current_msg = git_utils.get_commit_message(commit_msg_file)

    try:
        response = requests.post(MICROSERVICE_URL, json={
            'diff': staged_diff,
            'current_message': current_msg
        })
        response.raise_for_status()
        result = response.json()

        # Process the result from the microservice
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()