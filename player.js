class Player {
    constructor(x,y){
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.rectangle(x, y, 50, 180, options);
        this.width = 200;
        this.height = 200;
        this.image = loadImage("images/shooter.png");
        World.add(world, this.body);
    }
    display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
   xPosPlayer(){
       return this.body.position.x
   } 
   yPosPlayer(){
    return this.body.position.y
    } 
}