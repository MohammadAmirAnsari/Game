const rows = document.getElementById("rows").value;
const columns = document.getElementById("columns").value;
let matrix = [];

function handleSubmit(event) {

    root = document.getElementById("div-root");
    if (document.getElementsByClassName("grid").length > 0)
        document.getElementsByClassName("grid")[0].remove();

    event.preventDefault();
    div = document.createElement("div");
    div.classList.add("grid");
    div.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    div.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    div.style.gap = "2.5rem 2.5rem";
    root.appendChild(div);
    let count = 1
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let item = document.createElement("div");
            item.classList.add("grid-items");
            if (count === rows * columns) {
                item.innerHTML = "MOVE";
            } else {
                item.innerHTML = count++;

            }
            div.appendChild(item);

        }
    }
    div.scrollIntoView({ block: "center", behavior: "smooth" });
    lastChild = document.querySelectorAll('.grid-items:last-child')[0].classList.add('dice', 'animation');

}
function makeMatrix(rows, columns) {
    let arrayDivs = Array.from(document.querySelectorAll('.grid-items'))
    let matrix = []
    for (let row = 0; row < rows; row++) {
        matrix[row] = [];
        for (let column = 0; column < columns; column++) {
            matrix[row][column] = arrayDivs[row * columns + column]
        }
    }
    return matrix
}

let currentPosition = { row: rows - 1, column: columns - 1 }
let rowLevel = columnLevel = 0


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();

    matrix = makeMatrix(rows, columns)
    let dice = matrix[currentPosition.row][currentPosition.column]
    // dice.classList.toggle('animation')
    // dice.classList.add('transition')


    // console.log("before currentPosition.row:" + currentPosition.row, "currentPosition.column:" + currentPosition.column)
    if (event.key === 'ArrowUp') {
        gem = matrix[currentPosition.row - 1][currentPosition.column]
        moveUp(dice, gem, currentPosition)
        // console.log("after currentPosition.row:" + currentPosition.row, "currentPosition.column:" + currentPosition.column)
        // } else if (event.key === 'ArrowDown') {
        //     gem = matrix[currentPosition.row + 1 ][currentPosition.column]
        //     moveDown(dice, gem, currentPosition)
        // } else if (event.key === 'ArrowLeft') {
        //     leftDiv = matrix[rows - 1][columns - 2]
        //     moveLeft(dice, leftDiv)
        // } else if (event.key === 'ArrowRight') {
        //     rightDiv = matrix[rows - 1][columns]
        //     moveRight(dice, rightDiv)
    }
    // dice.classList.toggle('animation')
    // dice.classList.toggle('transition')


})

function moveUp(dice, gem, currentPosition) {

    // parent = document.querySelector('.grid')
    // addTransition(gem)


    // diceRect = dice.getBoundingClientRect()
    // diceTransformOrigin = window.getComputedStyle(dice).transformOrigin
    // // console.log("before diceTransformOrigin:" + diceTransformOrigin)

    // gemRect = gem.getBoundingClientRect()
    // gemTransformOrigin = window.getComputedStyle(gem).transformOrigin

    // gridRowGap = parseInt(window.getComputedStyle(parent).rowGap, 10)
    // griColumnGap = parseInt(window.getComputedStyle(parent).columnGap, 10)

    // deltaX = Math.ceil(columnLevel * (gemRect.x - diceRect.x))
    // deltaY = Math.ceil(++rowLevel * (gemRect.y - diceRect.y))
    // gemX = Math.ceil(gemRect.x - diceRect.x)
    // gemY = -Math.ceil(gemRect.y - diceRect.y)

    // // console.log("currentPosition.row:" + currentPosition.row, "currentPosition.column:" + currentPosition.column)
    // // console.log("gemx: " + gemRect.x, "gemy: " + gemRect.y)
    // // console.log("gemX: " + gemX, "gemY: " + gemY)
    // // console.log("dicex: " + diceRect.x, "dicey: " + diceRect.y)
    // // console.log("deltaX: " + deltaX, "deltaY: " + deltaY)

    // diceTransformOriginX = parseInt(diceTransformOrigin.split(' ')[0], 10)

    // diceTransformOriginY = (parseInt(diceTransformOrigin.split(' ')[1], 10) - diceRect.height / 2) - (gemRect.height / 2 + gridRowGap)

    // // console.log("diceTransformOrigin: " + diceTransformOrigin.split(' ')[1])
    // // console.log("diceTransformOriginX: " + diceTransformOriginX, "diceTransformOriginY: " + diceTransformOriginY)
    // dice.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    // dice.style.transformOrigin = `${diceTransformOriginX}px ${diceTransformOriginY}px`

    // gem.style.transform = `translate(${gemX}px, ${gemY}px)`
    // // gem.style.transformOrigin = `${gemTransfromOriginX}px ${gemTransfromOriginY}px`

    currentPosition.row = currentPosition.row - 1
    swap(dice, gem)
    removeTransition(dice, gem)
}

function moveDown(dice, gem, currentPosition) {

    parent = document.querySelector('.grid')
    addTransition(gem)

    diceRect = dice.getBoundingClientRect()
    gemRect = gem.getBoundingClientRect()

    diceTransformOrigin = window.getComputedStyle(dice).transformOrigin
    gemTransformOrigin = window.getComputedStyle(gem).transformOrigin

    gridRowGap = parseInt(window.getComputedStyle(parent).rowGap, 10)
    griColumnGap = parseInt(window.getComputedStyle(parent).columnGap, 10)

    deltaX = Math.ceil(columnLevel * (gemRect.x - diceRect.x))
    deltaY = Math.ceil(--rowLevel * (gemRect.y - diceRect.y))
    gemX = Math.ceil(gemRect.x - diceRect.x)
    gemY = Math.ceil(gemRect.y - diceRect.y)

    // console.log("currentPosition.row:" + currentPosition.row, "currentPosition.column:" + currentPosition.column)
    // console.log("gemx: " + gemRect.x, "gemy: " + gemRect.y)
    // console.log("gemX: " + gemX, "gemY: " + gemY)
    // console.log("dicex: " + diceRect.x, "dicey: " + diceRect.y)
    // console.log("deltaX: " + deltaX, "deltaY: " + deltaY)

    diceTransformOriginX = parseInt(diceTransformOrigin.split(' ')[0], 10)
    diceTransformOriginY = (parseInt(diceTransformOrigin.split(' ')[1], 10) - diceRect.height / 2) - (gemRect.height / 2 + gridRowGap)

    console.log("diceTransformOrigin: " + diceTransformOrigin.split(' ')[1])
    console.log("diceTransformOriginX: " + diceTransformOriginX, "diceTransformOriginY: " + diceTransformOriginY)

    dice.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    dice.style.transformOrigin = `${diceTransformOriginX}px ${diceTransformOriginY}px`

    gem.style.transform = `translate(${gemX}px, ${gemY}px)`
    // gem.style.transformOrigin = `${gemTransfromOriginX}px ${gemTransfromOriginY}px`

    currentPosition.row = currentPosition.row + 1

    removeTransition(gem)
}


function addMotion(dice, gem) {
    dice.classList.add('animation')
    gem.classList.add('transition')
}

function removeMotion(dice, gem) {
    dice.addEventListener('transitionend', () => {
        dice.classList.remove('animation')
    })
    gem.addEventListener('transitionend', () => {
        gem.classList.remove('transition')
        // swap(dice, gem)
    })

}

function swap(dice, gem) {
    temp = dice.classList.value
    dice.classList = gem.classList.value
    gem.classList.value = temp
    temp = dice.innerText
    dice.innerText = gem.innerText
    gem.innerText = temp
}
