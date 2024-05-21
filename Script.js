let home = document.getElementsByClassName('Home')[0];

let playbtn = document.getElementsByClassName('playbtn')[0];

let welcome = document.getElementsByClassName('welcome')[0];

let Questions = [
    {
        question: "What is the capital of India?",
        options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: 0,
        answered: false,
        verdict: true,
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        answer: 2,
        answered: false,
        verdict: true,
    },
    {
        question: "What is the capital of USA?",
        options: ["Washington DC", "New York", "Los Angeles", "Chicago"],
        answer: 0,
        answered: false,
        verdict: true,
    },
    {
        question: "What is the capital of Russia?",
        options: ["Moscow", "St. Petersburg", "Vladivostok", "Sochi"],
        answer: 0,
        answered: false,
        verdict: true,
    },
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Osaka", "Kyoto", "Hiroshima"],
        answer: 0,
        answered: false,
        verdict: true,
    },
    {
        question: "What is the capital of China?",
        options: ["Beijing", "Shanghai", "Hong Kong", "Guangzhou"],
        answer: 0,
        answered: false,
        verdict: true,
    }
]
let QuestionCopy = JSON.parse(JSON.stringify(Questions));
let Score = 0;
let count = 1;
let answered=0;
playbtn.addEventListener('click', () => {
    if(welcome && playbtn) {
        welcome.style.display = "none";    
        playbtn.style.display = "none";
    }
    let headsUp = document.createElement('div');
    headsUp.classList.add('headsUp');
    headsUp.innerHTML=`
    <div class="Attempted">
        <h3 id="attempetd">Question: ${count}/6</h3>
        <div class="progress">
            <div class="0 bar"></div>
            <div class="1 bar"></div>
            <div class="2 bar"></div>
            <div class="3 bar"></div>
            <div class="4 bar"></div>
            <div class="5 bar"></div>
        </div>
    </div>
    <div class="Score">
        <h3>Score</h3>
        <h1 id="score">${Score}%</h1>
    </div>
    `;
    home.appendChild(headsUp);
    playMode();
});

function playMode(){
    let question = document.createElement('div');
    question.classList.add('question');
    let currentQuestion = loadQuestion();
    if(currentQuestion<0){
        end();
        return;
    }
    question.innerHTML = `
        <h1>${currentQuestion.question}</h1>
        <div class="options">
            <div class="ansBTN" id="0">
                <div class="OptTag">A</div>
                ${currentQuestion.options[0]}
            </div>
            <div class="ansBTN" id="1">
                <div class="OptTag">B</div>
                ${currentQuestion.options[1]}
            </div>
            <div class="ansBTN" id="2">
                <div class="OptTag">C</div>
                ${currentQuestion.options[2]}
            </div>
            <div class="ansBTN" id="3">
                <div class="OptTag">D</div>
                ${currentQuestion.options[3]}
            </div>
        </div>
    `;
    if(home)
    home.appendChild(question);


    let ansBTN = document.getElementsByClassName('ansBTN');
    if(ansBTN){
        for(var i =0; i<ansBTN.length; i++){
            ansBTN[i].addEventListener('click', (e) => {
                if(currentQuestion.answer == e.target.id){
                    console.log("Correct Answer");
                    e.target.style.backgroundColor = "green";
                    let currentIndex = Questions.indexOf(currentQuestion);
                    if (currentIndex > -1) {
                        Questions.splice(currentIndex, 1);
                    }
                    if(currentQuestion.verdict){
                        answered++;
                        Score=Math.round((answered)/6*100);
                        document.getElementById("score").innerText = Score+"%";
                    }
                    setTimeout(()=>{
                        home.removeChild(question);
                        if(count<6)
                        count++;
                        playMode();
                    }, 1000);
                } else {
                    console.log("Wrong Answer");
                    currentQuestion.verdict = false;
                    e.target.style.backgroundColor = "red";
                }
                currentQuestion.answered = true;
            });
        }
    }

    document.getElementById("attempetd").innerText= "Question: "+count+"/6";
    let bar = document.getElementsByClassName(count-1)[0];
    bar.style.backgroundColor= "blue";

    function loadQuestion(){
        let questionNumber = Math.floor(Math.random() * Questions.length);
        if(questionNumber>=0 && questionNumber<Questions.length && Questions[questionNumber].answered){
            loadQuestion();
        } else if(questionNumber>=0 && questionNumber<Questions.length) {
            return Questions[questionNumber];
        } else{
            document.getElementsByClassName('headsUp')[0].style.display = "none";
            let end = document.createElement('div');
            end.classList.add('end');
            end.innerHTML =`
                <h1>You have answered ${answered} questions Correctly and your score is ${Score}%</h1>
                <button class="restart"> Play Again</button>
                <button class="Gohome"> Go Home</button>
            `;
            home.appendChild(end);
            return -1;
        }
    }
}
function end(){
let restart = document.getElementsByClassName("restart")[0];
let GoHome = document.getElementsByClassName("Gohome")[0];

restart.addEventListener("click", ()=>{
    Questions = JSON.parse(JSON.stringify(QuestionCopy));
    home.removeChild(document.getElementsByClassName('end')[0]);
    document.getElementsByClassName('headsUp')[0].style.display = "flex";
    count =1;
    Score =0;
    answered =0;
    let bars = document.getElementsByClassName('bar');
    for(var i =0; i<bars.length; i++){
        bars[i].style.backgroundColor = "white";
    }
    document.getElementById("score").innerText = Score+"%";
    playMode();
});

GoHome.addEventListener("click", ()=>{
    window.location.reload();
});

}