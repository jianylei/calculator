let rhs, lhs, operator = "";
let flag= false;

const clearBtn = document.querySelector(".btn-clear");
const deleteBtn = document.querySelector(".btn-delete");
const numBtn = document.querySelectorAll(".btn-number");
const operatorBtn = document.querySelectorAll(".btn-operator");
const equalBtn = document.querySelector(".btn-equal");
const prevOperation = document.querySelector(".previous-operation");
const currOperation = document.querySelector(".current-operation");

clearBtn.onclick = () => {
    prevOperation.innerText = "";
    currOperation.innerText = "";
    lsh = "";
    rhs = "";
    operator = "";
}

deleteBtn.onclick = () => {
    if(currOperation.innerText !== "") {
        let tmp = currOperation.innerText;
        currOperation.innerText = tmp.substring(0, tmp.length - 1);
    }
    rhs = currOperation.innerText;
}

equalBtn.onclick = () => {
    if(prevOperation.innerText !== "" && operator !== "" && lhs && rhs) {
        let tmp = operate();
        prevOperation.innerText = prevOperation.innerText + " " + currOperation.innerText + " =";
        currOperation.innerText = tmp;
    }
    
}

operatorBtn.forEach(button => {
    button.onclick = () => {
        
        if(operator !== "" && lhs && rhs){
            let tmp = operate();
            prevOperation.innerText = prevOperation.innerText + " " + currOperation.innerText + " =";
            currOperation.innerText = tmp;
        }
        lhs = currOperation.innerText;
        operator = button.innerText;
        flag = true;
        console.log("lhs :"+lhs+", op: " +operator+", rhs: "+rhs);

        if(currOperation.innerText === "") {
            prevOperation.innerText = "0 " + button.innerText;
        }
        else {
            prevOperation.innerText = currOperation.innerText + " " + button.innerText;
        }
    }
})

numBtn.forEach(button => {
    button.onclick = () => {
        if(currOperation.innerText === ""  || flag) {
            currOperation.innerText = button.innerText;
            flag = false;
        }
        else {
            append(button.innerText)
        }
        rhs = currOperation.innerText; console.log("lhs :"+lhs+", op: " +operator+", rhs: "+rhs);
    }
})

function append(num){
    let tmp = currOperation.innerText
    if(num !== "." || !tmp.includes(".")) {
        currOperation.innerText = tmp + num;
    }
}

function operate(){
    if(lhs, rhs, operator) {
        let tmp;
        switch (operator) {
            case "x":
                tmp = parseFloat(lhs) * parseFloat(rhs);
                break;
        }console.log("lhs :"+lhs+", op: " +operator+", rhs: "+rhs);
        lhs = tmp;
        rhs = "";
        operator = "";
        return tmp;
    }
}