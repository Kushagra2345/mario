class Coin{
    constructor(posX){
    this.rx=posX
    this.ry=height-random([220,420,620])
    this.spt=createSprite(this.rx,this.ry)
    this.spt.addImage(coinImg)
    this.spt.velocityX=-4
    this.spt.velocityY=0
    this.spt.scale=0.05
    }

}