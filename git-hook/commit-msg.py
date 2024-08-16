#!/usr/bin/env python3
import sys
import requests
import common

def main():
    # This hook is called after the user has had a chance to edit the commit message
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
            common.update_commit_message(commit_msg_file, result['message'])
            print("Commit message updated based on final analysis.")
        else:
            common.suggest_edit(commit_msg_file, result.get('suggested_message', 'No suggestion provided'))
    except requests.ConnectionError:
        print("Error: Unable to connect to the microservice. Proceeding with current commit message.")
    except requests.Timeout:
        print("Error: Request to microservice timed out. Proceeding with current commit message.")
    except requests.RequestException as e:
        print(f"Error communicating with microservice: {e}")
        print("Proceeding with current commit message.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        print("Proceeding with current commit message.")

if __name__ == "__main__":
    sys.exit(main())