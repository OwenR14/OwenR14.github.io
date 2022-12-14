class Enemy extends Entity{
    constructor(xPos,yPos,width,height, damage, health) {
        let hitboxes = new Array()
        //hitboxes[0] = new Hitbox((xPos+width/2), (yPos+height/4), (width/2))
        //hitboxes[1] = new Hitbox((xPos+width/2), (yPos+height*3/4), (width/2))
        for (let x = 0; x < Math.ceil(height/width); x++){
            hitboxes.push(new Hitbox(xPos+width/2, yPos+height*x/(Math.ceil(height/width)), width/2))
        }
        super(hitboxes)
        this.position = {
            x: xPos,
            y: yPos,
        }
        this.velocity = {
            x:0,
            y:0,
        }
        this.health = health
        this.maxHealth = health
        this.damage = damage
        this.width = width
        this.height = height
        this.jumpsUsed = 1
        this.onGround = true
    }
    setHitboxes(hitboxes){
        this.hitboxes = hitboxes
    }

    draw() {
        /*for (let x = 0; x < this.hitboxes.length; x++){
            c.fillStyle = 'red'
            c.beginPath()
            c.arc(this.hitboxes[x].xPos, this.hitboxes[x].yPos, this.hitboxes[x].radius, 0, 2*Math.PI, false)
            c.fill()
        }*/
        c.fillStyle = 'white'
        c.fillRect(this.position.x-(25-this.width/2), this.position.y -20, 50, 8)
        c.fillStyle = 'red'
        c.fillRect(this.position.x-(25-this.width/2), this.position.y -20, Math.floor(50 * (this.health/this.maxHealth)), 8)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
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
    }
}