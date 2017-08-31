function User() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 20;
    this.speed = 2;
    this.color = color(100, 20, 240);
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
    this.display = function() {

        fill(this.color);
        ellipse(this.x,this.y,this.diameter,this.diameter);
    }
}