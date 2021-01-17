class CarSystem{
    constructor(populationSize, startPos){
        //The count of how many times repopulate has been called
        this.generation = 1;
        this.populationSize = populationSize;

        this.carControllerList = [];
        for(let i = 0; i < populationSize; i++){
            let carController = new CarController(startPos);
            carController.brain.randomize();
            this.carControllerList.push(carController);
        }
        let populationBefore = 0;
        let populationAfter = 0;
        this.bestCar = this.carControllerList[0];
    }
    resituate(newStartPos){
        this.carControllerList.forEach(car=>{
            car.resituate(newStartPos);
        });
    }
    updateAndDisplay(){
        this.carControllerList.forEach(carController => {
            carController.update();
            carController.display();            
        });
    }
    discard(){
        //Discard cars that have been outside the track
        this.populationBefore = this.carControllerList.length;
        for(let i = this.carControllerList.length-1; i >= 0; i--){
			let s = this.carControllerList[i].sensorSystem;
			if(s.whiteSensorFrameCount > 0){
				this.carControllerList.splice(i, 1);
			}
        }
        this.populationAfter = this.carControllerList.length;
    }
    repopulate(){
        this.generation += 1;

        //Make the mating pool

        //Based on what criteria?
        //  - Mainly on clockWiseRotation, which says whether they move around some center point. I'll just use the absolute value as I don't currently care, which way they go around.
        //  - But also if they have a lap time, meaning they have a lap time smaller than 10000 frames, then they should be valued way more
        // Let's first sort for clockWiseRotation and then for lap time, though they may be correlated.
        //Sort by highest clockWiseRotation
        this.carControllerList.sort((carController1, carController2) => Math.abs(carController2.sensorSystem.clockWiseRotationFrameCounter) - Math.abs(carController1.sensorSystem.clockWiseRotationFrameCounter));
        //Sort by lowest lapTimeInFrames
        this.carControllerList.sort((carController1, carController2) => Math.abs(carController1.sensorSystem.lapTimeInFrames) - Math.abs(carController2.sensorSystem.lapTimeInFrames));

        //Make the new population
        //Just the top 3rd?
        if(this.carControllerList.length > 5){
            let slicingPoint = Math.abs(this.carControllerList.length / 3);
            this.carControllerList = this.carControllerList.slice(0,slicingPoint);
        } // else I'll just keep the whole bunch
        let newCarControllerList = [];
        //Add the the best of the previous generations
        newCarControllerList.push(this.carControllerList[0]);
        this.bestCar = this.carControllerList[0];
        //newCarControllerList.push(this.carControllerList[1]);
        //newCarControllerList.push(this.carControllerList[2]);
        for(let i = 3; i < this.populationSize; i++){
            let copyRandomController = this.carControllerList[Math.floor(Math.random()*this.carControllerList.length)].copy();
            //Mutate the new population
            //  - This is done by changing the weights and biases very slightly
            copyRandomController.mutate();
            newCarControllerList.push(copyRandomController);
        }

        //New population take over (if the old ones should be kept that would be here)
        this.carControllerList = newCarControllerList;

        putMessage("********DONE WITH REPOPULATING!********");
        console.log("BEST LAP-TIME: ", this.carControllerList[0].sensorSystem.lapTimeInFrames);
        }
}
/*
function deepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
}*/