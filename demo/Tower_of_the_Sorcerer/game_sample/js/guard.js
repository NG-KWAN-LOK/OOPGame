var Guard = function (file, position) {
  //畫面的object
  this.mapFloor = new Framework.Sprite(define.imagePath + "stone0.png");
  this.mapFloor.scale = 2; //size

  this.yellowGuard = new Framework.AnimationSprite({
    url: define.imagePath + "e21.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.yellowGuard.scale = 2;
  this.yellowGuard.index = 1;

  this.blueGuard = new Framework.AnimationSprite({
    url: define.imagePath + "e22.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.blueGuard.scale = 2;
  this.blueGuard.index = 1;

  this.yellowGuard.start({ from: 0, to: 1 });
  this.blueGuard.start({ from: 0, to: 1 });
  var PIXEL_CONST = 64;

  this.mapPosition = { x: 0, y: 0 };
  this.spritePosition = {};
  this._tileType = 0;

  this._yellowGuardHP = 25;
  this._yellowGuardATK = 22;
  this._yellowGuardDEF = 11;
  this._yellowGuardGainCoin = 6;
  this._yellowGuardGainExp = 0;

  this._blueGuardHP = 50;
  this._blueGuardATK = 90;
  this._blueGuardDEF = 55;
  this._blueGuardGainCoin = 25;
  this._blueGuardGainExp = 0;

  this._yellowGuardMinusHP = 0;
  this._blueGuardMinusHP = 0;

  this.update = function () {
    this.yellowGuard.update();
    this.blueGuard.update();
  };

  this.draw = function (ctx) {
    //畫道具的圖??
    //ctx = monsterHpDisplay(ctx);
    this.mapFloor.draw(ctx);
    if (this._tileType === 42) {
      ctx = monsterHpDisplay(ctx, this._yellowGuardMinusHP);
      this.yellowGuard.draw(ctx);
      ctx.fillText(
        this._yellowGuardMinusHP,
        this.mapPosition.x * 64 + 20,
        this.mapPosition.y * 64 + 5
      );
    } else if (this._tileType === 43) {
      ctx = monsterHpDisplay(ctx, this._blueGuardMinusHP);
      this.blueGuard.draw(ctx);
      ctx.fillText(
        this._blueGuardMinusHP,
        this.mapPosition.x * 64 + 20,
        this.mapPosition.y * 64 + 5
      );
    }
  };

  this.delete = function () {
    this.mapFloor = null;
    this.yellowGuard = null;
    this.blueGuard = null;
  };

  this.setMinusHP = function (tileType, minusHP) {
    if (tileType === 42) {
      this._yellowGuardMinusHP = minusHP;
    } else if (tileType === 43) {
      this._blueGuardMinusHP = minusHP;
    }
  };

  this.getHP = function (tileType) {
    if (tileType === 42) {
      return this._yellowGuardHP;
    } else if (tileType === 43) {
      return this._blueGuardHP;
    }
  };

  this.getATK = function (tileType) {
    if (tileType === 42) {
      return this._yellowGuardATK;
    } else if (tileType === 43) {
      return this._blueGuardATK;
    }
  };

  this.getDEF = function (tileType) {
    if (tileType === 42) {
      return this._yellowGuardDEF;
    } else if (tileType === 43) {
      return this._blueGuardDEF;
    }
  };

  this.getGainCoin = function (tileType) {
    if (tileType === 42) {
      return this._yellowGuardGainCoin;
    } else if (tileType === 43) {
      return this._blueGuardGainCoin;
    }
  };
  this.getGainExp = function (tileType) {
    if (tileType === 42) {
      return this._yellowGuardGainExp;
    } else if (tileType === 43) {
      return this._blueGuardGainExp;
    }
  };
  this.getMinus = function (tileType) {
    if (tileType === 42) {
      return this._yellowGuardMinusHP;
    }
    else if (tileType === 43) {
      return this._blueGuardMinusHP;
    }
  }
};

Object.defineProperty(Guard.prototype, "position", {
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
    this.yellowGuard.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.blueGuard.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
  },
});

Object.defineProperty(Guard.prototype, "tileType", {
  get: function () {
    return this._tileType;
  },
  set: function (newValue) {
    this._tileType = newValue;
  },
});
