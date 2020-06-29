var Bat = function (file, position) {  //畫面的object
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size

    this.smallBat = new Framework.AnimationSprite({ url: define.imagePath + 'e5.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.smallBat.scale = 2;
    this.smallBat.index = 1;

    this.bigBat = new Framework.AnimationSprite({ url: define.imagePath + 'e6.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.bigBat.scale = 2;
    this.bigBat.index = 1;

    this.smallBat.start({ from: 0, to: 1 });
    this.bigBat.start({ from: 0, to: 1 });
    var PIXEL_CONST = 64;

    this.mapPosition = { x: 0, y: 0 };
    this.spritePosition = {}
    this._tileType = 0;

    this._smallBatHP = 17;
    this._smallBatATK = 19;
    this._smallBatDEF = 1;
    this._smallBatGainCoin = 1;
    this._smallBatGainExp = 0;

    this._bigBatHP = 30;
    this._bigBatATK = 50;
    this._bigBatDEF = 4;
    this._bigBatGainCoin = 6;
    this._bigBatGainExp = 0;

    this._smallBatMinusHP = 0;
    this._bigBatMinusHP = 0;

    this.update = function () {
        this.smallBat.update();
        this.bigBat.update();
    }

    this.draw = function (ctx) {  //畫道具的圖??
        //ctx = monsterHpDisplay(ctx);
        this.mapFloor.draw(ctx);
        if (this._tileType === 38) {
            ctx = monsterHpDisplay(ctx, this._smallBatMinusHP);
            this.smallBat.draw(ctx);
            ctx.fillText(this._smallBatMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);

        }
        else if (this._tileType === 39) {
            ctx = monsterHpDisplay(ctx, this._bigBatMinusHP);
            this.bigBat.draw(ctx);
            ctx.fillText(this._bigBatMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);

        }
    }

    this.delete = function () {
        this.mapFloor = null;
        this.smallBat = null;
        this.bigBat = null;
    }

    this.setMinusHP = function (tileType, minusHP) {
        if (tileType === 38) {
            this._smallBatMinusHP = minusHP;
        }
        else if (tileType === 39) {
            this._bigBatMinusHP = minusHP;

        }
    }

    this.getHP = function (tileType) {
        if (tileType === 38) {
            return this._smallBatHP;
        }
        else if (tileType === 39) {
            return this._bigBatHP;
        }
    }

    this.getATK = function (tileType) {
        if (tileType === 38) {
            return this._smallBatATK;
        }
        else if (tileType === 39) {
            return this._bigBatATK;
        }
    }

    this.getDEF = function (tileType) {
        if (tileType === 38) {
            return this._smallBatDEF;
        }
        else if (tileType === 39) {
            return this._bigBatDEF;
        }
    }

    this.getGainCoin = function (tileType) {
        if (tileType === 38) {
            return this._smallBatGainCoin;
        }
        else if (tileType === 39) {
            return this._bigBatGainCoin;
        }
    }
    this.getGainExp = function (tileType) {
        if (tileType === 38) {
            return this._smallBatGainExp;
        }
        else if (tileType === 39) {
            return this._bigBatGainExp;
        }
    }

    this.getMinus = function (tileType) {
        if (tileType === 38) {
            return this._smallBatMinusHP;
        }
        else if (tileType === 39) {
            return this._bigBatMinusHP;
        }
    }
};

Object.defineProperty(Bat.prototype, 'position', {  //圖片位置 是該格的位置
    get: function () {
        return this.mapPosition;
    },
    set: function (newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.smallBat.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.bigBat.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    }
});

Object.defineProperty(Bat.prototype, 'tileType', {
    get: function () {
        return this._tileType;
    },
    set: function (newValue) {
        this._tileType = newValue;
    }
}); 