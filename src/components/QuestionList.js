import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    // Fetch existing questions and update state
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestionList(data))
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleAddQuestion = (newQuestion) => {
    // Update state to include the new question
    setQuestionList([...questionList, newQuestion]);
  };

  return (
    <div>
      <h1>Quiz Questions</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <ul>
        {questionList.map((question) => (
          <li key={question.id}>{question.prompt}</li>
          // Adjust the property (e.g., question.prompt) based on your API response
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;