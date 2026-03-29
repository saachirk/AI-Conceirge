## AI Concierge for Economic Times
An intelligent assistant that understands users and guides them through the entire ET ecosystem using conversational AI.

## Problem Statement : 
Economic Times offers a vast ecosystem — including ET Prime, Markets, masterclasses, events, and financial services.
However:
- Users discover less than 10% of available services  
- No personalization across user journeys  
- High information overload  

## Solution : 
We built an **AI Concierge** that:
- Understands users through a short conversation  
- Builds a real-time financial profile  
- Recommends relevant ET services  
- Provides data-driven insights with graphs   
It transforms ET into a **personal financial companion**

## Setup Instructions : 

**1. Clone the repository :**
git clone https://github.com/saachirk/AI-Conceirge.git
cd AI-Conceirge

**2. Backend Setup (Flask):**
cd backend
**create virtual environment:*
python -m venv venv
**activate it:*
**Windows** : venv\Scripts\activate
**Mac/Linux** : source venv/bin/activate
**install dependencies* : pip install -r requirements.txt

**3. Environment Variables:**
create an env file with api key :
GROQ_API_KEY=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  (already present in the folder)

**4. Run Backend Server:**
python app.py

Server will start at:
http://127.0.0.1:8000

**5. Frontend Setup:**
cd ../frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

**6. Using the App:**
Open frontend in browser
Click Get Started
Interact with AI Concierge
Ask financial questions and view graphs




   
