function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;
  
    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;
  
    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
  }

function loadBoard() {
    let board = document.getElementById("c4-board")
    for  (let idx_2 = 0; idx_2 < 6; idx_2++) {
        for  (let idx_1 = 0; idx_1 < 7; idx_1++) {
            board.appendChild(fromHTML(`<div class="slot"><div class="disc" id="disc-${idx_1}-${idx_2}" onclick="selection(this.id)"></div></div>`))
        }
    }
}

Window.onload = loadBoard()



function selection(clickedId) {
    x_value = clickedId[5] //clickeId[5] is the column chosen, 7 is row
    for (let y_value = 5; y_value >= 0; y_value--) {
        changedId = `disc-${x_value}-${y_value}`
        let slot = document.getElementById(changedId)
        if (slot.classList == "disc" || slot.classList == "disc") {
            slot.classList.add("red-disc")
            aiSelection()
            checkIfWin()
            return
        }
    }
}



function checkIfWin() {
    //Set up the matrix
    let board = document.getElementById("c4-board")
    let matrix = []
    let matrixList = []

    for (i = 0; i < board.children.length/7; i++) {
        for (index = 0; index < board.children.length/6; index++) {
            matrixList.push(board.children[index+i*7].children[0].classList)
        }

        matrix.push(matrixList)
        matrixList = []
    }


    //Check collumns for wins

    //Matrix = [[x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x]]
    for (row = 0; row < matrix[0].length; row++) { //row = 0; row < 6; row+1 - row is each list
        for (start = 0; start < matrix.length-3; start++) { //start = 0; start < 4; start+1 - start is the num each column starts at
            let score = 0
            for (col = start; col < 4+start; col++) {  //col = start; col < 4+start; col+1 - col is the spot it checks
                if (matrix[col][row] == "disc red-disc") {
                    score++
                }
                if (matrix[col][row] == "disc yellow-disc") {
                    score--
                }
                if (score == 4) {
                    alert("Player 1 Wins! (Col)")
                }
                else if(score == -4) {
                    alert("Player 2 Wins! (Col)")
                }
            }
        }
    }
    //Check rows for wins
    for (let col = 0; col < matrix.length; col++) {
        for (let start = 0; start < matrix[col].length-3; start++) {
            let score = 0
            for (let row = start; row < 4+start; row++) {
                if (matrix[col][row] == "disc red-disc") {
                    score++
                }
                if (matrix[col][row] == "disc yellow-disc") {
                    score--
                }
                if (score == 4) {
                    alert("Player 1 Wins! (Row)")
                }
                else if(score == -4) {
                    alert("Player 2 Wins! (Row)")
                }
            }

        }
    }

    //Check diagonals for wins
    for (col = 0; col < matrix.length-3; col++) {
        for (start = 0; start < matrix[col].length-4; start++) {
            let score = 0
            for (row = 0; row < 4; row++) {
                if (matrix[row+col][row+start] == "disc red-disc") {
                    score++
                }
                if (matrix[row+col][row+start] == "disc yellow-disc") {
                    score--
                }
                if (score == 4) {
                    alert("Player 1 Wins!  (Diagonal)")
                }
                else if(score == -4) {
                    alert("Player 2 Wins!  (Diagonal)")
                }
            }
        }
    }
    
    for (col = 0; col < matrix.length-3; col++) {
        for (start = 6; start > matrix[col].length-5; start--) {
            let score = 0
            for (count = 0; count < 4; count++) {
                try {
                if (matrix[col+count][start-count] == "disc red-disc") {
                    score++
                }
                if (matrix[col+count][start-count] == "disc yellow-disc") {
                    score--
                }
                } catch {

                } 
                if (score == 4) {
                    alert("Player 1 Wins!  (Diagonal)")
                }
                else if(score == -4) {
                    alert("Player 2 Wins!  (Diagonal)")
                }
            }
        }
    }
}
function aiSelection() {
    //Set up the matrix
    let board = document.getElementById("c4-board")
    let matrix = []
    let matrixList = []
    let scoring = []

    for (i = 0; i < board.children.length/7; i++) {
        for (index = 0; index < board.children.length/6; index++) {
            matrixList.push(board.children[index+i*7].children[0].classList)
        }

        matrix.push(matrixList)
        matrixList = []
    }


    //Check collumns for wins

    //Matrix = [[x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x][x, x, x, x, x, x, x]]
    for (row = 0; row < matrix[0].length; row++) { //row = 0; row < 6; row+1 - row is each list
        for (start = 0; start < matrix.length-3; start++) { //start = 0; start < 4; start+1 - start is the num each column starts at
            let score = 0
            for (col = start; col < 4+start; col++) {  //col = start; col < 4+start; col+1 - col is the spot it checks
                if (matrix[col][row] == "disc red-disc") {
                    score++
                }
                if (matrix[col][row] == "disc yellow-disc") {
                    score--
                }
                if (score == 3) {
                            let score = 0
                            for (col = start; col < 4+start; col++) {  //col = start; col < 4+start; col+1 - col is the spot it checks
                                if (matrix[col][row] == "disc") {
                                    scoring.push([[col, row], [0]])
                                }
                    }
                }
                else if(score == -3) {
                            let score = 0
                            for (col = start; col < 4+start; col++) {  //col = start; col < 4+start; col+1 - col is the spot it checks
                                if (matrix[col][row] == "disc") {
                                    scoring.push([[col, row], [1]])
                                }
                    }
                }
            }
        }
    }
    //Check rows for wins
    for (let col = 0; col < matrix.length; col++) {
        for (let start = 0; start < matrix[col].length-3; start++) {
            let score = 0
            for (let row = start; row < 4+start; row++) {
                if (matrix[col][row] == "disc red-disc") {
                    score++
                }
                if (matrix[col][row] == "disc yellow-disc") {
                    score--
                }
                if (score == 3) {
                            let score = 0
                            for (let row = start; row < 4+start; row++) {
                                if (matrix[col][row] == "disc") {
                                    scoring.push([[col, row], 0])
                                }
                    }
                }
                else if(score == -3) {
                            let score = 0
                            for (let row = start; row < 4+start; row++) {
                                if (matrix[col][row] == "disc") {
                                    scoring.push([[col, row], 1])
                                }
                            }
                }
            }

        }
    }

    //Check diagonals for wins
    for (col = 0; col < matrix.length-3; col++) {
        for (start = 0; start < matrix[col].length-4; start++) {
            let score = 0
            for (row = 0; row < 4; row++) {
                if (matrix[row+col][row+start] == "disc red-disc") {
                    score++
                }
                if (matrix[row+col][row+start] == "disc yellow-disc") {
                    score--
                }
                if (score == 3) {
                            let score = 0
                            for (row = 0; row < 4; row++) {
                                if (matrix[row+col][row+start] == "disc") {
                                    scoring.push([[row+col, row+start], 0])
                                }
                    }
                }
                else if(score == -3) {
                            let score = 0
                            for (row = 0; row < 4; row++) {
                                if (matrix[row+col][row+start] == "disc") {
                                    scoring.push([[row+col, row+start], 1])
                                }
                            }
                }
            }
        }
    }
    
    for (col = 0; col < matrix.length-3; col++) {
        for (start = 6; start > matrix[col].length-5; start--) {
            let score = 0
            for (count = 0; count < 4; count++) {
                try {
                if (matrix[col+count][start-count] == "disc red-disc") {
                    score++
                }
                if (matrix[col+count][start-count] == "disc yellow-disc") {
                    score--
                }
                } catch {

                } 
                if (score == 3) {
                    for (col = 0; col < matrix.length-3; col++) {
                        for (start = 6; start > matrix[col].length-5; start--) {
                            let score = 0
                            for (count = 0; count < 4; count++) {
                                try {
                                if (matrix[col+count][start-count] == "disc") {
                                    scoring.push([[col+count, start-count], 0])
                                }
                                } catch {

                                }
                            }
                        }
                    }
                }
                else if(score == -3) {
                            let score = 0
                            for (count = 0; count < 4; count++) {
                                try {
                                if (matrix[col+count][start-count] == "disc") {
                                    scoring.push([[col+count, start-count], 1])
                                }
                                } catch {

                                }
                            }
                }
            }
        }
    }
    let lose = []
    for (listnum = 0; listnum < scoring.length; listnum++) {
        if (scoring[listnum][1] == 1) {
            changedId = `disc-${scoring[listnum][0][1]}-${scoring[listnum][0][0]}`
            let slot = document.getElementById(changedId)
            let slotBelow
            try {
                belowId = `disc-${scoring[listnum][0][1]}-${scoring[listnum][0][0]+1}`
                slotBelow = document.getElementById(belowId)
            } catch {
                slot.classList.add("yellow-disc")
                return
            }
            if (slotBelow.classList.length != 1) {
                slot.classList.add("yellow-disc")
                return
            }
        }
        else if (scoring[listnum][1] == 0) {
            lose.push(scoring[listnum][0])
        }
    }
    try {
        changedId = `disc-${lose[0][1]}-${lose[0][0]}`
        let slot = document.getElementById(changedId)
        slot.classList.add("yellow-disc")
    } catch {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    for (let stopper = 0; stopper < 100; stopper++)
        x_value = getRandomInt(7)
        for (let y_value = 5; y_value >= 0; y_value--) {
            changedId = `disc-${x_value}-${y_value}`
            let slot = document.getElementById(changedId)
            if (slot.classList == "disc" || slot.classList == "disc") {
                slot.classList.add("yellow-disc")
                return
            }
        }
    }
}