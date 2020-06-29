var ConsoleBoard = function () {

    this._line_1 = "";
    this._line_2 = "";
    this._line_3 = "";
    this._position = { x: 0, y: 0 };
    this.fadeOutCounter = 0;
    this.eventFlag = false;
    this.load = function () {
    }

    this.update = function () {
        this.fadeOutCounter++;
    }


    this.draw = function (ctx) {
        //console.log("Fade Out: " + this.fadeOutCounter);
        if (this.fadeOutCounter < 60 && this.eventFlag) {
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = '#212F3D'; //背景色
            ctx.fillRect(this._position.x - 10, this._position.y, 290, 150);    //框的大小
            ctx.font = '25pt Algerian';
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'orange';   //字色
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText(this._line_1, this._position.x, this._position.y + 20);  //文字
            ctx.fillText(this._line_2, this._position.x, this._position.y + 60);  //文字
            ctx.fillText(this._line_3, this._position.x, this._position.y + 100);  //文字
        } else {
            ctx.globalAlpha = 0;
            ctx.fillRect(this._position.x - 10, this._position.y, 290, 150);
            ctx.fillText("", this._position.x, this._position.y + 20);
            ctx.globalAlpha = 1; //Render might be fucked up if you don't set it back
            this.fadeOutCounter = 0;
            this.eventFlag = false;
        }
    }

    this.setMessage = function (newLine_1 = "", newLine_2 = "", newLine_3 = "") {
        this.fadeOutCounter = 0;
        this.eventFlag = true;
        this._line_1 = newLine_1;
        this._line_2 = newLine_2;
        this._line_3 = newLine_3;
    }
};

Object.defineProperty(ConsoleBoard.prototype, 'position', {
    get: function () {
        return this._position;
    },
    set: function (newValue) {
        this._position = newValue;
    }
}); 
