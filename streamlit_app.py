import streamlit as st

st.set_page_config(page_title="Omnichat AI", layout="wide")

st.title("Omnichat AI")
st.write("This is a minimal Streamlit entrypoint added by the assistant. Replace this with your app code.")

prompt = st.text_input("Enter a message")
if st.button("Send"):
    st.write("You entered:", prompt)

# End of file
