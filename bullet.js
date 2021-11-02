class Bullet {
    constructor(x, y) {
      var options = {
        isStatic: true
      };
      this.r = 30;
      this.body = Bodies.circle(x, y, this.r, options);
      this.image = loadImage("Bullet.png");
      World.add(world, this.body);
    }
  
    shoot() {
      Matter.Body.setStatic(this.body, false);
      Matter.Body.setVelocity(this.body, {
          x:0, y: -3});
    }
  
    display() {
      var pos = this.body.position;
  
      push();
      imageMode(CENTER);
      image(this.image, pos.x, pos.y, this.r, this.r);
      pop();
  
      /*if (this.body.velocity.x > 0 && pos.x > 10) {
        var position = [pos.x, pos.y];
        this.trajectory.push(position);
      }
  
      for (var i = 0; i < this.trajectory.length; i++) {
        image(this.image, this.trajectory[i][0], this.trajectory[i][1], 10, 10);
      }*/
    }
  }
  