let populationSize = 100;
let carSystem;
let trackImage;

function setup() {
	createCanvas(500, 500);
	trackImage = loadImage('assets/track.png');
	carSystem = new CarSystem(populationSize);
}

function draw() {
	clear();
	image(trackImage, 0, 0);
	carSystem.updateAndDisplay();
}