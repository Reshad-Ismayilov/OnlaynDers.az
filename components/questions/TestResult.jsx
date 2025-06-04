function TestResult({ correctAnswers, totalQuestions, percentage, message, onRestart }) {
    return (
      <div className="p-6 border rounded mt-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Test Nəticən</h2>
        <p>✅ Doğru cavablar: {correctAnswers} / {totalQuestions}</p>
        <p>📊 Faiz: {percentage.toFixed(2)}%</p>
        <p className="mt-2 font-semibold">{message}</p>
  
        <button
          onClick={onRestart}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Yenidən Başla
        </button>
      </div>
    );
  }
  
  export default TestResult;
  