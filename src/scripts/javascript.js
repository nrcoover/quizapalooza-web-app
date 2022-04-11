// ********** GLOBAL VARIABLES DECLERATIONS **********

// menu global variables
const startMenu = document.querySelector('#Start-Menu');
const failedMenus = document.querySelectorAll('.fail-notice');
const failedMenuAnswer = document.querySelector('#Failed-Menu-Answer');
const failedMenuTime = document.querySelector('#Failed-Menu-Time');
const nothingSelectedNotice = document.querySelector('#Nothing-Selected-Notice');
const winnerPanel = document.querySelector('#You-Won');

// button global variables
const startButton = document.querySelector('#Start-Button');
const nextButton = document.querySelector('#Next-Button');
const closeButton = document.querySelector('#Close-Button');
const mainMenuButton = document.querySelector('#Main-Menu-Button');

// question collections global variables
const questions = document.getElementsByClassName('question');
const questionOne = document.querySelector('#Question_One');
const questionTwo = document.querySelector('#Question_Two');
const questionThree = document.querySelector('#Question_Three');
const questionOneForm = document.querySelector('#Question_One > form');
const questionTwoForm = document.querySelector('#Question_Two > form');
const questionThreeForm = document.querySelector('#Question_Three > form');

// answer collections global variables
const allAnswers = document.querySelectorAll('.answer');
const correctAnswers = document.getElementsByClassName('correct-answer');
const wrongAnswers = document.getElementsByClassName('wrong-answer');
const questionOneWrongAnswers = questionOneForm.querySelectorAll('.wrong-answer');
const questionTwoWrongAnswers = questionTwoForm.querySelectorAll('.wrong-answer');
const questionThreeWrongAnswers = questionThreeForm.querySelectorAll('.wrong-answer');

// footer panels global variables
const quizFooterElements = document.querySelector('#Quiz-Button-Wrap');
const startFooterElements = document.querySelector('#Start-Button-Wrap');
const menuFooterElements = document.querySelector('#Main-Menu-Button-Wrap');


// ********** START VOID **********
startVoid();
// the above code line is necessary due to an unresolved bug that causes this element to be visible upon page load, but it shouldn't be visible until after the user presses the start button.


// ********** FUNCTION DECLERATIONS **********

// function to start/reset the quiz starter screen
function startVoid() {
    footerElementsInvisible(quizFooterElements);
    footerElementsInvisible(menuFooterElements);
}

// function to remove .active-panel class from all question elements
function removeActiveQuestionClass() {
    for (let question of questions) {
        question.classList.remove('active-panel');
    }
}

// function to remove .active-panel class from all failure menus
function removeActiveFailureMenuClass() {
    for (let menu of failedMenus) {
        menu.classList.remove('active-panel');
    }
}

// function returns the id of the current active question
function checkForActiveQuestion() {
    for (let question of questions) {
        if (question.classList.contains('active-panel')) {
            return question.id;
        }
    }
}

// function returns true if a wrong answer has been checked
function currentWrongAnswersChecked(currentWrongAnswers) {
    for (let wrongAnswer of currentWrongAnswers) {
        if (wrongAnswer.checked) {
            return true;
        }
    }
}

// function to activate the appropriate failure menu or notice based on the state
function activateFailureMenu(failureMenu) {
    switch (failureMenu) {
        default:
            nothingSelectedNotice.classList.add('active-panel');
            break;
        case failedMenuAnswer:
            removeActiveQuestionClass();
            failedMenuAnswer.classList.add('active-panel')
            footerElementsInvisible(quizFooterElements);
            footerElementsVisible(menuFooterElements);
            break;
        case failedMenuTime:
            removeActiveQuestionClass();
            failedMenuTime.classList.add('active-panel');
            footerElementsInvisible(quizFooterElements);
            footerElementsVisible(menuFooterElements);
            break;
    }
}

// function to select which group of answers to pass througth the currentWrongAnswers function
function currentWrongAnswersCheckedSelector(questionNumberWrongAnswers) {
    if (currentWrongAnswersChecked(questionNumberWrongAnswers)) {
        activateFailureMenu(failedMenuAnswer);
    } else {
        activateFailureMenu();
    }
}

// function to check if any wrong answer has been selected on the current question
function wrongAnswerChecked() {
    let currentQuestion = checkForActiveQuestion();
    // Selects only the group of wrong answers from the current question
    switch (currentQuestion) {
        case "Question_One":
            currentWrongAnswersCheckedSelector(questionOneWrongAnswers);
            break;
        case "Question_Two":
            currentWrongAnswersCheckedSelector(questionTwoWrongAnswers);
            break;
        case "Question_Three":
            currentWrongAnswersCheckedSelector(questionThreeWrongAnswers);
            break;
        default:
            activateFailureMenu();
            break;
    }
}

// function reverts checked value to false for all possible answers (even ones hidden by "display: none")
function deselectAllInputs() {
    for (let answer of allAnswers) {
        answer.checked = false;
    }
}

// function to remove selected footerElements Group from visibility
function footerElementsInvisible(footerElements) {
    switch(footerElements) {
        default:
            console.log("No Footer Elements Group was selected. Please review code and select appropriate grouping.")
        case startFooterElements:
            startFooterElements.classList.remove('active-panel');
            startFooterElements.style.display = 'none';
        case quizFooterElements:
            quizFooterElements.classList.remove('active-panel');
            quizFooterElements.style.display = 'none';
            break;
        case menuFooterElements:
            menuFooterElements.classList.remove('active-panel');
            menuFooterElements.style.display = 'none';
            break;
    }
}

// function to return selected footerElements Group to visibility
function footerElementsVisible(visibilitySelector) {
    switch(visibilitySelector) {
        default:
            console.log("No Footer Elements Group was selected. Please review code and select appropriate grouping.")
        case startFooterElements:
            startFooterElements.classList.add('active-panel');
            startFooterElements.style.display = 'flex';
        case quizFooterElements:
            quizFooterElements.classList.add('active-panel');
            quizFooterElements.style.display = 'flex';
            break;
        case menuFooterElements:
            menuFooterElements.classList.add('active-panel');
            menuFooterElements.style.display = 'flex';
            break;
    }
}


// ********** EVENT HANDLER DECLERATIONS **********

// Start Button begins Test
startButton.addEventListener('click', function() {
    footerElementsInvisible(startFooterElements);
    footerElementsVisible(quizFooterElements);
    startMenu.classList.remove('active-panel');
    questions[0].classList.add('active-panel');
});


// Next Button Moves Through Questions when Correct Answer is Selected {
let nextButtonClickedCount = 0;
let correctAnswerCounter = 0;
nextButton.addEventListener('click', function() {
    if (correctAnswers[correctAnswerCounter].checked) {
        nextButtonClickedCount++;
        correctAnswerCounter++;
        while (correctAnswerCounter <= questions.length) {
            removeActiveQuestionClass();
            if(questions[nextButtonClickedCount]) {
                questions[(nextButtonClickedCount)].classList.add('active-panel');
            } else {
                winnerPanel.classList.add('active-panel');
                footerElementsInvisible(quizFooterElements);
                footerElementsVisible(menuFooterElements);

                // INSERT CODE HERE TO STOP AND RESET TIMER!!!

            }
            return correctAnswers[correctAnswerCounter-1].checked = false;
            // This clears the checkmark on the correct answer of the previous question; this is necessary because although the question is hidden from view, it is still existing in the DOM, and so needs to be cleared in order to allow the Next Button to rely on the next question's correct answer to function.
        }
    } else {
        wrongAnswerChecked();
    }
    
});

// Close Button closes the "Nothing Was Selected" Notice
closeButton.addEventListener('click', function() {
    nothingSelectedNotice.classList.remove('active-panel');
});

// Main Menu Button returns user the main menu starting screen
mainMenuButton.addEventListener('click', function() {
    removeActiveFailureMenuClass();
    deselectAllInputs();
    startVoid();
    if (winnerPanel.classList.contains('active-panel')) {
        winnerPanel.classList.remove('active-panel');
    }
    footerElementsVisible(startFooterElements);
    startMenu.classList.add('active-panel');
    nextButtonClickedCount = 0;
    correctAnswerCounter = 0;
    return nextButtonClickedCount, correctAnswerCounter;
});


// FOR DEBUGGING
// const addAllButton = document.querySelector('#Add-All-Button');
// const allHidden = document.querySelectorAll('.hidden');

// function returnAll() {
//     for (let hidden of allHidden) {
//         hidden.classList.add('active-panel');
//         // hidden.classList.remove('hidden');
//     }
//     removeActiveFailureMenuClass();
//     nothingSelectedNotice.classList.remove('active-panel');
// };

// addAllButton.addEventListener('click', function() {
//     returnAll();
// });