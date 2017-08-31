class User extends BaseClass{
    constructor(x,y,direction,sprite,spriteWidth,spriteHeight){
        super(x,y,direction,sprite,spriteWidth,spriteHeight);
        this.diameter = 40;
        this.defaultGun = new Gun();
        this.gun = this.defaultGun;
    }
    shoot() {
        this.gun.shoot(this.pos, this.spriteWidth , this.spriteHeight, this.direction);
    }
    reload() {
        this.gun.reload();
    }
    pickUpGun(AllGuns) {
        const self = this;
        AllGuns.forEach(function(item,index){
            if(
                item.pos.x-(item.diameter/2 )>self.pos.x &&
                item.pos.x+(item.diameter/2 )<self.pos.x+self.spriteWidth &&
                item.pos.y-(item.diameter/2 )>self.pos.y &&
                item.pos.y+(item.diameter/2 )<self.pos.y+self.spriteHeight
            ){
               this.gun = item;
            }
        });
    }
}