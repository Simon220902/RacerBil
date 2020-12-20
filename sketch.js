 let populationSize = 100;
 let trackImage;

function setup() {
	createCanvas(500, 500);
	trackImage = loadImage('assets/track.png');
}

function draw() {
	background(255);
	image(trackImage, 0, 0);
	fill(255, 0, 0);
	circle(width/2, height/2, width/4);
}