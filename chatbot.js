let questions = [
    {
        question: "Does bread need yeast to rise?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Yes, yeast produces the gas that makes bread rise.",
        incorrectResponse: "Actually, yeast is what makes bread light and fluffy!"
    },
    {
        question: "Is a cupcake the same as a muffin?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "b",
        correctResponse: "Correct! Cupcakes are sweet and frosted, muffins are denser and less sweet.",
        incorrectResponse: "No, cupcakes and muffins are actually different treats!"
    },
    {
        question: "Are croissants originally from France?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "b",
        correctResponse: "Indeed! Croissants actually originated in Austria.",
        incorrectResponse: "Croissants actually originated in Austria, not France!"
    }
];

let currentQuestionIndex = 0;
let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");
displayQuestion();


function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let optionsHTML = Object.keys(currentQuestion.options).map(key => `${key}. ${currentQuestion.options[key]}`).join(' | ');

    let botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message");
    botResponse.innerHTML = `<strong>Bot:</strong> ${currentQuestion.question}<br><em>${optionsHTML}</em>`;
    chatContainer.appendChild(botResponse);
    scrollChatContainerToBottom();
}

function scrollChatContainerToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let userResponse = userInput.value.trim().toLowerCase();

    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<strong>You:</strong> ${userResponse}`;
    chatContainer.appendChild(userMessage);

    let currentQuestion = questions[currentQuestionIndex];

    // Accept both the letter ("a"/"b") and the answer text ("yes"/"no")
    let matchedKey = Object.keys(currentQuestion.options).find(
        key => key === userResponse || currentQuestion.options[key].toLowerCase() === userResponse
    );

    let botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message");
    botResponse.innerHTML = `<strong>Bot:</strong> `;

    if (matchedKey === currentQuestion.correctAnswer) {
        botResponse.innerHTML += currentQuestion.correctResponse;
    } else {
        botResponse.innerHTML += currentQuestion.incorrectResponse;
    }

    chatContainer.appendChild(botResponse);

    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    userInput.value = "";
    displayQuestion();

    scrollChatContainerToBottom();
});