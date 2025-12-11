# JinjaPromptKit UI Demo

This directory contains a simple web-based UI demo to visually construct and test the `ai_query.jinja` template. It allows you to modify various parameters of the query JSON object through a user-friendly interface and see the rendered Jinja template output in real-time.

## Overview

The demo consists of:
- A **frontend** built with plain HTML, CSS, and JavaScript that provides a set of controls to manipulate a JSON object representing an AI query.
- A **backend** powered by FastAPI (Python) that serves the frontend and provides an API endpoint (`/render`) to process the JSON object and render it using the `ai_query.jinja` template from the parent directory.

## File Structure

```
uidemo/
├── index.html                      # The main UI page
├── requirements.txt                # Python dependencies
├── uidemo_fastapi_backend.py       # The FastAPI server logic
├── uidemo_style_and_layout.css     # CSS for the UI
└── uidemo_user_interface_logic.js  # JavaScript for UI interactivity
```

## Setup and Running the Demo

### 1. Install Dependencies

The backend is written in Python and requires a few packages. Make sure you have Python installed, then install the dependencies using pip:

```bash
pip install -r uidemo/requirements.txt
```

### 2. Run the Backend Server

Navigate to the root of the project directory (not the `uidemo` directory) and run the FastAPI server:

```bash
python3 uidemo/uidemo_fastapi_backend.py
```

This will start a local web server, typically on `http://127.0.0.1:8000`. The server will automatically reload if you make changes to the backend file.

### 3. Open the UI

Open your web browser and navigate to:

[http://127.0.0.1:8000](http://127.0.0.1:8000)

## How to Use

The UI is designed to be intuitive:
- **Controls:** The interface is divided into collapsible sections (Level 1 to 5), each containing dropdowns and toggles that correspond to fields in the master `ai_query.json` structure.
- **Live JSON Preview:** As you change the settings in the UI, the underlying JSON object is updated. While not displayed on the main page, this JSON is what gets sent to the backend.
- **Rendering the Template:**
    1. Optionally, type a task description into the input box at the bottom.
    2. Click the "Send" button.
    3. The JavaScript logic will send the current JSON configuration to the backend's `/render` endpoint.
    4. The backend renders the `ai_query.jinja` template using this JSON data.
    5. The final, rendered string is returned and displayed in the "response area" at the top of the UI.
