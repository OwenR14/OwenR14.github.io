class Thing extends Entity{
    constructor(x, y, type, modifier){
        let hitboxes = new Array;
        super(hitboxes);
        this.xPos = x;
        this.yPos = y;
        hitboxes[0] = new Hitbox(this.xPos, this.yPos, 20);
        this.type = type;
        this.modifier = modifier;
        this.obtained = false;
    }


    draw() {
        if (this.type = "dmg"){
            c.drawImage(document.getElementById("dmgUp"),this.hitboxes[0].xPos - 20, this.hitboxes[0].yPos - 20);
        }
        else if (this.type = "health"){
            c.drawImage(document.getElementById("hp"),this.hitboxes[0].xPos - 20, this.hitboxes[0].yPos - 20);
        }
    }

    update() {
        if(!this.obtained){
            this.draw()
        }
    }
    
    applyItem(){
        if (this.type == "health"){
            player.Health += (this.modifier) 
        } 
        if (this.type == "dmg"){
            player.dmgModifier += (this.modifier / 100)
        }
    }    
}