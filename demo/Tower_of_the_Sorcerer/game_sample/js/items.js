var Items = function () {
  //畫面的object
  this.mapFloor = new Framework.Sprite(define.imagePath + "stone0.png");
  this.mapFloor.scale = 2; //size
  this.silverSword = new Framework.Sprite(define.imagePath + "i30.png");
  this.silverSword.scale = 2; //size
  this.ironShield = new Framework.Sprite(define.imagePath + "i31.png");
  this.ironShield.scale = 2; //size
  this.silverShield = new Framework.Sprite(define.imagePath + "i32.png");
  this.silverShield.scale = 2; //size
  this.ironSword = new Framework.Sprite(define.imagePath + "i28.png");
  this.ironSword.scale = 2; //size
  this.hollyWater = new Framework.Sprite(define.imagePath + "i35.png");
  this.hollyWater.scale = 2; //size

  this.mapPosition = { x: 0, y: 0 };
  this.spritePosition = {};
  this._tileType = 0;

  this.update = function () {

  };

  this.draw = function (ctx) {
    //畫道具的圖??
    this.mapFloor.draw(ctx);
    if (this._tileType === -14) {
      this.silverSword.draw(ctx);
    } else if (this._tileType === -15) {
      this.ironShield.draw(ctx);
    } else if (this._tileType === -16) {
      this.silverShield.draw(ctx);
    }
    else if (this._tileType === -17) {
      this.ironSword.draw(ctx);
    }
    else if (this._tileType === -18) {
      this.hollyWater.draw(ctx);
    }
  };

  this.delete = function () {
    this.mapFloor = null;
    this.silverSword = null;
    this.ironShield = null;
    this.silverShield = null;
    this.ironShield = null;
    this.hollyWater = null;
  };
};

Object.defineProperty(Items.prototype, "position", {
  //圖片位置 是該格的位置
  get: function () {
    return this.mapPosition;
  },
  set: function (newValue) {
    this.mapPosition = newValue;
    this.mapFloor.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    this.silverSword.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    this.ironShield.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    this.silverShield.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    this.ironSword.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
    this.hollyWater.position = { x: this.mapPosition.x * 64, y: this.mapPosition.y * 64 };
  }
});

Object.defineProperty(Items.prototype, "tileType", {
  get: function () {
    return this._tileType;
  },
  set: function (newValue) {
    this._tileType = newValue;
  }
});
