var Squid = function (file, position) {
  //畫面的object
  this.mapFloor = new Framework.Sprite(define.imagePath + "stone0.png");
  this.mapFloor.scale = 2; //size

  this.squid_1 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.1.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_1.scale = 2;
  this.squid_1.index = 1;
  this.squid_2 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.2.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_2.scale = 2;
  this.squid_2.index = 1;
  this.squid_3 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.3.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_3.scale = 2;
  this.squid_3.index = 13;
  this.squid_4 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.4.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_4.scale = 2;
  this.squid_4.index = 1;
  this.squid_5 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.5.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_5.scale = 2;
  this.squid_5.index = 1;
  this.squid_6 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.6.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_6.scale = 2;
  this.squid_6.index = 1;
  this.squid_7 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.7.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_7.scale = 2;
  this.squid_7.index = 1;
  this.squid_8 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.8.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_8.scale = 2;
  this.squid_8.index = 1;
  this.squid_9 = new Framework.AnimationSprite({
    url: define.imagePath + "n7.9.png",
    col: 2,
    row: 1,
    loop: true,
    speed: 0.98,
  });
  this.squid_9.scale = 2;
  this.squid_9.index = 1;
  this.squid_1.start({ from: 0, to: 1 });
  this.squid_2.start({ from: 0, to: 1 });
  this.squid_3.start({ from: 0, to: 1 });
  this.squid_4.start({ from: 0, to: 1 });
  this.squid_5.start({ from: 0, to: 1 });
  this.squid_6.start({ from: 0, to: 1 });
  this.squid_7.start({ from: 0, to: 1 });
  this.squid_8.start({ from: 0, to: 1 });
  this.squid_9.start({ from: 0, to: 1 });

  var PIXEL_CONST = 64;

  this.mapPosition = { x: 0, y: 0 };
  this.spritePosition = {};
  this._tileType = 0;

  this._squidHP = 600;
  this._squidATK = 90;
  this._squidDEF = 10;
  this._squidGainCoin = 500;
  this._squidGainExp = 0;

  this._squidMinusHP = 0;

  this.update = function () {
    this.squid_1.update();
    this.squid_2.update();
    this.squid_3.update();
    this.squid_4.update();
    this.squid_5.update();
    this.squid_6.update();
    this.squid_7.update();
    this.squid_8.update();
    this.squid_9.update();
  };

  this.draw = function (ctx) {
    //畫道具的圖??
    ctx = monsterHpDisplay(ctx, this._squidMinusHP);
    this.mapFloor.draw(ctx);
    if (this._tileType === 47) {
      this.squid_1.draw(ctx);
    } else if (this._tileType === 48) {
      this.squid_2.draw(ctx);
    } else if (this._tileType === 49) {
      this.squid_3.draw(ctx);
    } else if (this._tileType === 50) {
      this.squid_4.draw(ctx);
    } else if (this._tileType === 51) {
      this.squid_5.draw(ctx);
    } else if (this._tileType === 52) {
      this.squid_6.draw(ctx);
    } else if (this._tileType === 53) {
      this.squid_7.draw(ctx);
    } else if (this._tileType === 54) {
      this.squid_8.draw(ctx);
    } else if (this._tileType === 55) {
      this.squid_9.draw(ctx);
      ctx.fillText(
        this._squidMinusHP,
        this.mapPosition.x * 64 + 20,
        this.mapPosition.y * 64 + 5
      );
    }
  };

  this.delete = function () {
    this.mapFloor = null;
    this.squid_1 = null;
    this.squid_2 = null;
    this.squid_3 = null;
    this.squid_4 = null;
    this.squid_5 = null;
    this.squid_6 = null;
    this.squid_7 = null;
    this.squid_8 = null;
    this.squid_9 = null;
  };

  this.setMinusHP = function (tileType, minusHP) {
    if (tileType === 55) {
      this._squidMinusHP = minusHP;
    }
  };

  this.getHP = function (tileType) {
    return this._squidHP;
  };

  this.getATK = function (tileType) {
    return this._squidATK;
  };

  this.getDEF = function (tileType) {
    return this._squidDEF;
  };

  this.getGainCoin = function (tileType) {
    return this._squidGainCoin;
  };
  this.getGainExp = function (tileType) {
    return this._squidGainExp;
  };
  this.getMinus = function (tileType) {
    return this._squidMinusHP;
  };
};

Object.defineProperty(Squid.prototype, "position", {
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
    this.squid_1.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_2.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_3.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_4.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_5.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_6.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_7.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_8.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
    this.squid_9.position = {
      x: this.mapPosition.x * 64,
      y: this.mapPosition.y * 64,
    };
  },
});

Object.defineProperty(Squid.prototype, "tileType", {
  get: function () {
    return this._tileType;
  },
  set: function (newValue) {
    this._tileType = newValue;
  },
});
