var DoorPickAxe = function() {  //畫面的object
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size

    this.doorPickAxe = new Framework.Sprite(define.imagePath + 'i27.png');
    this.doorPickAxe.scale = 2;    //size

    this._doorPickAxe = 0;

    this.mapPosition = {x:0, y:0};
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function(){

    }

    this.draw = function(ctx){  //畫道具的圖??

        this.mapFloor.draw(ctx);
        if(this._tileType === -5){
            this.doorPickAxe.draw(ctx);
        }
    }

    this.delete = function(){
        this.mapFloor = null;
        this.doorPickAxe = null;
    }
};

Object.defineProperty(DoorPickAxe.prototype, 'position', {  //圖片位置 是該格的位置
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.doorPickAxe.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 

Object.defineProperty(DoorPickAxe.prototype, 'tileType', {
    get: function() {
        return this._tileType;
    },
    set: function(newValue) {
        this._tileType = newValue;
    }
}); 

Object.defineProperty(DoorPickAxe.prototype, 'addDoorPickAxe', {
    get: function() {
        return this._doorPickAxe;
    },
    set: function(newValue) {
        this._doorPickAxe = newValue;
    }
}); 