# Jaza: Intelligent Financial Visibility & Credit for Informal Businesses

## Mission

**Empowering informal businesses like mama mbogas, boda riders, and small retailers with intelligent, behavior-based financial visibility, savings coaching, and future access to affordable, data-driven credit.**

---

##  Core Idea

Instead of starting with lending, Jaza emphasizes **financial health**:

- **Daily Income Tracking**: Manual + M-Pesa-based income monitoring.
- **Smart Savings Coaching**: Behavior-driven nudges to save for essentials.
- **Jaza Credit**: Unlock stock/fuel top-ups after saving a portion.
- **Projections & Analytics**: Personalized dashboards based on spending & earning trends.
- **Micro-Coaching Engine**: Tailored tips via in-app, SMS or WhatsApp.

---

##  Tech Stack

| Layer            | Technology                      |
|------------------|----------------------------------|
| Frontend         | Next.js + TypeScript            |
| Backend API      | FastAPI (Python)                |
| Database         | Supabase (PostgreSQL)           |
| Hosting          | Railway (with Docker optional)  |
| Auth             | Supabase Auth                   |
| Payments         | M-Pesa API (Daraja)             |

---

##  Project Structure

├── backend/ # FastAPI logic
│ └── app/
│ ├── api/
│ ├── models/
│ ├── services/
│ └── main.py
├── frontend/ # Next.js frontend
│ └── pages/
│ └── index.tsx
├── docs/ # Docs and specs
│ ├── system-design.md
│ ├── product-roadmap.md
│ └── pitch-deck.md
├── .env.example 
├── README.md 
└── docker-compose.yml


1. User Registration & Onboarding

Phone verification

Business details (type, location, name)

Register existing MPesa Till (mandatory for now)

2. Daily Earnings Tracker

Pull inflows from MPesa Till via C2B API

Allow manual cash entry

Daily earnings summary

3. Financial Visibility & Analytics

Income trends dashboard

Cash vs digital income split

Weekly/monthly income projections

4. Savings Jar

Manual savings input (prompt-based)

Dedicated "Jaza Jar"

Future feature: Auto-save % of income

5. JAZA Credit (Top-Up Feature)

User saves 50% of stock/fuel cost

Jaza pays the other 50% directly to verified supplier

For repayment:

User opts into daily auto-repayment (5-10% of daily Till inflow)

B2C STK push triggered each evening (8pm)

6. Micro Coaching Nudges

Based on income consistency, spending patterns

Weekly advice snippets via dashboard/notifications

7. Admin Dashboard (Basic)

View users, inflows, savings activity

Jaza credit applications

Credit disbursement control panel

8. It just hit me
- Another powerfull feature to add here would be the marketplace section
- You registered as a mtumba business your marketplace will be full of mitumba wholesalers
and bale stockists(Find out bale inafunguliwa lini. This would allow you to buy products for your shop from traders in your region. This could be a premium feature. How it would work is whays
bothering me at tis point should I allow them to have stockist account on signup or wholesalers account. Needs a little more brainstorming)