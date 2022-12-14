class Map{
    constructor(string, mapStringLocation){
        this.platsMade = false
        this.doorsMade = false
        this.platformArr = new Array()
        this.string = string
        this.doorArr = new Array()
        this.mapStringLocation = mapStringLocation
    }
    buildMap(layout, locked){
        let xPos = 0;
        let yPos = 0;
        var dic = {
            w: "wood",
            h: "hpUp",
            p: "plat",
            P: "plat",
            l: "door",
            r: "door",
            u: "door",
            d: "door",
            N: "newLevel"
        }
        if (locked){
            dic.l = "LDoor"
            dic.r = "LDoor"
            dic.u = "LDoor"
            dic.d = "LDoor"
        }
        for(let i = 0; i < layout.length; i++){
            if (xPos % 1888 == 0 && xPos != 0) {
                yPos += 32
                xPos = 0
            }
            if(layout[i] === "p"){
                if(this.platsMade == false){
                    if(i > 59 && (layout[i-59] === "p" || layout[i+59] === "p")){
                        if(layout[i+59] == "p" && layout[i-59] == "p" && layout[i+1] == "p" && layout[i-1] == "p"){}
                        else{this.platformArr.push(new Platform(xPos, yPos, 32, 32, false))}
                    }
                    else{
                        this.platformArr.push(new Platform(xPos, yPos, 32, 32, true))
                    }
                }
            }
            else if(layout[i] === "w" || layout[i] === "P"){
                if(this.platsMade == false){
                    if (layout[i] === "w"){
                        if (layout[i+59] == "w" && layout[i-59] == "w" && layout[i+1] == "w" && layout[i-1] == "w"){}
                        else{this.platformArr.push(new Platform(xPos, yPos, 32, 32, false))}
                    }
                    else{
                    this.platformArr.push(new Platform(xPos, yPos, 32, 32, false))
                    }
                }
            }
            if(this.doorsMade == false && !locked){
                if (layout[i] === "l"){this.doorArr.push(new Door(xPos, yPos, 32, 32, "left"))}
                if (layout[i] === "r"){this.doorArr.push(new Door(xPos, yPos, 32, 32, "right"))}
                if (layout[i] === "u"){this.doorArr.push(new Door(xPos, yPos, 32, 32, "up"))}
                if (layout[i] === "d"){this.doorArr.push(new Door(xPos, yPos, 32, 32, "down"))}
                if (layout[i] === "N"){this.doorArr.push(new Door(xPos, yPos, 32, 32, "new"))}
            }
            if (layout[i] != "_"){
                c.drawImage(document.getElementById(dic[layout[i]]),xPos,yPos)                  
            }
            xPos += 32
        }
        if (!locked){this.doorsMade = true}
        this.platsMade = true
    }


}
/* Blank Map for future use
const BlankMap =new String ("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "w_________________________________________________________w" +
                            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
*/