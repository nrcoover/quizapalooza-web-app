// ********** GLOBAL DECLERATIONS **********
const failedMenu = document.querySelector('#Failed-Menu');
const startMenu = document.querySelector('#Start-Menu');
const startButton = document.querySelector('#Start-Button');
const nextButton = document.querySelector('#Next-Button');
const questions = document.getElementsByClassName('question');
const questionOne = document.querySelector('#Question_One');
const questionTwo = document.querySelector('#Question_Two');
const questionThree = document.querySelector('#Question_Three');
const correctAnswers = document.getElementsByClassName('correct-answer');
const wrongAnswers = document.getElementsByClassName('wrong-answer');
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

// function returns the id of the current active question
function checkForActiveQuestion() {
    for (let question of questions) {
        if (question.classList.contains('active-panel')) {
            console.log(question.id);
            return question.id;
        }
    }
}

// function to check if any wrong answer has been selected
function wrongAnswerChecked() {
    // let questionNumber = questions.querySelector('.activepanel')
    // switch (document.querySelector().querySelectorAll('wrong-answer')) {
        
        // when a wrong answer is checked, I want to see which panel is active
        // given the active panel, I want to check if any of the wrong answer of the active panel are checked, but only the answers of the active panel.
    




        let questionOneForm = document.querySelector('#Question_One > form');
        let questionOneWrongAnswers = questionOneForm.querySelectorAll('.wrong-answer');
        let questionTwoForm = document.querySelector('#Question_Two > form');
        let questionTwoWrongAnswers = questionTwoForm.querySelectorAll('.wrong-answer');
        let questionThreeForm = document.querySelector('#Question_Two > form');
        let questionThreeWrongAnswers = questionThreeForm.querySelectorAll('.wrong-answer');




    let currentQuestion = checkForActiveQuestion();
    // let currentWrongAnswers = document.querySelectorAll(`${currentQuestion} .wrong-answers`);

    // let currentWrongAnswers = currentWrongAnswers.map(wrongAnswers => currentQuestion.classList.contains('active-panel'));
    // console.log(currentWrongAnswers);

    // console.log(document.querySelectorAll(`${currentQuestion} .wrong-answers`));
    switch (currentQuestion) {
        case "Question_One":
            for (let wrongAnswer of currentWrongAnswers) {
                
                console.log(wrongAnswer)
                if (wrongAnswer.checked) {
                    console.log(`question one wrong answeres checked`)
                    return true;
                }
            }
            break;
        case "Question_Two":
            for (let wrongAnswer of currentWrongAnswers) {
                console.log(wrongAnswer)
                if (wrongAnswer.checked) {
                    console.log(`question two wrong answers checked`)
                    return true;
                }
            }
            break;
    }
    
    // for (let wrongAnswer of wrongAnswers) {
    //     console.log(wrongAnswer)
    //     if (wrongAnswer.checked) {
    //         console.log(`The wrong answer is ${wrongAnswer}`)
    //         return true;
    //     }
    // }
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
        return correctAnswers[correctAnswerCounter-1].checked = false;
    } else if (wrongAnswerChecked()) {
        // wrongAnswerChecked();
        console.log("WRONG ANSWER")
    }
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

