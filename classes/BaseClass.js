class BaseClass {
    constructor(x,y,direction,sprite,spriteWidth,spriteHeight) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.direction = direction;
        this.sprite = sprite;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spritePosition = 0;

    }
    displaySprite() {

        if(this.sprite === null) {
            console.log("voeg een sprite toe om dit te laten werken")
        }
        image(this.sprite,this.x,this.y,32,48,(this.spritePosition * this.spriteWidth),(this.direction * this.spriteHeight),    this.spriteWidth,this.spriteHeight);
    };
    updateSpritePosition() {
        this.spritePosition++;
        if(this.spritePosition > 3) {
            this.spritePosition = 0;
        }
    }
    moveLeft() {
        this.x -= this.speed;
        this.direction = 1;
    };
    moveRight() {
        this.x += this.speed;
        this.direction = 2;
    };
    moveUp() {
        this.y -= this.speed;
        this.direction = 3;
    };
    moveDown() {
        this.y += this.speed;
        this.direction = 0;
    };
}