class NeuralNetwork{
    constructor(variance){
        this.weights = new Array(8).fill(0);
        this.biases = new Array(3).fill(0);

        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = randomNumber(-variance, variance);
        }
        for(let i = 0; i < this.biases.length; i++){
            this.biases[i] = randomNumber(-variance, variance);
        }
    }

    getOutput(x1, x2, x3){
        //Lag 1
        let o11 = this.weights[0]*x1 + this.weights[1]*x2 + this.weights[2]*x3 + this.biases[0];
        let o12 = this.weights[3]*x1 + this.weights[4]*x2 + this.weights[5]*x3 + this.biases[1];
        //Lag 2
        return o11*this.weights[6] + o12*this.weights[7] + this.biases[2];
    }
}

function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
}