var Gems = function () {  //畫面的object
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size
    this.redGem = new Framework.Sprite(define.imagePath + 'i16.png');
    this.redGem.scale = 2;    //size
    this.blueGem = new Framework.Sprite(define.imagePath + 'i17.png');
    this.blueGem.scale = 2;    //size

    this.mapPosition = { x: 0, y: 0 };
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function () {

    }

    this.draw = function (ctx) {  //畫道具的圖??
        this.mapFloor.draw(ctx);
        if (this._tileType === -10) {
            this.redGem.draw(ctx);
        } else if (this._tileType === -11) {
            this.blueGem.draw(ctx);
        }
    }

    this.delete = function () {
        this.mapFloor = null;
        this.redGem = null;
        this.blueGem = null;
    }
};

Object.defineProperty(Gems.prototype, 'position', {  //圖片位置 是該格的位置
    get: function () {
        return this.mapPosition;
    },
    set: function (newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.redGem.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.blueGem.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };

    }
});

Object.defineProperty(Gems.prototype, 'tileType', {
    get: function () {
        return this._tileType;
    },
    set: function (newValue) {
        this._tileType = newValue;
    }
}); 