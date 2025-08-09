# Jaza — Financial Visibility & Credit for Informal Businesses

> **Accelerate your growth.**
> Jaza helps informal businesses — from mama mbogas to boda riders — track income, build healthy savings habits, and unlock access to affordable credit, all driven by real transaction data.

---

## 🚀 Mission

To empower small and informal businesses with tools that improve **financial visibility** and encourage **behavior-based savings**, paving the way for **fair, data-driven credit**.

We start by solving the biggest problem for this segment: **lack of visibility into daily cashflow**. Without it, saving and borrowing sustainably is nearly impossible.

---

## Core Features

### **MVP (Live)**

* **Daily Income Tracking** — Manual entry + automatic M-Pesa Till inflow tracking.
* **Analytics Dashboard** — View income trends, digital vs cash split, and projections.
* **Savings Jar** — Save manually towards a goal.
* **Micro-Coaching** — Context-aware tips and nudges to improve business finances.

### **Planned**

* **Jaza Credit** — Stock or fuel top-ups with partial savings requirement and repayment via small daily deductions.
* **Auto-Savings** — Fixed % of income automatically transferred to savings.
* **Marketplace** — Connect to relevant wholesalers or suppliers based on business type.
* **Admin Dashboard** — Internal tool to manage users, transactions, and credit approvals.

---

## 🛠 Tech Stack

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| Frontend    | Next.js (TypeScript)                 |
| Backend API | FastAPI (Python)                     |
| Database    | Supabase (PostgreSQL)                |
| Hosting     | Vercel (frontend), Railway (backend) |
| Auth        | Supabase Auth                        |
| Payments    | M-Pesa Daraja API                    |

---

## Project Structure

```
jaza/
├── backend/                 # FastAPI backend
│   └── app/
│       ├── api/             # API endpoints
│       ├── models/          # Database models
│       ├── services/        # Business logic
│       └── main.py
├── frontend/                # Next.js frontend
│   ├── pages/
│   └── components/
├── docs/                    # Product & system docs
│   ├── system-design.md
│   ├── product-roadmap.md
│   └── pitch-deck.md
├── .env.example
├── README.md
└── docker-compose.yml
```

---

## ⚙️ Installation & Setup

### Prerequisites

* **Node.js** (v18+)
* **Python** (3.11+)
* **Supabase account**
* **M-Pesa Daraja sandbox or production credentials**

###  Clone the Repository

```bash
git clone https://github.com/yourusername/jaza.git
cd jaza
```

### Environment Variables

Copy `.env.example` to `.env` in both `frontend/` and `backend/` folders, then update with your own credentials.

Example (backend `.env`):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_CALLBACK_BASE_URL=https://your-ngrok-or-production-url
```

###  Run Locally

**Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Live Demo

Frontend: **[https://jaza.vercel.app](https://jaza.vercel.app)**
Backend: Hosted on Railway (private API)

---

## 📈 Roadmap

* [ ] Implement Jaza Credit feature with automated repayment.
* [ ] Add supplier/marketplace integration by business type.
* [ ] Introduce auto-save rules linked to income patterns.
* [ ] Enhance micro-coaching with AI-driven personalization.
* [ ] Launch Android app for offline-first use.

---

## 🤝 Contributing

We welcome contributions, especially from developers familiar with financial systems, mobile payments, and data-driven coaching.
Fork the repo, make your changes, and submit a pull request.

---

## 📜 License


---