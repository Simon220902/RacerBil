let buffer;
function setup() {
	let canvas = createCanvas(500, 500);
	canvas.parent("canvas");

	buffer = createGraphics(500,500);
	buffer.background(122);
	buffer.fill(255, 0, 0);
	buffer.beginShape();
	vertex(250,100);
	vertex(100, 400);
	vertex(400, 400);
	buffer.endShape(CLOSE);
	
}

function draw() {
	background(0);
	image(buffer,0,0);
}