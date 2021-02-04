const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =document.getElementsByClassName("jscolor")
const range= document.getElementById("jsrange")
const mode = document.getElementById("js_mode")
const save = document.getElementById("js_save")

canvas.width=900;
canvas.height=500;

ctx.fillStyle = "white";
ctx.fillRect (0,0, canvas.width, canvas.height);
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMousemove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}    
function changecolor(event){
    const color =event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handelRangechange(event){
    const val = event.target.value;
    ctx.lineWidth = val;
}

function changemode(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
       
    }
}

function handlecanvasclick(){
    if(filling){ctx.fillRect (0,0, canvas.width, canvas.height)}   
}

function handlecontextmenu(event){
    event.preventDefault();

}

function handlesave(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'paintJS';
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMousemove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handlecanvasclick);
    canvas.addEventListener("contextmenu", handlecontextmenu);
}   

Array.from(colors).forEach(colorele => colorele.addEventListener("click",changecolor))

if(range){
    range.addEventListener("input",handelRangechange)
}

if(mode){
    mode.addEventListener("click",changemode)
}

if(save){
    save.addEventListener("click",handlesave)
}