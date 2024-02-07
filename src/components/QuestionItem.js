import React, { useState } from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectIndexChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    setSelectedCorrectIndex(newCorrectIndex);

    // Send PATCH request to update the correct answer on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then(() => {
        // You might want to implement a callback to refresh the question list
        console.log(`Correct answer for Question ${id} updated`);
      })
      .catch((error) => {
        console.error("Error updating correct answer:", error);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={selectedCorrectIndex}
          onChange={handleCorrectIndexChange}
        >
          {options}
        </select>
      </label>
    </li>
  );
}

export default QuestionItem;