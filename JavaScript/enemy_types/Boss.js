class Boss extends Enemy{
    constructor(xPos,yPos, damage, health, type){
        super(xPos,yPos,75, 75, damage, health)
        let hitboxArr = new Array()
        hitboxArr[0] = new Hitbox(xPos + 60/2, yPos + 60/2, 60/2)
        super.setHitboxes(hitboxArr)
        this.type = type
        this.prev = 'left'
        this.timer = 250
    }

    update(){
        super.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.position.y + this.height + this.velocity.y <= canvas.height
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
        this.hitboxes[0].yPos = this.position.y + this.height/2
        if (this.type == 1){
            c.drawImage(document.getElementById('birdBoss'), this.position.x, this.position.y)
            if (super.isTouching(player) == false){
                //if the enemy is to the top right of the player
                if (this.position.x > player.position.x + player.height && this.position.y > player.position.y){
                    this.velocity.x = -4.3
                    this.velocity.y = -4.3
                //if the enemy is to the bottom right of the player
                } else if (this.position.x > player.position.x + player.height && this.position.y < player.position.y){
                    this.velocity.x = -4.3
                    this.velocity.y = 4.3
                //if the enemy is to the top left of the player
                } else if (this.position.x + this.height < player.position.x && this.position.y > player.position.y){
                    this.velocity.x = 4.3
                    this.velocity.y = -4.3
                //if the enemy is to the top left of the player 
                } else if (this.position.x + this.height < player.position.x && this.position.y < player.position.y){
                    this.velocity.x = 4.3
                    this.velocity.y = 4.3
                //if the enemy is under the player it goes up
                } else if (this.position.x + this.height == player.position.x && this.position.y < player.position.y){
                    this.velocity.y = 3
                //if the enemy is over the player, it goes down
                } else if (this.position.x == player.position.x && this.position.y > player.position.y){
                    this.velocity.y = -3
                }
            }
        } else if (this.type == 2) {
            c.drawImage(document.getElementById('ball'), this.position.x, this.position.y)
            if (super.isTouching(player) == false){
                // if the last direction he went in was right and he hits a wall, he will go up
                if(this.velocity.x == 0 && this.prev == 'right'){
                    this.velocity.y = -3.5
                    this.prev = 'up'
                //if the last direction he went in was up and he hits a wall, he will go left
                } else if (this.velocity.y == 0 && this.prev == 'up'){
                    this.velocity.x = -3.5
                    this.prev = 'left'
                //if the last direction he went in was left and he hits a wall, he will go down
                } else if (this.velocity.x == 0 && this.prev == 'left'){
                    this.velocity.y = 3.5
                    this.prev = 'down'
                //if the last direction he went in was down and he hits a wall, he will go right
                } else if (this.velocity.y == 0 && this.prev == 'down'){
                    this.velocity.x = 3.5
                    this.prev = 'right'
                } else if (this.timer == 0){
                    // if the player is to the right he goes left
                    if (this.position.x > player.position.x){
                        this.velocity.x = -5
                        this.prev = 'left'
                    // if the player is to the left he goes right 
                    } else if (this.position.x < player.position.x){
                        this.velocity.x = 5
                        this.prev = 'right'
                    } 
                    
                    this.timer = 400
                    console.log("time " + this.timer)
                } else if (this.timer > 0){
                    console.log('end')
                    this.timer--
                }
            }
        }
        this.hitboxes[0].xPos = this.position.x + this.width/2
        this.hitboxes[0].yPos = this.position.y + this.height/2
    }
}