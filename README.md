📌 Trello Clone – Setup & Run Guide

This project has two parts:

Backend → FastAPI + PostgreSQL

Frontend → Next.js + Tailwind + MUI

🔹 1. Prerequisites (install once)

Make sure these are installed on your system:

✅ System Requirements

Python ≥ 3.10

Node.js ≥ 18

PostgreSQL ≥ 14

npm (comes with Node)

Check versions:

python --version
node --version
psql --version

🔹 2. Backend Setup (FastAPI)
📁 Go to backend folder
cd backend

📌 Create virtual environment
python -m venv venv
source venv/bin/activate   # Linux / macOS
# OR
venv\Scripts\activate      # Windows

📌 Install backend dependencies
pip install -r requirements.txt

📄 requirements.txt
fastapi==0.110.0
uvicorn==0.27.1

sqlalchemy==2.0.25
psycopg2-binary==2.9.9

pydantic==2.6.1
pydantic-settings==2.2.1

alembic==1.13.1
python-multipart==0.0.9
python-dotenv==1.0.1

🔹 Database Setup (PostgreSQL)

Create database:

CREATE DATABASE trello_db;


Connect:

psql trello_db


Run your table creation SQL (boards, lists, cards, etc.).

⚠️ Make sure your database URL in .env or config matches:

postgresql://username:password@localhost:5432/trello_db

▶️ Run Backend Server
uvicorn main:app --reload


Backend will run at:

http://127.0.0.1:8000


API docs:

http://127.0.0.1:8000/docs

🔹 3. Frontend Setup (Next.js)
📁 Go to frontend folder
cd frontend

📌 Install frontend dependencies
npm install

📦 Main Frontend Dependencies
{
  "next": "^14.x",
  "react": "^18.x",
  "react-dom": "^18.x",

  "@mui/material": "^5.x",
  "@mui/icons-material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",

  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x"
}

▶️ Run Frontend
npm run dev


Frontend runs at:

http://localhost:3000

🔹 4. How the App Works (Flow)

Open frontend → http://localhost:3000

Select user: Alice / Bob / Charles

Choose theme (background)

Create boards (saved in DB)

Open board

Create lists → cards → card modal

All data synced with backend APIs

🔹 5. Important Notes (READ THIS)

Backend must be running before frontend

Frontend API base URL:

const API = "http://127.0.0.1:8000";


Images must be in:

frontend/public/trello/


Do NOT commit:

venv/

.env

node_modules/

.next/

🔹 6. Common Commands (Quick Reference)
Backend
source venv/bin/activate
uvicorn main:app --reload

Frontend
npm run dev
