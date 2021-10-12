/*****Variables***** */
let penType = 'pen';
const padSize = '900';  //Size of the sketch pad in px

/*****Selectors*****/
const btnClear = document.querySelector("#clear");
const btnPen = document.querySelector("#pen");
const btnPencil = document.querySelector("#pencil");
const btnRainbow = document.querySelector("#rainbow");
const btnEraser = document.querySelector("#eraser");
const divSketchPad = document.querySelector("#sketch-pad");

/****Listeners**** */
btnClear.addEventListener('click', () => {
    let numPrompt = prompt("Pleae enter the number of cells", 16);

    console.log(isNaN(numPrompt));
    
    if (isNaN(numPrompt) || numPrompt > 100) numPrompt = 100;

    clearSketchPad();

    drawPad(numPrompt);
});

btnPen.addEventListener('click', () => {
    penType='pen';
});

btnPencil.addEventListener('click', () => {
    penType='pencil';
});

btnRainbow.addEventListener('click', () => {
    penType='rainbow';
});

btnEraser.addEventListener('click', () => {
    penType='eraser';
});

//Draw inital pad
drawPad(16);

/*****Function Definitions******/
function drawPad(num) {
    const fragment = document.createDocumentFragment();

    let cellSize = (Math.round(padSize / num)).toString() + 'px';

    for (let j =0; j < num; j++) {
        fragment.appendChild(buildRow(num, j, cellSize));
    }

    divSketchPad.appendChild(fragment);

    document.querySelectorAll('#cell').forEach(cell => {
        cell.addEventListener('pointerenter', cellHandler)
    });
}

function buildRow(numColumns, rowNum, cellSize) {
    const divRow = document.createElement('div');

    for (let i = 0; i < numColumns; i++){
        const div = document.createElement('div');

        div.style.background='#fff';
        div.style.height = cellSize;
        div.style.width = cellSize;
        div.id="cell";
        div.dataset.cellId = rowNum.toString() + '-' + i.toString();
        divRow.appendChild(div);
    }
    divRow.setAttribute('style', 'display:flex');
    return divRow;
}

function cellHandler(e) {
    const cell = document.querySelector(`div[data-cell-id='${e.target.dataset.cellId}']`);
    
    switch(penType) {
        case 'pen':
            cell.style.background='rgb(1, 1, 1)';
            break;
        case 'pencil':
            console.log(cell.style.background);
            let currentColor = (cell.style.background.split(',')[1]) - 10;
            console.log(currentColor);
            cell.style.background = `rgb(${currentColor}, ${currentColor}, ${currentColor})`;
            break;
        case 'rainbow':
            cell.style.background = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
            break;
        case 'eraser':
            cell.style.background='rgb(255, 255, 255)';
            break;
        default:
            cell.style.background='rgb(1, 1, 1)';

    }
}

function clearSketchPad() {
    document.querySelectorAll('#cell').forEach(cell => {
        cell.remove();
    });
}