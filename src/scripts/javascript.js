// ********** GLOBAL DECLERATIONS **********
const failedMenu = document.querySelector('#Failed-Menu');
const startMenu = document.querySelector('#Start-Menu');
const startButton = document.querySelector('#Start-Button');
const nextButton = document.querySelector('#Next-Button');
const questions = document.getElementsByClassName('question');
const correctAnswers = document.getElementsByClassName('correct-answer');
const quizFooterElements = document.querySelector('#Quiz-Button-Wrap');
const startFooterElements = document.querySelector('#Start-Button-Wrap');

// Start Button begins Test
startButton.addEventListener('click', function() {
    startFooterElements.classList.remove('active-panel');
    // Code below is necessary because of a specificity issue with display flex on the ID Start-Button Wrap. SUGGESTION: Consider wrapping the inputs in a div and made the divs the element with the class .hidden.
    startFooterElements.style.display = 'none';
    startMenu.classList.remove('active-panel');
    
    
    quizFooterElements.classList.add('active-panel');
    questions[0].classList.add('active-panel');
});

// function to remove .active-question class from all question elements
function removeActiveQuestionClass() {
    for (let question of questions) {
        question.classList.remove('active-panel');
    }
}

// Next Button Moves Through Questions when Correct Answer is Selected {
let nextButtonClickedCount = null;
let correctAnswerCounter = 0;
nextButton.addEventListener('click', function() {
    let wrongAnswer = document.querySelectorAll('.wrong-answer');
    if (correctAnswers[correctAnswerCounter].checked) {
        nextButtonClickedCount++;
        correctAnswerCounter++;
        removeActiveQuestionClass();
        questions[(nextButtonClickedCount)].classList.add('active-panel');
    } else if (wrongAnswer[0].checked) {
        console.log("WRONG ANSWER")
    }
    return correctAnswers[correctAnswerCounter-1].checked = false;
    // This clears the checkmark on the correct answer of the previous question; this is necessary because although the question is hidden from view, it is still existing in the DOM, and so needs to be cleared in order to allow the Next Button to rely on the next question's correct answer to function.
});



// function to remove .active-panel class from all question panels & add to next question when correct answer is selected.
// function setNewActiveQuestion() {
    // select all content that contains the .question class
    // let currentQuestion = document.querySelector('.question .active-panel');
    // add event listenere, and put this switch case on the function of the event listener for the next button.
    // switch () {
    //     questions.classList.remove('active-panel')
    // }
    // remove .active-panel class
    // add to elements of next panel.
// }

