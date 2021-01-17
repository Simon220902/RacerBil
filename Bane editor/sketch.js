let track;
let trackWidth = 70;
let showPoints = true;
let fillTrack = false;
let placingStartingPoint = false;

function setup() {
	let canvas = createCanvas(500, 500);
	canvas.parent("canvas");
	track = new Track(trackWidth);
}

function draw() {
	background(155, 155, 155);
	fill(255, 200, 200);
	rect(trackWidth/2, trackWidth/2, width-trackWidth, height-trackWidth);
	track.draw();
}

function mousePressed(){
	if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
		track.addPoint(mouseX, mouseY);
	}
}

function keyPressed(){
	if(keyCode == BACKSPACE){
		track.removeLastPoint();
	}else if(key == 'e'){
		track.endTrack();
	}
}

function updateTrackWidth(){
	let newTrackWidth = document.getElementById('trackWidthSlider').value;
	trackWidth = newTrackWidth;
	track.width = newTrackWidth;
	document.getElementById("trackWidthValue").innerHTML = newTrackWidth;
}