import json
from jsonschema import validate
from jinja2 import Environment

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
    validate(instance=json_data, schema=json_schema)
    
    env = Environment()
    template = env.from_string(template_string)
    
    return template.render(json_data)

if __name__ == '__main__':
    # Example usage
    
    # 1. Input JSON data
    input_data = {
        "user": {
            "name": "Alex",
            "email": "alex@example.com"
        },
        "item": {
            "name": "Laptop",
            "price": 1200
        }
    }

    # 2. Input JSON schema
    schema = {
        "type": "object",
        "properties": {
            "user": {
                "type": "object",
                "properties": {
                    "name": { "type": "string" },
                    "email": { "type": "string", "format": "email" }
                },
                "required": ["name", "email"]
            },
            "item": {
                "type": "object",
                "properties": {
                    "name": { "type": "string" },
                    "price": { "type": "number" }
                },
                "required": ["name", "price"]
            }
        },
        "required": ["user", "item"]
    }

    # 3. Jinja template
    jinja_template = "Hello {{ user.name }}, you have purchased a {{ item.name }} for ${{ item.price }}."

    try:
        rendered_output = render_template_with_validation(input_data, schema, jinja_template)
        print("Rendered Template:")
        print(rendered_output)
    except Exception as e:
        print(f"An error occurred: {e}")

    # Example of invalid data
    invalid_data = {
        "user": {
            "name": "Alex"
        },
        "item": {
            "name": "Laptop",
            "price": "1200" # price should be a number
        }
    }

    print("\n--- Testing with invalid data ---")
    try:
        rendered_output = render_template_with_validation(invalid_data, schema, jinja_template)
        print("Rendered Template:")
        print(rendered_output)
    except Exception as e:
        print(f"Caught expected error: {e}")
