class Room{
    constructor(platformArr, doors, map, doorsUsed, enemyArr, objectArr, NPC){
        this.platformArr = map.platformArr
        this.doorArr = map.doorArr
        this.map = map
        this.doorsUsed = doorsUsed
        this.enemyArr = enemyArr
        this.objectArr = objectArr
        this.locked = true
        this.NPC = NPC
    }
}