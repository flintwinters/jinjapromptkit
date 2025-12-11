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
const allControls = [
    agentSelect, levelSelect, questionPolicySelect, commentStyleSelect, 
    havingEnabledToggle, packagingSelect, returnFormatSelect, 
    schemaViolationSelect, emptyContentSelect
];

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
    updateJsonPreview(); // Update preview on change
    e.stopPropagation(); 
});

// Initialize toggle labels
updateHavingToggleLabel();

// --- JSON Generation Logic ---

function getBaseJsonTemplate() {
     // Minimal valid JSON structure based on the schema required fields
    return {
        "version": "avq-1.0",
        "ai_query_id": "auto-gen-001",
        "agent": agentSelect.value,
        "timestamp_utc": new Date().toISOString(),
        "level": levelSelect.value,
        
        "select": [
            {
                "type": "summarization", 
                "task_goal": "summarize content of messageInput", 
                "detail_level": "normal",
                "style": {"tone": "technical", "voice": "concise", "avoid": []},
                "constraints": {
                    "max_tokens_out": 2048, 
                    "length_hint_words": {"min": 50, "max": 200},
                    "must_include_sections": ["overview"],
                    "forbidden_content": []
                },
                "output_contract": {
                    "name": "CodeSummarizationV1",
                    "media_type": "application/json",
                    "schema_ref": "codesum_v1",
                    "return_format": returnFormatSelect.value,
                    "fields": {"overview": "string", "key_points": ["string"], "risks_or_issues": ["string"]}
                },
                "ask_if_ambiguous": true
            }
        ],
        
        "from": {
            "persona": {
                "main": {
                    "persona_id": "dev-assistant",
                    "role_title": "AI Assistant",
                    "domain_expertise": ["software"],
                    "experience_level": "senior",
                    "description": "Technical query execution engine.",
                    "tone": "direct",
                    "voices": ["professional"]
                }
            }
        },
        
        "where": {
            "qualifiers": [],
            "specifications": {
                "formatting": {
                    "sections_order": ["overview", "key_points", "risks_or_issues"],
                    "bullets_max": 5
                },
                "question_policy": questionPolicySelect.value,
                "comment_style": commentStyleSelect.value
            }
        },
        
        "having": {
            "enabled": havingEnabledToggle.checked,
            "top_k": 5,
            "sources": ["internet.google", "internal.knowledgebase"]
        },
        
        "return": {
            "content_out": {
                "packaging": packagingSelect.value,
                "deliver_to": ["ui.panel:query_results"],
                "post_process": []
            },
            "errors": {
                "on_schema_violation": schemaViolationSelect.value,
                "on_empty_content": emptyContentSelect.value
            }
        }
    };
}

function updateJsonPreview() {
    const jsonObject = getBaseJsonTemplate();
    summaryJson.textContent = JSON.stringify(jsonObject, null, 2);
}

// --- Event Listeners and Initialization ---
allControls.forEach(control => {
    control.addEventListener('change', updateJsonPreview);
});

// Initialize the preview when the page loads
document.addEventListener('DOMContentLoaded', updateJsonPreview);
