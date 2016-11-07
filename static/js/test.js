var WIDTH  = window.innerWidth;
var HEIGHT = 400;
var XDIS   = 100;
var turn_points = [HEIGHT * 3 / 4];
var curve_points = [];
var fr = 50;   // The frame rate will determine the speed.
var fr_ratio = 6;   // Turn points refresh fr/fr_ratio (times/second).
var fr_cnt = 0;

var DELTA_X  = 1;

var PIC_X = 200;
var PIC_Y = 0;
var PIC_K = 0;
var L = 20;
var W = 10;
var HALF_L = L / 2;
var HALF_W = W / 2;

function preload() {
    img = loadImage("../static/res/cloud.png");
}

function setup() {
    var div = document.getElementById("cloud");
    var myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.child(div);
    frameRate(fr);
}

function draw() {
    clear();
    if (!(fr_cnt%XDIS)) {
        addTurnPoints(turn_points);
        calculateCurve(turn_points, curve_points);
        fr_cnt = 0;
    }
    refreshPoints(curve_points);
    // console.log(curve_points.length);
    drawLines(curve_points);
    drawPic();
    fr_cnt += 1;
}

// Move all points to the left and delete the first point.
function refreshPoints(CURVE_POINTS) {

    // Move all points to the left with 1.
    for (var i = 0; i < CURVE_POINTS.length; ++i) {
        CURVE_POINTS[i]['x'] -= DELTA_X;
    }

    // Delete points that have exceeded the canvas.
    if (CURVE_POINTS[0]['x'] < 0) {
        CURVE_POINTS.splice(0, 1);
    }
}

// Draw lines between each pair of points.
function drawLines(CURVE_POINTS) {
    for (var i = 0; i < CURVE_POINTS.length - 1; ++i) {
        if (CURVE_POINTS[i]['x'] > WIDTH) break;
        if (CURVE_POINTS[i]['x'] == PIC_X) {
            PIC_Y = CURVE_POINTS[i]['y'];

            // For convenience and efficiency, also to lower the load of cpu,
            //     the calculation of k is simplified as followed.
            if (i == 0) {
                PIC_K = 0;
            } else {
                PIC_K = (CURVE_POINTS[i+1]['y'] - CURVE_POINTS[i-1]['y']) / 2; 
            }
        }
        line(CURVE_POINTS[i]['x'], CURVE_POINTS[i]['y'], 
            CURVE_POINTS[i]['x'], HEIGHT);

        // Enable this line for better picture quality.
        // line(CURVE_POINTS[i]['x'], CURVE_POINTS[i]['y'], 
            // CURVE_POINTS[i+1]['x'], CURVE_POINTS[i+1]['y']);
    }
}

function drawPic() {
    if (PIC_Y != 0) {
        theta = atan(PIC_K);
        rotate(theta);
        PIC_Y -= 30 ;
        if (PIC_K > 0) {
            translate(sqrt(PIC_X * PIC_X + PIC_Y * PIC_Y) * cos(theta - atan(PIC_Y / PIC_X)), 
                -1 * sqrt(PIC_X * PIC_X + PIC_Y * PIC_Y) * sin(theta - atan(PIC_Y / PIC_X)));
        } else {
            translate(sqrt(PIC_X * PIC_X + PIC_Y * PIC_Y) * sin(theta + atan(PIC_X / PIC_Y)), 
                sqrt(PIC_X * PIC_X + PIC_Y * PIC_Y) * cos(theta + atan(PIC_X / PIC_Y)));
        }
        image(img, -50, -50, 66, 39);
        // rect(0, 0, L, W);
        // ellipse(PIC_X, PIC_Y, rad);
        rotate(theta);
    }
}

function addTurnPoints(TURN_POINTS) {
    TURN_POINTS.push(rand(0.4*HEIGHT, 0.8*HEIGHT));
}


// Calculate points between two turn_points, with the model of y = sin(x)
function sin_func(y1, y2, i) {
    mid_y = (y1 + y2) / 2;
    dif_y = (y2 - y1) / 2;
    if (y2 - y1 == 0) {
        return mid_y - dif_y * sin(i * PI / XDIS);
    }
    if (y2 > y1) {
        return mid_y + dif_y * sin((i - 50) / XDIS * PI);
    }
    if (y2 < y1) {
        dif_y *= -1;
        return mid_y + dif_y * cos(i * PI / XDIS);
    }
}

function calculateCurve(TURN_POINTS, CURVE_POINTS) {
    len = TURN_POINTS.length;
    ly = TURN_POINTS[len - 2];
    ry = TURN_POINTS[len - 1];
    for (var i = 1; i < XDIS + 1; ++i) {
        CURVE_POINTS.push({'x':WIDTH + i, 
            'y':sin_func(ly, ry, i)});
    }
}



// Generate a random nunber within a specified range.
function rand(LOW, HIGH) {
    return (LOW + (HIGH - LOW) * Math.random());
}

// Show the log information.
function log(LOG) {
    console.log(LOG);
}