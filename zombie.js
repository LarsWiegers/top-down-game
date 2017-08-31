function Zombie() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 48;
    this.speed = 2;
    this.color = color(20,20,20);
    this.sprite = loadImage("images/zombie.png");
    this.spriteWidth = 32;
    this.spriteHeight = 48;
    this.spritePosition = 0;
    this.direction = parseInt( random(0,4) );
    this.moveLeft = function() {
        this.x -= this.speed;
    };
    this.moveRight = function() {
        this.x += this.speed;
    };
    this.moveUp = function() {
        this.y -= this.speed;
    };
    this.moveDown = function() {
        this.y += this.speed;
    };
    this.checkPosition = function() {
        if(this.x < this.diameter) {
            this.x = this.diameter;
        }
        if(this.x > (width - this.diameter ) ) {
            this.x = (width - this.diameter );
        }
        if(this.y < ( this.diameter ) ) {
            this.y = this.diameter;
        }
        if(this.y > (height - this.diameter ) ) {
            this.y = (height - this.diameter );
        }
    }
    this.move = function() {
        if( tick % 32 === 0 )  {
            this.direction = parseInt( random(0,4) );
        }
        switch(this.direction) {
            case 0 :
                this.moveDown();
                break;
            case 1 :
                this.moveLeft();
                break;
            case 2 :
                this.moveRight();
                break;
            case 3 :
                this.moveUp();
                break;

        }
    };
    this.display = function() {
        if( tick % 8 === 0 )  {
            this.updateSpritePosition();
        }
        image(this.sprite,this.x,this.y,32,48,(this.spritePosition * this.spriteWidth),(this.direction * this.spriteHeight),this.spriteWidth,this.spriteHeight);
    }
    this.updateSpritePosition = function() {
        this.spritePosition++;
        if(this.spritePosition > 3) {
            this.spritePosition = 0;
        }
    }
}