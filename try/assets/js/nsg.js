function handleSubmit(event) {

    root = document.getElementById("div-root");
    if (document.getElementsByClassName("grid").length > 0)
        document.getElementsByClassName("grid")[0].remove();
    // console.log('Submit button clicked');
    event.preventDefault();
    rows = document.getElementById("rows").value;
    columns = document.getElementById("columns").value;
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
    lastChild = document.querySelectorAll('.grid-items:last-child')[0];
    lastChild.classList.add('shifter');

}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        lastChild = document.querySelector('.shifter')
        sixthChild = document.querySelectorAll('.grid-items')[5]
        temp = lastChild.innerHTML
        lastChild.innerHTML = sixthChild.innerHTML
        sixthChild.innerHTML = temp
    }
},)

