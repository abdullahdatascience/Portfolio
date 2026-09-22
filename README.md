# Muhammad Abdullah — Portfolio

**Software Engineer | Data & Machine Learning**

A professional portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Firebase Firestore.

The portfolio presents my software engineering projects, data analysis work, machine learning projects, education, experience, and certifications.

## About

I am a Computer Science graduate from Government College University Faisalabad focused on building practical software systems and data-driven applications.

My work combines:

* Software engineering
* Backend API development
* Data analysis and visualization
* Machine learning
* Database-driven applications
* Practical business software

## Featured Project

### Biz Ledger — Financial ERP

A full-stack financial ERP application designed around practical business accounting workflows.

Technology:

* React
* TypeScript
* Vite
* Tailwind CSS
* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT authentication
* Role-based access control
* REST APIs

Key functionality:

* Sales and purchases
* Invoices and bills
* Payments
* Banking and reconciliation
* Double-entry accounting
* Financial reporting
* Audit logs
* Company-level data isolation
* Authentication and authorization

The project focuses on building a complete business application with structured financial workflows and data correctness.

## Other Projects

### Customer Churn Prediction

A machine learning application for predicting customer churn using a telecom customer dataset.

Technology:

* Python
* Pandas
* NumPy
* Scikit-learn
* Streamlit
* Matplotlib
* Seaborn

The project includes data preprocessing, feature transformation, model training, evaluation, and an interactive prediction interface.

### Fraud Detection

A machine learning project focused on identifying potentially fraudulent transactions in an imbalanced dataset.

Technology:

* Python
* Pandas
* NumPy
* Scikit-learn
* Random Forest
* SHAP

The project focuses on class imbalance, threshold tuning, model evaluation, and model explainability.

### Salary Prediction API

A machine learning API that predicts salary categories from features such as age, experience, and education.

Technology:

* Python
* Scikit-learn
* FastAPI
* Docker
* REST API

The project demonstrates how a trained machine learning model can be exposed through an API and packaged for deployment.

## Technical Skills

### Software Engineering

* Python
* JavaScript
* TypeScript
* React
* Next.js
* FastAPI
* REST APIs
* Git
* GitHub

### Data & Analytics

* Pandas
* NumPy
* SQL
* MySQL
* PostgreSQL
* Power BI
* Excel
* Matplotlib
* Seaborn
* Data visualization
* Data cleaning and analysis

### Machine Learning

* Scikit-learn
* Machine learning
* Classification
* Predictive modeling
* Model evaluation
* NLP
* SHAP

### Infrastructure & Tools

* Firebase / Firestore
* Docker
* Vite
* Jupyter
* Google Colab

## Portfolio Features

* Responsive portfolio interface
* Dark professional UI
* Native scrolling
* Firebase Firestore integration
* Dynamic portfolio content
* Admin portal for managing portfolio data
* SEO metadata
* Open Graph metadata
* JSON-LD structured data
* Contact form validation
* Firestore security rules
* `prefers-reduced-motion` support
* Responsive navigation

## Tech Stack

* **Framework:** Next.js 16
* **Frontend:** React 19, TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **Database:** Firebase Firestore
* **Deployment:** Vercel
* **Tooling:** ESLint, Git, GitHub

## Project Structure

```text
F:\My Portfolio
├── app/                  # Next.js application routes and layout
├── components/           # Portfolio UI sections
├── lib/                  # Firebase, data fetching, and shared types
├── public/               # Static assets and resume
├── styles/               # Global styles
├── admin-portal/         # Separate portfolio administration app
├── firestore.rules       # Firestore security rules
├── next.config.mjs       # Next.js configuration
└── package.json          # Project dependencies and scripts
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env.local` file based on `.env.example` and add the required Firebase configuration values.

Do not commit `.env.local` or any private credentials.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

`http://localhost:3000`

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production build locally.

```bash
npm run lint
```

Runs ESLint.

## Deployment

The portfolio is designed to be deployed with Vercel.

Basic deployment process:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.
5. Configure Firebase Firestore security rules.

The portfolio uses Firebase Firestore for dynamic portfolio data, allowing supported content such as projects, skills, certifications, and other portfolio information to be managed without hard-coding every entry into the frontend.

## Resume

The resume is stored at:

`public/resume.pdf`

Replace this file with the latest version of the resume when updating the portfolio.

## Author

**Muhammad Abdullah**

Software Engineer | Data & Machine Learning

* GitHub: https://github.com/abdullahdatascience
* LinkedIn: https://linkedin.com/in/muhammadabdullah-data

## License

MIT