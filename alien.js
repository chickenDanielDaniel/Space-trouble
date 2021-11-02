class Alien{
    constructor(x,y,w,h,alienPos){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        var ailen_options={
            density:0.01
        }
        this.body = Bodies.rectangle(x,y,width,height,ailen_options);
        World.add(world,this.body);
        
        this.image = loadImage("images.jpeg");
        this.alienPosition = alienPos;
    }
    display(){
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        imageMode(CENTER);
        image(this.image,this.alienPosition,0,this.width, this.height);
        pop();
  }
    
}