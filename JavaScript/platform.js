class Platform {
    constructor(xPos, yPos, height, width, passable) {
        this.position = {
            x: xPos,
            y: yPos,
        }
        this.width = width
        this.height = height
        if (passable == null){
            if (height >= 50){
                this.passable = false
            }
            else{this.passable=true}
        }
        else{this.passable = passable}
        
    }
    draw(){
        c.fillStyle = "transparent"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
