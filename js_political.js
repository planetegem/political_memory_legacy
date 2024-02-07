const allCards = document.getElementsByClassName("card"),
      order = [];
let memory = {slot1: "empty", slot2:"empty"},
    amountFound = 0, 
    gameStart = 0,
    timeSinceStart = 0,
    timeOnTimer = 0,
    timer;
    
// CREATE RANDOM ORDER ARRAY & APPLY TO CARDS
function fill(array, length){
    for (let i = 1; i < length + 1; i++){
        array.push(i);
    }
}
fill (order, allCards.length);
function randomize() {
    let i = allCards.length - 1;
    // FISHER-YATES SHUFFLE
    while (i > 0) { 
        let randIndex = Math.floor(Math.random() * (i));
        [order[randIndex], order[i]] = [order[i], order[randIndex]];
        i--;
    }
    for (let j = 0; j < allCards.length; j++) {
            allCards[j].style.order = order[j];
            allCards[j].getElementsByClassName("cardnumber")[0].innerHTML = order[j];
    }
}

// CLEAR ALL PARAMETERS, FINISH ANIMATIONS & RANDOMIZE
function clearTags(){
    for (i = 0; i < allCards.length; i++){
        allCards[i].classList.remove("turned");
        allCards[i].classList.remove("found");
    }
}
function reset(){
    if (document.getElementsByClassName("found").length === allCards.length){
        resetBoard();
    }
    if (document.getElementsByClassName("turned").length > 0 || document.getElementsByClassName("found").length > 0) {
        setTimeout(randomize, 1200);
    } else {
        randomize();
    }
    clearTags();
    clearMemory();
    stopGame();
    resetTimer();
}

// START GAME RANDOMIZED
randomize();

// TIMER
function startGame(){
    gameStart = performance.now();
    timer = setInterval(function () {
        timeSinceStart = performance.now() - gameStart;
        timeOnTimer = convertTime(timeSinceStart);
        document.getElementById("timer").innerHTML = timeOnTimer;
    }, 100);
}
function stopGame(){
    gameStart = 0;
    clearInterval(timer);
}
function convertTime(millis){
    let minutes = Math.floor(millis / 60000),
        seconds = ((millis % 60000) / 1000).toFixed(0);
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
function convertTimeString(millis){
     let minutes = Math.floor(millis / 60000),
        seconds = ((millis % 60000) / 1000).toFixed(0);
    return (minutes < 1 ? '' : minutes) + (minutes == 1 ? " minute" : '') + (minutes > 1 ? " minutes" : '') + (minutes > 0 ? ", " : '') + (seconds > 0 ? seconds : '') + (seconds == 1 ? " second" : '') + (seconds > 1 ? " seconds" : '');
}
function resetTimer() {
    blinkTimer("reset");
    setTimeout(function(){
        document.getElementById("timer").innerHTML = "00:00";
    }, 1000);
}
function blinkTimer(string){
    document.getElementById("timer").innerHTML = string;
    setTimeout(function(){
        document.getElementById("timer").innerHTML = "";
    }, 150);
    setTimeout(function(){
        document.getElementById("timer").innerHTML = string;
    }, 300);
    setTimeout(function(){
        document.getElementById("timer").innerHTML = "";
    }, 450);
    setTimeout(function(){
        document.getElementById("timer").innerHTML = string;
    }, 600);
}
// MAIN SELECTION FUNCTION

function fillMemory(card){
    // START TIMER
    if (gameStart === 0){
        startGame();
    }
    // LOAD CARDS IN MEMORY
    if (memory.slot1 == "empty" && !(card.classList.contains("found"))){
        memory.slot1 = card;
        card.classList.add("turned");
    } else if (memory.slot2 == "empty" && memory.slot1 != card && !(card.classList.contains("found"))) {
        memory.slot2 = card;
        card.classList.add("turned");

        // COMPARE 2 CARDS
        if (memory.slot1.dataset.value == memory.slot2.dataset.value){
            addScore();
            setTimeout(function (){
                memory.slot1.classList.add("found");
                memory.slot2.classList.add("found");
                clearMemory();
                
                // CHECK FOR VICTORY
                if (document.getElementsByClassName("found").length == allCards.length){
                    victory();
                }
            },900);
        } else {
            setTimeout(function(){
                memory.slot1.classList.remove("turned");
                memory.slot2.classList.remove("turned");
            }, 1200);
            setTimeout(function(){
                clearMemory();
            }, 1500);
        }
    }
}
function clearMemory(){
    memory.slot1 = "empty";
    memory.slot2 = "empty";
}

// POST-GAME SCOREBOARD

document.getElementById("board").style.maxHeight = board.scrollHeight + "px";
function addScore() {
    let pairId = memory.slot1.dataset.value,
        score;
    
    score = convertTimeString(timeSinceStart);
    amountFound++;  
    document.getElementById("postgame").getElementsByClassName(pairId)[0].style.order = amountFound;
    document.getElementById("postgame").getElementsByClassName(pairId)[0].getElementsByClassName("score")[0].innerHTML = score;
}
function victory() {
    stopGame();
    blinkTimer("victory");
    boardAnimation();
}
function boardAnimation() {
    for (let i = 0; i < allCards.length; i++) {
        setTimeout(function(){
            allCards[order[i] - 1].style.opacity = "0";
        }, (i * 100) + 500);
    }
    setTimeout(function(){
            document.getElementById("postgame").style.maxHeight = document.getElementById("postgame").scrollHeight + "px";
            document.getElementById("board").style.maxHeight = "0px";
        }, 2300);
}
function resetBoard() {
    document.getElementById("postgame").style.opacity = "0";
    document.getElementById("board").style.maxHeight = document.getElementById("board").scrollHeight + "px";
    document.getElementById("postgame").style.maxHeight = "0px";
    setTimeout(function(){
        document.getElementById("postgame").style.opacity = "1";
    }, 1000);
    for (let i = 0; i < allCards.length; i++) {
        setTimeout(function(){
            allCards[i].style.opacity = "1";
        }, (i * 100) + 1500);
    }
}


