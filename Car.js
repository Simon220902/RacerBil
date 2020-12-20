class Car{
    constructor(){
        this.pos = createVector(60, 232);
        this.vel = createVector(0, 5);
    }

    turn(turnAngle){
        this.vel.rotate(turnAngle);
    }
    display(){
        push();
            stroke(100);
            fill(100);
            ellipse(this.pos.x, this.pos.y, 10, 10);
        pop();
    }
    update(){
        this.pos.add(this.vel);
    }
}