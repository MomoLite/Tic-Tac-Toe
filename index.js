class Control {
    static gameBoard = ["", "", "", "", "", "", "", "", ""];
    static player1 = {name: null, isTurn: false, type: null};
    static player2 = {name: null, isTurn: false, type: null};

    static setUp() {
        let divs = document.querySelectorAll(".container > div");

        for (let i = 0; i < divs.length; ++i) {
            divs[i].addEventListener("click", this.display);
        }

        document.getElementById("start").addEventListener("click", this.launch);
    }

    static clear() {
        let divs = document.querySelectorAll(".container > div");

        for (let i = 0; i < divs.length; ++i) {
            divs[i].textContent = "";
            Control.gameBoard[i] = "";
        }
    }

    static display(e) {
        if (e.target.textContent === "") {
            if (Control.player1.isTurn) {
                let classes = e.target.className.split(" ");
                Control.gameBoard[Number(e.target.getAttribute("data-position"))] = Control.player1.type;
                e.target.textContent = Control.player1.type;
                Control.player1.isTurn = false;
                Control.player2.isTurn = true;
                Control.checkMove(Number(classes[0].charAt(3)), Number(classes[1].charAt(6)), Control.player1.type);
            }
            else {
                if (Control.player2.isTurn) {
                    let classes = e.target.className.split(" ");
                    Control.gameBoard[Number(e.target.getAttribute("data-position"))] = Control.player2.type;
                    e.target.textContent = Control.player2.type;
                    Control.player2.isTurn = false;
                    Control.player1.isTurn = true;
                    Control.checkMove(Number(classes[0].charAt(3)), Number(classes[1].charAt(6)), Control.player2.type);
                }
            }
        }
    }

    static checkMove(row, column, type) {
        let rowFlag = true;
        let columnFlag = true;
        let position = ((row * 3)  + column) + 1;
        
        for (let i = 0; i < 3; ++i) {
            if (Control.gameBoard[((row * 3)  + i)] !== type) {
                rowFlag = false;
            }

            if (Control.gameBoard[((i * 3)  + column)] !== type) {
                columnFlag = false;
            }
        }

        if (position % 2 !== 0) {
            let diagonalFlag = true;
            if (row === column) {
                for (let i = 0; i < 3; ++i) {
                    if (Control.gameBoard[((i * 3)  + i)] !== type) {
                        diagonalFlag = false;
                        break;
                    }
                }
            }

            if (row !== column || position === 5) {
                for (let i = 0; i < 3; ++i) {
                    if (Control.gameBoard[((i * 3)  + (2 - i))] !== type) {
                        diagonalFlag = false;
                        break;
                    }
                }
            }

            if (rowFlag || columnFlag || diagonalFlag) {
                if (Control.player1.type === type) {
                    console.log(`Congrats ${Control.player1.name}, you won the game!`);
                }
                else {
                    console.log(`Congrats ${Control.player2.name}, you won the game!`);
                }
                Control.player2.isTurn = false;
                Control.player1.isTurn = false;
            }
        }
        else {
            if (rowFlag || columnFlag) {
                if (Control.player1.type === type) {
                    console.log(`Congrats ${Control.player1.name}, you won the game!`);
                }
                else {
                    console.log(`Congrats ${Control.player2.name}, you won the game!`);
                }
                Control.player2.isTurn = false;
                Control.player1.isTurn = false;
            }
        }

        let draw = true;
        for (let i = 0; i < Control.gameBoard.length; ++i) {
            if (Control.gameBoard[i] === "")
                draw = false;
        }

        if (draw)
            console.log(`Match has ended in a draw!`);
    }

    static launch() {
        Control.clear();

        Control.player1.name  = prompt("Enter name for player 1: ").trim();
        Control.player1.type  = prompt("Enter the letter you'll use for the game: ").trim().toUpperCase();

        Control.player2.name = prompt("Enter name for player 2: ").trim();
        Control.player2.type = prompt("Enter the letter you'll use for the game: ").trim().toUpperCase();


        if (Math.floor(Math.random() * 2) === 0) {
            Control.player1.isTurn = true;
            alert(`A random number was flipped to determine who will start the match. ${Control.player1.name} will start the game!`);
        }
        else {
            Control.player2.isTurn = true;
            alert(`A random number was flipped to determine who will start the match. ${Control.player2.name} will start the game!`)
        }
    }
}

Control.setUp();