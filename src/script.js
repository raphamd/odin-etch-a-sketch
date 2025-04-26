const canvas = document.querySelector('.canvas');

function createCell(size) {
  const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = `${size}px`;
        cell.style.height = `${size}px`;

  return cell;
}

function createCanvas(scale) {
  const canvasClientRect = canvas.getBoundingClientRect();

  for (let i = 0; i < scale; i++) {
    for (let j = 0; j < scale; j++) {
      const cellScale = canvasClientRect.width / scale;
      const cell = createCell(cellScale);
      
      canvas.appendChild(cell);
    }
  }
}

function configureCells() {
  function onCellClicked(event) {
    const getRandomGrayscaleColor = () => `hsla(0, 0%, ${Math.floor(Math.random() * 101)}%, 1)`;

    const isCell = event.target.className === 'cell';
    const isMouseButtonPressed = event.buttons === 1;

    if (isMouseButtonPressed && isCell) {
      event.target.style['background-color'] = getRandomGrayscaleColor();
      event.target.style['border'] = 'none';
    }
  }

  canvas.addEventListener('mousemove', onCellClicked);
  canvas.addEventListener('mousedown', onCellClicked);
}

addEventListener('DOMContentLoaded', function(event){
  createCanvas(24);
  configureCells()
});