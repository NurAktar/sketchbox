const canvas = document.getElementById('canvas');
canvas.width=window.innerWidth;
canvas.height=700;
// variables..
let context = canvas.getContext("2d");
let start_background_color = "white";
let draw_color = "black";
var draw_width = 2;
let is_drawing = false;
let restore_array=[];
let index=-1;
let mhold = false;
let pointX;
let pointY;
// canvas fill..
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);
//element color change oninput..
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
//touch functions..
canvas.addEventListener("touchstart",t_start,false);
canvas.addEventListener("touchmove",t_draw,false);
canvas.addEventListener("touchend",t_stop,false);

function t_start(event) {
  is_drawing = true;
  context.beginPath();
  // context.moveTo(event.pageX - canvas.offsetLeft,event.pageY - canvas.offsetTop);
  context.moveTo(event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop);
  context.lineTo(event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop);
  // context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
  pointX = event.touches[0].pageX;
  // console.log(pointX);
  pointY = event.touches[0].pageY;
  // console.log(pointY);
  context.strokeStyle = draw_color;
  context.lineWidth = draw_width;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.shadowColor = draw_color;
  context.shadowBlur = 2 ;
  context.stroke();
  event.preventDefault();
}
function t_draw(event){
  // console.log( event.touches[0].pageX );
  if(is_drawing){
    // mmoved=false;
    // console.log(is_drawing);
    // context.strokeStyle = draw_color;
    // context.lineWidth = draw_width;
    // context.lineCap = "round";
    // context.lineJoin = "round";

    context.lineTo(event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop);
    // context.lineTo(event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop);
    context.stroke();
  }
  event.preventDefault();
}
function t_stop(event){
    // console.log(pointX);
  if (is_drawing){
    context.closePath();
    is_drawing= false;
  }
  // pointX=event.touches[0].pageX;
  // console.log("this",pointX);

  // if ( !mmoved ) {
  //   mmoved=false;
  //   console.log("this2",mmoved);
  //   context.beginPath();
  //   context.moveTo(event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop);
  //   context.lineWidth = 4 + parseInt(draw_width);
  //
  //   context.stroke();
  //   context.closePath();
  // }

  // if ( event.type != "touch" ){
  index += 1;
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  // }
  event.preventDefault();
}


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
function start(event) {
  is_drawing = true;
  context.beginPath();
  // context.moveTo(event.pageX - canvas.offsetLeft,event.pageY - canvas.offsetTop);
  context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
  // context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
  pointX = event.pageX;
  pointY = event.pageY;
  context.strokeStyle = draw_color;
  context.lineWidth = draw_width;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.shadowColor = draw_color;
  context.shadowBlur = 2 ;
  // context.stroke();
  event.preventDefault();
}
function draw(event){
  // console.log( event.touches[0].pageX );
  if(is_drawing){
    // context.strokeStyle = draw_color;
    // context.lineWidth = draw_width;
    // context.lineCap = "round";
    // context.lineJoin = "round";

    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    // context.lineTo(event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop);
    context.stroke();
  }
  event.preventDefault();
}
function stop(event){
  if (is_drawing){
    context.closePath();
    is_drawing= false;
  }
  if ( pointX == event.pageX && pointY == event.pageY) {
    context.beginPath();
    context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    context.lineWidth = 4+parseInt(draw_width);
    context.closePath();
    context.stroke();
  }

  event.preventDefault();
  if ( event.type != "mouseout" ){
    index += 1;
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  }
}
// clear and undo last functions..
function clear_canvas() {
  index+=1;
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
}
function undo_last() {
  if ( index <= 0){
    index=-1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array.pop(); // must pop all??? nope now/
  }
  else{
    index-=1;
    restore_array.pop();
    context.putImageData(restore_array[index],0,0);
  }
}
function redo_last() {
  index+=1;

}
