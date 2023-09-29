let selectedOptions = [];
let questionIndex = 0;
const questions = [
  {
    question: "Over the last two weeks have you felt depressed?",
    video: "videos/v1.mp4",
    options: ["Yes", "No"],
    answer: "Yes",
  },
  {
    question: "Any changes in appetite?",
    video: "videos/v2.mp4",
    options: ["Yes", "No"],
    answer: "Yes",
  },
  {
    question: "Trouble sleeping?",
    video: "videos/v3.mp4",
    options: ["Yes", "No"],
    answer: "Yes",
  },
  {
    question: "Do you feel lack of energy often?",
    video: "videos/v4.mp4",
    options: ["Yes", "No"],
    answer: "Yes",
  },
  {
    question: "Do you feel sad?",
    video: "videos/v5.mp4",
    options: ["Yes", "No"],
    answer: "Yes",
  },
];

// Autoplay all the videos
const videos = document.querySelectorAll('video');
for (const video of videos) {
  video.autoplay = true;
}

function selectOption(option) {
    // Add the selected option to the array
    selectedOptions[questionIndex] = option;
  
    // Clear previous selection
    if (selectedOptions[questionIndex - 1]) {
      document.querySelector(`.${selectedOptions[questionIndex - 1]}`).classList.remove('selected');
    }
  
    // Set the selected option and apply the click effect
    const selectedButton = document.querySelector(`.${option}`);
    selectedButton.classList.add('selected');
  
    // Apply the click effect (scale down)
    selectedButton.style.transform = 'scale(0.95)';
  
    // Reset the scale after a short delay
    setTimeout(() => {
      selectedButton.style.transform = 'scale(1)';
    }, 100);
  }
  

function submitAnswers() {
  if (selectedOptions[questionIndex]) {
    // Update the question index
    questionIndex++;

    // Check if there are any more questions
    if (questionIndex < questions.length) {
      // Display the next question
      const nextQuestion = questions[questionIndex];
      document.querySelector('.question h2').textContent = nextQuestion.question;
      document.querySelector('.question video').src = nextQuestion.video;
      document.querySelector('.options').innerHTML = '';

      for (const option of nextQuestion.options) {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(option);
        document.querySelector('.options').appendChild(optionDiv);
      }
    } else {
      // Calculate the score
      const yesCount = selectedOptions.filter((option) => option === 'Yes').length;

      if (yesCount > 3) {
        alert('You may be experiencing depression. Please reach out to a mental health professional for help.');
      } else {
        alert('You seem to be doing fine, but it is always a good idea to check in with yourself and your mental health.');
      }

      // Hide the submit button
      document.querySelector('#submit').style.display = 'none';

      // Hide the circle buttons
      document.querySelector('.options').style.display = 'none';
    }
  } else {
    alert('Please select an option before submitting.');
  }
}

// Display the first question
const firstQuestion = questions[0];
document.querySelector('.question h2').textContent = firstQuestion.question;
document.querySelector('.question video').src = firstQuestion.video;
document.querySelector('.options').innerHTML = '';

for (const option of firstQuestion.options) {
  const optionDiv = document.createElement('div');
  optionDiv.classList.add('option');
  optionDiv.textContent = option;
  optionDiv.onclick = () => selectOption(option);
  document.querySelector('.options').appendChild(optionDiv);
}

// Show the submit button
document.querySelector('#submit').style.display = 'block';
