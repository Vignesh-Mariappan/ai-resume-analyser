import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import ATS from '~/components/ATS';
import Details from '~/components/Details';
import Summary from '~/components/Summary';
import { usePuterStore } from '~/lib/puter';

export const meta = () => ([
    { title: 'Resumind | Review' },
    { name: 'description', content: 'Detailed overview of your resume' }
  ])
  

const resume = () => {
  const { id } = useParams();
  const { auth, isLoading, kv, fs } = usePuterStore();
  const [ imageUrl, setImageUrl ] = useState('');
  const [ resumeUrl, setResumeUrl ] = useState('');
  const [ feedback, setFeedback ] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  // redirect if the user is already logged in
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`)
    }
  }, [auth, isLoading])

  useEffect(() => {
    const loadResume = async() => {
        const resume = await kv.get(`resume:${id}`);

        if(!resume) {
            return;
        }

        const data = JSON.parse(resume);

        const resumeBlob = await fs.read(data.resumePath);

        if (!resumeBlob) {
            return;
        }

        const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);

        const imageBlob = await fs.read(data.imagePath);

        if (!imageBlob) {
            return;
        }

        const image = URL.createObjectURL(imageBlob);
        setImageUrl(image);

        setFeedback(data.feedback);

    }

    loadResume();
  }, [id]);

  
  return (
    <main className="!pt-10">
        <nav className="resume-nav">
            <Link to="/" className="back-button">
                <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
                <span className="text-gray-800 text-sm font-semibold">Back to Home page</span>
            </Link>
        </nav>

        <div className="flex flex-row w-full max-lg:flex-col-reverse">
            <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 justify-center items-center">
                {
                    imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a><img src={imageUrl} className="w-full h-full object-contain rounded-2xl" alt="resume" /></a>
                        </div>
                    )
                }
            </section>

            <section className="feedback-section">
                <h2 className="text-4xl text-black font-bold">Resume Review</h2>
                {
                    feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" className="w-full " />
                    )
                }
            </section>
        </div>
    </main>
  )
}

export default resume