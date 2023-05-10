const questions=[
    {
        question:"which is the largest animal in the world",
        answer:[
                {text:"shark",correct:"false"},
                {text:"lion",correct:"false"},
                {text:"giraffe",correct:"true"},
                {text:"tiger",correct:"false"},
            
        ]

    },{
        question:"which is the smallest continent in the world",
        answer:[
                {text:"asia",correct:"false"},
                {text:"africa",correct:"false"},
                {text:"arctic",correct:"false"},
                {text:"australia",correct:"true"},
        ]
    },{
        question:"which is the largest desert in the world",
        answer:[
                {text:"godi",correct:"false"},
                {text:"sahara",correct:"false"},
                {text:"kalahari",correct:"false"},
                {text:"Antarctia",correct:"true"},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-button");
const nextButton=document.getElementById("next-btn");

let currentquestionIndex=0;
let score=0;

function startquiz(){
    currentquestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showquestion();
}
function showquestion(){
    resetstate();
let currentquestion =questions[currentquestionIndex];
    let questionNo = currentquestionIndex +1;
    questionElement.innerHTML=questionNo + "." + currentquestion.question;

    currentquestion.answer.forEach(answer =>{
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
 function resetstate(){
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}
function selectAnswer(e){
    const selectbtn =e.target;
    const iscorrect = selectbtn.dataset.correct==="true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
nextButton.addEventListener("click",()=>{
    if(currentquestionIndex < questions.length){
        handlenextbutton();
    }else{
        startquiz();
    }
});

function handlenextbutton(){
    currentquestionIndex++;
    if(currentquestionIndex < questions.length){
        showquestion();
    }else{
        showscore();
    }
}

function showscore(){
    resetstate();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="play again";
    nextButton.style.display="block";
}

startquiz();
