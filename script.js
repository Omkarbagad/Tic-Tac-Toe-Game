let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//to track the turn pf the Player

let turnO = true;   //playerX player0

const winPatterns = [
    [0 , 1 , 2],
    [0 , 3 , 6],
    [0 , 4 , 8],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [2 , 4 , 6],
    [3 , 4 , 5],
    [6 , 7 , 8],
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

boxes.forEach((box)=>{
    box.addEventListener("click" ,() =>{
        console.log("Box was clicked");
        if (turnO){
            box.innerText = "O";
            turnO=false;
        }
        else{
            box.innerText ="X";
            turnO=true;
        }
        box.disabled=true;

        checkWinner();   //to vcheck winner
    });
});


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;        // If any box is empty, the game is not a draw
      }
    } 
    return true;       // All boxes are filled, it's a draw
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{
    for(let pattern of winPatterns ){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        //to find winner pattern
        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val == pos2val && pos2val == pos3val){
                showWinner(pos1val);
                return;
            }
        }
    }

    //to show match is draw
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        showDraw();
    }
};

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
