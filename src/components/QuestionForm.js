import React, { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create a data object for the POST request
    const postData = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: parseInt(formData.correctIndex, 10),
    };

    // Send POST request to create a new question
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((newQuestion) => {
        // You can add any additional logic here if needed
        console.log("New question created:", newQuestion);
      })
      .catch((error) => {
        console.error("Error creating question:", error);
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {/* ... existing form fields ... */}
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;