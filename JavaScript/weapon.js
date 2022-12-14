class Weapon extends Entity {
    constructor(damage, attackSpeed, imageId, xPos, yPos) {
      let hitboxes = new Array();
      super(hitboxes);
      this.xPos = xPos;
      this.yPos = yPos;
      this.obtained = false;
      hitboxes[0] = new Hitbox(this.xPos, this.yPos, 20);
      this.dmg = damage;
      this.atkSpd = attackSpeed;
      this.atkSpdDefault = attackSpeed;
      this.imageId = imageId
    }
  
    draw() {
      if (!this.obtained){
      /*for (let i = 0; i < this.hitboxes.length; i++) {
        c.fillStyle = "orange";
        c.beginPath();
        c.arc(
          this.hitboxes[i].xPos,
          this.hitboxes[i].yPos,
          this.hitboxes[i].radius,
          0,
          2 * Math.PI,
          false
        );
        c.fill();
      }*/
      this.hitboxes[0].xPos = this.xPos
      this.hitboxes[0].yPos = this.yPos
      c.drawImage(document.getElementById(this.imageId),this.hitboxes[0].xPos-20,this.hitboxes[0].yPos-20)
    }
  }

  
    update() {
      this.draw()
      if(this.atkSpd > 0){
        this.atkSpd--
      }
    }
    swing(){
      if(this.atkSpd == 0){
        if(this.obtained){
        let image = document.getElementById("Attack")
        if(player.orientation == "playerRight"){
            attackGif.style.left = player.position.x + 180 + "px"
            attackGif.style.top = player.position.y - 30 + "px"
            image = document.getElementById("Attack");
            image.src = "./Tiles/Attack.gif"
            attackGif.style.display = "block"
        }
        if(player.orientation == "playerLeft"){
            attackGif.style.left = player.position.x + 40 + "px"
            attackGif.style.top = player.position.y - 30 + "px"
            image = document.getElementById("lAttack");
            image.src = "./Tiles/attackLeft.gif"
        }
        
        this.attack(player.position.x, player.position.y);
        if (currentRoom.enemyArr != null){
            for(let i = 0; i < currentRoom.enemyArr.length; i++){
              //not getting to here
                if (currentWeapon.isTouching(currentRoom.enemyArr[i])) {
                    currentRoom.enemyArr[i].health -= Math.floor(this.dmg*player.dmgModifier)
                }
            }
        }
        if (this.hitboxes.length > 0) {
            for (let i = 0; i < this.hitboxes.length; i++) {
                this.hitboxes.pop();
            }
        }
        this.atkSpd = 25  
      } 
        this.draw(); 
    }
    }
    attack(x, y) {
      this.xPos = x;
      this.yPos = y;
        if (player.orientation == "playerRight"){
          this.hitboxes.push(new Hitbox(this.xPos + 70, this.yPos, 30));
          this.hitboxes.push(new Hitbox(this.xPos + 75, this.yPos + 20, 30));
          this.hitboxes.push(new Hitbox(this.xPos + 70, this.yPos + 40, 30));
        }
        if (player.orientation == "playerLeft"){
          this.hitboxes.push(new Hitbox(this.xPos - 70, this.yPos, 30 ));
          this.hitboxes.push(new Hitbox(this.xPos - 75, this.yPos + 20, 30 ));
          this.hitboxes.push(new Hitbox(this.xPos - 70, this.yPos + 40, 30 ));
        }
        super.drawHitboxes(currentWeapon)
    }
  }





class Musket extends Weapon{
  constructor(damage, attackSpeed, imageId, xPos, yPos){
    super(damage, attackSpeed, imageId, xPos, yPos)
    this.bull = new Bullet(-50, -50, 0, 0, "player")
    this.xPos = 200
  }
  draw(){
    this.hitboxes[0].xPos = this.xPos
    this.hitboxes[0].yPos = this.yPos
    c.drawImage(document.getElementById("blunderbuss"),this.hitboxes[0].xPos-20,this.hitboxes[0].yPos-20)
  }
  update(){
    if(this.atkSpd > 0 && this.obtained){
      this.atkSpd--
      this.bull.update()
    }
    else if (!this.obtained){
      this.draw()
    }
  }
  swing(){
    if(this.atkSpd == 0 && this.obtained){
      if(player.orientation == "playerRight"){
        this.bull = new Bullet(player.position.x+70, player.position.y+25,20,0,currentRoom,this.dmg*player.dmgModifier,10, "player")
      }
      else{this.bull = new Bullet(player.position.x-20, player.position.y+25,20,Math.PI,currentRoom,this.dmg*player.dmgModifier,10, "player")}
      
      this.atkSpd = 200
    }
  }
}

class ShotgunP extends Weapon{
  constructor(damage, attackSpeed, imageId, xPos, yPos){
    super(damage, attackSpeed, imageId, xPos, yPos)
    this.bullArr = new Array()
    this.xPos = 200
  }
  update(){
    if(this.atkSpd > 0 && this.obtained){
      this.atkSpd--
      for(let x = 0; x < this.bullArr.length; x++){
        this.bullArr[x].update()
      }
    }
    else if (!this.obtained){
      this.draw()
    }
  }
  swing(){
    if(this.atkSpd == 0 && this.obtained){
      this.bullArr = new Array()
      let pistore = 0
      let twstore = 0
      if(player.orientation == "playerLeft"){
        pistore = Math.PI
        twstore = -20
      }
      for(let x =0; x < 10; x++){
        this.bullArr[x] = new Bullet(player.position.x+10-twstore, player.position.y+25,30,(Math.random()*Math.PI/10)-(Math.PI/20) + pistore, currentRoom, this.dmg*player.dmgModifier, 5, "player")
      }      
      this.atkSpd = 300
    }
  }
}