<template>
  <div class="container">
    <h1>Speedy Review</h1>

    <p class="intro">
      Speedy Review is a powerful tool designed to enhance your git workflow by
      automatically generating meaningful commit messages based on code changes.
      It aims to save developers time and improve the quality of commit logs,
      making code reviews faster and change logs more useful.
    </p>

    <section>
      <h2>Why Use Speedy Review?</h2>
      <ul>
        <li>
          <strong>Save Time</strong>: Automate commit message creation, allowing
          you to focus on coding.
        </li>
        <li>
          <strong>Improve Code Review Efficiency</strong>: Clear, descriptive
          commit messages speed up the review process.
        </li>
        <li>
          <strong>Enhance Change Logs</strong>: Make your project's change logs
          more informative and useful.
        </li>
        <li>
          <strong>Consistency</strong>: Ensure consistent commit message style
          and quality across your team or project.
        </li>
        <li>
          <strong>Learn Better Practices</strong>: Improve your commit writing
          skills by analyzing suggested messages.
        </li>
      </ul>
    </section>

    <section>
      <h2>Features</h2>
      <ul>
        <li>
          <strong>Git Hook Integration</strong>: Automatically suggests commit
          messages during the commit process.
        </li>
        <li>
          <strong>Standalone Script (victor.py)</strong>: Analyze and update
          commit messages for specific commits.
        </li>
        <li>
          <strong>Microservice Architecture</strong>: Optional microservice for
          diff analysis and message generation. Securely share the Anthropic API
          key within your team.
        </li>
        <li>
          <strong>Customizable Message Templates</strong>: Define your own
          commit message templates for team consistency.
        </li>
        <li>
          <strong>Multi-language Support</strong>: Generates messages for
          various programming languages and file types.
        </li>
        <li>
          <strong>CI/CD Pipeline Integration</strong>: Validate and improve
          commit messages during CI processes.
        </li>
        <li>
          <strong>Historical Analysis</strong>: Learn from and maintain
          consistency with past high-quality commits.
        </li>
        <li>
          <strong>Contextual Awareness</strong>: Considers surrounding code and
          project structure for better messages.
        </li>
        <li>
          <strong>Issue Linking</strong>: Automatically detects and links
          related Jira/GitHub issues.
        </li>
        <li>
          <strong>Commit Categorization</strong>: Automatically categorizes
          commits (e.g., feat, fix, docs).
        </li>
        <li>
          <strong>Interactive Mode</strong>: Refine suggested messages through a
          command-line interface.
        </li>
        <li>
          <strong>Team Learning</strong>: Analyzes patterns to improve team-wide
          commit practices.
        </li>
        <li>
          <strong>Localization Support</strong>: Generates messages in multiple
          languages.
        </li>
        <li>
          <strong>Performance Optimization</strong>: Efficient algorithms to
          minimize impact on commit times.
        </li>
        <li>
          <strong>Extensible Plugin System</strong>: Create custom plugins to
          extend functionality.
        </li>
      </ul>
    </section>

    <section>
      <h2>Usage</h2>

      <h3>Git Hook</h3>
      <ol>
        <li>
          Place the <code>prepare-commit-msg.py</code> script in your
          <code>.git/hooks/</code> directory.
        </li>
        <li>
          Make it executable:
          <code>chmod +x .git/hooks/prepare-commit-msg.py</code>
        </li>
      </ol>
      <p>
        Speedy Review will now automatically suggest commit messages when you
        make a commit.
      </p>

      <h3>Victor.py Script</h3>
      <p>
        Use <code>victor.py</code> to analyze and update commit messages for
        specific commits:
      </p>
      <pre><code>python victor.py &lt;commit_hash&gt;</code></pre>
      <p>This will:</p>
      <ol>
        <li>Checkout the specified commit.</li>
        <li>Analyze the changes.</li>
        <li>Suggest a new commit message.</li>
        <li>Update the commit message if confirmed.</li>
      </ol>
    </section>

    <section>
      <h2>Contributing</h2>
      <p>
        We welcome contributions! Please fork the repository and submit a pull
        request at the
        <a href="https://github.com/tompscanlan/speedy-review"
          >GitHub repository</a
        >.
      </p>
    </section>

    <section>
      <h2>License</h2>
      <p>This project is licensed under the Apache 2.0 License.</p>
    </section>

    <section>
      <h2>About</h2>
      <p>
        For more information, visit the
        <a href="https://github.com/tompscanlan/speedy-review"
          >GitHub repository</a
        >.
      </p>
    </section>
  </div>
</template>

<script setup>
// No additional script needed for this static content
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.8rem;
  color: #3498db;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.4rem;
  color: #2980b9;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1rem;
}

.intro {
  font-size: 1.1rem;
  color: #34495e;
  border-left: 4px solid #3498db;
  padding-left: 1rem;
  margin-bottom: 2rem;
}

ul,
ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

li {
  margin-bottom: 0.5rem;
}

code {
  background-color: #f8f8f8;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}

pre {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
}

section {
  margin-bottom: 2rem;
}
</style>
