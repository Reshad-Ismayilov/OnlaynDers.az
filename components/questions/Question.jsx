function Question({ question, selected, onSelect, index }) {
    return (
      <div className="p-4 border rounded mb-4">
        <h2 className="font-semibold mb-2">{index + 1}) {question.questionText}</h2>
        <div className="space-y-2">
          {[question.variantA, question.variantB, question.variantC, question.variantD].map((variant, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx + 1)}
              className={`block w-full text-left p-2 border ${
                selected === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              {variant}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default Question;
  