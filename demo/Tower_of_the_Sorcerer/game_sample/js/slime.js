var Slime = function (file, position) {  //畫面的object
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size

    this.greenSlime = new Framework.AnimationSprite({ url: define.imagePath + 'e1.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.greenSlime.scale = 2;

    this.redSlime = new Framework.AnimationSprite({ url: define.imagePath + 'e2.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.redSlime.scale = 2;

    this.blackSlime = new Framework.AnimationSprite({ url: define.imagePath + 'e3.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.blackSlime.scale = 2;

    this.slimeMan = new Framework.AnimationSprite({ url: define.imagePath + 'e16.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.slimeMan.scale = 2;

    this.greenSlime.start({ from: 0, to: 1, loop: true });
    this.redSlime.start({ from: 0, to: 1, loop: true });
    this.blackSlime.start({ from: 0, to: 1, loop: true });
    this.slimeMan.start({ from: 0, to: 1, loop: true });
    var PIXEL_CONST = 64;

    this.mapPosition = { x: 0, y: 0 };
    this.spritePosition = {}
    this._tileType = 0;

    this._greenSlimeHP = 17;
    this._greenSlimeATK = 9;
    this._greenSlimeDEF = 0;
    this._greenSlimeGainCoin = 0;
    this._greenSlimeGainExp = 0;

    this._redSlimeHP = 22;
    this._redSlimeATK = 10;
    this._redSlimeDEF = 1;
    this._redSlimeGainCoin = 1;
    this._redSlimeGainExp = 0;

    this._blackSlimeHP = 65;
    this._blackSlimeATK = 30;
    this._blackSlimeDEF = 1;
    this._blackSlimeGainCoin = 4;
    this._blackSlimeGainExp = 0;

    this._slimeManHP = 160;
    this._slimeManATK = 70;
    this._slimeManDEF = 1; 0
    this._slimeManGainCoin = 15;
    this._slimeManGainExp = 0;

    this._greenSlimeMinusHP = 0;
    this._redSlimeMinusHP = 0;
    this._blackSlimeMinusHP = 0;
    this._slimeManMinusHP = 0;

    this.update = function () {
        this.greenSlime.update();
        this.redSlime.update();
        this.blackSlime.update();
        this.slimeMan.update();
    }

    this.draw = function (ctx) {  //畫道具的圖??
        //ctx = monsterHpDisplay(ctx);
        this.mapFloor.draw(ctx);
        if (this._tileType === 30) {
            ctx = monsterHpDisplay(ctx, this._greenSlimeMinusHP);
            this.greenSlime.draw(ctx);
            ctx.fillText(this._greenSlimeMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);
        }
        else if (this._tileType === 31) {
            ctx = monsterHpDisplay(ctx, this._redSlimeMinusHP);
            this.redSlime.draw(ctx);
            ctx.fillText(this._redSlimeMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);
        }
        else if (this._tileType === 32) {
            ctx = monsterHpDisplay(ctx, this._blackSlimeMinusHP);
            this.blackSlime.draw(ctx);
            ctx.fillText(this._blackSlimeMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);
        }
        else if (this._tileType === 44) {
            ctx = monsterHpDisplay(ctx, this._slimeManMinusHP);
            this.slimeMan.draw(ctx);
            ctx.fillText(this._slimeManMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);
        }
    }

    this.delete = function () {
        this.mapFloor = null;
        this.greenSlime = null;
        this.redSlime = null;
        this.blackSlime = null;
        this.slimeMan = null;
    }

    this.setMinusHP = function (tileType, minusHP) {
        if (tileType === 30) {
            this._greenSlimeMinusHP = minusHP;
        }
        else if (tileType === 31) {
            this._redSlimeMinusHP = minusHP;

        }
        else if (tileType === 32) {
            this._blackSlimeMinusHP = minusHP;

        }
        else if (tileType === 44) {
            this._slimeManMinusHP = minusHP;
        }
    }

    this.getHP = function (tileType) {
        if (tileType === 30) {
            return this._greenSlimeHP;
        }
        else if (tileType === 31) {
            return this._redSlimeHP;
        }
        else if (tileType === 32) {
            return this._blackSlimeHP;
        }
        else if (tileType === 44) {
            return this._slimeManHP;
        }
    }

    this.getATK = function (tileType) {
        if (tileType === 30) {
            return this._greenSlimeATK;
        }
        else if (tileType === 31) {
            return this._redSlimeATK;
        }
        else if (tileType === 32) {
            return this._blackSlimeATK;
        }
        else if (tileType === 44) {
            return this._slimeManATK;
        }
    }

    this.getDEF = function (tileType) {
        if (tileType === 30) {
            return this._greenSlimeDEF;
        }
        else if (tileType === 31) {
            return this._redSlimeDEF;
        }
        else if (tileType === 32) {
            return this._blackSlimeDEF;
        }
        else if (tileType === 44) {
            return this._slimeManDEF;
        }
    }

    this.getGainCoin = function (tileType) {
        if (tileType === 30) {
            return this._greenSlimeGainCoin;
        }
        else if (tileType === 31) {
            return this._redSlimeGainCoin;
        }
        else if (tileType === 32) {
            return this._blackSlimeGainCoin;
        }
        else if (tileType === 44) {
            return this._slimeManGainCoin;
        }
    }
    this.getGainExp = function (tileType) {
        if (tileType === 30) {
            return this._greenSlimeGainExp;
        }
        else if (tileType === 31) {
            return this._redSlimeGainExp;
        }
        else if (tileType === 32) {
            return this._blackSlimeGainExp;
        }
        else if (tileType === 44) {
            return this._slimeManGainExp;
        }
    }
    this.getMinus = function (tileType) {
        if (tileType === 30) {
            return this._greenSlimeMinusHP;
        }
        else if (tileType === 31) {
            return this._redSlimeMinusHP;
        }
        else if (tileType === 32) {
            return this._blackSlimeMinusHP;
        }
        else if (tileType === 44) {
            return this._slimeManMinusHP;
        }
    }
};

Object.defineProperty(Slime.prototype, 'position', {  //圖片位置 是該格的位置
    get: function () {
        return this.mapPosition;
    },
    set: function (newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.greenSlime.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.redSlime.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.blackSlime.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.slimeMan.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    }
});

Object.defineProperty(Slime.prototype, 'tileType', {
    get: function () {
        return this._tileType;
    },
    set: function (newValue) {
        this._tileType = newValue;
    }
}); 