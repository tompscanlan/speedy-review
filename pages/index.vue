<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6">Speedy Review</h1>

    <p class="mb-6">
      Speedy Review is a powerful tool designed to enhance your git workflow by
      automatically generating meaningful commit messages based on code changes.
      It aims to save developers time and improve the quality of commit logs,
      making code reviews faster and change logs more useful.
    </p>

    <h2 class="text-2xl font-semibold mb-4">Why Use Speedy Review?</h2>
    <ul class="list-disc pl-6 mb-6">
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
        <strong>Consistency</strong>: Ensure consistent commit message style and
        quality across your team or project.
      </li>
      <li>
        <strong>Learn Better Practices</strong>: Improve your commit writing
        skills by analyzing suggested messages.
      </li>
    </ul>

    <h2 class="text-2xl font-semibold mb-4">Features</h2>
    <ul class="list-disc pl-6 mb-6">
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
        diff analysis and message generation.
      </li>
    </ul>

    <h2 class="text-2xl font-semibold mb-4">Usage</h2>

    <h3 class="text-xl font-semibold mb-2">Git Hook</h3>
    <ol class="list-decimal pl-6 mb-4">
      <li>
        Place the <code>prepare-commit-msg.py</code> script in your
        <code>.git/hooks/</code> directory.
      </li>
      <li>
        Make it executable:
        <code>chmod +x .git/hooks/prepare-commit-msg.py</code>
      </li>
    </ol>
    <p class="mb-4">
      Speedy Review will now automatically suggest commit messages when you make
      a commit.
    </p>

    <h3 class="text-xl font-semibold mb-2">Victor.py Script</h3>
    <p class="mb-4">
      Use <code>victor.py</code> to analyze and update commit messages for
      specific commits:
    </p>
    <pre
      class="bg-gray-100 p-2 rounded mb-4"
    ><code>python victor.py &lt;commit_hash&gt;</code></pre>
    <p class="mb-4">This will:</p>
    <ol class="list-decimal pl-6 mb-6">
      <li>Checkout the specified commit.</li>
      <li>Analyze the changes.</li>
      <li>Suggest a new commit message.</li>
      <li>Update the commit message if confirmed.</li>
    </ol>

    <h2 class="text-2xl font-semibold mb-4">Contributing</h2>
    <p class="mb-6">
      We welcome contributions! Please fork the repository and submit a pull
      request.
    </p>

    <h2 class="text-2xl font-semibold mb-4">License</h2>
    <p>This project is licensed under the Apache 2.0 License.</p>
  </div>
</template>

<script setup>
// No additional script needed for this static content
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
