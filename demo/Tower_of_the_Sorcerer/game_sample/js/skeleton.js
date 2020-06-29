var Skeleton = function (file, position) {  //畫面的object
    this.mapFloor = new Framework.Sprite(define.imagePath + 'stone0.png');
    this.mapFloor.scale = 2;    //size

    this.skeletonMan = new Framework.AnimationSprite({ url: define.imagePath + 'e9.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.skeletonMan.scale = 2;
    this.skeletonMan.index = 1;

    this.skeletonSoldier = new Framework.AnimationSprite({ url: define.imagePath + 'e10.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.skeletonSoldier.scale = 2;
    this.skeletonSoldier.index = 1;

    this.skeletonCaptain = new Framework.AnimationSprite({ url: define.imagePath + 'e11.png', col: 2, row: 1, loop: true, speed: 0.98 });
    this.skeletonCaptain.scale = 2;
    this.skeletonCaptain.index = 1;

    this.skeletonMan.start({ from: 0, to: 1, loop: true, speed: 0.98 });
    this.skeletonSoldier.start({ from: 0, to: 1, loop: true, speed: 0.98 });
    this.skeletonCaptain.start({ from: 0, to: 1, loop: true, speed: 0.98 });
    var PIXEL_CONST = 64;

    this.mapPosition = { x: 0, y: 0 };
    this.spritePosition = {}
    this._tileType = 0;

    this._skeletonManHP = 25;
    this._skeletonManATK = 21;
    this._skeletonManDEF = 3;
    this._skeletonManGainCoin = 3;
    this._skeletonManGainExp = 0;

    this._skeletonSoldierHP = 27;
    this._skeletonSoldierATK = 26;
    this._skeletonSoldierDEF = 6;
    this._skeletonSoldierGainCoin = 4;
    this._skeletonSoldierGainExp = 0;

    this._skeletonCaptainHP = 50;
    this._skeletonCaptainATK = 32;
    this._skeletonCaptainDEF = 7;
    this._skeletonCaptainGainCoin = 15;
    this._skeletonCaptainGainExp = 0;

    this._skeletonManMinusHP = 0;
    this._skeletonSoldierMinusHP = 0;
    this._skeletonCaptainMinusHP = 0;

    this.update = function () {
        this.skeletonMan.update();
        this.skeletonSoldier.update();
        this.skeletonCaptain.update();
    }

    this.draw = function (ctx) {  //畫道具的圖??
        //ctx = monsterHpDisplay(ctx);
        this.mapFloor.draw(ctx);
        if (this._tileType === 33) {
            ctx = monsterHpDisplay(ctx, this._skeletonManMinusHP);
            this.skeletonMan.draw(ctx);
            ctx.fillText(this._skeletonManMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);
        }
        else if (this._tileType === 34) {
            ctx = monsterHpDisplay(ctx, this._skeletonSoldierHP);
            this.skeletonSoldier.draw(ctx);
            ctx.fillText(this._skeletonSoldierHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);
        }
        else if (this._tileType === 35) {
            ctx = monsterHpDisplay(ctx, this._skeletonCaptainMinusHP);
            this.skeletonCaptain.draw(ctx);
            ctx.fillText(this._skeletonCaptainMinusHP, ((this.mapPosition.x * 64) + 20), ((this.mapPosition.y * 64)) + 5);
        }
    }

    this.setMinusHP = function (tileType, minusHP) {
        if (tileType === 33) {
            this._skeletonManMinusHP = minusHP;
        }
        else if (tileType === 34) {
            this._skeletonSoldierMinusHP = minusHP;

        }
        else if (tileType === 35) {
            this._skeletonCaptainMinusHP = minusHP;

        }
    }

    this.delete = function () {
        this.mapFloor = null;
        this.skeletonMan = null;
        this.skeletonSoldier = null;
        this.skeletonCaptain = null;
    }

    this.getHP = function (tileType) {
        if (tileType === 33) {
            return this._skeletonManHP;
        }
        else if (tileType === 34) {
            return this._skeletonSoldierHP;
        }
        else if (tileType === 35) {
            return this._skeletonCaptainHP;
        }
    }
    this.getATK = function (tileType) {
        if (tileType === 33) {
            return this._skeletonManATK;
        }
        else if (tileType === 34) {
            return this._skeletonSoldierATK;
        }
        else if (tileType === 35) {
            return this._skeletonCaptainATK;
        }
    }
    this.getDEF = function (tileType) {
        if (tileType === 33) {
            return this._skeletonManDEF;
        }
        else if (tileType === 34) {
            return this._skeletonSoldierDEF;
        }
        else if (tileType === 35) {
            return this._skeletonCaptainDEF;
        }
    }
    this.getGainCoin = function (tileType) {
        if (tileType === 33) {
            return this._skeletonManGainCoin;
        }
        else if (tileType === 34) {
            return this._skeletonSoldierGainCoin;
        }
        else if (tileType === 35) {
            return this._skeletonCaptainGainCoin;
        }
    }
    this.getGainExp = function (tileType) {
        if (tileType === 33) {
            return this._skeletonManGainExp;
        }
        else if (tileType === 34) {
            return this._skeletonSoldierGainExp;
        }
        else if (tileType === 35) {
            return this._skeletonCaptainGainCoin;
        }
    }
    this.getMinus = function (tileType) {
        if (tileType === 33) {
            return this._skeletonManMinusHP;
        }
        else if (tileType === 34) {
            return this._skeletonSoldierMinusHP;
        }
        else if (tileType === 35) {
            return this._skeletonCaptainMinusHP;
        }
    }
};

Object.defineProperty(Skeleton.prototype, 'position', {  //圖片位置 是該格的位置
    get: function () {
        return this.mapPosition;
    },
    set: function (newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.skeletonMan.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.skeletonSoldier.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
        this.skeletonCaptain.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    }
});

Object.defineProperty(Skeleton.prototype, 'tileType', {
    get: function () {
        return this._tileType;
    },
    set: function (newValue) {
        this._tileType = newValue;
    }
}); 