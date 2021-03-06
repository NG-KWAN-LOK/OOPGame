var WinGame = Framework.Class(Framework.Level, {
    //初始化loadingProgress需要用到的圖片
    initializeProgressResource: function () {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = { x: Framework.Game.getCanvasWidth() / 2, y: Framework.Game.getCanvasHeight() / 2 };

        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
    },

    //在initialize時會觸發的事件
    loadingProgress: function (ctx, requestInfo) {
        //console.log(Framework.ResourceManager.getFinishedRequestPercent())
        this.loading.draw(ctx);
        ctx.font = '90px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%', ctx.canvas.width / 2, ctx.canvas.height / 2 + 300);
    },

    load: function () {
        this.menu = new Framework.Sprite(define.imagePath + 'winGame.png');
    },

    initialize: function () {


        this.counter = 0;
        this.gameOverCount = 50;
        //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
        //注意, Position都是用中心點
        this.menu.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        this.menu.scale = 2;
        this.rootScene.attach(this.menu);

        this.rectPosition = {
            x: Framework.Game.getCanvasWidth() / 2 - 130,
            y: Framework.Game.getCanvasHeight() / 2
        };
    },

    update: function () {
        //this.rootScene.update();一定要在第一行
        this.rootScene.update();


        if (this.counter > this.gameOverCount) {
            //Framework.Game.goToLevel('menu');
        }
        this.counter++;
    },

    draw: function (parentCtx) {
        //this.rootScene.draw();一定要在第一行
        this.rootScene.draw(parentCtx);
        this.menu.draw(parentCtx);
        //this.rootScene.draw();
        //可支援畫各種單純的圖形和字
        parentCtx.globalAlpha = 0.7;
        parentCtx.fillStyle = 'black'; //背景色
        parentCtx.fillRect(this.rectPosition.x - 150, this.rectPosition.y - 50, 650, 400); //框的大小
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.globalAlpha = 1;
        parentCtx.fillText('You Win The Game!', this.rectPosition.x + 160, this.rectPosition.y, 500);
        parentCtx.fillText('Press any key to continuous....', this.rectPosition.x + 160, this.rectPosition.y + 200, 500);
    },

    mouseup: function (e) {
    },

    mousedown: function (e) {
        Framework.Game.goToLevel("menu");
    },

    click: function (e) {
        Framework.Game.goToLevel("menu");

    },

    mousemove: function (e) {

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
    }
});