class User extends BaseClass{
    constructor(x,y,direction,sprite,spriteWidth,spriteHeight){
        super(x,y,direction,sprite,spriteWidth,spriteHeight);
    }
    shoot() {
        bullets.push(new Bullet(this.x + ( this.spriteWidth / 2),this.y  + ( this.spriteHeight / 2), this.direction));
    }
}