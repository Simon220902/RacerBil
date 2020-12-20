class CarController{
    constructor(){
        this.variance = 2;
        this.car = new Car();
        this.brain = new NeuralNetwork(this.variance);
        this.sensorSystem = new SensorSystem();
    }

    update(){
        //1. opdaterer bil
        this.car.update();
        
        //2. opdaterer sensorer
        this.sensorSystem.update(this.car.pos, this.car.vel);
        
        //3. hjernen beregner hvor meget der skal drejes
        let x1 = this.sensorSystem.leftSensorSignal;
        let x2 = this.sensorSystem.frontSensorSignal;
        let x3 = this.sensorSystem.rightSensorSignal;
        let turnAngle = this.brain.getOutput(x1, x2, x3);

        //4. bilen drejes
        this.car.turn(turnAngle);
    }

    display(){
        this.car.display();
        this.sensorSystem.display();
    } 
}