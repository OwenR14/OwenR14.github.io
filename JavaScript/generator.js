let lastUsed = "" //the last door combination that was used
let roomArrGen = new Array()
let crock = true;
function generateRoom(doorLo){ 
    //passes in door locations already required by the room that leads into this room
    doorNum = (Math.floor(Math.random()*(4-doorLo.length)))+1 //generates a number of doors from required doors -> 4
    possLocations = "udlr" //locations possible
    doorLocations = doorLo //locations already used
    for (let x = 0; x < doorNum; x++){ //for each door needed in room
        picked = false
        while(!picked){
            let choice = possLocations.substr(Math.floor(Math.random()*4), 1) //random location for door
            if (doorLocations.search(choice) == -1){ //random location not aleady in room
                doorLocations = doorLocations + choice
                picked = true
            }
        }
    }
    let layoutNum = Math.floor(Math.random()*(sampleRooms.length-2)+2) //chooses a layout for the room
    if(doorLo == ""){
        if(crock){layoutNum = 1} //if its the starting room make it crockkets
        else{layoutNum=0} //if its the first room then make it the starting room
    }
    layout = sampleRooms[layoutNum]
    //this for loop replaces the door locations that are not there with walls
    for (let z = 0; z < possLocations.length; z++){ 
        if(doorLocations.search(possLocations[z]) == -1){
            layout = layout.replaceAll(possLocations.substr(z, 1), "w")
        }
    }
    lastUsed = doorLocations //changes the last doors used to the door
    map = new Map(layout, layoutNum) //makes the map
    return map
}
function generateLevel(xMax, yMax, possibleEnemies, reqRooms, possibleObjects){
    possibleEnemies[0] = (new Gun(0, 0, 0, Math.floor(100 * (1 + .2*(levelNum-1))), Math.floor(3 * (1 + .2*(levelNum-1)))))
    possibleEnemies[1] = (new Bird(0, 0, Math.floor(2 * (1 + .5*levelNum)), Math.floor(40 * (1 + .3*(levelNum-1)))))
    possibleEnemies[2] = (new Shotgun(0, 0, 0, Math.floor(200 * (1 + .2*(levelNum))), Math.floor(1 * (1 + .15*(levelNum-1)))))
    let map = null
    roomArrGen = new Array() //makes array
    for (let x = 0; x < yMax; x++){ //for loop makes array 2D
        roomArrGen.push(new Array(xMax))
    }
    if(crock){ //if we are making the bardactanine room
    let lines = new Array()
    lines[0] = "Hello, welcome to my room"
    lines[1] = "My name is Bardactinine Futrate Maximus III"
    lines[2] = "I have been here for eons"
    lines[3] = "Come here young pirate"
    lines[4] = "Take this broken ruler"
    lines[5] = "It will help you on your quest"
    let brokenRuler = new Weapon(30, 25, "brokenRuler", 370, 224-45)
    let bardact = new NPC(325, 224-90, 200, lines, brokenRuler, "Bard")
    let brokeArray = new Array()
    brokeArray.push(brokenRuler)
    roomArrGen[Math.floor(xMax/2)][Math.floor(yMax/2)] = new Room (null, null, generateRoom(""), lastUsed, null, brokeArray, bardact);
    crock = false;} //makes crockett room
    else{roomArrGen[Math.floor(xMax/2)][Math.floor(yMax/2)] = new Room (null, null, generateRoom(""), lastUsed)} //makes starting room
    let lastRoomX = Math.floor(xMax/2) //sets location of last room to default
    let lastRoomY = Math.floor(yMax/2)
    for (let y = 0; y < 10000; y++){ //random very large number 
        for (let z = 0; z < lastUsed.length; z++){ 
            //ngl I have no idea how the rest of this for loop works, it adds rooms in a random manner and theoretically
            //it shouldnt work very well but it works fine
            //it calls the generateroom function and adds enemies so if you want to also add items just like
            //put add items in the new Room? idk 
            //this code has fetal alcohol syndrome but its still a lawyer
            if (lastRoomY > 0 && lastUsed[z] == "u"){
                map = generateRoom("d")
                if(roomArrGen[lastRoomX][lastRoomY-1] == null){
                    roomArrGen[lastRoomX][lastRoomY - 1] = new Room(null, null, map, lastUsed, addEnemies(map, possibleEnemies), addObjects(map, possibleObjects))
                }
                lastRoomY--
                lastUsed = shuffle(roomArrGen[lastRoomX][lastRoomY].doorsUsed)
            }
            else if (lastRoomY < (yMax-1) && lastUsed[z] == "d"){
                map = generateRoom("u")
                if(roomArrGen[lastRoomX][lastRoomY+1] == null){
                    roomArrGen[lastRoomX][lastRoomY + 1] = new Room(null, null, map, lastUsed, addEnemies(map, possibleEnemies), addObjects(map, possibleObjects))
                }
                lastRoomY++
                lastUsed = shuffle(roomArrGen[lastRoomX][lastRoomY].doorsUsed)
            }
            else if (lastRoomX > 0 && lastUsed[z] == "l"){
                map = generateRoom("r")
                if(roomArrGen[lastRoomX-1][lastRoomY] == null){
                    roomArrGen[lastRoomX - 1][lastRoomY] = new Room(null, null, map, lastUsed, addEnemies(map, possibleEnemies), addObjects(map, possibleObjects))
                }
                lastRoomX--
                lastUsed = shuffle(roomArrGen[lastRoomX][lastRoomY].doorsUsed)
            }
            else if (lastRoomX < (xMax-1) && lastUsed[z] == "r"){
                map = generateRoom("l")
                if(roomArrGen[lastRoomX+1][lastRoomY] == null){
                    roomArrGen[lastRoomX + 1][lastRoomY] = new Room(null, null, map, lastUsed, addEnemies(map, possibleEnemies), addObjects(map, possibleObjects))
                }
                lastRoomX++
                lastUsed = shuffle(roomArrGen[lastRoomX][lastRoomY].doorsUsed)
            }
        }
    }
    roomArrGen = trimExcess(roomArrGen) //calls to trim doors that lead to the outside of the map
    reqTest = new Array()
    reqTest.push(new String("wwwwwwwwwwwwwwwwwwwwwwwwwuuuuuwwwwwwwwwwwwwwwwwwwwwwwwwwwww" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w____________________________p____________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w____________________________p____________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"l________________________________________NNNNN____________w" +
"l_________________________________________________________w" +
"l____________________________p____________________________r" +
"l_________________________________________________________r" +
"l_________________________________________________________r" +
"w_________________________________________________________r" +
"w_________________________________________________________r" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"w_________________________________________________________w" +
"wwwwwwwwwwwwwwwwwwwwwwwwwwwdddddwwwwwwwwwwwwwwwwwwwwwwwwwww"))
    roomArrGen = addRequiredRooms(roomArrGen, reqTest, xMax, yMax) //adds rooms that are required to be in the map
    //console.log(roomArrGen) //keep this consolelog for dev versions
    return roomArrGen //returns a 2d array of rooms
}
function generateBossLevel(){
    roomArrGen = new Array()
    for (let x = 0; x < 1; x++){
        roomArrGen.push(new Array(xMax))
    }
    enem = possibleBosses[Math.floor(Math.random()*possibleBosses.length)]
    enemi = new Boss(canvas.width-300, canvas.height-75+33, enem.damage, enem.health, enem.type)
    bossArr = new Array()
    bossArr.push(enemi)
    roomArrGen[0][0] = new Room(null, null, bossRooms[0], "r", null)
    roomArrGen[0][1] = new Room(null, null, bossRooms[1], "lr", bossArr)
    roomArrGen[0][2] = new Room(null, null, bossRooms[2], "l", null)
}
function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }
  function shuffle(s) {
    var arr = s.split('');           // Convert String to array
    var n = arr.length;              // Length of the array
    
    for(var i=0 ; i<n-1 ; ++i) {
      var j = getRandomInt(n);       // Get random of [0, n-1]
      
      var temp = arr[i];             // Swap arr[i] and arr[j]
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
  }
function trimExcess(roomArr_){ //function that trims the doors that lead to index OOB errors
    for (let x = 0; x < roomArr_[0].length; x++){ 
        for (let y = 0; y < roomArr_.length; y++){ //2 for loops ensure every room is covered
            if(x == 0){ //if its on the very left
                if (roomArr_[0][y] != null){ //make sure room exists
                    roomArr_[0][y].map.string = roomArr_[0][y].map.string.replaceAll("l", "w") //dont let them go left
                }
            }
            if(x == roomArr_[0].length-1){ //if its on the very right
                if (roomArr_[roomArr_[0].length-1][y] != null){
                    roomArr_[roomArr_[0].length-1][y].map.string = roomArr_[roomArr_[0].length-1][y].map.string.replaceAll("r", "w")
                } //dont let them go right
            }
            if(y == 0){ //if its on top
                if (roomArr_[x][0] != null){ //dont let them go up
                    roomArr_[x][0].map.string = roomArr_[x][0].map.string.replaceAll("u", "w")
                }  
            }
            if(y == roomArr_.length-1){ //if its on the bottom dont let them go lower
                if (roomArr_[x][roomArr_.length-1] != null){
                    roomArr_[x][roomArr_.length-1].map.string = roomArr_[x][roomArr_.length-1].map.string.replaceAll("d", "w")
                }
            }
            //next 4 statements track if the room the door leads actually exists and if it doesnt then delete the door
            if(y > 0 && roomArr_[x][y-1] != null && roomArr_[x][y] != null){
                if(roomArr_[x][y-1].doorsUsed.search("d") != -1 && roomArr_[x][y].doorsUsed.search("u") == -1){
                    let loca = sampleRooms[roomArr_[x][y].map.mapStringLocation].search("u")
                    for (let e = 0; e < 5; e++){
                        roomArr_[x][y].map.string = setCharAt(roomArr_[x][y].map.string,loca+e, "u")
                    }
                }
            }
            if(y < roomArr_.length-1 && roomArr_[x][y+1] != null && roomArr_[x][y] != null){
                if(roomArr_[x][y+1].doorsUsed.search("u") != -1 && roomArr_[x][y].doorsUsed.search("d") == -1){
                    let loca = sampleRooms[roomArr_[x][y].map.mapStringLocation].search("d")
                    for (let e = 0; e < 5; e++){
                        roomArr_[x][y].map.string = setCharAt(roomArr_[x][y].map.string,loca+e, "d")
                    }
                }
            }
            if(x < roomArr_.length-1 && roomArr_[x+1][y] != null && roomArr_[x][y] != null){
                if(roomArr_[x+1][y].doorsUsed.search("l") != -1 && roomArr_[x][y].doorsUsed.search("r") == -1){
                    let loca = sampleRooms[roomArr_[x][y].map.mapStringLocation].search("r")
                    for (let e = 0; e < 5; e++){
                        roomArr_[x][y].map.string = setCharAt(roomArr_[x][y].map.string,loca+(e*59), "r")
                    }
                }
            }
            if(x > 0 && roomArr_[x-1][y] != null && roomArr_[x][y] != null){
                if(roomArr_[x-1][y].doorsUsed.search("r") != -1 && roomArr_[x][y].doorsUsed.search("l") == -1){
                    let loca = sampleRooms[roomArr_[x][y].map.mapStringLocation].search("l")
                    for (let e = 0; e < 5; e++){
                        roomArr_[x][y].map.string = setCharAt(roomArr_[x][y].map.string,loca+(e*59), "l")
                    }
                }
            }
            if(roomArr_[x][y] != null && y < roomArr_.length -1){ //adds plats above downward doors
                if(roomArr_[x][y].doorsUsed.search("d") != -1){
                    let loca = roomArr_[x][y].map.string.search("d")
                    for(let e = 0; e < 5; e++){
                        roomArr_[x][y].map.string = setCharAt(roomArr_[x][y].map.string,loca-59+e, "p")
                    }
                }
            }
            
        }
    }
    return roomArr_
}
//required function for trimexcess
function setCharAt(str,index,chr) {
    return str.substring(0,index) + chr + str.substring(index+1);
}
function addEnemies(map, possibleEnemies){ //function to add enemies to a room
    enemyArr = new Array()
    let validLocation = false
    let attempt = 0 //attempt at finding a location to put the enemy
    let enem = null
    if (Math.random() > .2){ //chance of NOT having an enemy in the room
        for (let u = 0; u < Math.floor(Math.random()*4)+1; u++){ //multiplier + 1 is max amount of enemies in room
            validLocation = false 
            while(validLocation == false){ //until it finds a place to put the enemy
                attempt = Math.floor(Math.random()*1770) //number of tiles in room
                if (map.string[attempt] === "_" && map.string[attempt+59] === "_" && map.string[attempt+59+59] === "_"){ //if the tile and tile below it are empty
                    enem = possibleEnemies[Math.floor(Math.random()*possibleEnemies.length)] //random enemy from possible enemies
                    if(enem instanceof Shotgun){
                        enemyArr[u] = new Shotgun((attempt%59)*32+1, (Math.floor(attempt/59))*32+1, enem.damage, enem.health, enem.gunDamage)
                    }
                    else if (enem instanceof Gun){ //if its a gun but not a shotgun
                        enemyArr[u] = new Gun((attempt%59)*32+1, (Math.floor(attempt/59))*32+1, enem.damage, enem.health, enem.gunDamage)
                    }
                    else if (enem instanceof Bird){ //if its a bird
                        enemyArr[u] = new Bird((attempt%59)*32+1, (Math.floor(attempt/59))*32+1, enem.damage, enem.health)
                    } else if (enem instanceof Boss) {
                        enemyArr[u] = new Boss((attempt%59)*32+1, (Math.floor(attempt/59))*32+1, enem.damage, enem.health, enem.type)
                    }
                    //need to make new else ifs for any other type of enemy
                    validLocation = true
                }
            }
        }
    }
    return enemyArr 
}
function addObjects(map, possibleObjects){ //function to add objects to a room
    enemyArr = new Array()
    let validLocation = false
    let attempt = 0 //attempt at finding a location to put the weapon
    let enem = null
    if (Math.random() > .01){ //chance of NOT having an object in the room
        for (let u = 0; u < Math.floor(Math.random()*2)+1; u++){ //multiplier + 1 is max amount of objects in room
            validLocation = false 
            while(validLocation == false){ //until it finds a place to put the object
                attempt = Math.floor(Math.random()*1770) //number of tiles in room
                if (map.string[attempt] === "_" && (map.string[attempt+59] === ("p") || map.string[attempt+59] === ("P") || map.string[attempt+59] === ("w"))){ //if the tile is on top of a plat/wall
                    enem = possibleObjects[Math.floor(Math.random()*possibleObjects.length)] //random enemy from possible enemies
                    if (enem instanceof Thing){ //if its an obj
                        enemyArr[u] = new Thing((attempt%59)*32+1, (Math.floor(attempt/59))*32+1, enem.type, enem.modifier)
                    }
                    else if (enem instanceof Weapon){ //if its a weapon
                        if(enem instanceof Musket){
                            enemyArr[u] = new Musket(enem.dmg, enem.atkSpd, enem.imageId,(attempt%59)*32+1, (Math.floor(attempt/59))*32+1)
                        }
                        else if(enem instanceof ShotgunP){
                            enemyArr[u] = new ShotgunP(enem.dmg, enem.atkSpd, enem.imageId, (attempt%59)*32+1, (Math.floor(attempt/59))*32+1)
                        }
                        else{
                            enemyArr[u] = new Weapon(enem.dmg, enem.atkSpd, enem.imageId,(attempt%59)*32+1, (Math.floor(attempt/59))*32+1)
                        }
                    }
                    //need to make new else ifs for any other type of enemy
                    validLocation = true
                }
            }
        }
    }
    return enemyArr
}
function addRequiredRoom(room, reqRoom){ //the whole function just replaces a layout with another and keeps the door
    if (room.map.string.search("d") == -1){
        reqRoom = reqRoom.replaceAll("d", "w")
    }
    if (room.map.string.search("l") == -1){
        reqRoom = reqRoom.replaceAll("l", "w")
    }
    if (room.map.string.search("r") == -1){
        reqRoom = reqRoom.replaceAll("r", "w")
    }
    if (room.map.string.search("u") == -1){
        reqRoom = reqRoom.replaceAll("u", "w")
    }
    return reqRoom
}
function addRequiredRooms(roomArr_, requiredRoomsArr, xMax, yMax){ //this function does not work yet :D
    let guessX = 0; let guessY = 0; //random guess points
    goodChoice = false
    for (let x = 0; x < requiredRoomsArr.length; x++){
        while(!goodChoice){ //Math.random gets deleted when i can stop it infinite looping
            guessX = Math.floor(Math.random()*xMax); guessY = Math.floor(Math.random()*yMax) //random place
            if ((guessX != Math.floor(xMax/2) && guessY != Math.floor(yMax/2)) && roomArr_[guessX][guessY] != null){
                //if you can put the req room there
                //(its not the starting room and a room actually exists there)
                roomArr_[guessX][guessY].map.string = addRequiredRoom(roomArr_[guessX][guessY], requiredRoomsArr[x]) //adds room
                goodChoice = true
            }
        }  
    }
    return roomArr_
}