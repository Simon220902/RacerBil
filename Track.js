class Track{
    constructor(json){
        let parsedJSON = JSON.parse(json);
        this.points = parsedJSON.points;
        this.innerPoints =  parsedJSON.innerPoints;
        this.outerPoints = parsedJSON.outerPoints;
        this.startingPosition = {"x":this.points[Math.floor(this.points.length/2)].x, "y":this.points[Math.floor(this.points.length/2)].y};
        this.trackImage = createGraphics(width, height);
        this.renderTrack(); //Renders the track on the trackImage
    }
    renderTrack(){
        this.trackImage.background(255);
        //Outerpoints as one large black polygon
        this.trackImage.fill(0);
        this.trackImage.beginShape();
        this.outerPoints.forEach(p => {
            this.trackImage.vertex(p.x, p.y);    
        })
        this.trackImage.endShape(CLOSE);
        
        //Innerpoints as a white polygon within the larger black one to make it seem like a road
        this.trackImage.fill(255);
        this.trackImage. beginShape();
        this.innerPoints.forEach(p => {
            this.trackImage.vertex(p.x, p.y);    
        })
        this.trackImage.endShape(CLOSE);
        //Finishing line
        this.trackImage.stroke(0,255,0);
        this.trackImage.strokeWeight(5);
        this.trackImage.line(this.outerPoints[0].x, this.outerPoints[0].y, this.innerPoints[0].x, this.innerPoints[0].y);
    }
}