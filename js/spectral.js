let points = [{x:30,y:30},{x:100,y:200},{x:220,y:80}];
let barriers = [{x:200, y1:250, y2:450}, {x:300, y1:50, y2:250}]
let drag_point = -1;
let pointSize = 10;
let canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var MathJax = document.createElement('script');  
MathJax.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-AMS-MML_HTMLorMML');
document.head.appendChild(MathJax);

canvas.onmousedown = function(e) {
  var pos = getPosition(e);
  drag_point = getPointAt(pos.x, pos.y);
  if (drag_point == -1) {
    points.push(pos);
    redraw();
  }
};
canvas.onmousemove = function(e) {
  if (drag_point != -1) {
    var pos = getPosition(e);
    points[drag_point].x = pos.x;
    points[drag_point].y = pos.y;
    redraw(); 
  }
};
canvas.onmouseup = function(e) {
  populateMatrices();
  drag_point = -1;
};

function getPosition(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return {x, y};
}

function getPointAt(x, y) {
  for (var i = 0; i < points.length; i++) {
    if (
      Math.abs(points[i].x - x) < pointSize &&
      Math.abs(points[i].y - y) < pointSize
    )
      return i;
  }
  return -1; 
}

function redraw() {
  if (points.length > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    drawCircles();
    drawBarriers();
  }
}

function get_adj_matrix() {
  var adj_matrix = [...Array(points.length)].map(e => Array(points.length));
  for (var i = 0; i < points.length; i++) {
    for (var j = 0; j < points.length; j++) {
      if (i==j || !get_edge(i, j)) {
        adj_matrix[i][j] = 0.0;
      } else {
        adj_matrix[i][j] = 1.0;
      } 
        // delta_x = (points[i].x - points[j].x);
        // delta_y = (points[i].y - points[j].y);
        // adj_matrix[i][j] = Math.sqrt(delta_x*delta_x + delta_y*delta_y);
    }
  }
  return adj_matrix;
}

function get_laplacian(adj_matrix) {
  var laplacian = [...Array(points.length)].map(e => Array(points.length));
  for (var i = 0; i < points.length; i++) {
    for (var j = 0; j < points.length; j++) {
      edgeij = get_edge(i, j);
      if (i==j) {
        laplacian[i][j] = adj_matrix[i].reduce((a, b) => a + b, 0);
      } else if (edgeij) {
        laplacian[i][j] = -1.0;
      } else {
        laplacian[i][j] = 0.0;
      }
    }
  }
  return laplacian;
}

function matrixToString(matrix){
  ret = ""
  for (i = 0; i < matrix.length; i++) {
    ret += " <mtr> ";
    for (j = 0; j < matrix[0].length; j++) {
      ret += " <mtd><mn> " + matrix[i][j] + " </mn></mtd> ";
      // if (j != matrix[0].length -1){
      //   ret += " & ";
      // }
    }
    ret += " </mtr> ";
  }
  // ret += " </mtable>"
  console.log(ret)
  return ret;
}

function populateMatrices() {
  adj_matrix = get_adj_matrix();
  laplacian = get_laplacian(adj_matrix);
  
  let adj_matrix_html = document.getElementById("adj_matrix");
  let laplacian_html = document.getElementById("laplacian");

  let adj_matrix_text = "\\( \\begin{bmatrix}";
  let laplacian_text = "\\( \\begin{bmatrix}";
  for (i=0; i < points.length; i++){
    for (j=0; j < points.length; j++){
      adj_matrix_text += " " + adj_matrix[i][j] + " "
      laplacian_text += " " + laplacian[i][j] + " "
      if (j != points.length - 1) {
        adj_matrix_text += " & "
        laplacian_text += " & "
      }
    }
    adj_matrix_text += " \\\\ "
    laplacian_text += " \\\\ "
  }
  adj_matrix_text += "\\end{bmatrix}\\)"
  laplacian_text += "\\end{bmatrix}\\)"

  adj_matrix_html.innerHTML = adj_matrix_text
  laplacian_html.innerHTML = laplacian_text

  MathJax.Hub.Queue(["Typeset",MathJax.Hub,'adj_matrix']);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,'laplacian']);
}

function populateEigenvalues() {
  var eigenvalues = "500";
  let eigen_text = document.getElementById("eigen_text");
  eigen_text.innerHTML = eigenvalues;
}

function drawBarriers() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;
  for (var i = 0; i < barriers.length; i++) {
    ctx.beginPath();
    ctx.moveTo(barriers[i].x, barriers[i].y1);
    ctx.lineTo(barriers[i].x, barriers[i].y2);
    ctx.stroke();
  }
}

function get_edge(i, j) {
  var is_crossing = false;
  for (var b = 0; b < barriers.length; b++){
    if (intersect(points[i].x, points[i].y, points[j].x, points[j].y, barriers[b].x, barriers[b].y1, barriers[b].x, barriers[b].y2)){
      is_crossing = true;
    }
  }
  return !is_crossing;
}

function intersect(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}

function drawLines() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  for (var i = 0; i < points.length; i++) {
    for (var j = 0; j < points.length; j++) {
        if (!get_edge(i, j)) {
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
    }
  }
}

function drawCircles() {
//   ctx.fillStyle = "#451e96";
  ctx.fillStyle = "white";
  ctx.lineWidth = 20;
  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();
  })
}

function clearall()
{
    points = [{x:30,y:30},{x:100,y:200},{x:220,y:80}];
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log('CLEARED');
    redraw();
    populateMatrices();
}

redraw();
populateMatrices();