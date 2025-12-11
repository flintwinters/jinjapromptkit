// --- UI Interactive Elements ---
const agentSelect = document.getElementById('agentSelect');
const levelSelect = document.getElementById('levelSelect');
const questionPolicySelect = document.getElementById('questionPolicySelect');
const commentStyleSelect = document.getElementById('commentStyleSelect');
const havingEnabledToggle = document.getElementById('havingEnabledToggle');
const havingToggleText = document.getElementById('havingToggleText');
const packagingSelect = document.getElementById('packagingSelect');
const returnFormatSelect = document.getElementById('returnFormatSelect');
const schemaViolationSelect = document.getElementById('schemaViolationSelect');
const emptyContentSelect = document.getElementById('emptyContentSelect');
const summaryJson = document.getElementById('summaryJson');

// New Elements
const personaExperienceLevelSelect = document.getElementById('personaExperienceLevelSelect');
const personaToneInput = document.getElementById('personaToneInput');
const personaVoicesInput = document.getElementById('personaVoicesInput');
const detailLevelSelect = document.getElementById('detailLevelSelect');
const styleToneInput = document.getElementById('styleToneInput');
const styleVoiceInput = document.getElementById('styleVoiceInput');
const maxTokensOutInput = document.getElementById('maxTokensOutInput');
const lengthHintMinInput = document.getElementById('lengthHintMinInput');
const lengthHintMaxInput = document.getElementById('lengthHintMaxInput');
const havingTopKInput = document.getElementById('havingTopKInput');
const havingSourcesInput = document.getElementById('havingSourcesInput');

const allControls = [
    agentSelect, levelSelect, questionPolicySelect, commentStyleSelect,
    havingEnabledToggle, packagingSelect, returnFormatSelect,
    schemaViolationSelect, emptyContentSelect, personaExperienceLevelSelect,
    personaToneInput, personaVoicesInput, detailLevelSelect, styleToneInput,
    styleVoiceInput, maxTokensOutInput, lengthHintMinInput, lengthHintMaxInput,
    havingTopKInput, havingSourcesInput
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
    havingEnabledToggle.checked = jsonObject.having.enabled;
    packagingSelect.value = jsonObject.return.content_out.packaging;
    returnFormatSelect.value = jsonObject.select[0].output_contract.return_format;
    schemaViolationSelect.value = jsonObject.return.errors.on_schema_violation;
    emptyContentSelect.value = jsonObject.return.errors.on_empty_content;

    // New UI elements
    personaExperienceLevelSelect.value = jsonObject.from.persona.main.experience_level;
    personaToneInput.value = jsonObject.from.persona.main.tone;
    personaVoicesInput.value = jsonObject.from.persona.main.voices.join(', ');
    detailLevelSelect.value = jsonObject.select[0].detail_level;
    styleToneInput.value = jsonObject.select[0].style.tone;
    styleVoiceInput.value = jsonObject.select[0].style.voice;
    maxTokensOutInput.value = jsonObject.select[0].constraints.max_tokens_out;
    lengthHintMinInput.value = jsonObject.select[0].constraints.length_hint_words.min;
    lengthHintMaxInput.value = jsonObject.select[0].constraints.length_hint_words.max;
    havingTopKInput.value = jsonObject.having.top_k;
    havingSourcesInput.value = jsonObject.having.sources.join(', ');

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
    jsonObject.having.enabled = havingEnabledToggle.checked;
    jsonObject.return.content_out.packaging = packagingSelect.value;
    jsonObject.select[0].output_contract.return_format = returnFormatSelect.value;
    jsonObject.return.errors.on_schema_violation = schemaViolationSelect.value;
    jsonObject.return.errors.on_empty_content = emptyContentSelect.value;

    // New UI elements
    jsonObject.from.persona.main.experience_level = personaExperienceLevelSelect.value;
    jsonObject.from.persona.main.tone = personaToneInput.value;
    jsonObject.from.persona.main.voices = personaVoicesInput.value.split(',').map(s => s.trim()).filter(Boolean);
    jsonObject.select[0].detail_level = detailLevelSelect.value;
    jsonObject.select[0].style.tone = styleToneInput.value;
    jsonObject.select[0].style.voice = styleVoiceInput.value;
    jsonObject.select[0].constraints.max_tokens_out = parseInt(maxTokensOutInput.value, 10);
    jsonObject.select[0].constraints.length_hint_words.min = parseInt(lengthHintMinInput.value, 10);
    jsonObject.select[0].constraints.length_hint_words.max = parseInt(lengthHintMaxInput.value, 10);
    jsonObject.having.top_k = parseInt(havingTopKInput.value, 10);
    jsonObject.having.sources = havingSourcesInput.value.split(',').map(s => s.trim()).filter(Boolean);


    updateJsonPreview();
}

// --- Toggles Logic ---
function updateHavingToggleLabel() {
    const isChecked = havingEnabledToggle.checked;
    havingToggleText.textContent = isChecked ? 'Enable' : 'Disable';
    havingToggleText.setAttribute('data-state', isChecked);
}

// Attach click listener to the text container to toggle the hidden checkbox
havingToggleText.addEventListener('click', (e) => {
    havingEnabledToggle.checked = !havingEnabledToggle.checked;
    updateHavingToggleLabel();
    onControlChange();
    e.stopPropagation();
});


// --- Event Listeners and Initialization ---
allControls.forEach(control => {
    const eventType = (control.type === 'text' || control.type === 'number') ? 'input' : 'change';
    control.addEventListener(eventType, onControlChange);
});

// Initialize the preview when the page loads
document.addEventListener('DOMContentLoaded', initializeState);
