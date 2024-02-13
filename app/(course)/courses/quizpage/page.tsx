"use client"

import apiService from "@/service/apiService";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from '@/public/logo-dark.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const QuizPage = () => {

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

    const courseIdRef = useRef(courseId);

    useEffect(() => {
        courseIdRef.current = courseId;
    }, [courseId]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiService.get(`/api/courses/quiz/quiz-page/?courseId=${courseIdRef.current}`)
            if (response.status == 200) {
                setQuestions(response.data.data)
            }
        }
        fetchData()
    }, []);

    return (
        <div>
            {
                questions && questions.length > 0 ?
                    <>
                        <div className="h-full w-full text-white">
                            <div className="flex items-center justify-start my-5 mx-3 w-full sticky top-5">
                                <Image alt="Brotoype- Brother You never had" height={140} width={140} src={Logo} />
                            </div>
                            <div className="h-full w-full flex flex-col items-center justify-center">
                                <div className="flex justify-center w-full">
                                    <h1 className="text-[34px] font-bold my-5 sticky top-32">Certification Quiz</h1>
                                </div>
                                <div className="mt-10 h-full grid md:grid-cols-1 w-[70%] gap-x-24 gap-y-20 justify-center">
                                    {
                                        questions.map((item: any, index) => {
                                            return (
                                                <div className="flex flex-col min-w-full items-start" key={item.id}>
                                                    <Dialog>
                                                        <DialogTrigger className="w-full">
                                                            <div className="p-2 cursor-pointer rounded-md flex items-center  bg-[#55637B]">
                                                                <h1 className="line-clamp-2">{index + 1}. {item.quizzQuestion}</h1>
                                                            </div>
                                                        </DialogTrigger>
                                                        <DialogContent className="bg-black text-white">
                                                            <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription>
                                                                    {index + 1}. {item.quizzQuestion}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <div className="grid mt-2 ms-3">
                                                        {[item.option1, item.option2].map((option, i) => (
                                                            <div className="flex my-1" key={i}>
                                                                <input className="h-7 text-red-600" type="radio" name={item.id} onChange={() => handleOptionChange(item.id, i)} />
                                                                <p className="ms-2">{option}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="grid ms-3">
                                                        {[item.option3, item.option4].map((option, i) => (
                                                            <div className="flex my-1" key={i + 2}>
                                                                <input className="h-7 text-red-500" type="radio" name={item.id} onChange={() => handleOptionChange(item.id, i + 2)} />
                                                                <p className="ms-2">{option}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button className="h-[40px] rounded-md my-8 w-[200px] bg-[#6100FF]" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </> :
                    <div className="flex h-screen w-full items-center justify-center">
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500">
                            </div>
                        </div>
                    </div>
            }
        </div>

    );
}

export default QuizPage;