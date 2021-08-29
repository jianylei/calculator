let rhs = "", lhs = "", operator = "";
let calcflag = false, errflag = false;

const clearBtn = document.querySelector(".btn-clear");
const deleteBtn = document.querySelector(".btn-delete");
const numBtn = document.querySelectorAll(".btn-number");
const operatorBtn = document.querySelectorAll(".btn-operator");
const equalBtn = document.querySelector(".btn-equal");
const prevOperation = document.querySelector(".previous-operation");
const currOperation = document.querySelector(".current-operation");

function clearScreen() {
    prevOperation.innerText = "";
    currOperation.innerText = "";
    lsh = "";
    rhs = "";
    operator = "";
}

function append(num){
    if (errflag) {
        clearScreen();
        errflag = false;
    }
    if (!currOperation.innerText || calcflag) {
        currOperation.innerText = num;
        calcflag = false;
    }
    else {
        let tmp = currOperation.innerText
        if (num !== "." || !tmp.includes(".")) {
            currOperation.innerText = tmp + num;
        }
    }
    rhs = currOperation.innerText;
}

function deleteKey() {
    if(currOperation.innerText) {
        let tmp = currOperation.innerText;
        currOperation.innerText = tmp.substring(0, tmp.length - 1);
    }
    rhs = currOperation.innerText;
}

function setOperator(_operator){
    if(!errflag) {
        
        if(operator && lhs && rhs ){
            let tmp = operate();
            prevOperation.innerText = prevOperation.innerText + " " + currOperation.innerText + " =";
            currOperation.innerText = tmp;
        }

        if(!currOperation.innerText) {
            prevOperation.innerText = "0 " + _operator;
        }
        else {
            prevOperation.innerText = currOperation.innerText + " " + _operator;
        }

        lhs = currOperation.innerText;
        operator = _operator;
        calcflag = true;
    }
}

function compute() {
    if(prevOperation.innerText && operator && lhs && rhs) {
        let tmp = operate();
        if(tmp) {
            prevOperation.innerText = prevOperation.innerText + " " + currOperation.innerText + " =";
            currOperation.innerText = tmp;
            calcflag = true;
        }
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

//event listeners
clearBtn.onclick = clearScreen;

deleteBtn.onclick = deleteKey;

equalBtn.onclick = compute;

numBtn.forEach(button => {
    button.onclick = () => append(button.innerText);
})

operatorBtn.forEach(button => {
    button.onclick = () => setOperator(button.innerText);
})

//keyboard integration
window.onkeydown = (e) => {
    if(e.key >= 0 && e.key <= 9 || e.key === ".") {
        append(e.key);
    }
    if(e.key === "=" || e.key === "Enter") {
        compute();
    }
    if(e.key === "Backspace") {
        deleteKey();
    }
    if(e.key === "Escape") {
        clearScreen();
    }
    if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "x") {
        let tmp;
        switch(e.key) {
            case "/":
                tmp = "÷"
                break;
            case "*":
                tmp = "x"
                break;
            default:
                tmp = e.key;
        }
        setOperator(tmp);
    }
  }