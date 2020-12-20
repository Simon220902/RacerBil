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
            
        });
        //Tegner til sidst for at sensorerne ikke ser andre biler
        //JEG VIL GØRE DET SÅDAN AT DEN KUN TILGÅR BILLEDET.
        this.carControllerList.forEach(carController => {
            carController.display();
            
        });
    }
    
}