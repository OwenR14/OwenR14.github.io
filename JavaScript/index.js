const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;
var inv = document.getElementById('inv');
var startScreen = document.getElementById('startScreen')
var deathScreen = document.getElementById('deathScreen')
var gameScreen = document.getElementById('gameScreen')
var invOpen = false;
var textDis = 0;
var prev = 'left';
var levelNum = 1;
var enemiesKilled = 0;

//maybe make smaller later or smth
canvas.width = 1888
canvas.height = 960

//Setting the entities
const player = new Player()


//stuff
var currentWeapon = null;
var backupWeapon = null;
var weaponType = "sword";
// Map layouts
// 59 per row, 30 in a column
const mapHellStr2 = generateRoom("u")
let newLevelCooldown = 100

let currentRoomValues = [4, 4]
let playerPlatY = 0
const requiredRooms = new Array()
reqMap = (new String("wwwwwwwwwwwwwwwwwwwwwwwwwuuuuuwwwwwwwwwwwwwwwwwwwwwwwwwwwww" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w___________________________p_____________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w___________________________p_____________________________w" +
                            "l_________________________________________________________w" +
                            "l_________________________________________________________w" +
                            "l___________________________p_____________________________w" +
                            "l_________________________________________________________w" +
                            "l_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________r" +
                            "w___________________________p_____________________________r" +
                            "w_________________________________________________________r" +
                            "w_________________________________________________________r" +
                            "w_________________________________________________________r" +
                            "w_________________________________________________________w" +
                            "w___________________________p_____________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w___________________________p_____________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "wwwwwwwwwwwwwwwwwwwwwwwwwwdddddwwwwwwwwwwwwwwwwwwwwwwwwwwww"))
reqMapp = new Map(reqMap, 2)
reqMappp = new Room(null, null, reqMapp, "", null)
requiredRooms.push(reqMappp)
let possibleEnemies = new Array()
let possibleObjects = new Array()
let possibleBosses = new Array()

possibleObjects.push(new Weapon(50, 25, "Sword"))
possibleObjects.push(new Musket(30, 200, "PlayerGunLeft"))
possibleObjects.push(new ShotgunP(10, 300, "ShotRight", 0, 0))
possibleObjects.push(new Thing(300, 600, "health", 10))
possibleObjects.push(new Thing(200, 200, "dmg", 10))

possibleEnemies.push(new Gun(0, 0, 0, 100, 3))
possibleEnemies.push(new Bird(0, 0, 2, 100))
possibleEnemies.push(new Shotgun(

possibleBosses.push(new Boss(0, 0, 10, 300, 1))
possibleBosses.push(new Boss(0, 0, 15, 400, 2))

roomArr = generateLevel(8,8, possibleEnemies, null, possibleObjects)
levelOne = new Level(roomArr)
loadLevel(levelOne)
//xPos, yPos, height, width
let bulletCooldown = 0
let NPCCooldown = 5
const keys = { right: {pressed: false}, left: {pressed: false}, up: {pressed: false}, down: {pressed: false}}
var i = 0;

function move() {
if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var id = setInterval(frame, 10);
    elem.innerHTML = player.Health + "/" + player.MaxHealth
    function frame() {
    if (player.Health >= player.MaxHealth) {
        clearInterval(id);
        i = 0;
    } else if (player.Health < player.MaxHealth){
        elem.style.width = Math.trunc((100*player.Health)/player.MaxHealth) + "%";
        elem.innerHTML = player.Health + '/' + player.MaxHealth;
    }
    }
}
}

function animate() {
    requestAnimationFrame(animate)
    if (startScreen.style.display == 'none'){
        c.clearRect(0,0, canvas.width, canvas.height)
        currentRoom.map.buildMap(currentRoom.map.string, currentRoom.locked)
        move()
        //Spawns platforms
        currentRoom.map.buildMap(currentRoom.map.string)
        for (let x = 0; x < currentRoom.platformArr.length; x++){
            currentRoom.platformArr[x].draw()
        }
        //Spawns doors
        for (let x = 0; x < currentRoom.doorArr.length; x++){
            currentRoom.doorArr[x].draw()
        }
        if(NPCCooldown > 0){
            NPCCooldown--
        }
        if(currentRoom.NPC != null){currentRoom.NPC.draw()}
        if(currentRoom.NPC != null && currentRoom.NPC.speakTimer > 0 && NPCCooldown == 0){
            currentRoom.NPC.talk()
        }
        //Movement
        if (keys.right.pressed) {
            player.velocity.x = 7
            //originally 7
        } else if (keys.left.pressed) {
            player.velocity.x = -7
            //originally -7
        }
        //Enemy player collision + interaction
        if(currentRoom.enemyArr != null && currentRoom.enemyArr != []){
            for (let w = 0; w < currentRoom.enemyArr.length; w++){
                if (currentRoom.enemyArr[w] != null && currentRoom.enemyArr[w].health > 0 && player.isTouching(currentRoom.enemyArr[w]) && player.enemyIframe == 0){
                    player.Health -= currentRoom.enemyArr[w].damage
                    player.enemyIframe = 30
                }
            }
        }
        
        //EnemyIframes
        if (player.enemyIframe > 0){
            player.enemyIframe --
        }
      
        //Hp up detction
        // if (HPUp.obtained == false) {
        //     if (player.isTouching(HPUp)){
        //         if(player.Health != player.MaxHealth){
        //             if (player.Health <= player.MaxHealth - 10){
        //                 player.Health += 10
        //             }
        //             else{player.Health += player.MaxHealth - player.Health}
        //             textDis = 80
        //             HPUp.obtained = true
        //         }
        //     }  
        // } 

        //Weapon pickup
        if(currentRoom.objectArr != null){
            for(let w = 0; w < currentRoom.objectArr.length; w++){
                if(currentRoom.objectArr[w] != null && currentRoom.objectArr[w].obtained == false ){
                    currentRoom.objectArr[w].update() //draws if not grabbed
                    if(player.isTouching(currentRoom.objectArr[w]) && currentRoom.objectArr[w] instanceof Weapon){
                        if(currentWeapon == null && backupWeapon == null){
                            currentWeapon = currentRoom.objectArr[w]
                        }
                        else if(backupWeapon == null){
                            backupWeapon = currentRoom.objectArr[w]
                        }
                        else if(currentWeapon == null && backupWeapon != null){
                            currentWeapon = currentRoom.objectArr[w]
                        }
                        else {
                            currentRoom.objectArr.push(currentWeapon)
                            currentRoom.objectArr[currentRoom.objectArr.length-1].obtained = false
                            currentRoom.objectArr[currentRoom.objectArr.length-1].xPos = player.position.x + 90
                            currentRoom.objectArr[currentRoom.objectArr.length-1].yPos = player.position.y + 45
                            currentWeapon = currentRoom.objectArr[w]
                        }
                        currentWeapon.obtained = true
                        currentRoom.objectArr[w].obtained = true
                    }
                    else if(player.isTouching(currentRoom.objectArr[w]) && currentRoom.objectArr[w] instanceof Thing){
                        currentRoom.objectArr[w].obtained = true
                        currentRoom.objectArr[w].applyItem()
                    }
                }
            }
        }
        

        //Weapon pickup
        
            if (currentWeapon != null && currentWeapon.atkSpd > 0){
              currentWeapon.atkSpd--
            }

    if (currentRoom.enemyArr != undefined){
        let allDead = true
        for (let u = 0; u < currentRoom.enemyArr.length; u++){
            if(currentRoom.enemyArr != null && currentRoom.enemyArr[u].health > 0){
                allDead = false
            }
        }
        if (allDead){
            currentRoom.locked = false
        }
    }
    else{
        currentRoom.locked = false
    }

    // Platform collision detection for player
    for (let x = 0; x < currentRoom.platformArr.length; x++){
        if (player.position.y + player.height <= currentRoom.platformArr[x].position.y
            && player.position.y + player.height + player.velocity.y >= currentRoom.platformArr[x].position.y 
            && ((player.position.x + player.width >= currentRoom.platformArr[x].position.x 
            && player.position.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width)
            || (player.position.x + player.width <= currentRoom.platformArr[x].position.x 
                && player.position.x + player.width + player.velocity.x >= currentRoom.platformArr[x].position.x)
            || (player.position.x >= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
                && player.position.x + player.velocity.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width)    )  
            && player.position.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height) {
    
            player.velocity.y = 0
            player.position.y = currentRoom.platformArr[x].position.y - player.height
            player.jumpsUsed = 0
            player.onGround = true
            playerPlatY = player.position.y
            if (!currentRoom.platformArr[x].passable){
                player.onThickPlatform = true
            }
        }
        
        if (!currentRoom.platformArr[x].passable
            && player.position.y >= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
            && player.position.y + player.velocity.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
            && player.position.x + player.width >= currentRoom.platformArr[x].position.x 
                && player.position.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width){
               player.velocity.y = 0
               player.yPos = currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
            }

        // Platform collision detection for player
        for (let x = 0; x < currentRoom.platformArr.length; x++){
            if (player.position.y + player.height <= currentRoom.platformArr[x].position.y
                && player.position.y + player.height + player.velocity.y >= currentRoom.platformArr[x].position.y 
                && player.position.x + player.width >= currentRoom.platformArr[x].position.x 
                && player.position.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width 
                && player.position.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height) {
        
                player.velocity.y = 0
                player.yPos = currentRoom.platformArr[x].position.y - player.height
                player.jumpsUsed = 0
                player.onGround = true
                playerPlatY = player.position.y
                if (!currentRoom.platformArr[x].passable){
                    player.onThickPlatform = true
                }
                
            }
            else if (player.position.y != playerPlatY && playerPlatY != -10){
                playerPlatY = -10
                player.onThickPlatform = false
            }
    
            if (!currentRoom.platformArr[x].passable
                && player.position.y >= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && player.position.y + player.velocity.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && player.position.x + player.width >= currentRoom.platformArr[x].position.x 
                && player.position.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width){
                   player.velocity.y = 0
                   player.yPos = currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                }
                
            if (!currentRoom.platformArr[x].passable
                && player.position.x + player.width <= currentRoom.platformArr[x].position.x
                && player.position.x + player.width + player.velocity.x >= currentRoom.platformArr[x].position.x
                && player.position.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && player.position.y + player.height >= currentRoom.platformArr[x].position.y){
                player.velocity.x = 0
                player.xPos = currentRoom.platformArr[x].position.x - player.width
            }
            
            if (!currentRoom.platformArr[x].passable
                && player.position.x >= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
                && player.position.x + player.velocity.x <= currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
                && player.position.y <= currentRoom.platformArr[x].position.y + currentRoom.platformArr[x].height
                && player.position.y + player.height >= currentRoom.platformArr[x].position.y ){
                player.velocity.x = 0
                player.xPos = currentRoom.platformArr[x].position.x + currentRoom.platformArr[x].width
            }
        }
        //Door collision detection
        if (player.doorI > 0){
            player.doorI--
        }
    }
   
    //Door collision detection
    if (player.doorI > 0){
        player.doorI--
    }
    for (let x = 0; x < currentRoom.doorArr.length; x++){
        if (player.isTouching(currentRoom.doorArr[x]) && player.doorI == 0 && !currentRoom.locked){
            if(currentRoom.NPC != null){currentRoom.NPC.speakTimer = 0}
            if(currentRoom.doorArr[x].leadsto != "new"){player.goThroughDoor(currentRoom.doorArr[x].leadsto)}
            if (currentRoom.doorArr[x].leadsto == "right"){
                currentRoom = roomArr[currentRoomValues[0]+1][currentRoomValues[1]]
                currentRoomValues[0]++
            }
            else if (currentRoom.doorArr[x].leadsto == "left"){
                currentRoom = roomArr[currentRoomValues[0]-1][currentRoomValues[1]]
                currentRoomValues[0]--
            }
            else if (currentRoom.doorArr[x].leadsto == "up"){
                currentRoom = roomArr[currentRoomValues[0]][currentRoomValues[1]-1]
                player.velocity.y = -10
                currentRoomValues[1]--
            }
            else if (currentRoom.doorArr[x].leadsto == "down"){
                currentRoom = roomArr[currentRoomValues[0]][currentRoomValues[1]+1]
                currentRoomValues[1]++
            }
            else if (currentRoom.doorArr[x].leadsto == "new" && newLevelCooldown < 0){
                roomArr = generateLevel(4, 4, possibleEnemies,  null, possibleObjects)//reqrooms
                levelNum++
                levelOne = new Level(roomArr)
                loadLevel(levelOne)
                player.position.x = 33
                player.position.y = canvas.height-150
                newLevelCooldown = 1000
            }
            player.doorI = 8
        }
        else if((player.isTouching(currentRoom.doorArr[x]) && player.doorI == 0 && currentRoom.locked)){
            if(currentRoom.doorArr[x].leadsto == "up"){
                player.velocity.y = 0
                player.position.y = currentRoom.doorArr[x].position.y + 33
            }
            if(currentRoom.doorArr[x].leadsto == "down"){
                player.velocity.y = 0
                player.position.y = currentRoom.doorArr[x].position.y - player.height - 1
                jumpsUsed = 0
            }
        }
        newLevelCooldown--
        if((player.isTouching(currentRoom.doorArr[x]) || currentRoom.doorArr[x].isTouching(new PlayerTester(player.position.x+player.velocity.x, player.position.y))) && player.doorI == 0 && currentRoom.locked){
            if(currentRoom.doorArr[x].leadsto == "left"){
                player.velocity.x = 0
                player.position.x = currentRoom.doorArr[x].position.x + 33
            }
            if(currentRoom.doorArr[x].leadsto == "right"){
                player.velocity.x = 0
                player.position.x = currentRoom.doorArr[x].position.x - player.width
            }
        }
    }
        player.update()

        if (currentWeapon != null){
            currentWeapon.update()
        }
        if (backupWeapon != null){
            backupWeapon.update()
        }
        
        c.fillStyle = "white";
        c.font = "48px Arial";
        c.fillText("Level " + levelNum, 36, 48+36);
        if(currentRoom.objectArr != null){
            for(let p = 0; p < currentRoom.objectArr.length; p++){
                if(currentRoom.objectArr[p] != null && !currentRoom.objectArr[p].obtained){
                    currentRoom.objectArr[p].update()
                }
            }
        }
        if(currentRoom.enemyArr != null){
            for (let p = 0; p < currentRoom.enemyArr.length; p++){
                if(currentRoom.enemyArr[p].health <= 0){
                    for(let i = 0; i < currentRoom.enemyArr[p].hitboxes.length; i++){
                        currentRoom.enemyArr[p].hitboxes.pop()
                        enemiesKilled++
                    }
                }
                else{
                    currentRoom.enemyArr[p].update()
                }
            }
        }
        showHeldWeapons()
        if(player.Health <= 0){
            deathScreen.style.display = 'grid' 
            gameScreen.style.display = 'none'
        }
    }
}

animate()

window.addEventListener("click", function attack() {
    if(currentWeapon != null){
        currentWeapon.swing()
    }

})

window.addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a' :
            keys.left.pressed = true
            player.orientation = "playerLeft"
            break
        case 'd' :
            keys.right.pressed = true
            player.orientation = "playerRight"
            break
        case 'w' :
            if (player.jumpsUsed < 2){
                player.velocity.y = -15
                player.jumpsUsed++
            }
            break
        case 's' :
            if(playerPlatY != -10 && player.onThickPlatform == false)
                player.position.y++
            break
        case 't':
            currentRoom = roomArr[7][7]
            currentRoomValues[1] = 7
            currentRoomValues[0] = 7
            break
        case 'i':
            if(invOpen == false) {
                inv.style.display = 'block'
                invOpen = true
            } else if (invOpen == true) {
                inv.style.display = 'none'
                invOpen = false
            }
        case 'q':
            let tempWeapon = currentWeapon
            currentWeapon = backupWeapon
            backupWeapon = tempWeapon
    }
})

window.addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a' || 'A':
            keys.left.pressed = false
            break
        case 'd' || 'D':
            keys.right.pressed = false
            break
        case 'w' || 'W' || ' ':
            break
        case 's' || 'S':
            break
    }
})

function loadLevel(level){
    let roomAssigned = false
    let roomTryX = 0
    let roomTryY = 0
    while (!roomAssigned){
        roomTryX = Math.floor(level.roomArr[0].length/2)
        roomTryY = Math.floor(level.roomArr.length/2)
        if (level.roomArr[roomTryX][roomTryY] != null){
            currentRoomValues = [roomTryX, roomTryY]
            currentRoom = level.roomArr[roomTryX][roomTryY]
            roomAssigned = true
        }
    }
}
function showHeldWeapons(){
    c.fillStyle = "white"
    c.fillRect(canvas.width-195, canvas.height-120, 75, 75)
    c.fillStyle = "grey"
    c.fillRect(canvas.width-110, canvas.height-120, 60, 60)
    if(currentWeapon != null){c.drawImage(document.getElementById(currentWeapon.imageId), canvas.width-180, canvas.height-105)}
    if(backupWeapon != null){c.drawImage(document.getElementById(backupWeapon.imageId), canvas.width-100, canvas.height-115)}
}
