# Speedy Review

Speedy Review is a tool designed to generate commit messages based on git diffs, enhancing the commit process by providing meaningful suggestions.

Developers often spend a significant amount of time drafting commit messages. This is time that could be better spent developing features or enjoying a well-deserved break. Speedy Review automates the commit log process, allowing developers to focus on what truly matters.

## Features

- **Commit Message Suggestions**: Automatically suggests commit messages based on the differences in your code.
- **Git Hook Integration**: Seamlessly integrates with git commit hooks to suggest messages during the commit process.
- **Microservice Architecture**: Utilizes a microservice to analyze diffs and generate commit messages.

## Setup

To get started, ensure you have the necessary dependencies installed:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```


## Microservice

The microservice is responsible for analyzing the diffs and generating commit messages. Ensure that the following environment variables are set:

- `MICROSERVICE_URL`: The URL of the microservice.
- `SPEEDYREVIEW_API_KEY`: Your API key for authentication.

### Usage in `victor.py`

The `victor.py` script provides functionality to:

- Checkout a specific commit.
- Get the diff of the commit.
- Suggest a new commit message based on the diff and the current message.
- Update the commit message if the user confirms.

### Example Commands

To use the `victor.py` script, run:

```bash
python victor.py <commit_hash>
```

This will suggest a commit message for the specified commit hash.

## Git Hook

The `prepare-commit-msg.py` script is a git hook that runs during the commit process. It retrieves the staged diff and the prior commit diff, then sends this information to the microservice to get a suggested commit message.

### Installation

To install the git hook, place the `prepare-commit-msg.py` script in your `.git/hooks/` directory and ensure it is executable:

```bash
chmod +x .git/hooks/prepare-commit-msg.py
```


## Contributing

We welcome contributions! Please fork the repository and submit a pull request.

## License

This project is licensed under the Apache 2.0 License.