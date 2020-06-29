var Priest = function (file, position) {  //畫面的object
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size

    this.bluePriest = new Framework.AnimationSprite({ url: define.imagePath + 'e17.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.bluePriest.scale = 2;
    this.bluePriest.index = 1;

    this.redPriest = new Framework.AnimationSprite({ url: define.imagePath + 'e18.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.redPriest.scale = 2;
    this.redPriest.index = 1;

    this.bluePriest.start({ from: 0, to: 1 });
    this.redPriest.start({ from: 0, to: 1 });
    var PIXEL_CONST = 64;

    this.mapPosition = { x: 0, y: 0 };
    this.spritePosition = {}
    this._tileType = 0;

    this._bluePriestHP = 30;
    this._bluePriestATK = 16;
    this._bluePriestDEF = 4;
    this._bluePriestGainCoin = 2;
    this._bluePriestGainExp = 0;

    this._redPriestHP = 50;
    this._redPriestATK = 47;
    this._redPriestDEF = 15;
    this._redPriestGainCoin = 11;
    this._redPriestGainExp = 0;

    this._bluePriestMinusHP = 0;
    this._redPriestMinusHP = 0;

    this.update = function () {
        this.bluePriest.update();
        this.redPriest.update();
    }

    this.draw = function (ctx) {  //畫道具的圖??
        //ctx = monsterHpDisplay(ctx);
        this.mapFloor.draw(ctx);
        if (this._tileType === 40) {
            ctx = monsterHpDisplay(ctx, this._bluePriestMinusHP);
            this.bluePriest.draw(ctx);
            ctx.fillText(this._bluePriestMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);

        }
        else if (this._tileType === 41) {
            ctx = monsterHpDisplay(ctx, this._redPriestMinusHP);
            this.redPriest.draw(ctx);
            ctx.fillText(this._redPriestMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);

        }
    }

    this.delete = function () {
        this.mapFloor = null;
        this.bluePriest = null;
        this.redPriest = null;
    }

    this.setMinusHP = function (tileType, minusHP) {
        if (tileType === 40) {
            this._bluePriestMinusHP = minusHP;
        }
        else if (tileType === 41) {
            this._redPriestMinusHP = minusHP;
        }
    }

    this.getHP = function (tileType) {
        if (tileType === 40) {
            return this._bluePriestHP;
        }
        else if (tileType === 41) {
            return this._redPriestHP;
        }
    }

    this.getATK = function (tileType) {
        if (tileType === 40) {
            return this._bluePriestATK;
        }
        else if (tileType === 41) {
            return this._redPriestATK;
        }
    }

    this.getDEF = function (tileType) {
        if (tileType === 40) {
            return this._bluePriestDEF;
        }
        else if (tileType === 41) {
            return this._redPriestDEF;
        }
    }

    this.getGainCoin = function (tileType) {
        if (tileType === 40) {
            return this._bluePriestGainCoin;
        }
        else if (tileType === 41) {
            return this._redPriestGainCoin;
        }
    }
    this.getGainExp = function (tileType) {
        if (tileType === 40) {
            return this._bluePriestGainExp;
        }
        else if (tileType === 41) {
            return this._redPriestGainExp;
        }
    }
    this.getMinus = function (tileType) {
        if (tileType === 40) {
            return this._bluePriestMinusHP;
        }
        else if (tileType === 41) {
            return this._redPriestMinusHP;
        }
    }
};

Object.defineProperty(Priest.prototype, 'position', {  //圖片位置 是該格的位置
    get: function () {
        return this.mapPosition;
    },
    set: function (newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.bluePriest.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.redPriest.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    }
});

Object.defineProperty(Priest.prototype, 'tileType', {
    get: function () {
        return this._tileType;
    },
    set: function (newValue) {
        this._tileType = newValue;
    }
}); 