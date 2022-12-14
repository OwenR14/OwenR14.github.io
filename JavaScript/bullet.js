class Bullet extends Entity{
    constructor(xPos, yPos, velocity, direction, room, damage, radius, owned){
        //Direction must be in RADIANS
        //equation for degrees -> radians
        //d*Math.PI/180 = r
        //one centralized hitbox
        const hitboxes = new Array()
        hitboxes[0] = new Hitbox(xPos+radius, yPos+radius, radius)
        super(hitboxes)
        this.xPos = xPos
        this.yPos = yPos
        this.velocity = velocity
        this.direction = direction //in radians
        this.room = room
        this.display = true
        this.damage = damage
        this.radius = radius
        this.owned = owned
    }
    draw(){
        /*c.fillStyle = 'green'
        c.beginPath()
        c.arc(this.hitboxes[0].xPos, this.hitboxes[0].yPos, this.hitboxes[0].radius, 0, 2*Math.PI, false)
        c.fill()*/
        c.fillStyle = 'pink'
        c.beginPath()
        c.arc(this.xPos+this.radius,this.yPos+this.radius,this.radius,0, 2*Math.PI, false)
        c.fill()
    }
    update(){
        for (let x = 0; x < currentRoom.doorArr.length; x++){
            if (this.display && super.isTouching(currentRoom.doorArr[x])){
                this.display = false
            }
        }
        if (this.owned != "player" && this.display && super.isTouching(player)){
            this.display = false
            player.Health -= this.damage
        }
        if(currentRoom.enemyArr != null && this.owned != "enemy"){
            for (let x = 0; x < currentRoom.enemyArr.length; x++){
                if (this.display && currentRoom.enemyArr[x] != null && super.isTouching(currentRoom.enemyArr[x])){
                    this.display = false
                    currentRoom.enemyArr[x].health -= this.damage
                }
            }
        }
        for (let x = 0; x < currentRoom.platformArr.length; x++){
            if (this.xPos > currentRoom.platformArr[x].position.x
                && this.xPos < currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
                && this.yPos > currentRoom.platformArr[x].position.y
                && this.yPos < currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height){
                    this.display = false
                }
        }
        if (currentRoom != this.room){
            this.display = false
        }
        if (this.display){
            this.draw()
        this.yPos -= Math.sin(this.direction) * this.velocity
        this.xPos += Math.cos(this.direction) * this.velocity
        this.hitboxes[0].yPos -= Math.sin(this.direction) * this.velocity
        this.hitboxes[0].xPos += Math.cos(this.direction) * this.velocity
        }
        else{
            this.yPos = -100
        }
        
    }
}