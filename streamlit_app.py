import streamlit as st
from datetime import datetime
import os

st.set_page_config(page_title="Omnichat AI", layout="wide")

# --- Styles (simple chat bubble styling) ---
st.markdown(
    """
    <style>
    .chat-container {
        max-width: 900px;
        margin: 0;
        padding: 8px 12px;
    }
    .bubble {
        display: inline-block;
        padding: 12px 16px;
        border-radius: 16px;
        margin: 8px 0;
        max-width: 80%;
        line-height: 1.4;
        word-wrap: break-word;
    }
    .user {
        background: #2b6cb0;
        color: white;
        float: right;
        border-bottom-right-radius: 4px;
    }
    .assistant {
        background: #2d3748;
        color: #e2e8f0;
        float: left;
        border-bottom-left-radius: 4px;
    }
    .meta {
        font-size: 0.75rem;
        color: #94a3b8;
        margin-bottom: 6px;
    }
    .clearfix { clear: both; }
    </style>
    """,
    unsafe_allow_html=True,
)

# --- Initialize session state ---
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "assistant",
            "content": "Hello! I'm Omnichat AI. Type a message below and press Send.",
            "ts": datetime.utcnow().isoformat(),
        }
    ]


def add_user_message(text: str):
    st.session_state.messages.append(
        {"role": "user", "content": text, "ts": datetime.utcnow().isoformat()}
    )


def add_assistant_message(text: str):
    st.session_state.messages.append(
        {"role": "assistant", "content": text, "ts": datetime.utcnow().isoformat()}
    )

# --- Bot response function (OpenAI integration if key available) ---

def get_bot_response(prompt: str) -> str:
    """
    If OPENAI_API_KEY is provided in Streamlit secrets or environment variables, this function
    will call the OpenAI ChatCompletion API. Otherwise it returns a demo echo response.
    """
    api_key = st.secrets.get("OPENAI_API_KEY") if "OPENAI_API_KEY" in st.secrets else os.getenv("OPENAI_API_KEY")
    if api_key:
        try:
            import openai
            openai.api_key = api_key
            # Build the chat history for the API, limited to recent messages to avoid long contexts
            history = [
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages[-12:]
            ] + [{"role": "user", "content": prompt}]

            resp = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=history,
                max_tokens=512,
                temperature=0.7,
            )
            return resp.choices[0].message.content.strip()
        except Exception as e:
            # Surface the error to the user in a friendly way
            return f"Error calling OpenAI API: {str(e)}"
    # Fallback demo response
    return "Assistant (demo): I received your message: " + prompt

# --- Page header ---
st.title("Omnichat AI")
st.write("A simple chat interface. This starter app keeps conversation in memory (session) and shows how to plug in a real model/API.)")

# --- Chat area ---
chat_container = st.container()
with chat_container:
    st.markdown('<div class="chat-container">', unsafe_allow_html=True)
    for msg in st.session_state.messages:
        role = msg.get("role", "assistant")
        content = msg.get("content", "")
        ts = msg.get("ts", "")
        if role == "user":
            st.markdown(f'<div class="meta" style="text-align:right;">You • {ts}</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="bubble user">{content}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="meta" style="text-align:left;">Omnichat • {ts}</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="bubble assistant">{content}</div>', unsafe_allow_html=True)
        st.markdown('<div class="clearfix"></div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# --- Input area ---
st.markdown("---")
col1, col2 = st.columns([8, 1])
with col1:
    user_input = st.text_input("Enter a message", key="user_input", placeholder="Type here...")
with col2:
    send = st.button("Send")

if send and st.session_state.get("user_input", "").strip():
    text = st.session_state.user_input.strip()
    add_user_message(text)
    # Clear input
    st.session_state.user_input = ""
    # Get assistant reply (synchronous)
    reply = get_bot_response(text)
    add_assistant_message(reply)
    # Rerun to show new messages
    st.experimental_rerun()

# --- Helpful note for deployment ---
st.sidebar.header("Deployment notes")
st.sidebar.write(
    """
- This app stores messages in the user's session only (server memory). For persistent storage, connect a database.
- To use OpenAI, add an API key to Streamlit Secrets (or env var) and the app will call the API automatically.
- Add packages to requirements.txt (e.g. `openai`) if you enable real API calls.
"""
)
