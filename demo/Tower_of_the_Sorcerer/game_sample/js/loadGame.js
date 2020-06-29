//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
(function () {
  //動態依序載入JS
  //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
  var importJS = function (jsConf, src, lookFor) {
    var headID = document.getElementsByTagName("head")[0];
    var newJs = document.createElement("script");
    newJs.type = "text/javascript";
    newJs.src = jsConf[0].src;
    headID.appendChild(newJs);
    wait_for_script_load(jsConf, function () {
      jsConf.splice(0, 1);
      if (jsConf.length > 0) {
        importJS(jsConf, lookFor);

        if (typeof blanket != "undefined") {
          blanket.utils.cache[jsConf[0].src] = {};
          blanket.utils.attachScript({ url: jsConf[0].src }, function (
            content
          ) {
            blanket.instrument(
              { inputFile: content, inputFileName: jsConf[0].src },
              function (instrumented) {
                blanket.utils.cache[jsConf[0].src].loaded = true;
                blanket.utils.blanketEval(instrumented);
                blanket.requiringFile(jsConf[0].src, true);
              }
            );
          });
        }
      } else {
        loadGameEnd = true;
      }
    });
  };

  var wait_for_script_load = function (jsConf, callback) {
    var interval = setInterval(function () {
      if (typeof jsConf[0].lookFor === "undefined") {
        jsConf[0].lookFor = "";
      }

      if (jsConf[0].lookFor === "") {
        clearInterval(interval);
        callback();
      } else if (eval("typeof " + jsConf[0].lookFor) !== "undefined") {
        clearInterval(interval);
        callback();
      }
    }, 50);
  };

  //陣列和載入JS檔的順序相同, lookFor為在要載入的檔案中,
  //有用到的全域變數, importJS這個function, 會在找到lookFor的變數後
  //才會繼續loading下一個檔案, 如果沒有需要lookFor, 則以空字串代表
  var listScript = [
    { src: "game_sample/js/define.js", lookFor: "define" },
    { src: "game_sample/js/myMenu.js", lookFor: "MyMenu" },
    { src: "game_sample/js/myAbout.js", lookFor: "MyAbout" },
    { src: "game_sample/js/genderMenu.js", lookFor: "GenderMenu" },
    { src: "game_sample/js/constants.js", lookFor: "Constants" },
    { src: "game_sample/js/playerState.js", lookFor: "PlayerState" },
    { src: "game_sample/js/showLevelBoard.js", lookFor: "ShowLevelBoard" },
    { src: "game_sample/js/consoleBoard.js", lookFor: "ConsoleBoard" },
    { src: "game_sample/js/npcMessageBoard.js", lookFor: "NPCMessageBoard" },
    {
      src: "game_sample/js/yellowKeyItemInventory.js",
      lookFor: "YellowKeyItemInventory",
    },
    {
      src: "game_sample/js/blueKeyItemInventory.js",
      lookFor: "BlueKeyItemInventory",
    },
    {
      src: "game_sample/js/redKeyItemInventory.js",
      lookFor: "RedKeyItemInventory",
    },
    {
      src: "game_sample/js/ironKeyItemInventory.js",
      lookFor: "IronKeyItemInventory",
    },
    { src: "game_sample/js/settingBoard.js", lookFor: "SettingBoard" },
    { src: "game_sample/js/bombMan.js", lookFor: "BombMan" },
    { src: "game_sample/js/monster.js", lookFor: "Monster" },
    { src: "game_sample/js/box.js", lookFor: "Box" },
    { src: "game_sample/js/door.js", lookFor: "Door" },
    { src: "game_sample/js/animationWall.js", lookFor: "AnimationWall" },
    { src: "game_sample/js/slime.js", lookFor: "Slime" },
    { src: "game_sample/js/skeleton.js", lookFor: "Skeleton" },
    { src: "game_sample/js/zombie.js", lookFor: "Zombie" },
    { src: "game_sample/js/bat.js", lookFor: "Bat" },
    { src: "game_sample/js/priest.js", lookFor: "Priest" },
    { src: "game_sample/js/guard.js", lookFor: "Guard" },
    { src: "game_sample/js/squid.js", lookFor: "Squid" },
    { src: "game_sample/js/specialEnemys.js", lookFor: "SpecialEnemys" },
    { src: "game_sample/js/npc.js", lookFor: "NPC" },
    { src: "game_sample/js/store.js", lookFor: "Store" },
    { src: "game_sample/js/stoneWall.js", lookFor: "StoneWall" },
    { src: "game_sample/js/stage.js", lookFor: "Stage" },
    { src: "game_sample/js/keys.js", lookFor: "Keys" },
    { src: "game_sample/js/items.js", lookFor: "Items" },
    { src: "game_sample/js/gems.js", lookFor: "Gems" },
    { src: "game_sample/js/potions.js", lookFor: "Potions" },
    { src: "game_sample/js/doorPickAxe.js", lookFor: "DoorPickAxe" },
    { src: "game_sample/js/terrain.js", lookFor: "Terrain" },
    { src: "game_sample/js/mapTile.js", lookFor: "MapTile" },
    { src: "game_sample/js/map.js", lookFor: "Map" },
    { src: "game_sample/js/maleLevel.js", lookFor: "MaleLevel" },
    { src: "game_sample/js/femaleLevel.js", lookFor: "FemaleLevel" },
    { src: "game_sample/js/MonsterHpDisplay.js", lookFor: "monsterHpDisplay" },
    { src: "game_sample/js/gameOver.js", lookFor: "GameOver" },
    { src: "game_sample/js/winGame.js", lookFor: "WinGame" },
    { src: "game_sample/js/mainGame.js" },
  ];
  importJS(listScript);
})();
