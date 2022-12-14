class Door extends Entity{
    constructor(xPos, yPos, height, width, leadsto) {
        let hitboxes = new Array()
        if (height >= width){
            let numbox = Math.round(height/width)
            for (let i = 0; i < numbox; i++){
                hitboxes[i] = new Hitbox(xPos+width/2, yPos+(width*i)+width/2, width/2)
            }
        }
        if (width > height){
            let numbox = Math.round(width/height)       
            for (let i = 0; i < numbox; i++){
                hitboxes[i] = new Hitbox(xPos+(height*i)+height/2, yPos+height/2, height/2)
            }
        }
        super(hitboxes)
        this.position = {
            x: xPos,
            y: yPos,
        }
        this.leadsto = leadsto
        this.width = width
        this.height = height
    }
    draw(){
        return
    }
}