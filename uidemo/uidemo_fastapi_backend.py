from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader
import json
from typing import Any
import uvicorn
import os

app = FastAPI()

# Get the directory of the current script
script_dir = os.path.dirname(__file__)

@app.middleware("http")
async def add_no_cache_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/render")
async def render_template(query: dict):
    # Load Jinja2 environment and template from the project root
    env = Environment(loader=FileSystemLoader(os.path.join(script_dir, '..')))
    template = env.get_template('ai_query.jinja')

    # Render the template with the provided JSON data
    rendered_template = template.render(query=query)
    
    return {"rendered_template": rendered_template}

# Mount static files (CSS, JS) from the current directory
app.mount("/static", StaticFiles(directory=script_dir), name="static")

@app.get("/")
async def read_index():
    return FileResponse(os.path.join(script_dir, 'index.html'))


if __name__ == "__main__":
    uvicorn.run("uidemo_fastapi_backend:app", host="127.0.0.1", port=8000, reload=True)