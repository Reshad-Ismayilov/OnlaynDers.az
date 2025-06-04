import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Question from '@/components/questions/Question';
import TestResult from '@/components/questions/TestResult';
import api from '@/utils/api';

function TestPage() {
  const router = useRouter();
  const { courseId } = router.query;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUser = async () => {
    try {
      const response = await api.get("auth/me");
      setUser(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.data && typeof err.response.data === 'object') {
          setError(err.response.data.error || err.message);
        } else {
          try {
            const errorData = JSON.parse(err.response.data);
            setError(errorData.error || err.message);
          } catch (parseError) {
            setError(err.response.data || err.message);
          }
        }

        if (err.response.status === 401) {
          window.location.href = "/";
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (courseId) {
      api.get(`/test-questions/for-client?courseId=${courseId}&langCode=az`)
        .then(res => setQuestions(res.data))
        .catch(err => console.error(err));
    }
  fetchUser();

  }, [courseId]);

  const handleSelect = (questionIndex, variant) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: variant }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      setWarning('Zəhmət olmasa bütün sualları cavablayın!');
      return;
    }
    setWarning('');

    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const payload = {
      courseId: parseInt(courseId),
      correctAnswers: correct,
      totalQuestions: questions.length,
    };

    try {
      const res = await api.post('/test-results/answer', payload);
      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setWarning('');
  };

  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  if (!questions.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <TestResult
          correctAnswers={result.correctAnswers}
          totalQuestions={result.totalQuestions}
          percentage={result.percentage}
          message={result.message}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="mb-6">
          <div className="h-4 bg-gray-300 rounded">
            <div
              className="h-4 bg-blue-500 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-sm mt-1 font-medium text-gray-600">{progress}% tamamlandı</p>
        </div>

        {questions.map((q, idx) => (
          <Question
            key={idx}
            question={q}
            selected={answers[idx] || null}
            onSelect={(variant) => handleSelect(idx, variant)}
            index={idx}
          />
        ))}

        {warning && (
          <div className="text-red-500 text-center mt-4 font-semibold">{warning}</div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 mt-8 rounded-lg transition-all duration-300 shadow-lg"
        >
          Testi Bitir və Nəticəni Gör
        </button>
      </div>
    </div>
  );
}

export default TestPage;
