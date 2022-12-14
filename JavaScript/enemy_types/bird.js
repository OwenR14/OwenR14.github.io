class Bird extends Enemy{
    constructor(xPos,yPos, damage, health){
        super(xPos,yPos,60, 60, damage, health)
        let hitboxArr = new Array()
        hitboxArr[0] = new Hitbox(xPos + 60/2, yPos + 60/2, 60/2)
        super.setHitboxes(hitboxArr)
    }
    update(){
        super.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.position.y + this.height + this.velocity.y <= canvas.height
        // Platform collision detection for enemy
        if(super.isTouching(player) == false){
            if (this.position.x > player.position.x + player.height && this.position.y > player.position.y){
                this.velocity.x = -3
                this.velocity.y = -4
            } else if (this.position.x > player.position.x + player.height && this.position.y < player.position.y){
                this.velocity.x = -3
                this.velocity.y = 4
            } else if (this.position.x + this.height < player.position.x && this.position.y > player.position.y){
                this.velocity.x = 3
                this.velocity.y = -4
            } else if (this.position.x + this.height < player.position.x && this.position.y < player.position.y){
                this.velocity.x = 3
                this.velocity.y = 4
            }
        }
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
        this.hitboxes[0].yPos = this.position.y + this.height/2
        
        c.drawImage(document.getElementById("bird"), this.position.x, this.position.y)
    }
}