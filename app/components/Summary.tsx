import React from 'react'
import ScoreGauge from './ScoreGauge';
import ScoreBadge from './ScoreBadge';


const Category = ({ title, score }: {
    title: string,
    score: number
}) => (
    <div className="resume-summary">
        <div className="category">
            <div className="flex flex-row gap-2 justify-center items-center"><p className="text-2xl">{title}</p>
            <ScoreBadge score={score} /></div>
            <p className="text-2xl">
                <span className={score > 70 ? 'text-green-600' : score > 49 ? 'text-yellow-600' : 'text-red-600'}>
                    { score }
                </span> / 100
            </p>
        </div>
    </div>
)

const Summary = ({ feedback }: { feedback: Feedback}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
        <div className="flex flex-rol items-center p-4 gap-8">
            <ScoreGauge score={feedback?.overallScore || 0} />
            <div className="flex flex-col gap-2">
                <h2 className='text-2xl font-bold'>Your Resume Score</h2>
                <p className="text-sm text-gray-500">
                    This score is calculated based on the listed variables below.
                </p>
            </div>
        </div>

        <Category title='Tone and Style' score={feedback.toneAndStyle.score} />
        <Category title='Content' score={feedback.content.score} />
        <Category title='Structure' score={feedback.structure.score} />
        <Category title='Skills' score={feedback.skills.score} />
    </div>
  )
}

export default Summary