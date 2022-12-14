class Entity{
    constructor(hitboxes){
        this.hitboxes = hitboxes
        //Array of hitboxes
    }
    isTouching(entity){
        for (let x = 0; x < this.hitboxes.length; x++){
            for(let y = 0; y < entity.hitboxes.length; y++){
                if (Math.hypot(this.hitboxes[x].xPos-entity.hitboxes[y].xPos, this.hitboxes[x].yPos-entity.hitboxes[y].yPos)
                < (this.hitboxes[x].radius + entity.hitboxes[y].radius)){
                    return true
                }
            }
        }
        return false
    }
    drawHitboxes(entity){
        for(let x = 0; x < entity.hitboxes.length; x++){
            c.fillStyle = 'red'
            c.beginPath()
            c.arc(entity.hitboxes[x].xPos, entity.hitboxes[x].yPos, entity.hitboxes[x].radius, 0, 2*Math.PI, false)
            c.fill()
        }
    }
    /*static isTouching(entity, entity2){
        for (x = 0; x < entity2.hitboxes.length; x++){
            for(y = 0; y < entity.hitboxes.length; y++){
                if (Math.hypot(entity2.hitboxes[x].xPos-entity.hitboxes[y].xPos, entity2.hitboxes[x].yPos-entity.hitboxes[y].yPos)
                < (entity2.hitboxes[x].radius + entity2.hitboxes[y].radius)){
                    return True
                }
            }
        }
    }*/
}
class PlayerTester extends Entity{
    constructor(xPos, yPos){
        let hbs = new Array()
        hbs[0] = new Hitbox(xPos+15, yPos+15, 15)
        hbs[1] = new Hitbox(xPos+15, yPos+45, 15)
        hbs[2] = new Hitbox(xPos+15, yPos+75, 15)
        super(hbs)
    }
}