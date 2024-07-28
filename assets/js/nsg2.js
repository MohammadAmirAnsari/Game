const rows = document.getElementById("rows").value;
const columns = document.getElementById("columns").value;
let currentPosition = { row: rows - 1, column: columns - 1 }
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

document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();

    matrix = makeMatrix(rows, columns)
    let dice = matrix[currentPosition.row][currentPosition.column]
    if (event.key === 'ArrowUp' && currentPosition.row !== 0) {
        gem = matrix[currentPosition.row - 1][currentPosition.column]
        moveUp(dice, gem, currentPosition)
    } else if (event.key === 'ArrowDown' && currentPosition.row !== rows - 1) {
        gem = matrix[currentPosition.row + 1][currentPosition.column]
        moveDown(dice, gem, currentPosition)
    } else if (event.key === 'ArrowLeft' && currentPosition.column !== 0) {
        gem = matrix[currentPosition.row][currentPosition.column - 1]
        moveLeft(dice, gem, currentPosition)
    } else if (event.key === 'ArrowRight' && currentPosition.column !== columns - 1) {
        gem = matrix[currentPosition.row][currentPosition.column + 1]
        moveRight(dice, gem, currentPosition)
    } else {
        console.log("will do later")
    }
})

function moveUp(dice, gem, currentPosition) {
    currentPosition.row = currentPosition.row - 1
    swap(dice, gem)
}

function moveDown(dice, gem, currentPosition) {
    currentPosition.row = currentPosition.row + 1
    swap(dice, gem)
}

function moveRight(dice, gem, currentPosition) {
    currentPosition.column = currentPosition.column + 1
    swap(dice, gem)
}

function moveLeft(dice, gem, currentPosition) {
    currentPosition.column = currentPosition.column - 1
    swap(dice, gem)
}
function swap(dice, gem) {
    temp = dice.classList.value
    dice.classList = gem.classList.value
    gem.classList.value = temp
    temp = dice.innerText
    dice.innerText = gem.innerText
    gem.innerText = temp
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
