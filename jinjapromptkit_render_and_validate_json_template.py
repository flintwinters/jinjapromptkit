import json
from jsonschema import validate
from jinja2 import Environment
import argparse

def render_template_with_validation(json_data, json_schema, template_string):
    """
    Validates a JSON object against a JSON schema and renders a Jinja2 template.

    Args:
        json_data (dict): The input JSON data.
        json_schema (dict): The JSON schema to validate against.
        template_string (str): The Jinja2 template string.

    Returns:
        str: The rendered template if validation is successful.
    
    Raises:
        jsonschema.exceptions.ValidationError: If the JSON data is invalid.
    """
    # The JSON schema must be valid for validation to work.
    validate(instance=json_data, schema=json_schema)
    
    # Create a Jinja2 environment and load the template from the string.
    env = Environment()
    template = env.from_string(template_string)
    
    # Render the template with the 'query' variable.
    return template.render(query=json_data)

if __name__ == '__main__':
    # Set up argument parser to handle command-line arguments.
    parser = argparse.ArgumentParser(description="Render a Jinja2 template with JSON data, validating against a schema.")
    parser.add_argument('--json-file', type=str, required=True, help='Path to the input JSON data file.')
    parser.add_argument('--schema-file', type=str, required=True, help='Path to the JSON schema file.')
    parser.add_argument('--template-file', type=str, required=True, help='Path to the Jinja2 template file.')
    args = parser.parse_args()

    try:
        # Load JSON data from the specified file.
        with open(args.json_file, 'r') as f:
            input_data = json.load(f)

        # Load JSON schema from the specified file.
        with open(args.schema_file, 'r') as f:
            schema = json.load(f)

        # Load Jinja template from the specified file.
        with open(args.template_file, 'r') as f:
            jinja_template = f.read()
        
        # Validate the data and render the template.
        rendered_output = render_template_with_validation(input_data, schema, jinja_template)
        print("Rendered Template:")
        print(rendered_output)

    except FileNotFoundError as e:
        print(f"Error: {e.filename} not found.")
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in one of the input files.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

