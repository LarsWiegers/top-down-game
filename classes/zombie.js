class Zombie extends BaseClass {
    constructor(x,y,direction,sprite,spriteWidth,spriteHeight){
        super(x,y,direction,sprite,spriteWidth,spriteHeight);
    }
    moveRandom() {
        let randomDirection = parseInt(random(0,4) );
        this.direction =  randomDirection;
        switch(randomDirection) {
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
                break;
        }
    }
}