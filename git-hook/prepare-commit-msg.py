#!/usr/bin/env python3
import sys
import common
import requests

def main():
    # Get inputs
    commit_msg_file = sys.argv[1]
    staged_diff = common.get_staged_diff()
    current_msg = common.get_commit_message(commit_msg_file)

    # Get suggested comment
    try:
        response = requests.post(common.MICROSERVICE_URL, json={
            'diff': staged_diff,
            'current_message': current_msg
        })
        response.raise_for_status()
        result = response.json()

        return 1
        if result['status'] == 'success':
            update_commit_message(commit_msg_file, result['message'])
            print("Commit message updated based on analysis.")
            return 0
        else:
            print("Suggested message: ", result)
            return 1
    except requests.RequestException as e:
        print(f"Error communicating with microservice: {e}")
        return 1
        
if __name__ == "__main__":
    main()