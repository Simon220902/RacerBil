class CarController{
    constructor(){
        this.variance = 2;
        this.car = new Car();
        this.brain = new NeuralNetwork();
        this.sensorSystem = new SensorSystem();
    }

    update(){
        //1. opdaterer bil
        this.car.update();
        
        //2. opdaterer sensorer
        this.sensorSystem.update();
        
        //3. hjernen beregner hvor meget der skal drejes
        let turnAngle = 0;
        let x1 = sensorSystem.leftSensorSignal();
        let x2 = sensorSystem.frontSensorSignal();
        let x3 = sensorSystem.rightSensorSignal();
        turnAngle = this.brain.getOutput(x1, x2, x3);

        //4. bilen drejes
        this.car.turn(turnAngle);
    }

    display(){
        this.car.display();
        this.sensorSystem.display();
    } 
}