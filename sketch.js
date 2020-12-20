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


	//Sortering

	if(frameCount%200 == 0){
		for(let i = carSystem.carControllerList.length-1; i >= 0; i--){
			let s = carSystem.carControllerList[i].sensorSystem;
			if(s.whiteSensorFrameCount > 0){
				carSystem.carControllerList.splice(i, 1);
			}
		}
	}

}