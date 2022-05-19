
function getCanvas() {
    let canvas = document.querySelector("#canv");
    let ctx = canvas.getContext("2d");
  
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    return { canvas, ctx };
  }

  export {getCanvas};