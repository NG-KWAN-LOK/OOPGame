var StoneWall = function () {  //畫面的object
    this.mapWall = new Framework.Sprite(define.imagePath + 'stone1.png');
    this.mapWall.scale = 2; //size

    this.mapLightBlueStone = new Framework.Sprite(define.imagePath + 'stone.png');
    this.mapLightBlueStone.scale = 2; //size

    this.mapLightPinkStone = new Framework.Sprite(define.imagePath + 'stone2.png');
    this.mapLightPinkStone.scale = 2; //size

    this.mapPosition = { x: 0, y: 0 };
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function () {

    }

    this.draw = function (ctx) {  //畫道具的圖??
        if (this._tileType === 1) {
            this.mapWall.draw(ctx);
        } else if (this._tileType === -99) {
            this.mapLightBlueStone.draw(ctx);
        }
        else if (this._tileType === -96) {
            this.mapLightPinkStone.draw(ctx);
        }
    }

    this.delete = function () {
        this.mapWall = null;
        this.mapLightBlueStone = null;
        this.mapLightPinkStone = null;
    }

};

Object.defineProperty(StoneWall.prototype, 'position', {  //圖片位置 是該格的位置
    get: function () {
        return this.mapPosition;
    },
    set: function (newValue) {
        this.mapPosition = newValue;
        this.mapWall.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.mapLightBlueStone.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.mapLightPinkStone.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    }
});

Object.defineProperty(StoneWall.prototype, 'tileType', {
    get: function () {
        return this._tileType;
    },
    set: function (newValue) {
        this._tileType = newValue;
    }
}); 