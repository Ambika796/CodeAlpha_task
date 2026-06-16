const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const themeBtn = document.getElementById("themeBtn");
const clock = document.getElementById("clock");

let expression = "";

loadHistory();

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        if(value === "C"){
            expression = "";
            display.value = "";
        }

        else if(value === "⌫"){
            expression = expression.slice(0,-1);
            display.value = expression;
        }

        else if(value === "="){

            try{

                if(expression.includes("/0")){
                    display.value = "Cannot divide by zero";
                    expression = "";
                    return;
                }

                const result = eval(expression);

                addHistory(expression + " = " + result);

                display.value = result;

                expression = result.toString();

            }
            catch{

                display.value = "Error";
                expression = "";
            }
        }

        else{
            expression += value;
            display.value = expression;
        }
    });
});

function addHistory(item){

    const li = document.createElement("li");
    li.textContent = item;

    historyList.prepend(li);

    saveHistory();
}

function saveHistory(){

    const history = [];

    document.querySelectorAll("#historyList li").forEach(li=>{
        history.push(li.textContent);
    });

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );
}

function loadHistory(){

    const history =
    JSON.parse(
        localStorage.getItem("calculatorHistory")
    ) || [];

    history.forEach(item=>{

        const li =
        document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);
    });
}

clearHistoryBtn.addEventListener("click",()=>{

    historyList.innerHTML="";

    localStorage.removeItem(
        "calculatorHistory"
    );
});

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");
});

document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if("0123456789+-*/.%".includes(key)){
        expression += key;
        display.value = expression;
    }

    else if(key==="Backspace"){
        expression = expression.slice(0,-1);
        display.value = expression;
    }

    else if(key==="Escape"){
        expression="";
        display.value="";
    }

    else if(key==="Enter"){

        try{

            const result = eval(expression);

            addHistory(
                expression + " = " + result
            );

            display.value = result;

            expression =
            result.toString();

        }
        catch{
            display.value = "Error";
        }
    }
});

function updateClock(){

    const now = new Date();

    clock.textContent =
    now.toLocaleTimeString();
}

setInterval(updateClock,1000);

updateClock();