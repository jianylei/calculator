const clearBtn = document.querySelector(".btn-clear");
const deleteBtn = document.querySelector(".btn-delete");
const numBtn = document.querySelectorAll(".btn-number");
const prevOperarion = document.querySelector(".previous-operation");
const currOperarion = document.querySelector(".current-operation");

clearBtn.onclick = () => {
    prevOperarion.innerText = "";
    currOperarion.innerText = "";
}

deleteBtn.onclick = () => {
    if(currOperarion.innerText !== "") {
        let tmp = currOperarion.innerText;
        currOperarion.innerText = tmp.substring(0, tmp.length - 1);
    }
}

numBtn.forEach(button => {
    button.onclick = () => {
        if(currOperarion.innerText === "") console.log("fd");
        currOperarion.innerText = button.innerText;
    }
});