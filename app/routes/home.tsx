import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
    const navigate = useNavigate();
  
    // redirect if the user is already logged in
    useEffect(() => {
      if (!auth.isAuthenticated) {
        navigate('/auth?next=/')
      }
    }, [auth])
    
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Resume & Applications</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
    

    {
      resumes.length > 0 && (
        <div className="resumes-section">
          {
            resumes.map((resume: Resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))
          }
        </div>
      )
    }
    </section>
  </main>;
}
