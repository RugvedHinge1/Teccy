# Teccy Integrated Application

This application integrates the "Frontend Part" UI with the "Math.py" Logic/Backend.

## Directory Structure
The integrated application is located in `math.py/math.py` (inside your `math.py1` download).

## How to Run

1.  **Start the Logic Backend (Streamlit)**
    Open a terminal in the `math.py/math.py` directory and run:
    ```bash
    streamlit run question.py
    ```
    This will start the AI Practice Mode on `http://localhost:8501`. You can minimize this terminal window, but **do not close it**.

2.  **Launch the Dashboard**
    Open `index.html` in your web browser. 
    *   You can double-click the file in File Explorer.
    *   OR serve it using Python for a better experience:
        ```bash
        python -m http.server 8000
        ```
        Then allow access and open `http://localhost:8000` in your browser.

## Features
*   **New Dashboard UI:** The "Jersey 10" themed main menu and navigation.
*   **Greenhouse Game:** Accessible from the "Greenhouse" card or sidebar.
*   **Logic Integration:** Clicking "Generate Question" in the Practice cards will open the Streamlit-powered AI Practice Mode.
*   **Existing Tools:** Dashboard stats, Buddy System, and Flashcards are preserved and accessible.

## Troubleshooting
*   **"General Store" or "Almanac" not working:** These files were not present in the provided frontend directory. The links are placeholders.
*   **AI generation fails:** Ensure `question.py` is running and you have Ollama installed and serving the required models.
