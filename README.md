# JinjaPromptKit

A Python library for creating a high-quality, extensible, and modular library of prompts using Jinja templating, with a focus on structured JSON schema output from AI models.

## Core Concepts

### Jinja Templating for Prompts

JinjaPromptKit leverages the power and flexibility of Jinja2 templating to create dynamic and reusable prompts. This allows for:

*   **Conditional Logic:** Include or exclude parts of a prompt based on certain conditions.
*   **Loops:** Generate repetitive sections of a prompt for lists of items.
*   **Variables:** Easily insert data into your prompts.

### Modular and Combine-able Prompts

Prompts are designed to be modular and easily combined. You can create a library of prompt components (e.g., introductions, instructions, examples) and assemble them in different ways to create new and complex prompts.

### Structured JSON Output

A key focus of this library is to facilitate the generation of structured data from AI models. JinjaPromptKit is designed to work with prompts that instruct the AI to return data in a specific JSON schema, which can then be easily parsed and used in your applications.

### Initial Personas

JinjaPromptKit is equipped with several starter personas to use as blueprints.

- Planner
    - Creates a plan for your app.
    - Creates an extensive specification, at three layers of depth:
        1. Blueprint Overview:
            - A broad-strokes list of functionality.  Nailing down exactly what you need from Jinja.App
        2. Implementation Checklist:
            - A list of pages your app will have.
            - A list of data sources for your app.
        3. Machine Code:
            - A nitty-gritty, highly detailed list of instructions for Jinjie to work through to implement your app.
    This agent is your project architect. It helps you think through the features and structure of your application before you write any code. It will ask you questions to understand your goals and then produce a detailed plan, including what screens your app will have, what data it will need, and a step-by-step guide for building it.
- Vibecoder
    - Writes your Jinja.App
    This is the primary builder agent. It takes the plan from the Planner and writes the actual code for your application. It's focused on turning the specification into a functional app.
- Chat
    - Answers questions about your app's structure.
    This agent acts as your project assistant. You can ask it questions about your application's code and structure, or implementation progress, and it will provide answers. It's useful for understanding how different parts of your app work together.
- QA Test
    - Verifies that your app is working as intended.
    This agent is your quality assurance tester. It's responsible for verifying that your application works as expected. It will run tests to find bugs and ensure that the features you've built are working correctly.
- Proofreader (Polish)
    - Documents and streamlines your code.
    This agent is your code editor and documenter. After the code is written, the Proofreader goes through it to improve clarity, fix typos, and add comments and documentation to make the code easier to understand and maintain.
- Code Comparison
    - Compares code versions to show key differences and improvements.
    This agent helps you understand changes in your code. It can compare two different versions of a file or project and highlight the key differences, which is useful for code reviews or understanding what has changed between updates.
- Solver (Fixer)
    - 
    This agent is your bug fixer. When you encounter a problem or an error in your application, the Solver helps you diagnose the issue and provides a solution to fix it.- Cleaner (Refactor)
    - Refactors your code to make it more clean, and efficient.
    This agent is your code optimizer. It reviews your existing code and suggests improvements to make it more efficient, readable, and maintainable without changing its functionality. This process is often called "refactoring."
