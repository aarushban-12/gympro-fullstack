import React, { useState } from "react";
import "./Trivia.css";

const questions = [
  {
    question: "What macronutrient is primarily responsible for muscle repair?",
    options: ["Carbohydrates", "Protein", "Fat", "Vitamins"],
    answer: "Protein",
  },
  {
    question: "How many days a week is it recommended to exercise?",
    options: ["1–2", "2–3", "5–7", "Every day"],
    answer: "5–7",
  },
  {
    question: "Which exercise primarily targets the chest muscles?",
    options: ["Squats", "Deadlifts", "Bench Press", "Pull-Ups"],
    answer: "Bench Press",
  },
  {
    question: "What is BMI short for?",
    options: [
      "Body Muscle Index",
      "Basic Metabolism Input",
      "Body Mass Index",
      "Bone Mass Index",
    ],
    answer: "Body Mass Index",
  },
  {
    question: "Which vitamin is best known for supporting bone health?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    answer: "Vitamin D",
  },
];

function Trivia() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionClick = (option) => {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrentQ(currentQ + 1);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
  };

  return ( 
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">🏋️‍♂️ Gym Trivia</h1>

      {currentQ < questions.length ? (
        <div className="card p-4 shadow-sm">
          <h4 className="mb-4 fw-bold">{questions[currentQ].question}</h4>

          <div className="list-group mb-3">
            {questions[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                className={`list-group-item list-group-item-action ${
                  showAnswer
                    ? option === questions[currentQ].answer
                      ? "list-group-item-success"
                      : option === selected
                      ? "list-group-item-danger"
                      : ""
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="text-center">
              <p className="fw-semibold">
                {selected === questions[currentQ].answer
                  ? "✅ Correct!"
                  : `❌ Incorrect! Correct answer: ${questions[currentQ].answer}`}
              </p>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="mb-4">🏁 Quiz Complete!</h3>
          <h4>
            You scored <span className="text-success">{score}</span> out of{" "}
            {questions.length}
          </h4>
          <button className="btn btn-outline-primary mt-3" onClick={restart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Trivia;
