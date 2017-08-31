class Gun {
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.max_ammo = 6;
        this.ammo = this.max_ammo;
        this.reload_delay = 750;
        this.diameter = 20;
    }
    shoot(pos, width , height , direction ) {
        if(this.ammo > 0) {
            this.ammo -= 1;
            bullets.push(new Bullet(pos.x + ( width / 2),pos.y  + ( height / 2), direction ));
        }
    }
    display() {
        noStroke();
        rect(this.pos.x,this.pos.y,10,20);
        rect(this.pos.x,this.pos.y,30,10);
    }
    pickUp(user){
            const self = this;
            for(let i = 0; i < 1 ; i++) {
                if(
                    self.pos.x-(self.diameter/2 )>user.pos.x &&
                    self.pos.x+(self.diameter/2 )<user.pos.x+user.spriteWidth &&
                    self.pos.y-(self.diameter/2 )>user.pos.y &&
                    self.pos.y+(self.diameter/2 )<user.pos.y+user.spriteHeight
                ){
                    return true;
                }
            }
            return false;
    }
    reload() {
        let self = this;
        setTimeout(function(){
            self.ammo = self.max_ammo;
        },this.reload_delay);
    }
}