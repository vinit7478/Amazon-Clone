let boxes = document.querySelectorAll(".box");
let message = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");
let newBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector(".reset-btn");

let turnX = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    count = 0;
    turnX = true;
    enabledBtn();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX === true){
            box.innerText = ("X");
            box.style.color = "blue";
            turnX = false;
        }else{
            box.innerText = "O";
            box.style.color = "brown";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});


const enabledBtn = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const disabledBtn = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const showWinner = (Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    msgcontainer.classList.remove("hide");
    disabledBtn();
}


const checkWinner = () => {
    for(pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){

                showWinner(pos1val);
                return true;
            }
        }
    }
}

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disabledBtn();
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

