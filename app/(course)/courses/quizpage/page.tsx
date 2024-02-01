"use client"

import apiService from "@/service/apiService";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import CourseCertificate from "../[courseId]/_components/course-certificate";

const QuizPage = (req: Request) => {

    const { data: session }: any = useSession()

    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');


    const [questions, setQuestions] = useState<[]>([])

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (questionId: string, optionIndex: number) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleSubmit = async () => {
        let correctCount = 0;
        questions.forEach((question: any) => {
            if (selectedOptions[question.id] === question.correctOption) {
                correctCount++;
            }
        });


        if (correctCount >= questions.length / 2) {
            const data = {
                courseId: courseId,
                userId: session?.user.userid
            }
            const response = await apiService.post('/api/courses/quiz/certificate', { data })
            if (response.status == 201 || response.status == 400) {
                alert(`You got ${correctCount} out of ${questions.length} answers right.`);
                alert("The certificate is created and generated!!!")
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log(courseId, 'from the use efffect')
            const response = await apiService.get(`/api/courses/quiz/quiz-page/?courseId=${courseId}`)
            if (response.status == 200) {
                setQuestions(response.data.data)
            }
        }
        fetchData()
    }, [])



    return (
        <div>
            {
                questions && questions.length > 0 ?
                    <>
                        {/* <CourseCertificate /> */}
                        <div className="h-full w-full flex flex-col items-center">
                            <div className="flex justify-center w-full">
                                <h1 className="text-xl font-bold my-5">Certification Quiz</h1>
                            </div>
                            <div className="mt-10 w-full h-full flex flex-col items-start">
                                {
                                    questions.map((item: any, index) => {
                                        return (
                                            <div className="flex flex-col items-start" key={item.id}>
                                                <h1>{index + 1}. {item.quizzQuestion}</h1>
                                                <div className="flex justify-center">
                                                    {[item.option1, item.option2].map((option, i) => (
                                                        <div className="flex justify-between mx-3" key={i}>
                                                            <input type="radio" name={item.id} onChange={() => handleOptionChange(item.id, i)} />
                                                            <p>{option}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-center">
                                                    {[item.option3, item.option4].map((option, i) => (
                                                        <div className="flex justify-between mx-3" key={i + 2}>
                                                            <input type="radio" name={item.id} onChange={() => handleOptionChange(item.id, i + 2)} />
                                                            <p>{option}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <button onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </> : <h1>Generating Quiz....</h1>
            }
        </div>

    );
}

export default QuizPage;