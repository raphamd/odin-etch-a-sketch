const canvas = document.querySelector('.canvas');

function createCell(size) {
  const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = `${size}px`;
        cell.style.height = `${size}px`;
        cell.style.border = '1px solid lightgray';

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

addEventListener('DOMContentLoaded', function(event){
  createCanvas(24);
});