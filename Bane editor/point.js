class Point{
    constructor(x, y, num){
        this.x = x;
        this.y = y;
        this.num = num;
    }
    draw(){
        if(showPoints){
            circle(this.x, this.y, 15);
            push();
                fill(255);
                textSize(20);
                textAlign(CENTER, CENTER);
                text(this.num.toString(), this.x, this.y);
            pop();
        }
    }
    distTo(p2){
        return Math.sqrt((p2.y-this.y)**2 + (p2.x-this.x)**2); 
    }
}