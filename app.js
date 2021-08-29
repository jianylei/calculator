let rhs = "", lhs = "", operator = "";
let calcflag = false, errflag = false;

const clearBtn = document.querySelector(".btn-clear");
const deleteBtn = document.querySelector(".btn-delete");
const numBtn = document.querySelectorAll(".btn-number");
const operatorBtn = document.querySelectorAll(".btn-operator");
const equalBtn = document.querySelector(".btn-equal");
const prevOperation = document.querySelector(".previous-operation");
const currOperation = document.querySelector(".current-operation");

clearBtn.onclick = clearScreen;

deleteBtn.onclick = () => {
    if(currOperation.innerText) {
        let tmp = currOperation.innerText;
        currOperation.innerText = tmp.substring(0, tmp.length - 1);
    }
    rhs = currOperation.innerText;
}

equalBtn.onclick = () => {
    if(prevOperation.innerText && operator && lhs && rhs) {
        let tmp = operate();
        if(tmp) {
            prevOperation.innerText = prevOperation.innerText + " " + currOperation.innerText + " =";
            currOperation.innerText = tmp;
        }
    }
    
}

operatorBtn.forEach(button => {
    button.onclick = () => {
        if(!errflag) {
        

        if(operator && lhs && rhs ){
            let tmp = operate();
            prevOperation.innerText = prevOperation.innerText + " " + currOperation.innerText + " =";
            currOperation.innerText = tmp;
        }

        if(!currOperation.innerText) {
            prevOperation.innerText = "0 " + button.innerText;
        }
        else {
            prevOperation.innerText = currOperation.innerText + " " + button.innerText;
        }

        lhs = currOperation.innerText;
        operator = button.innerText;
        calcflag = true;
    }}
})

numBtn.forEach(button => {
    button.onclick = () => {
        if(errflag) {
            clearScreen();
            errflag = false;
        }
        if(!currOperation.innerText  || calcflag) {
            currOperation.innerText = button.innerText;
            calcflag = false;
        }
        else {
            append(button.innerText)
        }
        rhs = currOperation.innerText;
    }
})

function clearScreen() {
    prevOperation.innerText = "";
    currOperation.innerText = "";
    lsh = "";
    rhs = "";
    operator = "";
}

function append(num){
    let tmp = currOperation.innerText
    if(num !== "." || !tmp.includes(".")) {
        currOperation.innerText = tmp + num;
    }
}

function operate(){
        if(rhs == "0") {
            prevOperation.innerText = "error occured";
            currOperation.innerText = "unable to divide by 0"
            errflag = true;
            return "";
        }
        let tmp;
        switch (operator) {
            case "x":
                tmp = parseFloat(lhs) * parseFloat(rhs);
                break;
            case "÷":
                tmp = parseFloat(lhs) / parseFloat(rhs);
                break;
            case "+":
                tmp = parseFloat(lhs) + parseFloat(rhs);
                break;
            case "-":
                tmp = parseFloat(lhs) - parseFloat(rhs);
                break;
        }
        lhs = tmp;
        rhs = "";
        operator = "";
        return tmp;
}