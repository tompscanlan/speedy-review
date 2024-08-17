# Speedy Review

Speedy Review is a powerful tool designed to enhance your git workflow by automatically generating meaningful commit messages based on code changes. It aims to save developers time and improve the quality of commit logs, making code reviews faster and change logs more useful.

## Why Use Speedy Review?

1. **Save Time**: Developers often spend valuable time crafting commit messages. Speedy Review automates this process, allowing you to focus on coding.

2. **Improve Code Review Efficiency**: Clear, descriptive commit messages make it easier for reviewers to understand changes quickly, speeding up the review process.

3. **Enhance Change Logs**: With better commit messages, your project's change logs become more informative and useful for tracking project history.

4. **Consistency**: Ensure a consistent style and quality of commit messages across your team or project.

5. **Learn Better Practices**: By analyzing the suggested commit messages, developers can learn to write more informative commits over time.

## Features

- **Git Hook Integration**: Automatically suggests commit messages during the commit process.
- **Standalone Script (victor.py)**: Analyze and update commit messages for specific commits.
- **Microservice Architecture**: Utilizes a microservice for diff analysis and message generation (optional).

## Setup

1. Install dependencies:

To get started, ensure you have the necessary dependencies installed:

    npm install

## Development Server

Start the development server on `http://localhost:3000`:

    npm run dev


## Production

Build the application for production:

    npm run build

Locally preview production build:

    npm run preview

## Microservice

The microservice is responsible for analyzing the diffs and generating commit messages. Ensure that the following environment variables are set:

- `MICROSERVICE_URL`: The URL of the microservice.
- `SPEEDYREVIEW_API_KEY`: Your API key for authentication.
- `ANTHROPIC_MODEL`:     claude-3-opus-20240229
- `ANTHROPIC_MAX_TOKENS`:    1000
- `ANTHROPIC_TEMPERATURE`:   0.7

### Git Hook

1. Place the `prepare-commit-msg.py` script in your `.git/hooks/` directory.
2. Make it executable:

    chmod +x .git/hooks/prepare-commit-msg.py

Now, Speedy Review will automatically suggest commit messages when you make a commit.


### Victor.py Script

Use `victor.py` to analyze and update commit messages for specific commits:

    python victor.py <commit_hash>


This will:
1. Checkout the specified commit.
2. Analyze the changes.
3. Suggest a new commit message.
4. Update the commit message if confirmed.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request.

## License

This project is licensed under the Apache 2.0 License.