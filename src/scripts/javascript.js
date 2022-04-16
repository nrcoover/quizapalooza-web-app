// ********** GLOBAL VARIABLES DECLERATIONS **********

// light theme color global variables
const lightBase = '#bdbdbd';
const lightBackground = '#FFFFFF';
const lightShadow = 'rgba(18, 18, 18, .3)';
const lightPrimary = '#6200EE';
const lightPrimaryDark = '#3700B3';
const lightSecondary = '#03DAC6';
const lightSecondaryDark = '#018786';
const lightErrorColor = '#B00020';

// dark theme color global variables
const darkBase = '#1d1d1d';
const darkBackground = '#121212';
const darkShadow = 'rgba(255, 255, 255, .1)'
const darkPrimary = '#BB86FC';
const darkPrimaryDark = '#3700B3';
const darkSecondary = '#03DAC6';
const darkErrorColor = '#CF6679';

// html elemnts global variables
const headerHTML = document.querySelector('header');
const footerHTML = document.querySelector('footer');
const shadowPanel = document.getElementsByClassName('shadow-panel');

// menu global variables
const startMenu = document.querySelector('#Start-Menu');
const failedMenus = document.querySelectorAll('.fail-notice');
const failedMenuAnswer = document.querySelector('#Failed-Menu-Answer');
const failedMenuTime = document.querySelector('#Failed-Menu-Time');
const nothingSelectedNotice = document.querySelector('#Nothing-Selected-Notice');
const winnerPanel = document.querySelector('#You-Won');
const quittingPugPanel = document.querySelector('#Quitting-Pug');

// button global variables
const startButton = document.querySelector('#Start-Button');
const nextButton = document.querySelector('#Next-Button');
const closeButton = document.querySelector('#Close-Button');
const retryButton = document.querySelector('#Retry-Button');
const quitButton = document.querySelector('#Quit-Button');
const currentButtonColor = lightSecondaryDark;
let quizIterationCount = 0;

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
const menuFooterElements = document.querySelector('#Retry-Button-Wrap');

// timer global variables
const minutesCounter = document.getElementById("timer-mins");
const secondsCounter = document.getElementById("timer-secs");

// test completion and puppy images global variables
const puppiesSmall = document.getElementsByClassName('puppies-small-img');
const puppiesMedium = document.getElementsByClassName('puppies-medium-img');
const quittingPugSmall = document.getElementsByClassName('quitting-pug-small');
const quittingPugMedium = document.getElementsByClassName('quitting-pug-medium');
let testCompleted = false;
let testCompletedCounter = 0;


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

// function to change footer & header background colors for failure message
function setFailureBackgroundColor() {
    headerHTML.classList.add('failure-background-color');
    footerHTML.classList.add('failure-background-color');
    retryButton.style.backgroundColor = darkErrorColor;
    quitButton.style.backgroundColor = darkErrorColor;

}

// function to remove footer & header background colors of failure message
function removeFailureBackgroundColor() {
    headerHTML.classList.remove('failure-background-color');
    footerHTML.classList.remove('failure-background-color');
    retryButton.style.backgroundColor = currentButtonColor;
    quitButton.style.backgroundColor = currentButtonColor;

}

// function to activate the appropriate failure menu or notice based on the state
function activateFailureMenu(failureMenu) {
    switch (failureMenu) {
        default:
            nothingSelectedNotice.classList.add('active-panel');
            shadowPanel[0].classList.remove('hidden');
            break;
        case failedMenuAnswer:
            removeActiveQuestionClass();
            failedMenuAnswer.classList.add('active-panel')
            footerElementsInvisible(quizFooterElements);
            footerElementsVisible(menuFooterElements);
            setFailureBackgroundColor();
            break;
        case failedMenuTime:
            removeActiveQuestionClass();
            removeActiveFailureMenuClass();
            failedMenuTime.classList.add('active-panel');
            footerElementsInvisible(quizFooterElements);
            footerElementsVisible(menuFooterElements);
            setFailureBackgroundColor();
            return quizIterationCount = 0;
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
            break;
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
            break;
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

// function creates a timer at the initialization of the quiz
function createTimer() {
    if (quizIterationCount < 2) {
        // Creates a two minute timer countdown
        quitButton.addEventListener('click', function() {
            clearInterval(timer);
            minutesCounter.innerHTML = "02";
            secondsCounter.innerHTML = "00";
        });
        let countDownTime = (new Date(Date.now()).getTime() + ((2 * 60000) + 1000));
        // In practice, it has been taking 2 seconds for the timer to load and appear on screen, therefore, and extra second is added to allow for this latency (code seen in above line); the timer is hard-coded to start at 2 minutes in the HTML. Adjust the time will have to include adjusting the starting value in HTML.
        const timer = setInterval(function() {
            let currentTime = new Date(Date.now()).getTime();
            let t = countDownTime - currentTime;
            while (t > 0 && !testCompleted) {
                let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                let secs = Math.floor((t % (1000 * 60)) / 1000);
                minutesCounter.innerHTML = ("0"+mins).slice(-2);
                secondsCounter.innerHTML = ("0"+secs).slice(-2);
                if (winnerPanel.classList.contains('active-panel')) {
                    testCompleted = true;
                    continue;
                }
                return t;
            }
            if (!testCompleted) {
                activateFailureMenu(failedMenuTime);
            }
            clearInterval(timer);
            minutesCounter.innerHTML = "02";
            secondsCounter.innerHTML = "00";
        }, 1000);
        quitButton.removeEventListener('click', function() {});
    }
}

// function to deterministically select puppy image to display based upon screen size
function puppyImageSelector() {
    if (window.innerWidth > 992) {
        puppiesMedium[testCompletedCounter].classList.add('active-panel');
    } else {
        puppiesSmall[testCompletedCounter].classList.add('active-panel');
    }
}

// function to deterministically select quitting pug image to display based upon screen size
function quittingPugImageSelector() {
    if (window.innerWidth > 992) {
        quittingPugSmall[0].classList.remove('active-panel');
        quittingPugMedium[0].classList.add('active-panel');
    } else {
        quittingPugMedium[0].classList.remove('active-panel');
        quittingPugSmall[0].classList.add('active-panel');
    }
}

// function to act as a catch-all removal of active panel elements from previous states
function setDefaultState() {
    removeActiveFailureMenuClass();
    removeFailureBackgroundColor();
    deselectAllInputs();
    startVoid();
}


// ********** EVENT HANDLER DECLERATIONS **********

// Start Button begins Test
startButton.addEventListener('click', function() {
    quizIterationCount++;
    footerElementsInvisible(startFooterElements);
    footerElementsVisible(quizFooterElements);
    startMenu.classList.remove('active-panel');
    questions[0].classList.add('active-panel');
    createTimer();
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
            // activates Test Completion (or "Winner's") Screen
            } else {
                winnerPanel.classList.add('active-panel');
                puppyImageSelector();
                footerElementsInvisible(quizFooterElements);
                footerElementsVisible(menuFooterElements);
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
    shadowPanel[0].classList.add('hidden');
});

// Retry Button returns user to the first question of the quiz; if on winner panel, resets the timer.
retryButton.addEventListener('click', function() {
    const testCompletedChecker = function () {
        if (testCompletedCounter < 3) {
            testCompletedCounter++
        } else {
            testCompletedCounter = 0;
        }
        return testCompleted = false,
        quizIterationCount = 0;
    }
    setDefaultState();
    // resets quiz variables if user wishes to retake the quiz post victory
    if (winnerPanel.classList.contains('active-panel')) {
        winnerPanel.classList.remove('active-panel');
        puppiesSmall[testCompletedCounter].classList.remove('active-panel');
        puppiesMedium[testCompletedCounter].classList.remove('active-panel');
        testCompletedChecker();
    } else if (quittingPugPanel.classList.contains('active-panel')) {
        quittingPugPanel.classList.remove('active-panel');
        testCompletedChecker();
    }
    // prepares question one of the quiz state
    footerElementsVisible(quizFooterElements);
    questions[0].classList.add('active-panel');
    nextButtonClickedCount = 0;
    correctAnswerCounter = 0;
    quizIterationCount++;
    createTimer();
    return nextButtonClickedCount,
    quizIterationCount,
    correctAnswerCounter,
    testCompleted,
    testCompletedCounter;
});

// Quit Button returns user to the main menu, resetting all variables
quitButton.addEventListener('click', function() {
    // notifies createTimer() function that the Quit Button has been pressed and so the timer should end.
    const resetQuiz = function() {
        setDefaultState();
        // returns quiz to start menu state
        footerElementsVisible(startFooterElements);
        startMenu.classList.add('active-panel');
        // resets and returns variables for start menu state
        return nextButtonClickedCount = 0,
        correctAnswerCounter = 0,
        testCompleted = false,
        testCompletedCounter = 0,
        quizIterationCount = 0;
    }
    if (quittingPugPanel.classList.contains('active-panel')) {
        quittingPugPanel.classList.remove('active-panel');
        resetQuiz();
    } else if (winnerPanel.classList.contains('active-panel')) {
        winnerPanel.classList.remove('active-panel');
        puppiesSmall[testCompletedCounter].classList.remove('active-panel');
        puppiesMedium[testCompletedCounter].classList.remove('active-panel');
        footerElementsVisible(menuFooterElements);
        quittingPugPanel.classList.add('active-panel');
        quittingPugImageSelector();
        setFailureBackgroundColor();
    } else {
        resetQuiz();
    }
    return nextButtonClickedCount,
    correctAnswerCounter,
    testCompleted,
    testCompletedCounter,
    quizIterationCount;
});


// // FOR DEBUGGING
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