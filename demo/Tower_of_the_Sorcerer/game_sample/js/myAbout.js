var MyAbout = Framework.exClass(Framework.GameMainMenu, {
  //初始化loadingProgress需要用到的圖片
  initializeProgressResource: function () {
    this.loading = new Framework.Sprite(define.imagePath + "loading.jpg");
    this.loading.position = {
      x: Framework.Game.getCanvasWidth() / 2,
      y: Framework.Game.getCanvasHeight() / 2,
    };

    //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)
  },

  //在initialize時會觸發的事件
  loadingProgress: function (ctx, requestInfo) {
    //console.log(Framework.ResourceManager.getFinishedRequestPercent())
    this.loading.draw(ctx);
    ctx.font = "90px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(
      Math.round(requestInfo.percent) + "%",
      ctx.canvas.width / 2,
      ctx.canvas.height / 2 + 300
    );
  },

  load: function () {
    this.menu = new Framework.Sprite(define.imagePath + "background.png");
  },

  initialize: function () {
    //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
    //注意, Position都是用中心點
    this.menu.position = {
      x: Framework.Game.getCanvasWidth() / 2,
      y: Framework.Game.getCanvasHeight() / 2,
    };
    this.menu.scale = 2;
    this.rootScene.attach(this.menu);

    this.rectPosition = {
      x: Framework.Game.getCanvasWidth() / 2 - 130,
      y: Framework.Game.getCanvasHeight() / 2,
    };
  },

  update: function () {
    //this.rootScene.update();一定要在第一行
    this.rootScene.update();

    //目前的Framework, 當任何一個GameObject不做attach時, 則必須要自行update
  },

  draw: function (parentCtx) {
    //this.rootScene.draw();一定要在第一行
    this.rootScene.draw(parentCtx);
    this.menu.draw(parentCtx);
    //this.rootScene.draw();
    //可支援畫各種單純的圖形和字
    parentCtx.fillStyle = "black"; //背景色
    parentCtx.fillRect(
      this.rectPosition.x - 250,
      this.rectPosition.y + 240,
      300,
      100
    ); //框的大小
    parentCtx.fillRect(
      this.rectPosition.x + 250,
      this.rectPosition.y + 240,
      300,
      100
    ); //框的大小
    parentCtx.font = "65pt bold";
    parentCtx.fillStyle = "white";
    parentCtx.textBaseline = "top";
    parentCtx.textAlign = "center";
    parentCtx.fillText(
      "Course: Object-Oriented Programming Labs",
      this.rectPosition.x + 160,
      this.rectPosition.y - 350,
      1000
    );
    parentCtx.fillText(
      "Professor: 陳偉凱",
      this.rectPosition.x + 160,
      this.rectPosition.y - 200,
      1000
    );
    parentCtx.fillText(
      "Game's Name: Tower of The Sorcerer (魔塔)",
      this.rectPosition.x + 160,
      this.rectPosition.y - 50,
      1000
    );
    parentCtx.fillText(
      "By: 吳軍樂　劉學逸 (Group 6)",
      this.rectPosition.x + 160,
      this.rectPosition.y + 100,
      1000
    );
    parentCtx.fillText(
      "Back To Menu",
      this.rectPosition.x - 100,
      this.rectPosition.y + 250,
      260
    );
    parentCtx.fillText(
      "Exit",
      this.rectPosition.x + 390,
      this.rectPosition.y + 250,
      260
    );
  },

  mouseup: function (e) { },

  mousedown: function (e) {
    //console.log為Browser提供的function, 可以在debugger的console內看到被印出的訊息
    if (e.x >= 418 && e.x <= 720 && e.y >= 688 && e.y <= 791) {
      //Framework.Game.goToNextLevel();
      Framework.Game.goToLevel("menu");
      console.log("is start button");
    } else if (e.x >= 920 && e.x <= 1217 && e.y >= 691 && e.y <= 788) {
      window.close();
      console.log("is exit button");
    } else {
      console.log("is not button");
    }
  },

  click: function (e) {
    //Framework.Game.goToNextLevel();
  },

  mousemove: function (e) {
    console.log(e.x + "  " + e.y);
  },

  mouseup: function (e) {
    this.isTouchArrow = false;
  },

  touchstart: function (e) {
    //為了要讓Mouse和Touch都有一樣的事件
    //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
    this.mousedown(e[0]);
  },

  touchend: function (e) {
    this.mouseup();
  },

  touchmove: function (e) {
    this.mousemove(e[0]);
  },
});
