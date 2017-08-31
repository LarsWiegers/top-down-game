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
                rect(this.x, this.y, this.diameter / 3, this.diameter);
                break;
            case 1:
            case 2:
                rect(this.x, this.y, this.diameter, this.diameter / 3);
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
        if(this.x < 0 || this.x > window.innerWidth) {
           return false;
        } else if(this.y < 0 || this.y > window.innerHeight) {
            return false;
        }
        return true;
    }
    checkForImpact(Zombies) {
        const self = this;
        for(let i = 0; i < Zombies.length ; i++) {
            if(
                self.x-(self.diameter/2 )>zombies[i].x &&
                self.x+(self.diameter/2 )<zombies[i].x+zombies[i].spriteWidth &&
                self.y-(self.diameter/2 )>zombies[i].y &&
                self.y+(self.diameter/2 )<zombies[i].y+zombies[i].spriteHeight
            ){
                zombies.splice(i,1);
                return true;
            }
        }
        return false;
    }

}