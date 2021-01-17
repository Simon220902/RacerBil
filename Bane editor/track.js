//MAKE SURE THAT THE TRACK (OR ITS POINTS FOR THAT MATTER) ITSELF DOES NOT CROSS PREVIOUS LINES
class Track{
    constructor(trackWidth){
        this.points = [];
        this.innerPoints = [];
        this.outerPoints = [];
        this.width = trackWidth;
        this.ended = false;
    }
    addPoint(x, y){
        if(!this.ended){
        this.points.push(new Point(x, y, this.points.length));
        //Calculating the edges
        if(this.points.length >= 3){
            let p1 = this.points[this.points.length-3];
            let p2 = this.points[this.points.length-2];
            let p3 = this.points[this.points.length-1];

            let p2p1 = createVector(p1.x-p2.x, p1.y-p2.y);
            let p2p3 = createVector(p3.x-p2.x, p3.y-p2.y);
            p2p1.setMag(this.width/2);
            p2p3.setMag(this.width/2);

            let halfAngle = p2p1.angleBetween(p2p3) / 2;

            p2p1.rotate(halfAngle);
            p2p3.rotate(PI-halfAngle);
            let point1 = new Point(p2.x+p2p1.x, p2.y+p2p1.y, this.innerPoints.length+1); //Often time the inner point (of)
            let point2 = new Point(p2.x+p2p3.x, p2.y+p2p3.y, this.outerPoints.length+1);   

            //Should they be shifted around? only if THEY INTERSECT?
            // The below formula has been taken from this site: https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
            let dPoint1 = (point1.x-p1.x)*(p2.y-p1.y)-(point1.y-p1.y)*(p2.x-p1.x);
            //let dPoint2 = (point2.x-p1.x)*(p2.y-p1.y)-(point2.y-p1.y)*(p2.x-p1.x);
            if (dPoint1 < 0){ 
                this.innerPoints.push(point2);
                this.outerPoints.push(point1);
                console.log("OPTION1");
            }else{
                this.innerPoints.push(point1);
                this.outerPoints.push(point2);
                console.log("OPTION2");
            }
        }
        }
    }
    removeLastPoint(){
        if(this.ended){
            this.ended = false;

            this.points.pop();
            this.innerPoints.pop();
            this.outerPoints.pop();
            this.innerPoints.pop();
            this.outerPoints.pop();
        }else if(this.points.length >= 3){
            this.points.pop();
            this.innerPoints.pop();
            this.outerPoints.pop();
        }else if(this.points.length >= 1){
            this.points.pop();
        }
    }
    endTrack(){
        if(this.points.length > 2 && !this.ended){
            this.ended = true;
            let endPoints = [this.points[this.points.length-2], this.points[this.points.length-1], this.points[0], this.points[1]];
            for(let i = 1; i <= 2; i++){
                let p1 = endPoints[i-1];
                let p2 = endPoints[i];
                let p3 = endPoints[i+1];

                let p2p1 = createVector(p1.x-p2.x, p1.y-p2.y);
                let p2p3 = createVector(p3.x-p2.x, p3.y-p2.y);
                p2p1.setMag(this.width/2);
                p2p3.setMag(this.width/2);

                let halfAngle = p2p1.angleBetween(p2p3) / 2;

                p2p1.rotate(halfAngle);
                p2p3.rotate(PI-halfAngle);
                let point1 = new Point(p2.x+p2p1.x, p2.y+p2p1.y, this.innerPoints.length+1); //Often time the inner point (of)
                let point2 = new Point(p2.x+p2p3.x, p2.y+p2p3.y, this.outerPoints.length+1);   

                //Should they be shifted around? only if THEY INTERSECT?
                let dPoint1 = (point1.x-p1.x)*(p2.y-p1.y)-(point1.y-p1.y)*(p2.x-p1.x);
                //let dPoint2 = (point2.x-p1.x)*(p2.y-p1.y)-(point2.y-p1.y)*(p2.x-p1.x);
                if (dPoint1 < 0){ 
                    this.innerPoints.push(point2);
                    this.outerPoints.push(point1);
                    console.log("OPTION1");
                }else{
                    this.innerPoints.push(point1);
                    this.outerPoints.push(point2);
                    console.log("OPTION2");
                }
            }
            //The last closing point should be at the start of the other lists.
            this.innerPoints.unshift(this.innerPoints.pop());
            this.outerPoints.unshift(this.outerPoints.pop());
            this.innerPoints[0].num = 0;
            this.outerPoints[0].num = 0;
        }
    }
    draw(){
        if(fillTrack){
            this.drawDone();
        }else{
            this.drawInMaking();
        }
    }
    drawInMaking(){
        push();
            stroke(150);
            //Drawing center lines
            for(let i = 0; i < this.points.length - 1; i++){
                let p1 = this.points[i];
                let p2 = this.points[i+1];
                line(p1.x, p1.y, p2.x, p2.y);
            }
            if(this.ended){
                let p1 = this.points[this.points.length-1];
                let p2 = this.points[0];
                line(p1.x, p1.y, p2.x, p2.y);
            }
            //Drawing the center points
            fill(100);
            stroke(0);
            strokeWeight(2);
            this.points.forEach(p => {
                p.draw();
            })
            //Drawing inner points and lines
            fill(200,100,100);
            stroke(255,0,0);
            for(let i = 0; i < this.innerPoints.length - 1; i++){
                let p1 = this.innerPoints[i];
                let p2 = this.innerPoints[i+1];
                line(p1.x, p1.y, p2.x, p2.y);
            }
            if(this.ended){
                let p1 = this.innerPoints[this.innerPoints.length-1];
                let p2 = this.innerPoints[0];
                line(p1.x, p1.y, p2.x, p2.y);
            }
            this.innerPoints.forEach(p => {
                p.draw();
            })

            //Drawing outer points and lines
            fill(100,100,200);
            stroke(0,0,255);
            for(let i = 0; i < this.outerPoints.length - 1; i++){
                let p1 = this.outerPoints[i];
                let p2 = this.outerPoints[i+1];
                line(p1.x, p1.y, p2.x, p2.y);
            }
            if(this.ended){
                let p1 = this.outerPoints[this.outerPoints.length-1];
                let p2 = this.outerPoints[0];
                line(p1.x, p1.y, p2.x, p2.y);
            }
            this.outerPoints.forEach(p => {
                p.draw();
            })
        pop();
    }
    drawDone(){
        push();
            background(255);
            //Outerpoints as one large black polygon
            fill(0);
            beginShape();
            this.outerPoints.forEach(p => {
                vertex(p.x, p.y);    
            })
            endShape(CLOSE);
            
            //Innerpoints as a white polygon within the larger black one to make it seem like a road
            fill(255);
            beginShape();
            this.innerPoints.forEach(p => {
                vertex(p.x, p.y);    
            })
            endShape(CLOSE);
            //Finishing line
            stroke(0,255,0);
            strokeWeight(5);
            line(this.outerPoints[0].x, this.outerPoints[0].y, this.innerPoints[0].x, this.innerPoints[0].y);
        pop();
    }
    toJSON(){
        return JSON.stringify({"points": this.points, "innerPoints" : this.innerPoints, "outerPoints" : this.outerPoints});
    }
}