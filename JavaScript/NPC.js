class NPC extends Entity{
    constructor(x, y, hitboxRadius, lines, heldItem, imageId){
        let hitboxes = new Array()
        hitboxes.push(new Hitbox(x, y, hitboxRadius))
        super(hitboxes)
        this.xPos = x
        this.yPos = y
        this.lines = lines
        this.heldItem = heldItem
        this.speakTimer = 1000
        this.imageId = imageId
    }
    talk(){
        for (let x = 0; x < this.lines.length; x++){
            c.fillStyle = "white";
            c.font = "48px Arial";
            c.fillText(this.lines[x], 300, canvas.height-300 + 50 * x, 1000);
        }
        this.speakTimer--
    }
    speakLine(line){
        c.fillStyle = "white";
        c.font = "64px Arial";
        c.fillText(line, 300, canvas.height-200, 1000);
    }
    draw(){
        c.drawImage(document.getElementById(this.imageId), this.xPos, this.yPos)
    }
}