class Car{
    constructor(startX, startY){
        this.pos = createVector(startX, startY);
        this.vel = createVector(0, 5);
    }

    turn(turnAngle){
        this.vel.rotate(turnAngle);
    }
    display(){
        push();
            stroke(100);
            fill(100);
            circle(this.pos.x, this.pos.y, 10);
        pop();
    }
    update(){
        this.pos.add(this.vel);
    }
}