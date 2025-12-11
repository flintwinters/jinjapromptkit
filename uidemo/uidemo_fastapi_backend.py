from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader
import json
from typing import Any
import uvicorn

app = FastAPI()

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

# Mount static files (HTML, CSS, JS) - MUST be after API endpoints
app.mount("/", StaticFiles(directory="uidemo", html=True), name="uidemo")

if __name__ == "__main__":
    uvicorn.run("uidemo_fastapi_backend:app", host="127.0.0.1", port=8000, reload=True)
