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
    root.appendChild(div);
    let count = 1
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let item = document.createElement("div");
            item.classList.add("grid-items");
            item.innerHTML = count++;
            div.appendChild(item);
        }
    }
}

