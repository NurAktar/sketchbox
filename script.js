const canvas = document.getElementById('canvas');
canvas.width=window.innerWidth;
canvas.height=700;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_widht = "2";
let is_drawing = false;
let restore_array=[];
let index=-1;
let mhold = false;

function change_color(element){
  draw_color= element.style.background;
}

//mouse hold state..
document.addEventListener("mouseup",ms);
document.addEventListener("mousedown",ms);
function ms(event) {
  if (event.type == "mousedown") {
    mhold = true;
  }
  else {
    mhold = false;
  }
}

//touch state..
canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("touchend",stop,false);
//mouse events...
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);
canvas.addEventListener("mouseenter",check_start,false);

function check_start() {
  if ( mhold == true ){
    start();
  }
}
// starting debug

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(event.pageX - canvas.offsetLeft,event.pageY - canvas.offsetTop);
  event.preventDefault();

  context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
  context.strokeStyle = draw_color;
  context.lineWidth = draw_widht;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();
}

function draw(event){
  if(is_drawing){
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    context.strokeStyle = draw_color;
    context.lineWidth = draw_widht;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function stop(event){
  if (is_drawing){
    context.stroke();
    context.closePath();
    is_drawing= false;
  }
  event.preventDefault();
  if(event.type != 'mouseout'){
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index+=1;
  }
}

function clear_canvas() {
  index+=1;
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
}
function undo_last() {
  if ( index <= 0){
    clear_canvas();
    index -=1;
    restore_array.pop();
  }
  else {
    index -=1;
    restore_array.pop();
    context.putImageData(restore_array[index],0,0);
  }
}
