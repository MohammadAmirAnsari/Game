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
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();

    matrix = makeMatrix(rows, columns)

    dice = matrix[rows - 1][columns - 1]
    dice.classList.remove('animation')
    dice.classList.toggle('transition')


    if (event.key === 'ArrowUp') {
        gem = matrix[currentPosition.row - 1][currentPosition.column]
        moveUp(dice, gem, currentPosition)
        // } else if (event.key === 'ArrowDown') {
        //     lowerDiv = matrix[rows][columns - 1]
        //     moveDown(dice, lowerDiv)
        // } else if (event.key === 'ArrowLeft') {
        //     leftDiv = matrix[rows - 1][columns - 2]
        //     moveLeft(dice, leftDiv)
        // } else if (event.key === 'ArrowRight') {
        //     rightDiv = matrix[rows - 1][columns]
        //     moveRight(dice, rightDiv)
    }
    dice.classList.add('animation')
    // dice.classList.toggle('transition')


})


function moveUp(dice, gem, currentPosition) {
    console.log(gem)

    diceRect = dice.getBoundingClientRect()
    diceTransformOrigin = window.getComputedStyle(dice).transformOrigin
    console.log("before diceTransformOrigin:" + diceTransformOrigin)

    gemRect = gem.getBoundingClientRect()
    gemTransformOrigin = window.getComputedStyle(gem).transformOrigin



    deltaX = Math.ceil((columns - currentPosition.column) * (gemRect.x - diceRect.x))
    deltaY = Math.ceil((rows - currentPosition.row) * (gemRect.y - diceRect.y))


    console.log("pos of dice:" + deltaX, deltaY)
    // console.log(deltaX, deltaY, gemX, gemY)

    diceTransformOriginX = Math.ceil(parseInt(diceTransformOrigin.split(' ')[0]) + dice.offsetWidth / 2 * (rows - (currentPosition.row + 1)))
    diceTransformOriginY = Math.ceil(parseInt(diceTransformOrigin.split(' ')[1]) + dice.offsetHeight / 2 * (columns - (currentPosition.column)))
    console.log("origin:" + diceTransformOriginX, diceTransformOriginY)
    console.log("gto:" + gemTransformOrigin)
    gemTransfromOriginX = Math.ceil(parseInt(gemTransformOrigin.split(' ')[0]) + gem.offsetWidth / 2 * (rows - (currentPosition.row + 1)))
    gemTransfromOriginY = Math.ceil(parseInt(gemTransformOrigin.split(' ')[1]) + gem.offsetHeight / 2 * (rows - (currentPosition.column - 2)))

    dice.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    dice.style.transformOrigin = `${diceTransformOriginX}px ${-diceTransformOriginY}px`
    console.log("after diceTransformOrigin:" + `${diceTransformOriginX}px ${diceTransformOriginY}px`)

    gem.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`
    gem.style.transformOrigin = `${gemTransfromOriginX}px ${gemTransfromOriginY}px`

    console.log(currentPosition)
    currentPosition.row = currentPosition.row - 1
    console.log(currentPosition)
}

