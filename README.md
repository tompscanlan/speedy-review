# Speedy Review

## Overview

Speedy Review is a powerful tool designed to enhance the code review process by automating the generation of meaningful commit messages. By leveraging GPT capabilities, Speedy Review analyzes git diffs and current commit messages to suggest concise, informative, and well-structured commit messages that adhere to best practices.

## Use Case

In modern software development, clear and informative commit messages are crucial for maintaining a healthy codebase. They help team members understand the context of changes, facilitate easier navigation through project history, and improve collaboration among developers. However, writing effective commit messages can be time-consuming and often gets overlooked.

## How It Works

1. **Git Hook Integration**: Speedy Review integrates seamlessly with your git workflow by utilizing a prepare-commit-msg hook. When a developer attempts to commit changes, the hook triggers an analysis of the staged changes.

2. **Local Server or SaaS**: The tool runs a local Flask server (`server.py`) that handles requests from the git hook. This server uses the Anthropic API to generate commit messages based on the git diff and the current commit message.  Alternativly, run it through our hosted service, free for the first 25 commit messages, API usage based pricing of ~$0.05 per commit.

3. **GPT-Powered Analysis**: The `prepare-commit-msg.py` script sends the git diff and the current commit message to the local server, which then uses GPT to analyze the changes and generate a suggested commit message based on the content and context of the modifications.

4. **Commit Message Generation**: The generated commit message follows the Conventional Commits specification, ensuring that it is structured, informative, and easy to understand. If the current commit message is already adequate, it will be returned without changes.

5. **Changelog Generation**: Speedy Review also simplifies the process of generating changelogs by providing well-structured commit messages that can be easily aggregated into a coherent summary of changes for each release.

## Benefits

- **Time-Saving**: Automates the process of writing commit messages, allowing developers to focus on coding.
- **Consistency**: Ensures that all commit messages adhere to a standard format, improving readability and organization.
- **Enhanced Clarity**: Provides clear and descriptive commit messages that help team members understand changes quickly.
- **Changelog Efficiency**: Facilitates the creation of changelogs, making it easier to communicate updates and changes to stakeholders.

## Getting Started

### Prerequisites
- Python 3.7 or higher
- Anthropic API key to host your own
- A key from us if you want to use the SaaS

### Setting Up Speedy Review
To set up Speedy Review in your repository, follow these steps:

1. Clone the Speedy Review repository.
2. Install the required dependencies by running `pip install -r requirements.txt`.
3. Set up your Anthropic API key as an environment variable named `ANTHROPIC_API_KEY`.
4. Start the local server by running `python server.py`.
5. Copy the `prepare-commit-msg.py` file from the Speedy Review project.
6. Paste this file into the `.git/hooks` directory of the repository where you want to apply Speedy Review, and rename it to `prepare-commit-msg` (without the .py extension).
7. Make sure the hook file is executable by running `chmod +x .git/hooks/prepare-commit-msg`.

By following these steps, you can integrate Speedy Review seamlessly into your git workflow and start benefiting from improved commit messages.


### Setting Up Speedy Review

To set up Speedy Review in your repository, follow these steps:

1. Navigate to the `git-hooks` directory in the Speedy Review project.
2. Copy the necessary files from this directory.
3. Paste these files into the `.git/hooks` directory of the repository where you want to apply Speedy Review.


## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for details.