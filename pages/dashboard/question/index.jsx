"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiCheck, FiX, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { API_URL } from "@/app/apiconfig";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  // API çağırışı ilə sualları yükləyirik
  useEffect(() => {
    if (quizStarted) {
      axios
        .get(`${API_URL}/questions/course/1`) // API endpointi
        .then((response) => {
          setQuestions(response.data); // testSuallari API'dən alınan məlumatla doldurulur
        })
        .catch((error) => {
          console.error("API çağırışı zamanı xəta baş verdi:", error);
        });
    }
  }, [quizStarted]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(selectedAnswers).forEach((questionIndex) => {
      if (
        selectedAnswers[questionIndex] === questions[questionIndex].correctAnswer
      ) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = calculateScore();

    // Nəticəni serverə göndəririk
    axios
      .post(`${API_URL}/submit-quiz-results`, {
        score: score,
        answers: selectedAnswers,
      })
      .then((response) => {
      })
      .catch((error) => {
      });
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Reqəmsal Marketiq Testi
            </h1>
            <p className="text-gray-600 mb-8">
              10 sualdan ibarət bu test ilə reqəmsal marketiq biliklərinizi
              yoxlayın. Hər sual üçün 5 variant arasından doğru cavabı seçin.
            </p>
            <button
              onClick={startQuiz}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Testə Başla
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Test Nəticələri
              </h1>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6 mt-6">
                <div
                  className={`h-4 rounded-full ${
                    percentage >= 70
                      ? "bg-green-500"
                      : percentage >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-4xl font-bold mb-2">
                {score} / {questions.length}
              </p>
              <p className="text-xl mb-6">
                {percentage >= 70
                  ? "Əla! Çox yaxşı nəticə!"
                  : percentage >= 50
                  ? "Yaxşı! Amma daha çox öyrənməlisiniz"
                  : "Zəif! Reqəmsal marketiq haqqında daha çox oxuyun"}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-800 mb-2">
                    {question.questionText}
                  </h3>
                  <div className="space-y-2">
                    {["A", "B", "C", "D"].map((variant, vIndex) => (
                      <div
                        key={vIndex}
                        className={`p-2 rounded ${
                          vIndex === question.correctAnswer
                            ? "bg-green-50 border border-green-200"
                            : selectedAnswers[qIndex] === vIndex
                            ? "bg-red-50 border border-red-200"
                            : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          {vIndex === question.correctAnswer && (
                            <FiCheck className="text-green-500 mr-2" />
                          )}
                          {selectedAnswers[qIndex] === vIndex &&
                            vIndex !== question.correctAnswer && (
                              <FiX className="text-red-500 mr-2" />
                            )}
                          {question[`variant${variant}`]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
            >
              Testi Yenidən Başlat
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Boş suallar yoxdursa, currentQuestion mövcuddur
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Sualar yüklənmədi
            </h1>
            <p className="text-gray-600 mb-8">
              Testin sualları yüklənməyib. Zəhmət olmasa, yenidən cəhd edin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Sual {currentQuestionIndex + 1}/{questions.length}
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-4">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.questionText}
            </h2>

            <div className="space-y-3 mb-8">
              {["A", "B", "C", "D"].map((variant, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerSelect(currentQuestionIndex, index)
                  }
                  className={`w-full text-left p-4 rounded-lg border transition ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  {currentQuestion[`variant${variant}`]}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-300 text-white font-medium rounded-lg"
              >
                <FiChevronLeft />
                Əvvəlki
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg"
              >
                Növbəti
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
