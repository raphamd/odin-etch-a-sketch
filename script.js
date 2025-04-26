const canvas = document.querySelector('.canvas');
const buttons = document.querySelector('.buttons');

function showFadeOut(element) {
  element.style.animation = 'fade-out 0.75s linear 1';
  element.style.animationPlayState = 'playing';

  setTimeout(function(){
    element.remove();
  }, 750);
}

function showLoadingScreen() {
  const screen = document.createElement('div');
  const loader = document.createElement('div');
  const body = document.querySelector('body');

  screen.classList.add('loading-screen');
  loader.classList.add('loader');
  screen.appendChild(loader);
  body.appendChild(screen);

  screen.addEventListener('animationend', function(){
    showFadeOut(screen);
  });
}

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

function setupInterface() {
  let isDrawing = true;
  let isErasing = false;

  function setupInterfaceButtons() {
    buttons.addEventListener('click', function(event){
      const button = event.target;
      const buttonClasses = button.classList;

      if (buttonClasses.contains('pencil')) {
        isDrawing = true;
        isErasing = false;
      }
      if (buttonClasses.contains('eraser')) {
        isDrawing = false;
        isErasing = true;
      }
    });
  }

  function onCellClicked(event) {
    const isCell = event.target.className === 'cell';
    const isMouseButtonPressed = event.buttons === 1;
    
    function getRandomGrayscaleColor() {
      return `hsla(0, 0%, ${Math.floor(Math.random() * 101)}%, 1)`;
    }

    function setCellCleaned(cell) {
      cell.style['background-color'] = 'black';
      cell.style['border'] = '1px solid lightgray';
    }

    function setCellFilled(cell) {
      cell.style['background-color'] = getRandomGrayscaleColor();
      cell.style['border'] = 'none';
    }

    if (isMouseButtonPressed && isCell) {
      if (isDrawing) setCellFilled(event.target);
      if (isErasing) setCellCleaned(event.target);
    }
  }

  canvas.addEventListener('mousemove', onCellClicked);
  canvas.addEventListener('mousedown', onCellClicked);

  setupInterfaceButtons();
}

addEventListener('DOMContentLoaded', function(event){
  showLoadingScreen();
  createCanvas(24);
  setupInterface();
});