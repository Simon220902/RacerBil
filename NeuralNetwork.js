//PROBLEM IN COPYING
class NeuralNetwork{
    constructor(variance, mutationAmount){
        this.variance = variance;
        this.mutationAmount = mutationAmount; // in fraction which also relies on the variance
        this.weights = new Array(8).fill(0);
        this.biases = new Array(3).fill(0);
    }

    randomize(){
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = randomNumber(-this.variance, this.variance);
        }
        for(let i = 0; i < this.biases.length; i++){
            this.biases[i] = randomNumber(-this.variance, this.variance);
        }
    }

    getOutput(x1, x2, x3){
        //Lag 1
        let o11 = this.weights[0]*x1 + this.weights[1]*x2 + this.weights[2]*x3 + this.biases[0];
        let o12 = this.weights[3]*x1 + this.weights[4]*x2 + this.weights[5]*x3 + this.biases[1];
        //Lag 2
        return o11*this.weights[6] + o12*this.weights[7] + this.biases[2];
    }

    mutate(){
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = this.mutateSpecific(this.weights[i]);
        }
        for(let i = 0; i < this.biases.length; i++){
            this.biases[i] = this.mutateSpecific(this.biases[i]);
        }
    }

    mutateSpecific(num){
        return Math.max(-this.variance, Math.min(this.variance, num+randomNumber(-this.variance*this.mutationAmount, this.variance*this.mutationAmount)));
    }

    copy(){
        let copyNetwork = new NeuralNetwork(this.variance, this.mutationAmount);
        copyNetwork.weights = JSON.parse(JSON.stringify(this.weights)); //These are not literals but objects!!!!! they should probably be copied directly with the json thing
        copyNetwork.biases  = JSON.parse(JSON.stringify(this.biases));
        return copyNetwork;
    }
}

function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
}