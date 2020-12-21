let populationSize = 100;
let carSystem;
let trackImage;

function setup() {
	let canvas = createCanvas(500, 500);
	canvas.parent("canvas");
	trackImage = loadImage('assets/track.png');
	carSystem = new CarSystem(populationSize);
}

function draw() {
	let minLapTime = 10000;
	let maxClockWiseRotationFrameCounter = 0;
	let minClockWiseRotationFrameCounter = 0;
	carSystem.carControllerList.forEach(carController => {
		if(carController.sensorSystem.lapTimeInFrames < minLapTime){
			minLapTime = carController.sensorSystem.lapTimeInFrames;
		}
		if(carController.sensorSystem.clockWiseRotationFrameCounter > maxClockWiseRotationFrameCounter){
			maxClockWiseRotationFrameCounter = carController.sensorSystem.clockWiseRotationFrameCounter;
		}
		else if(carController.sensorSystem.clockWiseRotationFrameCounter < minClockWiseRotationFrameCounter){
			minClockWiseRotationFrameCounter = carController.sensorSystem.clockWiseRotationFrameCounter;
		}
	});
	console.log("SMALLEST LAP TIME: ", minLapTime);
	console.log("MAX ROTATION: ", maxClockWiseRotationFrameCounter);
	console.log("MIN ROTATION: ", minClockWiseRotationFrameCounter);
	

	clear();
	image(trackImage, 0, 0);
	carSystem.updateAndDisplay();


	//Frasortering hver 200. frame

	if(frameCount%200 == 0){
		for(let i = carSystem.carControllerList.length-1; i >= 0; i--){
			let s = carSystem.carControllerList[i].sensorSystem;
			if(s.whiteSensorFrameCount > 0){
				carSystem.carControllerList.splice(i, 1);
			}
		}
	}

}