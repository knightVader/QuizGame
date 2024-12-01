const URL="https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"

let question = document.querySelector(".question")
let op1=document.getElementById("1")
let op2=document.getElementById("2")
let op3=document.getElementById("3")
let op4=document.getElementById("4")
let nextl=document.getElementById("nextl")
let nextw=document.getElementById("nextw")
let sw=document.querySelector(".screenWon")
let sl=document.querySelector(".screenloss")
let para=document.getElementById("para")
let inp=document.getElementById("inp")
let start=document.querySelector(".start")
let st=document.querySelector(".screentop")
let sls=document.querySelector(".screenlast")
let htwo=document.querySelector("#htwo")
let param=document.querySelector("#param")
let restart=document.querySelector(".restart")


let naam
let idx=0
let score=0
let maindata=[]

let fetchQues=async ()=>{
    let response = await fetch(URL);
    let data = await response.json();
    maindata = data.results
}

fetchQues() // first time data is fetched from the api

let jumbleArray=(data,idx)=>{ // jumbling the options 
    let array=[`${data[idx].correct_answer}`,`${data[idx].incorrect_answers[0]}`,`${data[idx].incorrect_answers[1]}`,`${data[idx].incorrect_answers[2]}`]
    
    // jumbling the array
    for(let i=0;i<=3;i++){
        let j=Math.floor(Math.random()*(i+1))
        let temp=array[i];
        array[i]=array[j]
        array[j]=temp
    }

    return array
}

let QuestionSet= ()=>{ 
    if(idx==10){
        htwo.innerHTML=`Thanks For Playing ${naam}`
        param.innerHTML=`Your Score Is ${score}`
        sls.style.display="flex"
        sw.style.display="none"
        sl.style.display="none"
    }
    let array=jumbleArray(maindata,idx) 
    // setting question 
    question.innerHTML=maindata[idx].question 
    // setting options 
    op1.innerHTML=array[0] 
    op2.innerHTML=array[1] 
    op3.innerHTML=array[2] 
    op4.innerHTML=array[3] 
}

let matchAnswer=(op)=>{

    if(maindata[idx].correct_answer==op.innerHTML){
        score=score+1
        sw.style.display="flex"
    }
    else{
        para.innerHTML=`The Correct Answer is <span>${maindata[idx].correct_answer}</span>`
        sl.style.display="flex"
    }
    idx=idx+1
    console.log(idx)
}

nextl.addEventListener("click", ()=>{
    QuestionSet();
    sl.style.display="none"
})

nextw.addEventListener("click", ()=>{
    QuestionSet();
    sw.style.display="none"
})

op1.addEventListener("click", ()=>{
    matchAnswer(op1)
})

op2.addEventListener("click", ()=>{
    matchAnswer(op2)
})

op3.addEventListener("click", ()=>{
    matchAnswer(op3)
})

op4.addEventListener("click", ()=>{
    matchAnswer(op4)
})

start.addEventListener("click", (e)=>{
    if(inp.value!=""){
        e.preventDefault()
        QuestionSet()
        naam=inp.value
        st.style.display="none"
        console.log(naam)
    }
})

const restartgame = async () =>{
    idx=0
    score=0
    maindata=[]
    await fetchQues()
    setInterval(QuestionSet(), 5000) // in this time data will be fetched from the api
    sls.style.display="none"
}

restart.addEventListener("click", restartgame)