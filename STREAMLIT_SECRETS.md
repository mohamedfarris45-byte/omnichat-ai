How to add the OpenAI API key for Streamlit Cloud (secrets)

1) In Streamlit Cloud, go to your app's Settings -> Secrets.
2) Add a key named OPENAI_API_KEY with your OpenAI API key as the value.
   Example:
   OPENAI_API_KEY = "sk-..."

Alternatively, you can set the environment variable OPENAI_API_KEY on your hosting provider or locally.

Notes:
- Keep your key secret. Do not commit it to the repository or include it in plain files.
- After adding the secret, re-deploy the app on Streamlit Cloud.
