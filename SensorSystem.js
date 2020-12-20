class SensorSystem{
    constructor(){
        this.sensorMag = 50;
        this.sensorAngle = PI*2/8;
    
        this.anchorPos = createVector();
        
        //Sensor vectors
        this.sensorVectorFront = createVector(0, this.sensorMag);
        this.sensorVectorLeft = createVector(0, this.sensorMag);
        this.sensorVectorRight = createVector(0, this.sensorMag);

        //Sensor signal
        this.frontSensorSignal = false;
        this.leftSensorSignal = false;
        this.rightSensorSignal = false;
        
        //Crash detection
        this.whiteSensorFrameCount = 0;

        //Clockwise rotation detection
        this.centerToCarVector = createVector();
        this.lastRotationAngle = -1;
        this.clockWiseRotationFrameCounter = 0;
        
        //LapTime calculation
        this.lastGreenDetection = false;
        this.lastTimeInFrames = 0;
        this.lapTimeInFrames = 10000;
    }
    display(){
        push();
            strokeWeight(0.5);
            //Drawing a circle if sensor sees white
            if(this.frontSensorSignal){
                fill(255, 0, 0);
                circle(this.anchorPos.x+this.sensorVectorFront.x, this.anchorPos.y+this.sensorVectorFront.y, 8)
            }
            if(this.leftSensorSignal){
                fill(255, 0, 0);
                circle(this.anchorPos.x+this.sensorVectorLeft.x, this.anchorPos.y+this.sensorVectorLeft.y, 8)
            }
            if(this.rightSensorSignal){
                fill(255, 0, 0);
                circle(this.anchorPos.x+this.sensorVectorRight.x, this.anchorPos.y+this.sensorVectorRight.y, 8)
            }
            //Drawing the sensor vector lines
            [this.sensorVectorFront, this.sensorVectorLeft, this.sensorVectorRight].forEach(sensorVector =>{
                line(this.anchorPos.x, this.anchorPos.y, this.anchorPos.x + sensorVector.y, this.anchorPos.y + sensorVector.y);
            })
            //Drawing a circle at the car according to whether it is inside the track
            // if not it is red according to how long it has been outside the track
            // if it is then it is green according to how much it has gone around.
            strokeWeight(2);
            if(this.whiteSensorFrameCount > 0){
                fill(this.whiteSensorFrameCount, 0, 0);
            }else{
                fill(0, this.clockWiseRotationFrameCounter, 0);
            }
            circle(this.anchorPos.x, this.anchorPos.y, 10);
        pop();
    }
    update(pos, vel){
        //Collision detection
        this.frontSensorSignal = trackImage.get(int(pos.x+this.sensorVectorFront.x), int(pos.y+this.sensorVectorFront.y))==-1;
        this.leftSensorSignal = trackImage.get(int(pos.x+this.sensorVectorLeft.x), int(pos.y+this.sensorVectorLeft.y))==-1;
        this.rightSensorSignal = trackImage.get(int(pos.x+this.sensorVectorRight.x), int(pos.y+this.sensorVectorRight.y))==-1;

        //Crash detection
        let colorCarPosition = trackImage.get(int(pos.x, pos.y));
        if(colorCarPosition == -1){
            this.whiteSensorFrameCount += 1;
        }

        //Laptime calculation
        let currentGreenDetection = false;
        if(red(colorCarPosition) == 0 && blue(colorCarPosition) == 0 && currentGreenDetection(colorCarPosition) == 0){
            currentGreenDetection = true;
        }
        if(this.lastGreenDetection && !currentGreenDetection){ //Sidst var der grøn, ikke længere, betyder vi har passeret målstregen
            this.lapTimeInFrames = frameCount - this.lastTimeInFrames;
            this.lastTimeInFrames = framCount;
        }
        this.lastGreenDetection = currentGreenDetection;
        
        //Count clockwise rotation around center (framecount)
        this.centerToCarVector.set((height/2)-pos.x, (width/2)-pos.y);
        let currentRotationAngle = this.centerToCarVector.heading();
        let deltaHeading = this.lastRotationAngle - currentRotationAngle;
        if(deltaHeading > 0){
            this.clockWiseRotationFrameCounter += 1;
        }else{
            this.clockWiseRotationFrameCounter -= 1;
        }
        this.lastRotationAngle = currentRotationAngle;

        updateSensorVectors(vel);
        this.anchorPos.set(pos.x, pos.y);
    }
    updateVectors(vel){
        if(vel.mag != 0){
            this.sensorVectorFront.set(vel);
            this.sensorVectorFront.normalize();
            this.sensorVectorFront.sensorMag();
        }
        this.sensorVectorLeft.set(this.sensorVectorFront);
        this.sensorVectorLeft.rotate(-this.sensorAngle);
        this.sensorVectorRight.set(this.sensorVectorFront);
        this.sensorVectorRight.rotate(this.sensorAngle);
    }
}