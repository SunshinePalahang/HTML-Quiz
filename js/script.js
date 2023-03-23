/* START */
let start = document.querySelector("#start");

/* GUIDE */
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

/* QUIZ */
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

/* QUESTION */
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

/* CHOICES */
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

/* NAVIGATION */
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

/* RESULTS */
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

/* GET CHOICES FROM QUESTIONS.JS */
let choice_que = document.querySelectorAll(".choice_que");

let index = 0;
let timer = 20;
let interval = 0;
let score = 0;

/* SCORE */
let correct = 0;

/* STORE ANSWER VALUE */
let UserAns = undefined;

/* START BTN */
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
    leaderboard.style.display = "none";
    exitQuiz.style.display = "none";
});

/* EXIT BTN*/
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
    leaderboard.style.display = "block";
    exitQuiz.style.display = "block";
});

/* TIMER */
let countDown = () => {
    if (timer === 0) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer--;
        time.innerText = timer;
    }
}

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    /* TIMER START */
    timer = 20;
}

loadData();

/* CONTINUE BTN */
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    /* CLEAR ANSWERS UPON CLICKING NEXT BTN */

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${index} Out Of ${MCQS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[index].answer) {
            correct++;
        } else {
            correct += 0;
        }
        /* STOP TIMER WHEN AN ANSWER IS PICKED */
        clearInterval(interval);

        /* DISABLE OTHER CHOICES WHEN AN ANSWER IS CLICKED */
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

/* NEXT BTN */
next_question.addEventListener("click", () => {
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        /* QUESTION LOAD */
        loadData();

        /* RESULT */
        total_correct.style.display = "block";
        total_correct.innerHTML = `${index + 1} Out Of ${MCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;

        /* QUIZ END DISPLAY */
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        localStorage.setItem('mostRecentScore', correct);
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

/* SAVE SCORE BTN */
save.addEventListener("click", () => {
    saveScore.style.display = "block";
    result.style.display = "none";
});

/* RETRY BTN */
startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
    index = 0
    total_correct.innerHTML = `${index + 1} Out Of ${MCQS.length} Questions`;
});

/* STORE SCORE FOR LEADERBOARD */
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("Saved succesfully!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    console.log(score)

    /* INCLUDE TOP 5 ONLY */
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');  
}