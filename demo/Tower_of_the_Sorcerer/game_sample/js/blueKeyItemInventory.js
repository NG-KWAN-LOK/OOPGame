
var BlueKeyItemInventory = function () {

    this._blueKey = 0;
    this._position = { x: 0, y: 0 };
    this.load = function () {
    }

    this.update = function () {
    }


    this.draw = function (ctx) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'black'; //背景色
        ctx.fillRect(this._position.x - 10, this._position.y, 100, 100);    //框的大小
        ctx.font = '30pt Algerian';
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'blue';   //字色?
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText(this._blueKey, this._position.x, this._position.y);  //文字
    }


    this.addBlueKey = function (bluekey) {
        this._blueKey += bluekey;
    }

};

Object.defineProperty(BlueKeyItemInventory.prototype, 'position', {
    get: function () {
        return this._position;
    },
    set: function (newValue) {
        this._position = newValue;
    }
}); 
