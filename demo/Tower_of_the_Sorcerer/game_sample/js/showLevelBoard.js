var ShowLevelBoard = function() {

    this._mapLevel = 0;
    this._position = {x:0,y:0};
    this.load = function()
    {
    }

    this.update = function(){
    }


    this.draw = function(ctx){
        ctx.globalAlpha=0.8;
        ctx.fillStyle = 'black'; //背景色
        ctx.fillRect(this._position.x - 10, this._position.y, 300, 100);    //框的大小
        ctx.font = '30pt Algerian';
        ctx.globalAlpha=1;
        ctx.fillStyle = 'yellow';   //字色?
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText("Level:  " + this._mapLevel , this._position.x, this._position.y);  //文字
    }

    this.setMapLevel = function(newMapLevel){
        this._mapLevel = newMapLevel;
    }
};

Object.defineProperty(ShowLevelBoard.prototype, 'position', {
    get: function() {
        return this._position;
    },
    set: function(newValue) {
        this._position = newValue;
    }
}); 
