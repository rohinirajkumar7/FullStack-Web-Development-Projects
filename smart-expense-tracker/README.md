# 💰 Smart Expense Tracker (AI-Powered)

Smart Expense Tracker is a full-stack MERN + FastAPI application that helps users track and analyze their spending.  
It features AI-based receipt scanning, automatic expense categorization, and beautiful visual analytics—all wrapped in a modern, animated UI.

---

## 🚀 Features

### 🌐 Frontend (React + Tailwind + Framer Motion)

- Modern responsive UI with smooth animations
- Separate pages for Login, Register, and Dashboard
- Real-time expense list with Edit/Delete functionality
- Interactive charts for category and monthly analysis using Chart.js
- PDF export of financial reports
- Feedback & suggestion system to collect user input
- Elegant message alerts, animated modals, and responsive layout

### ⚙️ Backend (Node.js + Express + MongoDB)

- RESTful APIs for authentication and expense management
- Secure user management with JWT authentication
- File upload handling using multer
- Automatic connection retry and rate limiting
- Seamless integration with AI microservice for OCR/NLP categorization

### 🤖 AI Microservice (FastAPI + EasyOCR + spaCy + Scikit-learn)

- OCR using EasyOCR to extract text from receipt images
- NLP with spaCy and regex to extract merchant, date, amount, and currency
- Machine learning model trained to predict expense category (ml/expense_model.joblib)
- Built-in `/health` endpoint for service readiness check

---

## 🏗️ Project Structure
```
smart-expense-tracker/
├── ai-service/ # FastAPI microservice for OCR + NLP + ML
│ ├── app.py
│ ├── service.py
│ ├── ocr.py
│ ├── nlp.py
│ ├── categorize.py
│ ├── requirements.txt
│ └── download_models.py
│
├── backend/ # Node.js backend (Express + MongoDB)
│ ├── config.js
│ ├── package.json
│ └── src/
│ ├── app.js
│ ├── server.js
│ ├── config/db.js
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── utils/
│
├── frontend/ # React frontend with Tailwind + Framer Motion
│ ├── index.html
│ ├── vite.config.js
│ ├── tailwind.config.js
│ └── src/
│ ├── App.jsx
│ ├── index.jsx
│ ├── main.css
│ ├── components/
│ └── pages/
│
├── ml/ # Machine Learning assets
│ ├── sample_expenses.csv
│ ├── train_model.py
│ └── expense_model.joblib
│
├── .env.example
├── README.md
└── copy_all_files.js

```

---

## ⚡ Setup & Installation

### 🧠 1. Clone the Repository

git clone https://github.com/yourusername/smart-expense-tracker.git
cd smart-expense-tracker



### ⚙️ 2. Backend Setup (Express)

cd backend
npm install



Create a `.env` file:

MONGO_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=verysecretkey
PORT=4000
AI_SERVICE_URL=http://localhost:8001



Start server:

npm start



### 🤖 3. AI Service Setup (FastAPI)

cd ../ai-service
pip install -r requirements.txt



Download OCR models:

python download_models.py



Run AI microservice:

python service.py



### 💻 4. Frontend Setup (React + Vite)

cd ../frontend
npm install
npm run dev



Frontend runs on http://localhost:5173

---

## 🔗 API Endpoints

### Backend (Express)

| Endpoint                 | Method | Description                         |
|--------------------------|--------|-------------------------------------|
| /api/auth/register       | POST   | Register a new user                 |
| /api/auth/login          | POST   | Login user & get JWT token          |
| /api/expenses            | GET    | Get all user expenses               |
| /api/expenses            | POST   | Add new expense (with receipt)      |
| /api/expenses/:id        | PUT    | Update an expense                   |
| /api/expenses/:id        | DELETE | Delete an expense                   |

### AI Service (FastAPI)

| Endpoint        | Method | Description                                          |
|-----------------|--------|------------------------------------------------------|
| /parse_receipt  | POST   | Upload a receipt image for OCR + NLP + category prediction |
| /health         | GET    | Check AI service status                              |

---

## 📊 Features Overview

| Module           | Tech Used                 | Description                                  |
|------------------|--------------------------|----------------------------------------------|
| OCR              | EasyOCR                   | Extracts text from receipt images            |
| NLP              | spaCy + Regex            | Extracts merchant, date, and amount          |
| Categorization   | Scikit-learn Pipeline    | Predicts expense category                    |
| Visualization    | Chart.js + jsPDF         | Displays reports & exports as PDF            |
| Authentication   | JWT + bcrypt             | Secure login/register                        |
| Database         | MongoDB (Mongoose)       | Stores user and expense data                 |
| UI/UX            | Tailwind + Framer Motion | Animated, modern frontend                    |

---

## 🧩 Example Workflow

1. User logs in or registers.
2. Adds expense manually or uploads a receipt.
3. The AI microservice scans the receipt and predicts category automatically.
4. Expenses are saved in MongoDB.
5. Dashboard shows updated list and analytics.

---

## 🧠 Tech Stack

- **Frontend:** React, TailwindCSS, Framer Motion, Chart.js
- **Backend:** Node.js, Express.js, MongoDB, JWT, Multer
- **AI Service:** FastAPI, EasyOCR, spaCy, Scikit-learn, Pandas, Joblib
- **Other Tools:** Vite, jsPDF, html2canvas

---

## 📈 Future Enhancements

- AI-based spending insights and recommendations
- Multi-currency support with live conversion
- Cloud-based image storage (e.g., AWS S3)
- Advanced analytics dashboard

---

## 🧑‍💻 Authors

**Developed by:** Rohini R 
🎓 **Project for:** Full Stack Development With AI/ML

---

## 📝 License

This project is licensed under the MIT License.

---


## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
