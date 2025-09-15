# Oration AI - AI Career Counselor Chat Application

This is the submission for the Oration AI Software Engineer assignment. It is a full-stack web application that acts as an AI-powered career counselor, built with Next.js, TypeScript, tRPC, Prisma, and deployed on Vercel.

**Live Demo URL:** [Link to your Vercel deployment will go here]

---

## 📸 Screenshots

*[Add a screenshot of your application here. A picture of the chat interface would be great!]*

![Chat Interface](./screenshots/chat-interface.png)

---

## ✨ Features

- **🤖 AI-Powered Chat:** Real-time, meaningful career advice from an AI assistant (powered by Google Gemini).
- **📝 Chat History:** All conversations are saved and can be revisited.
- **🗄️ Persistent Storage:** Chat sessions and messages are stored in a PostgreSQL database (hosted on Neon).
- **⚡ Modern Tech Stack:** Built with the latest technologies for a type-safe, efficient, and scalable application.
- **📱 Responsive Design:** The user interface is designed to work well on both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **API Layer:** [tRPC](https://trpc.io/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI:** [Google Gemini API](https://ai.google.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later)
- [pnpm](https://pnpm.io/installation)

### 1. Clone the repository

```bash
git clone [Your GitHub Repository URL]
cd oration-ai-assignment
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a file named `.env` in the root of the project and add the following variables. You will need to get these from their respective services.

```env
# Get this from your Neon database project
DATABASE_URL="your_postgresql_connection_string"

# Get this from Google AI Studio
GOOGLE_API_KEY="your_google_ai_api_key"
```

### 4. Sync the database schema

This command will create the necessary tables in your database.

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---