class Player extends Entity{
    constructor() {
        let hitboxes = new Array()
        hitboxes[0] = new Hitbox(55, 665, 15)
        hitboxes[1] = new Hitbox(85, 665, 15)
        hitboxes[2] = new Hitbox(100, 100, 15)
        super(hitboxes)
        this.position = {
            x: 100,
            y: canvas.height-123,
        }
        this.velocity = {
            x:0,
            y:0,
        }
        this.enemyIframe = 0
        this.Health = 100
        this.dmgModifier = 1
        this.width = 40
        this.height = 90
        this.MaxHealth = 100
        this.jumpsUsed = 1
        this.onGround = true
        this.doorI = false
        this.orientation = "playerRight"
    }
    endDoorIFrames(){
        this.doorI = false
    }

    draw() {
        //c.fillRect(this.hitboxes[1].xPos, this.hitboxes[1].yPos, this.hitboxes[1].radius, this.hitboxes[1].radius)
        /*c.fillStyle = 'red'
        c.beginPath()
        c.arc(this.hitboxes[0].xPos, this.hitboxes[0].yPos, this.hitboxes[0].radius, 0, 2*Math.PI, false)
        c.fill()
        c.fillStyle = 'yellow'
        c.beginPath()
        c.arc(this.hitboxes[1].xPos, this.hitboxes[1].yPos, this.hitboxes[1].radius, 0, 2*Math.PI, false)
        c.fill()
        c.fillStyle = 'green'
        c.beginPath()
        c.arc(this.hitboxes[2].xPos, this.hitboxes[2].yPos, this.hitboxes[2].radius, 0, 2*Math.PI, false)
        c.fill()*/
        c.drawImage(document.getElementById(this.orientation), this.position.x-5, this.position.y-5)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
        this.hitboxes[0].xPos = this.position.x+15
        this.hitboxes[1].xPos = this.position.x+15
        this.hitboxes[2].xPos = this.position.x+15
        this.hitboxes[0].yPos = this.position.y+15
        this.hitboxes[1].yPos = this.position.y+45
        this.hitboxes[2].yPos = this.position.y+75
        //Temp momentum code that no bug
        if (this.velocity.x > 0){
            this.velocity.x -= 1
        }
        if (this.velocity.x < 0){
            this.velocity.x += 1
        }
        //Momentum code
        /*if (this.velocity.x != 0){
            if (this.velocity.x > 0){
                if (this.onGround){this.velocity.x -= 2}
                else{this.velocity.x -= .08}
            }
            if (this.velocity.x < 0){
                if(!this.onGround){this.velocity.x += .08}
                else{this.velocity.x+=1}
            }
        }*/
        if(-1 <= this.velocity.x && this.velocity.x <= 1){
            this.velocity.x = 0
        }
        //reload timer on weapons
        if(currentWeapon != null){
            //c.fillStyle = 'black'
            //c.fillRect(player.position.x -10, player.position.y - 20, 50, 8)
            c.fillStyle = 'white'
            c.fillRect(player.position.x -10, player.position.y - 20, Math.floor(50 * currentWeapon.atkSpd/currentWeapon.atkSpdDefault), 8)
        }
    }
    goThroughDoor(door){
        if (door === "up"){
            let goto = roomArr[currentRoomValues[0]][currentRoomValues[1]-1].map.string.search("d")
            player.position.y = Math.floor(goto/59-3)*32
            player.position.x = ((goto%59)+2) * 32
            player.velocity.y = -10
        }
        else if (door === "down"){
            let goto = roomArr[currentRoomValues[0]][currentRoomValues[1]+1].map.string.search("u")
            player.position.y = Math.floor(goto/59+2)*32
            player.position.x = ((goto%59)+2) * 32
        }
        else if (door === "right"){
            let goto = roomArr[currentRoomValues[0]+1][currentRoomValues[1]].map.string.search("l")
            player.position.y = Math.floor(goto/59+1)*32
            player.position.x = ((goto%59+1)) * 32
        }
        else if (door === "left"){
            let goto = roomArr[currentRoomValues[0]-1][currentRoomValues[1]].map.string.search("r")
            player.position.y = Math.floor(goto/59+1)*32
            player.position.x = ((goto%59)-1) * 32
        }
    }
}