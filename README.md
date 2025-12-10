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
