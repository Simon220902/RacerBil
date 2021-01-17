let populationSize = 100;
let carSystem;
let trackImage;
let track;


function setup() {
	let canvas = createCanvas(500, 500);
	canvas.parent("canvas");
	newTrack();
}
function newTrack(){
	track = new Track(document.getElementById("JSON-input").value);
	trackImage = track.trackImage;
	carSystem = new CarSystem(populationSize, track.startingPosition);
}

function draw() {
	let minLapTime = 10000;
	let maxClockWiseRotationFrameCounter = 0;
	let minClockWiseRotationFrameCounter = 0;
	let actualMin = 100;
	carSystem.carControllerList.forEach(carController => {
		if(carController.sensorSystem.lapTimeInFrames < minLapTime){
			minLapTime = carController.sensorSystem.lapTimeInFrames;
		}
		let rot = carController.sensorSystem.clockWiseRotationFrameCounter;
		if(rot > maxClockWiseRotationFrameCounter){
			maxClockWiseRotationFrameCounter = rot;
		}
		else if(rot < minClockWiseRotationFrameCounter){
			minClockWiseRotationFrameCounter = rot;
		}
		if(Math.abs(rot) < actualMin){
			actualMin = Math.abs(rot);
		}
	});
/*	console.log("SMALLEST LAP TIME: ", minLapTime);
	console.log("MAX ROTATION: ", maxClockWiseRotationFrameCounter);
	console.log("MIN ROTATION: ", minClockWiseRotationFrameCounter);
	console.log("ACTUAL MIN: ", actualMin);
*/
	

	clear();
	image(trackImage, 0, 0);
	carSystem.updateAndDisplay();


	//Frasortering hver 200. frame
	//Det burde nok være hver 10000 frame ift. at de på et tidspunkt også skal kunne køre rundt.
	if(frameCount%500 == 0){
		carSystem.discard();
		console.log("BEFORE: ", carSystem.populationBefore);
		console.log("AFTER: ", carSystem.populationAfter);
		
		// Hvis der ikke frasorteres mere end 1/5 laver vi en ny populations?
		if(carSystem.populationAfter > carSystem.populationBefore * 0.80){
			console.log("========================");
			console.log("REPOPULATING");
			console.log("========================");
			carSystem.repopulate();
		}
	}

}