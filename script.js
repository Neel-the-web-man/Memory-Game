let arr = [];
let N = 16;
let cards = [];
let counter = 0;
let card1, card2;
let card1i;
let misses = 0;
let roundsPlayed = 0;
let speed = 3;
let moves = 0;
let rounds = 0, gCounter = 0;
let randomArr = [], indexArr = [];
function gridChange(value) {
    let gridCard = document.querySelector(".grid-cards");
    gridCard.innerHTML = "";
    if (value == 16) {
        N = 16;
        gridCard.style.gridTemplateColumns = "100px 100px 100px 100px"
    } else if (value == 20) {
        N = 20;
        gridCard.style.gridTemplateColumns = "100px 100px 100px 100px 100px"
    } else if (value == 24) {
        N = 24;
        gridCard.style.gridTemplateColumns = "100px 100px 100px 100px 100px "
    } else if (value == 30) {
        N = 30;
        gridCard.style.gridTemplateColumns = "100px 100px 100px 100px 100px "
    }
    for (let i = 0; i < N; i++) {
        let div = document.createElement("div");
        div.classList.add("card");
        gridCard.append(div);
    }
    cards = document.querySelectorAll(".card");
    for (let i = 0; i < N; i++) {
        if (i < N / 2) {
            arr[i] = {
                id: i,
                imgAdd: `img${i + 1}.png`,
            }
        } else {
            arr[i] = {
                id: i,
                imgAdd: `img${i - ((N / 2) - 1)}.png`,
            }
        }
    }
    resetGame();
    AddListener();
}
gridChange();
function randomArrayGenerator() {
    randomArr = [];
    indexArr = [];
    let index = Math.floor(Math.random() * N);
    indexArr.push(index);
    let flag, k = 1;
    for (; ;) {
        let index = Math.floor(Math.random() * N);
        flag = 0;
        for (let j = 0; j < indexArr.length; j++) {
            if (indexArr[j] == index) {
                flag = 1;
                break;
            }
        }
        if (!flag) {
            indexArr.push(index);
        } else {
            flag = 0;
        }
        if (indexArr.length == N) {
            break;
        }
    }
    for (let i = 0; i < N; i++) {
        randomArr[i] = arr[indexArr[i]];
    }
    for (let i = 0; i < N; i++) {
        cards[i].innerHTML = `<img class="card-img" src="${randomArr[i].imgAdd}" alt="">`;
        cards[i].classList.add("check");
    }
}
randomArrayGenerator();
function speedChange(value) {
    if (value == "Fast") {
        speed = 0.5;
    } else if (value == "Normal") {
        speed = 3;
    } else if (value == "Slow") {
        speed = 5;
    }
}

function resetGame() {
    document.querySelector(".congo").classList.add("d-n");
    document.querySelector(".opac-congo").classList.add("d-n");
    for (let i = 0; i < N; i++) {
        cards[i].classList.remove("toggled");
        cards[i].classList.remove("done");
        moves = 0;
        misses = 0;
        document.querySelector(".moves").innerHTML = moves;
        document.querySelector(".misses").innerHTML = misses;
        randomArrayGenerator();
    }
}
function AddListener() {
    for (let i = 0; i < N; i++) {
        cards[i].addEventListener("click", () => {
            if (cards[i].classList[1] == "check") {
                cards[i].classList.remove("check");
                counter++;
                let imgChild = cards[i].children[0];
                imgChild.classList.add("display-img");
                cards[i].classList.add("toggled");
                if (counter == 1) {
                    card1 = `${randomArr[i].imgAdd}`;
                    card1i = i;
                }
                if (counter == 2) {
                    card2 = `${randomArr[i].imgAdd}`;
                    if (card1 == card2) {
                        for (let i = 0; i < N; i++) {
                            cards[i].classList.remove("check");
                        }
                        setTimeout(() => {
                            cards[i].classList.add("done");
                            cards[i].innerHTML = ""
                            cards[card1i].classList.add("done");
                            cards[card1i].innerHTML = "";
                            moves++;
                            document.querySelector(".moves").innerHTML = moves;
                            gCounter += 2;
                            for (let i = 0; i < N; i++) {
                                cards[i].classList.add("check");
                            }
                            if (gCounter == N) {
                                rounds++;
                                document.querySelector(".roundsPlayed").innerHTML = rounds;
                                document.querySelector(".congo").classList.remove("d-n");
                                document.querySelector(".opac-congo").classList.remove("d-n");
                                setTimeout(() => {
                                    console.log("hi")
                                    resetGame();
                                    console.log("hi")
                                }, 3000)
                                gCounter = 0;
                            }
                        }, speed * 1000)
                    } else {
                        for (let i = 0; i < N; i++) {
                            cards[i].classList.remove("check");
                        }
                        setTimeout(() => {
                            cards[card1i].classList.remove("toggled");
                            cards[i].classList.remove("toggled");
                            imgChild.classList.remove("display-img");
                            imgChild = cards[card1i].children[0];
                            imgChild.classList.remove("display-img");
                            cards[i].classList.add("check");
                            cards[card1i].classList.add("check");
                            misses++;
                            document.querySelector(".misses").innerHTML = misses;
                            moves++;
                            document.querySelector(".moves").innerHTML = moves;
                            for (let i = 0; i < N; i++) {
                                cards[i].classList.add("check");
                            }
                        }, speed * 1000)
                    }
                    counter = 0;
                }
            }
        })
    }
}