var NPCMessageBoard = function () {
  this._line_1 = "NPC_MESSAGE";
  this._line_2 = "";
  this._line_3 = "";
  this._line_4 = "";
  this._display = false;
  this._position = { x: 0, y: 0 };

  this.load = function () { };

  this.update = function () { };

  this.draw = function (ctx) {
    if (this.display) {
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = "black"; //背景色
      ctx.fillRect(this._position.x - 10, this._position.y, 900, 425); //框的大小
      ctx.font = "34pt Algerian";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#FFC300";
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.fillText(this._line_1, this._position.x + 60, this._position.y + 30);
      ctx.fillText(this._line_2, this._position.x + 60, this._position.y + 110);
      ctx.fillText(this._line_3, this._position.x + 60, this._position.y + 190);
      ctx.fillText(this._line_4, this._position.x + 275, this._position.y + 300);
    } else {
      ctx.globalAlpha = 0;
      ctx.fillRect(this._position.x - 10, this._position.y, 290, 150);
      ctx.fillText("", this._position.x, this._position.y + 20);
      ctx.globalAlpha = 1; //Render might be fucked up if you don't set it back
    }
  };

  this.setMessage = function (newLine_1 = "", newLine_2 = "", newLine_3 = "", confirm = false) {
    this._line_1 = newLine_1;
    this._line_2 = newLine_2;
    this._line_3 = newLine_3;
    if (confirm) {
      this._line_4 = "[Y]    [N]";
    } else {
      this._line_4 = "[space to dismiss]"
    }
    this.display = true;
  };
};

Object.defineProperty(NPCMessageBoard.prototype, "position", {
  get: function () {
    return this._position;
  },
  set: function (newValue) {
    this._position = newValue;
  },
});
