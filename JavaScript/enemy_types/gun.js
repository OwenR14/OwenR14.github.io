class Gun extends Enemy{
    constructor(xPos,yPos, damage, health, gunDamage){
        super(xPos,yPos, 30, 60, damage, health)
        this.gunBullet = new Bullet(-50, -50, 0, 0, null, 0, 0)
        this.bulletCooldown = Math.floor(Math.random()*180)+90
        this.gunDamage = gunDamage
    }
    update(){
        super.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.position.y + this.height + this.velocity.y <= canvas.height
        this.velocity.y += gravity
        for (let y = 0; y < currentRoom.doorArr.length; y++){
            if (super.isTouching(currentRoom.doorArr[y])){
                this.velocity.y = 0
            }
        }
        // Platform collision detection for enemy
        for (let x = 0; x < currentRoom.platformArr.length; x++){
            if (this.position.y + this.height <= currentRoom.platformArr[x].position.y
                && this.position.y + this.height + this.velocity.y >= currentRoom.platformArr[x].position.y 
                && this.position.x + this.width >= currentRoom.platformArr[x].position.x 
                && this.position.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width 
                && this.position.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height) {
        
                this.velocity.y = 0
                this.yPos = currentRoom.platformArr[x].position.y - this.height
                this.jumpsUsed = 0
                this.onGround = true
            }
            //else if is broken and takes away jump if you bunny hop
            else if (this.position.y + this.height >= currentRoom.platformArr[x].position.y - 50
                && this.position.y + this.height <= currentRoom.platformArr[x].position.y + 50
                && this.onGround){
                this.onGround = false
                //player.jumpsUsed = 1
            }
            if (!currentRoom.platformArr[x].passable
                && this.position.y >= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && this.position.y + this.velocity.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && this.position.x + this.width >= currentRoom.platformArr[x].position.x 
                && this.position.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width){
                this.velocity.y = 0
                this.yPos = currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                }
            if (!currentRoom.platformArr[x].passable
                && this.position.x + this.width <= currentRoom.platformArr[x].position.x
                && this.position.x + this.width + this.velocity.x >= currentRoom.platformArr[x].position.x
                && this.position.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && this.position.y + this.height >= currentRoom.platformArr[x].position.y){
                this.velocity.x = 0
                this.xPos = currentRoom.platformArr[x].position.x - this.width
            }
            if (!currentRoom.platformArr[x].passable
                && this.position.x >= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
                && this.position.x + this.velocity.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
                && this.position.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && this.position.y + this.height >= currentRoom.platformArr[x].position.y ){
                this.velocity.x = 0
                this.xPos = currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
            }
        }
        this.hitboxes[0].xPos = this.position.x + this.width/2
        this.hitboxes[1].xPos = this.position.x + this.width/2
        this.hitboxes[0].yPos = this.position.y + this.height/4
        this.hitboxes[1].yPos = this.position.y + this.height*3/4
            let xAng = 0
            if (player.position.x<this.position.x){c.drawImage(document.getElementById("gunPointed"), this.position.x, this.position.y)
            xAng = 7}
            else{c.drawImage(document.getElementById("gunPointedRight"), this.position.x, this.position.y) 
            xAng = 21}
            c.save()
            c.translate(this.position.x + xAng, this.position.y+26)
            let angle = Math.atan((player.position.y-this.position.y+25)/(player.position.x+15-this.position.x-10))
            c.rotate(angle)
            c.translate(-(this.position.x), -(this.position.y+26))
            if (player.position.x<this.position.x){c.drawImage(document.getElementById("blunderbuss"), this.position.x-10, this.position.y+20)}
            else{c.drawImage(document.getElementById("blunderbussRight"), this.position.x-15, this.position.y+20)}
            c.restore()
            if (this.bulletCooldown > 0){
                this.bulletCooldown = this.bulletCooldown-1
            }
            else if(this.bulletCooldown == 0){
                if(player.position.x>this.position.x){angle = Math.PI+angle}
                this.gunBullet = new Bullet(this.position.x+xAng, this.position.y+26, 10, Math.PI-angle, currentRoom, this.gunDamage, 10, "enemy")
                this.bulletCooldown = 180
            }
            this.gunBullet.update()
    }
}