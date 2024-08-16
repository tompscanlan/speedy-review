#!/usr/bin/env python3
import sys
import requests
import common

def main():
    commit_msg_file = sys.argv[1]
    staged_diff = common.get_staged_diff()
    current_msg = common.get_commit_message(commit_msg_file)

    try:
        response = requests.post(common.MICROSERVICE_URL, json={
            'diff': staged_diff,
            'current_message': current_msg
        })
        response.raise_for_status()
        result = response.json()


        if result['status'] == 'success':
            update_commit_message(commit_msg_file, result['message'])
            print("Commit message updated based on analysis.")
        else:
            suggest_edit(commit_msg_file, result['suggested_message'])
    except requests.RequestException as e:
        print(f"Error communicating with microservice: {e}")
        print("Using original commit message.")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()