//------------------------------------------------------
// Author: Terry Zhang (Zhang zong pu)
// E-mail: sjtuzzp@foxmail.com
// 
// All rights reserved.
//
//------------------------------------------------------

var WIDTH  = window.innerWidth;     // As wide as the whole page.
var HEIGHT = 300;                   // The height of canvas.
var turn_points = [HEIGHT * 3 / 4]; // Save all turn points.
var XDIS   = 100;                   // How many points between two turn points.
var curve_points = [];              // Save all points on the screen.
var fr = 50;                        // The frame rate will determine the speed.
var fr_ratio = 6;                   // Turn points refresh fr/fr_ratio (times/second).
var fr_cnt = 0;                     // Count the frame, should be replaced with frame_count() function (If existed).
var DELTA_X  = 1;                   // Move 1px once a loop.
var pictures = [];                  // Save all pictures going to be shown
var cnt_people = 3;                 // Three people, chasing the cloud.


// The 'class' to hold pictures.
function Picture(img, x = 200, y = 0, s_x = 0, s_y = 0, delta = -80, delta_y = 10) {
    this.x = x;             // The x-position of the pic, constant.
    this.y = y;             // The start-y of the pic, should always be initialized with 0.
    this.k = 0;             // The gradient of the pic.
    this.img = img;         // The picture object, use loadImage() to initialize.
    this.s_x = s_x;
    this.s_y = s_y;
    this.delta_y = delta_y;
    this.delta = delta;

    this.draw = function() {
        if (this.y != 0) {
            theta = atan(this.k);
            rotate(theta);
            this.y -= this.delta_y ;
            sum_sqrt = sqrt(this.x * this.x + this.y * this.y);
            para_a = sum_sqrt * cos(theta - atan(this.y / this.x));
            para_b = -1 * sum_sqrt * sin(theta - atan(this.y / this.x));
            para_c = sum_sqrt * sin(theta + atan(this.x / this.y));
            para_d = sum_sqrt * cos(theta + atan(this.x / this.y));

            if (this.y > 0) {
                translate(para_a, para_b);
                image(this.img, this.delta, this.delta, this.s_x, this.s_y);
                translate(-1 * para_a, -1 * para_b);
            } else {
                translate(para_c, para_d);
                image(this.img, this.delta, this.delta, this.s_x, this.s_y);
                translate(-1 * para_c, -1 * para_d);
            }
            // rect(0, 0, L, W);
            // ellipse(PIC_X, PIC_Y, rad);
            rotate(-1 * theta);
        } else {
            return ;
        }
    }

}

function preload() {
    img = loadImage("../static/res/cloud.png");
    img_peo = loadImage("../static/res/people.png");
}

function setup() {
    frameRate(fr);

    // Add the canvas to index page.
    var div = document.getElementById("cloud");
    var myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.child(div);
    myCanvas.position(0, window.innerHeight - HEIGHT);

    // Add all pictures.
    for (var i = 0; i < cnt_people; ++i) {
        pictures[i] = new Picture(img_peo, 0, 0, 30, 26, -30, 0);
    }
    pictures[0].x = 200;
    pictures[1].x = 230;
    pictures[2].x = 260;
    pictures[3] = new Picture(img, 400, 0, 66, 39);

    console.log("Setup finished.");
}

function draw() {
    // console.log(fr_cnt);
    clear();
    if (!(fr_cnt%XDIS)) {
        // No new points left, one turn point shoule be added.
        addTurnPoints(turn_points);
        calculateCurve(turn_points, curve_points);
        fr_cnt = 0;
    }
    refreshPoints(curve_points);
    // console.log(curve_points.length);
    drawLines(curve_points);

    // Draw all pictures.
    for (var i = 0; i < pictures.length; ++i) {
        pictures[i].draw();
    }
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
        for (var k = 0; k < pictures.length; ++k) {
            if (CURVE_POINTS[i]['x'] == pictures[k].x) {
                // Save the basic y position of the picture.
                pictures[k].y = CURVE_POINTS[i]['y'];

                // For convenience and efficiency, also to lower the load of cpu,
                //     the calculation of k is simplified as followed.
                if (i == 0) {
                    pictures[k].k = 0;
                } else {
                    pictures[k].k = (CURVE_POINTS[i+1]['y'] - CURVE_POINTS[i-1]['y']) / 2; 
                }
            }
        }
        line(CURVE_POINTS[i]['x'], CURVE_POINTS[i]['y'], 
            CURVE_POINTS[i]['x'], HEIGHT);

        // Enable this line for better picture quality.
        // line(CURVE_POINTS[i]['x'], CURVE_POINTS[i]['y'], 
        // CURVE_POINTS[i+1]['x'], CURVE_POINTS[i+1]['y']);
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

// Calculate all curve points.
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