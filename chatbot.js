let questions = [
    {
        question: "Do you feel happy?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Super!",
        incorrectResponse: "I am sorry"
    },
    {
        question: "Is grass green?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "That's right!",
        incorrectResponse: "Actually, grass is green!"
    },
    {
        question: "Is 2 + 2 equal to 5?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "b",
        correctResponse: "Correct, well done!",
        incorrectResponse: "Not quite — 2 + 2 is indeed 4!"
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