from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader
import json
from typing import Any
import uvicorn

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: dict

@app.post("/render")
async def render_template(query: Any):
    # Load Jinja2 environment and template
    env = Environment(loader=FileSystemLoader('..'))
    template = env.get_template('ai_query.jinja')

    # Render the template with the provided JSON data
    rendered_template = template.render(query=query)
    
    return {"rendered_template": rendered_template}

if __name__ == "__main__":
    uvicorn.run("uidemo_fastapi_backend:app", host="127.0.0.1", port=8000, reload=True)