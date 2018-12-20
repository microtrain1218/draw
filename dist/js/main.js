var draw = (function () {
  var mWidth = document.querySelector('main').offsetWidth;
  var mHeight = document.querySelector('main').offsetHeight;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var rect = canvas.getBoundingClientRect();
  //current x,y
  x = 0,
    y = 0,
    //starting x,y
    x1 = 0,
    y1 = 0,
    //ending x,y
    x2 = 0,
    y2 = 0;
  var lx = false;
  var ly = false;
  //what are we drawing?
  var shape = '';
  var isDrawing = false;
  return {

    setIsDrawing: function (bool) {
      isDrawing = bool;
    },

    getIsDrawing: function () {
      return isDrawing;
    },
    //set x y cords based on current event
    setXY: function (evt) {

      lx = x;
      ly = y;

      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top) - canvas.offsetTop;
      console.log(x + ' ' + y);
    },

    //set the starting cords
    setStart: function () {
      x1 = x;
      y1 = y;
    },
    //set the ending cords
    setEnd: function () {
      x2 = x;
      y2 = y;
    },

    //sets the shape to be drawn
    setShape: function (shp) {
      shape = shp;
    },

    getShape: function () {
      return shape;
    },

    //write the x, y cords to the GUI
    writeXY: function () {
      document.getElementById('trackX').innerHTML = 'X: ' + x;
      document.getElementById('trackY').innerHTML = 'Y: ' + y;
    },

    draw: function () {
      ctx.restore();
      if (shape === 'rectangle') {
        this.drawRect();
      } else if (shape === 'line') {
        this.drawLine();
      } else if (shape === 'circle') {
        this.drawCircle();
      } else if (shape === 'path') {
        this.drawPath();
      } else {
        alert('Please choose a shape!');
      }
      ctx.save();
    },

    drawPath: function () {
      alert('nada');
    },
    drawCircle: function () {
      ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
      ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);

      let a = (x1 - x2);
      let b = (y1 - y2);
      let radius = Math.sqrt(a * a + b * b);

      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
    },

    drawLine: function () {
        //what are we dr
      //Start by using random fill colors.
      ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    },

    //Draw a rect
    drawRect: function () {
      ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
      ctx.fillRect(x1, y1, (x2 - x1), (y2 - y1));
    },

    getCanvas: function () {
      return canvas;
    },

    init: function () {
  //what are we dr

      canvas.width = mWidth;
      canvas.height = mHeight;
      document.querySelector('main').appendChild(canvas);

    }
  }

})();
draw.init();
//Add a mousemove listener to the canvas
// Where the mouse reports a change of position use the event data
//to set and report the x,y of the mouse
draw.getCanvas().addEventListener('mousemove', function (evt) {
  draw.setXY(evt);
  draw.writeXY();
  if (draw.getShape() == 'path' && draw.getIsDrawing() === true) {
    draw.draw();
  }
});
draw.getCanvas().addEventListener('mousedown', function (evt) {
  draw.setStart();
  draw.setIsDrawing(true);
});
draw.getCanvas().addEventListener('mouseup', function (evt) {
  draw.setEnd();
  draw.draw();
  draw.setIsDrawing(false);
});
document.getElementById('btnRect').addEventListener('click', function () {
  draw.setShape('rectangle');
});
document.getElementById('btnLine').addEventListener('click', function () {
  draw.setShape('line');
});
document.getElementById('btnCircle').addEventListener('click', function () {
  draw.setShape('circle');
});
document.getElementById('btnPath').addEventListener('click', function () {
  draw.setShape('path');
});
