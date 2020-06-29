var Stage = function() {  //畫面的object
    this.mapWall = new Framework.Sprite(define.imagePath + 'stone1.png');
    this.mapWall.scale = 2; //size
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size
    this.doorDown = new Framework.Sprite(define.imagePath + 'doordown.png');
    this.doorDown.scale = 1.5; //size
    this.doorUp = new Framework.Sprite(define.imagePath + 'doorup.png');
    this.doorUp.scale = 1.5; //size
    

    this.mapPosition = {x:0, y:0};
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function () {
        if (this._tileType === -97) {
            this.doorUp.update();
        }
    }

    this.draw = function(ctx){  //畫道具的圖??
        this.mapFloor.draw(ctx);
        if (this._tileType === -97) {
            this.doorUp.draw(ctx);
        }else if(this._tileType === -98){
            this.doorDown.draw(ctx);
        }
    }

    this.delete = function(){
        this.mapFloor = null;
        this.yellowDoor = null;
    }
};

Object.defineProperty(Stage.prototype, 'position', {  //圖片位置 是該格的位置
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.doorUp.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.doorDown.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 

Object.defineProperty(Stage.prototype, 'tileType', {
    get: function() {
        return this._tileType;
    },
    set: function(newValue) {
        this._tileType = newValue;
    }
}); 