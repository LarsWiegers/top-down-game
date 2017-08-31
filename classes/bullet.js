class Bullet extends BaseClass {

    constructor(x,y,direction) {
        super(x,y,direction);
        this.diameter = 20;
        this.speed = 5;
    }
    display() {
        fill(51);

        switch(this.direction) {
            case 0:
            case 3:
                rect(this.pos.x, this.pos.y, this.diameter / 3, this.diameter);
                break;
            case 1:
            case 2:
                rect(this.pos.x, this.pos.y, this.diameter, this.diameter / 3);
                break;
        }
    }
    move() {
        switch(this.direction) {
            case 0:
                this.moveDown();
                break;
            case 1:
                this.moveLeft();
                break;
            case 2:
                this.moveRight();
                break;
            case 3:
                this.moveUp();
        }
    }
    stillOnScreen() {
        if(this.pos.x < 0 || this.pos.x > window.innerWidth) {
           return false;
        } else if(this.pos.y < 0 || this.pos.y > window.innerHeight) {
            return false;
        }
        return true;
    }
    checkForImpact(Zombies) {
        const self = this;
        for(let i = 0; i < Zombies.length ; i++) {
            if(
                self.pos.x-(self.diameter/2 )>zombies[i].pos.x &&
                self.pos.x+(self.diameter/2 )<zombies[i].pos.x+zombies[i].spriteWidth &&
                self.pos.y-(self.diameter/2 )>zombies[i].pos.y &&
                self.pos.y+(self.diameter/2 )<zombies[i].pos.y+zombies[i].spriteHeight
            ){
                zombies.splice(i,1);
                return true;
            }
        }
        return false;
    }

}