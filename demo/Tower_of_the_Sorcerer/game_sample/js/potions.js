var Potions = function() {  //畫面的object
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size
    this.redPotion = new Framework.Sprite(define.imagePath + 'i20.png');
    this.redPotion.scale = 2;    //size
    this.bluePotion = new Framework.Sprite(define.imagePath + 'i21.png');
    this.bluePotion.scale = 2;    //size

    this.mapPosition = {x:0, y:0};
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function(){

    }

    this.draw = function(ctx){  //畫道具的圖??

        this.mapFloor.draw(ctx);
        if(this._tileType === -12){
            this.redPotion.draw(ctx);
        } else if(this._tileType === -13){
            this.bluePotion.draw(ctx);
        }
    }

    this.delete = function(){
        this.mapFloor = null;
        this.redPotion = null;
        this.bluePotion = null;
    }
};

Object.defineProperty(Potions.prototype, 'position', {  //圖片位置 是該格的位置
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.redPotion.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.bluePotion.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};

    }
}); 

Object.defineProperty(Potions.prototype, 'tileType', {
    get: function() {
        return this._tileType;
    },
    set: function(newValue) {
        this._tileType = newValue;
    }
}); 