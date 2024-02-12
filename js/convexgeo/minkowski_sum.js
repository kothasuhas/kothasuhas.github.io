import {drawGrid, getGradientVector, draw3dFunction} from './graphplot.js';

const canvas = document.getElementById("grid");
const config = {
    xMin: -3,
    xMax: 5,
    yMin: -1,
    yMax: 2,
    ctx: canvas.getContext("2d")
};

const canvasF3 = document.getElementById("fn3");
const configF3 = Object.assign({}, config);
configF3.ctx = canvasF3.getContext("2d");

const func3 = function (x, y) {
    return Math.sin(x * 2) * y + Math.cos(y * 5) * x;
};

drawGrid(config);
window.draw3dFunctionWithGradient = function(gradientIndex) {
    console.log("draw3dFunctionWithGradient", gradientIndex);
    const gv = getGradientVector(gradientIndex, 4096);
    draw3dFunction(configF3, -3.5, 3.5, 0.9, gv, func3);
};
window.draw3dFunctionWithGradient(0);