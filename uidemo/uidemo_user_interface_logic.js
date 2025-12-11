// --- UI Interactive Elements ---
const agentSelect = document.getElementById('agentSelect');
const levelSelect = document.getElementById('levelSelect');
const questionPolicySelect = document.getElementById('questionPolicySelect');
const commentStyleSelect = document.getElementById('commentStyleSelect');
const havingEnabledToggle = document.getElementById('havingEnabledToggle');
const havingEnabledToggleInput = document.getElementById('havingEnabledToggleInput');
const packagingSelect = document.getElementById('packagingSelect');
const returnFormatSelect = document.getElementById('returnFormatSelect');
const schemaViolationSelect = document.getElementById('schemaViolationSelect');
const emptyContentSelect = document.getElementById('emptyContentSelect');
const summaryJson = document.getElementById('summaryJson');
const sendBtn = document.getElementById('sendBtn');
const messageHistory = document.getElementById('messageHistory');

// New Elements
const personaExperienceLevelSelect = document.getElementById('personaExperienceLevelSelect');
const personaToneSelect = document.getElementById('personaToneSelect');
const detailLevelSelect = document.getElementById('detailLevelSelect');
const styleToneSelect = document.getElementById('styleToneSelect');
const styleVoiceSelect = document.getElementById('styleVoiceSelect');
const maxTokensOutSelect = document.getElementById('maxTokensOutSelect');
const lengthHintMinSelect = document.getElementById('lengthHintMinSelect');
const lengthHintMaxSelect = document.getElementById('lengthHintMaxSelect');
const havingTopKSelect = document.getElementById('havingTopKSelect');


const allControls = [
    agentSelect, levelSelect, questionPolicySelect, commentStyleSelect,
    packagingSelect, returnFormatSelect,
    schemaViolationSelect, emptyContentSelect, personaExperienceLevelSelect,
    personaToneSelect, detailLevelSelect, styleToneSelect,
    styleVoiceSelect, maxTokensOutSelect, lengthHintMinSelect, lengthHintMaxSelect,
    havingTopKSelect
];

let jsonObject;

function initializeState() {
    jsonObject = {
      "version": "avq-1.0",
      "ai_query_id": "session_def_456",
      "agent": "vibe_coder",
      "timestamp_utc": "2025-09-24T14:00:00Z",
      "level": "small",
      "select": [
        {
          "type": "summarization",
          "task_goal": "Implement the dark mode feature as planned by the Architect. I've selected the main stylesheet and the settings component where the toggle should go.",
          "detail_level": "detailed",
          "style": {
            "tone": "concise and helpful",
            "voice": "an expert software engineer",
            "avoid": [
              "making large changes",
              "being conversational"
            ]
          },
          "constraints": {
            "max_tokens_out": 4096,
            "length_hint_words": {
              "min": 10,
              "max": 1000
            },
            "must_include_sections": [],
            "forbidden_content": []
          },
          "output_contract": {
            "name": "CodeSummarizationV1",
            "media_type": "application/json",
            "schema_ref": "codesum_v1",
            "return_format": "single_json_line",
            "fields": {
              "overview": "A brief overview of the changes.",
              "key_points": [
                "A list of key points about the implementation."
              ],
              "risks_or_issues": []
            }
          },
          "ask_if_ambiguous": true
        }
      ],
      "from": {
        "persona": {
          "main": {
            "persona_id": "vibe-coder-persona",
            "role_title": "Incremental Developer",
            "domain_expertise": [
              "Web Development",
              "CSS",
              "JavaScript",
              "React"
            ],
            "experience_level": "senior",
            "description": "You are responsible for building up the user's application. You must move slowly and deliberately, making only small changes based on the user's requests. If you need clarification on a request, you should always ask the user for more information before proceeding. Only ask for clarification, do not ask for permission.",
            "tone": "professional",
            "voices": [
              "expert developer"
            ]
          }
        },
        "content": [
          {
            "id": "/home/iron/projects/seekunique/full-system/frontend/static/css/styles.css",
            "media_context": "workspace_file",
            "media_type": "code",
            "name": "styles.css",
            "reference_mode": "inline_snippet",
            "language": "css",
            "uri": "/home/iron/projects/seekunique/full-system/frontend/static/css/styles.css",
            "text": "body {
  background-color: #fff;
  color: #333;
}

.dark-mode {
  background-color: #333;
  color: #fff;
}"
          },
          {
            "id": "/home/iron/projects/seekunique/full-system/frontend/src/components/Settings.js",
            "media_context": "workspace_file",
            "media_type": "code",
            "name": "Settings.js",
            "reference_mode": "inline_snippet",
            "language": "javascript",
            "uri": "/home/iron/projects/seekunique/full-system/frontend/src/components/Settings.js",
            "text": "import React from 'react';

const Settings = () => {
  return (
    <div>
      <h2>Settings</h2>
      {/* Dark mode toggle will go here */}
    </div>
  );
};

export default Settings;"
          },
          {
            "id": "selected_code",
            "media_context": "pasted_text",
            "media_type": "code",
            "name": "selected code snippet",
            "reference_mode": "inline_snippet",
            "text": "/* Dark mode toggle will go here */"
          }
        ],
        "models": [
          {
            "name": "gemini-pro",
            "purpose": "drafting"
          }
        ]
      },
      "where": {
        "qualifiers": [],
        "specifications": {
          "formatting": {
            "sections_order": [
              "overview",
              "key_points"
            ],
            "bullets_max": 10
          },
          "question_policy": "always_ask",
          "comment_style": "markdown_ok"
        }
      },
      "having": {
        "enabled": false,
        "top_k": 0,
        "sources": []
      },
      "return": {
        "content_out": {
          "packaging": "single_payload",
          "deliver_to": [
            "ui.panel:edits"
          ],
          "post_process": []
        },
        "errors": {
          "on_schema_violation": "return_error_json",
          "on_empty_content": "return_idk_literal"
        }
      }
    };
    updateUIFromState();
    updateJsonPreview();
}

function updateUIFromState() {
    agentSelect.value = jsonObject.agent;
    levelSelect.value = jsonObject.level;
    questionPolicySelect.value = jsonObject.where.specifications.question_policy;
    commentStyleSelect.value = jsonObject.where.specifications.comment_style;
    havingEnabledToggleInput.checked = jsonObject.having.enabled;
    packagingSelect.value = jsonObject.return.content_out.packaging;
    returnFormatSelect.value = jsonObject.select[0].output_contract.return_format;
    schemaViolationSelect.value = jsonObject.return.errors.on_schema_violation;
    emptyContentSelect.value = jsonObject.return.errors.on_empty_content;

    // New UI elements
    personaExperienceLevelSelect.value = jsonObject.from.persona.main.experience_level;
    personaToneSelect.value = jsonObject.from.persona.main.tone;
    detailLevelSelect.value = jsonObject.select[0].detail_level;
    styleToneSelect.value = jsonObject.select[0].style.tone;
    styleVoiceSelect.value = jsonObject.select[0].style.voice;
    maxTokensOutSelect.value = jsonObject.select[0].constraints.max_tokens_out;
    lengthHintMinSelect.value = jsonObject.select[0].constraints.length_hint_words.min;
    lengthHintMaxSelect.value = jsonObject.select[0].constraints.length_hint_words.max;
    havingTopKSelect.value = jsonObject.having.top_k;

    updateHavingToggleLabel();
}


function updateJsonPreview() {
    jsonObject.timestamp_utc = new Date().toISOString();
    summaryJson.textContent = JSON.stringify(jsonObject, null, 2);
}

function onControlChange() {
    jsonObject.agent = agentSelect.value;
    jsonObject.level = levelSelect.value;
    jsonObject.where.specifications.question_policy = questionPolicySelect.value;
    jsonObject.where.specifications.comment_style = commentStyleSelect.value;
    jsonObject.having.enabled = havingEnabledToggleInput.checked;
    jsonObject.return.content_out.packaging = packagingSelect.value;
    jsonObject.select[0].output_contract.return_format = returnFormatSelect.value;
    jsonObject.return.errors.on_schema_violation = schemaViolationSelect.value;
    jsonObject.return.errors.on_empty_content = emptyContentSelect.value;

    // New UI elements
    jsonObject.from.persona.main.experience_level = personaExperienceLevelSelect.value;
    jsonObject.from.persona.main.tone = personaToneSelect.value;
    jsonObject.select[0].detail_level = detailLevelSelect.value;
    jsonObject.select[0].style.tone = styleToneSelect.value;
    jsonObject.select[0].style.voice = styleVoiceSelect.value;
    jsonObject.select[0].constraints.max_tokens_out = parseInt(maxTokensOutSelect.value, 10);
    jsonObject.select[0].constraints.length_hint_words.min = parseInt(lengthHintMinSelect.value, 10);
    jsonObject.select[0].constraints.length_hint_words.max = parseInt(lengthHintMaxSelect.value, 10);
    jsonObject.having.top_k = parseInt(havingTopKSelect.value, 10);


    updateJsonPreview();
}

// --- Toggles Logic ---
function updateHavingToggleLabel() {
    const isChecked = havingEnabledToggleInput.checked;
    havingEnabledToggle.textContent = isChecked ? 'Enable' : 'Disable';
    havingEnabledToggle.setAttribute('data-state', isChecked);
}

// Attach click listener to the text container to toggle the hidden checkbox
havingEnabledToggle.addEventListener('click', (e) => {
    havingEnabledToggleInput.checked = !havingEnabledToggleInput.checked;
    updateHavingToggleLabel();
    onControlChange();
    e.stopPropagation();
});

async function onSend() {
    // Update the task_goal with the message input before sending
    const messageInput = document.getElementById('messageInput');
    if (messageInput.value) {
        jsonObject.select[0].task_goal = messageInput.value;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/render', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject),
        });
        const data = await response.json();
        const renderedTemplate = data.rendered_template;

        const responseElement = document.createElement('p');
        responseElement.style.whiteSpace = 'pre-wrap';
        responseElement.textContent = renderedTemplate;
        messageHistory.appendChild(responseElement);
        messageHistory.scrollTop = messageHistory.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
    }
}


// --- Event Listeners and Initialization ---
allControls.forEach(control => {
    control.addEventListener('change', onControlChange);
});

sendBtn.addEventListener('click', onSend);

// Initialize the preview when the page loads
document.addEventListener('DOMContentLoaded', initializeState);
