import subprocess

MICROSERVICE_URL = "http://localhost:5000/analyze-commit"


def get_staged_diff():
    return subprocess.check_output(['git', 'diff', '--cached']).decode('utf-8')

def get_commit_message(commit_msg_file):
    with open(commit_msg_file, 'r') as f:
        return f.read()

def update_commit_message(commit_msg_file, new_message):
    with open(commit_msg_file, 'w') as f:
        f.write(new_message)

def suggest_edit(commit_msg_file, suggested_message):
    print("Commit message rejected. Suggested edit:")
    print(suggested_message)
    update_commit_message(commit_msg_file, suggested_message)