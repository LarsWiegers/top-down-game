class MachineGun extends Gun {
    constructor(x,y) {
        super(x,y);
        this.max_ammo = 30;
        this.ammo = this.max_ammo;
        this.reload_delay = 750;

    }
    shoot(pos, width , height , direction ) {
        if(this.ammo > 0) {
            this.ammo -= 1;
            switch(direction) {
                case 0:
                case 3:
                    bullets.push(new Bullet(pos.x + ( width / 2),pos.y  + ( height), direction ));
                    bullets.push(new Bullet(pos.x + ( width / 2),pos.y  , direction ));
                    bullets.push(new Bullet(pos.x + ( width / 2),pos.y  - ( height ), direction ));
                    break;
                case 1:
                case 2:
                    bullets.push(new Bullet(pos.x + width,pos.y  + ( height / 2), direction ));
                    bullets.push(new Bullet(pos.x ,pos.y  + ( height / 2), direction ));
                    bullets.push(new Bullet(pos.x - width,pos.y  + ( height / 2), direction ));
                    break;
            }
        }

    }
    reload() {
        let self = this;
        setTimeout(function(){
            self.ammo = self.max_ammo;
        },this.reload_delay);
    }
}