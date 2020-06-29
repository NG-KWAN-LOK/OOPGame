var AnimationWall = function(file,position) {  //畫面的object
    this.lavaWall = new Framework.AnimationSprite({url:define.imagePath + 'lava.png', col:4 , row:1 , loop:true , speed:1}); 
    this.lavaWall.scale = 2;
    this.lavaWall.index = 1;

    this.skyWall = new Framework.AnimationSprite({url:define.imagePath + 'sky.png', col:4 , row:1 , loop:true , speed:1}); 
    this.skyWall.scale = 2;
    this.skyWall.index = 1;
    this.lavaWall.start({ from: 0, to: 3 });
    this.skyWall.start({from:0, to: 3 });
    var PIXEL_CONST = 64;

    this.mapPosition = {x:0, y:0};
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function () {
        this.lavaWall.update();
        this.skyWall.update();
    }

    this.draw = function(ctx){  //畫道具的圖??
        if(this._tileType === 2){
            this.lavaWall.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
            this.lavaWall.draw(ctx);
        }
        if(this._tileType === 3){
            this.skyWall.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
            this.skyWall.draw(ctx);
        }
    }

    this.delete = function(){
        this.lavaWall = null;
        this.skyWall = null;
    }
};

Object.defineProperty(AnimationWall.prototype, 'position', {  //圖片位置 是該格的位置
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.lavaWall.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.skyWall.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 

Object.defineProperty(AnimationWall.prototype, 'tileType', {
    get: function() {
        return this._tileType;
    },
    set: function(newValue) {
        this._tileType = newValue;
    }
}); 