import axios from 'axios';
import { useEffect, useState } from 'react';

const QuizPage = () => {
    const [quizData, setQuizData] = useState();
    const [newGame, setNewGame] = useState(false);
    let [score, setScore] = useState(0);
    const [isFinish, setIsFinish] = useState(false);
    let [step, setStep] = useState(0);
    useEffect(() => {
        async function getData() {
            const res = await axios.get(
                'https://opentdb.com/api.php?amount=10&type=boolean'
            );
            return res;
        }
        getData()
            .then((res) => setQuizData(res.data.results))
            .catch((err) => console.log(err));
    }, [newGame]);

    const trueHandler = async () => {
        nextQuestion(true)
    };

    const falseHandler = async () => {
        nextQuestion(false);
    };

    const nextQuestion = (value) => {
        if (step === 9) setIsFinish(true);
        if (quizData) {
            const correctValue = checkCorrect(quizData);
            correctValue === value && setScore(++score)
        }
        quizData.shift();
        setQuizData([...quizData]);
        step !== 9 && setStep(++step);
    };

    const newGameHandler = async () => {
        setStep(0);
        setNewGame(!newGame);
        setScore(0);
        setIsFinish(false);
    };

    const formatQuiz = (question) => {
        return question
            .replaceAll('&quot;', `"`)
            .replaceAll('&#039;', `'`)
            .replaceAll('&eacute;', 'é')
            .replaceAll('&minus;', ' - ')
            .replaceAll("&rsquo;", "'");
    };

    const checkCorrect = (question) => {
        const correct_answer = (question[0]?.correct_answer.toLowerCase()) === "true";
        return correct_answer;
    };

    quizData && quizData.forEach((e) => console.log(e.correct_answer))
    console.log(step);
    return (
        quizData && (
            <section className="mt-12 ">
                <section className="game-info flex justify-between text-[30px]">
                    <div className="game-score text-green-700 flex">
                        <div>Score:</div>
                        <p>{score}</p>
                    </div>
                    <div className="progess flex">
                        <div>{step + 1}</div>
                        <div>/</div>
                        <div>10</div>
                    </div>
                </section>
                <section className="game-play flex flex-col text-center bg-slate-50 rounded-md py-6 px-6">
                    {isFinish ? (
                        <section>
                            <p>WELL DONE</p>
                            <p>{`Your Score is ${score}`} </p>
                        </section>
                    ) : (
                        <>
                            <div className="mb-2 font-bold text-[20px]">{quizData.length > 0 &&  quizData[0].category}</div>
                            <div className="mb-2">
                                { quizData.length > 0 && `Question: ${  formatQuiz(quizData[0].question)}`}
                            </div>
                            {!isFinish && (
                                <div className="flex justify-center gap-2">
                                    <button
                                        className="rounded-md bg-slate-400 px-2 py-2"
                                        onClick={trueHandler}
                                    >
                                        TRUE
                                    </button>
                                    <button
                                        className="rounded-md bg-slate-400 px-2 py-2"
                                        onClick={falseHandler}
                                    >
                                        FALSE
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
                <div className="flex justify-center mt-4">
                    <button
                        className="rounded-md bg-slate-400 px-2 py-2"
                        onClick={newGameHandler}
                    >
                        NEW GAME
                    </button>
                </div>
            </section>
        )
    );
};

export default QuizPage;
