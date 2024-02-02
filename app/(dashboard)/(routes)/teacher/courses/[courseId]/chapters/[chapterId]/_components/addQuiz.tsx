import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import apiService from '@/service/apiService';

interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

const AddQuiz = ({ chapterId, courseId }: any) => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [newOptions, setNewOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState<number | null>(null);

    const [publishedQuestion, setPublishedQuestions] = useState<[]>([])
    const [toggle, setToggle] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiService.get(`/api/courses/quiz/?chapterId=${chapterId}`)
            setPublishedQuestions(response.data.data)
        }
        fetchData()
    }, [chapterId])



    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: questions.length,
                text: newQuestion,
                options: newOptions.map((option, index) => ({
                    id: index,
                    text: option,
                    isCorrect: correctOption === index,
                })),
            },
        ]);
        setNewQuestion('');
        setNewOptions(['', '', '', '']);
        setCorrectOption(null);
    };

    const handleDeleteQuestion = (id: string) => {
        setQuestions(questions.filter(question => question.id != Number(id)));
    };

    const handlePublishQuestions = async () => {
        for (let i = 0; i < questions.length; i++) {
            let question = questions[i];
            let data = {
                chapterId: chapterId,
                quizzQuestion: question.text,
                option1: question.options[0].text,
                option2: question.options[1].text,
                option3: question.options[2].text,
                option4: question.options[3].text,
                courseId: courseId,
                correctOption: question.options.findIndex(option => option.isCorrect),
            };

            const response = await apiService.post('/api/courses/quiz', { data })

            if (response.status === 201) {
                setQuestions([])
                console.log('Success the question has been added!');
            } else {
                console.log("Something went wrong while doing this operation")
            }
        }
    };

    const viewPublishedQuestions = () => {
        console.log("This is the published questions: ", publishedQuestion)
        setToggle(true)
    }


    return (
        <div>
            {
                !toggle ?
                    <>
                        <div className="h-full w-full">
                            <textarea
                                className='mb-2 border w-full focus:outline-none pl-3 py-2 h-[100px] rounded-md'
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Enter question"
                            />
                            <div className="flex justify-between mb-4">
                                {newOptions.slice(0, 2).map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            className='me-3 '
                                            type="radio"
                                            name="correctOption"
                                            checked={correctOption === index}
                                            onChange={() => setCorrectOption(index)}
                                        />
                                        <input
                                            className='me-3 border pl-3 rounded-md focus:outline-none'
                                            value={option}
                                            onChange={(e) => {
                                                const updatedOptions = [...newOptions];
                                                updatedOptions[index] = e.target.value;
                                                setNewOptions(updatedOptions);
                                            }}
                                            type="text"
                                            placeholder={`Enter option ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mb-4">
                                {newOptions.slice(2).map((option, index) => (
                                    <div key={index + 2} className="flex items-center space-x-2">
                                        <input
                                            className='me-3'
                                            type="radio"
                                            name="correctOption"
                                            checked={correctOption === index + 2}
                                            onChange={() => setCorrectOption(index + 2)}
                                        />
                                        <input
                                            className='me-3 border pl-3 rounded-md focus:outline-none'
                                            value={option}
                                            onChange={(e) => {
                                                const updatedOptions = [...newOptions];
                                                updatedOptions[index + 2] = e.target.value;
                                                setNewOptions(updatedOptions);
                                            }}
                                            type="text"
                                            placeholder={`Enter option ${index + 3}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col items-center justify-center h-full w-full'>
                                <button className='bg-green-400 text-white w-[300px] rounded-lg hover:bg-green-600 mb-3 h-[30px]' onClick={handleAddQuestion}>Add Question</button>
                                {publishedQuestion.length > 0 && <h1 className='text-sm text-blue-500 rounded-lg mb-5 cursor-pointer mx-3' onClick={viewPublishedQuestions}>View Published Questions</h1>}
                            </div>

                            {/* before submitting final view of question and answers */}
                            {questions.length > 0 && questions?.map((question, index) => (
                                <div key={question.id}>
                                    <div className='flex my-2 justify-between'>
                                        <div className='flex'>
                                            <h1>{index + 1}. </h1>
                                            <h2>{question.text}</h2>
                                        </div>
                                        <button className='text-red-500 focus:outline-none' onClick={() => handleDeleteQuestion(String(question.id))}>x</button>
                                    </div>
                                    <div className='flex w-full h-full space-x-4 '>
                                        <RadioGroup>
                                            {question?.options?.length > 1 && question.options.slice(0, 2).map((option: any, index) => (
                                                <div className='flex justify-between my-2 w-[300px]' key={option.id}>
                                                    <div className="flex items-center space-x-2">
                                                        <Label className={option.isCorrect ? `text-green-400` : ''} htmlFor={`option-${option.id}`}>{option.text}</Label>
                                                    </div>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        <RadioGroup>
                                            {question?.options?.length > 1 && question?.options?.slice(2).map((option) => (
                                                <div className='flex justify-between' key={option.id}>
                                                    <div className="flex items-center space-x-2">
                                                        <Label className={option.isCorrect ? `text-green-400` : ''} htmlFor={`option-${option.id}`}>{option.text}</Label>
                                                        <h1>{option.isCorrect}</h1>
                                                    </div>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                            ))}
                            {
                                questions.length > 0 ?
                                    <div className='flex flex-col items-center justify-center mt-8 h-full w-full'>
                                        <button className='bg-orange-400 text-white w-[300px] rounded-lg hover:bg-orange-600 mb-5 h-[30px]' onClick={handlePublishQuestions}>Publish Questions</button>
                                    </div> : null
                            }

                        </div>
                    </> :
                    <div className='flex flex-col'>
                        {publishedQuestion.length > 0 && publishedQuestion.map((question: any, index) => (
                            <div key={index}>
                                <div className='flex flex-col mt-5 justify-between'>
                                    <div className='flex'>
                                        <h1>{index + 1}. </h1>
                                        <h2>{question.quizzQuestion}</h2>
                                    </div>
                                </div>
                                <div className='flex flex-col w-full h-full space-x-4 '>
                                    <RadioGroup>
                                        <div className='flex justify-between w-full'>
                                            <div className="flex flex-col items-center ">
                                                <div className='flex justify-start gap-x-20 my-4 w-[300px]'>
                                                    <Label className={question.correctOption == '0' ? `text-green-400 w-full` : 'w-full'}>a) {question.option1}</Label>
                                                    <Label className={question.correctOption == '1' ? `text-green-400 w-full` : 'w-full'}>b) {question.option2}</Label>
                                                </div>
                                                <div className='flex justify-start gap-x-20 w-[300px]'>
                                                    <Label className={question.correctOption == '2' ? `text-green-400 w-full` : 'w-full'}>c) {question.option3}</Label>
                                                    <Label className={question.correctOption == '3' ? `text-green-400 w-full` : 'w-full'}>d) {question.option4}</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default AddQuiz;
