class CarSystem{
    constructor(populationSize){
        this.carControllerList = [];
        for(let i = 0; i < populationSize; i++){
            this.carControllerList.push(new CarController());
        }
    }

    updateAndDisplay(){
        this.carControllerList.forEach(carController => {
            carController.update();
            carController.display();            
        });
    }
    
}