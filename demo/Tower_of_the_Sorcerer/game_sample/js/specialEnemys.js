var SpecialEnemys = function (file, position) {
  //畫面的object
  this.mapFloor = new Framework.Sprite(define.imagePath + "stone0.png");
  this.mapFloor.scale = 2; //size

  this.whiteDoor = new Framework.AnimationSprite({
    url: define.imagePath + "d5.png",
    col: 5,
    row: 1,
    loop: false,
    speed: 8,
  });
  this.whiteDoor.scale = 2;
  this.whiteDoor.index = 1;

  this.rock = new Framework.AnimationSprite({
    url: define.imagePath + "e15.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.rock.scale = 2;
  this.rock.index = 1;

  this.vampire = new Framework.AnimationSprite({
    url: define.imagePath + "e8.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.vampire.scale = 2;
  this.vampire.index = 1;

  this.rock.start({ from: 0, to: 1 });
  this.vampire.start({ from: 0, to: 1 });
  this.whiteDoor.start({ from: 0, to: 4 });
  var PIXEL_CONST = 64;

  this.mapPosition = { x: 0, y: 0 };
  this.spritePosition = {};
  this._tileType = 0;
  this.doorOpened = false;
  this.frameCount = 0;

  this._rockHP = 10;
  this._rockATK = 50;
  this._rockDEF = 34;
  this._rockGainCoin = 14;
  this._rockGainExp = 0;

  this._vampireHP = 222;
  this._vampireATK = 199;
  this._vampireDEF = 33;
  this._vampireGainCoin = 24;
  this._vampireGainExp = 0;

  this._rockMinusHP = 0;
  this._vampireMinusHP = 0;

  this.update = function () {
    if (this._tileType === 99 && this.doorOpened && this.frameCount < 30) {
      console.log("door animation played");
      this.whiteDoor.update();
      this.frameCount++;
    }
    this.rock.update();
    this.vampire.update();
  };

  this.draw = function (ctx) {
    //畫道具的圖??
    //ctx = monsterHpDisplay(ctx);
    this.mapFloor.draw(ctx);
    if (this._tileType === 45) {
      ctx = monsterHpDisplay(ctx, this._rockMinusHP);
      this.rock.draw(ctx);
      ctx.fillText(
        this._rockMinusHP,
        this.mapPosition.x * 64 + 20,
        this.mapPosition.y * 64 + 5
      );
    } else if (this._tileType === 46) {
      ctx = monsterHpDisplay(ctx, this._vampireMinusHP);
      console.log(this._vampireHP);
      this.vampire.draw(ctx);
      ctx.fillText(
        this._vampireMinusHP,
        this.mapPosition.x * 64 + 20,
        this.mapPosition.y * 64 + 5
      );
    } else if (this._tileType === 99) {
      this.whiteDoor.draw(ctx);
    }
  };

  this.setMinusHP = function (tileType, minusHP) {
    if (tileType === 45) {
      this._rockMinusHP = minusHP;
    } else if (tileType === 46) {
      this._vampireMinusHP = minusHP;
    }
  };

  this.delete = function () {
    this.mapFloor = null;
    this.rock = null;
    this.vampire = null;
    this.whiteDoor = null;
  };

  this.getHP = function (tileType) {
    if (tileType === 45) {
      return this._rockHP;
    } else if (tileType === 46) {
      return this._vampireHP;
    }
  };

  this.getATK = function (tileType) {
    if (tileType === 45) {
      return this._rockATK;
    } else if (tileType === 46) {
      return this._vampireATK;
    }
  };

  this.getDEF = function (tileType) {
    if (tileType === 45) {
      return this._rockDEF;
    } else if (tileType === 46) {
      return this._vampireDEF;
    }
  };

  this.getGainCoin = function (tileType) {
    if (tileType === 45) {
      return this._rockGainCoin;
    } else if (tileType === 46) {
      return this._vampireGainCoin;
    }
  };
  this.getGainExp = function (tileType) {
    if (tileType === 45) {
      return this._rockGainExp;
    } else if (tileType === 46) {
      return this._vampireGainExp;
    }
  };
  this.getMinus = function (tileType) {
    if (tileType === 45) {
      return this._rockMinusHP;
    } else if (tileType === 46) {
      return this._vampireMinusHP;
    }
  };
};

Object.defineProperty(SpecialEnemys.prototype, "position", {
  //圖片位置 是該格的位置
  get: function () {
    return this.mapPosition;
  },
  set: function (newValue) {
    this.mapPosition = newValue;
    this.mapFloor.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.rock.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.vampire.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.whiteDoor.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
  },
});

Object.defineProperty(SpecialEnemys.prototype, "tileType", {
  get: function () {
    return this._tileType;
  },
  set: function (newValue) {
    this._tileType = newValue;
  },
});
