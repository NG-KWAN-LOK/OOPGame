var Map = function (
  map,
  playerPosition //碰撞框事件的object
) {
  var m_map = this;
  var mapPosition = 0;
  this.mapList = map;
  this.mapArray = this.mapList.terrainList[mapPosition]; //設定顯示第幾張地圖
  this.playerSpwanPositionArray = this.mapList.spwanPositionList[mapPosition]; //設定player在第幾張地圖的重生點位置
  this.npcArray = this.mapList.npcList[mapPosition]; //設定npc的內容
  var tempPlayerPosition = { x: 0, y: 0 };
  var _levelBoss = false;
  var _level10MonsterCounter = 0;
  var _winGameFlag = false;
  var _loseGameFlag = false;
  var _fairyChatCounter = 0;
  var _isFairyChat = false;
  var storeUsages = 0;
  console.log(this.playerSpwanPositionArray);
  this.audio = new Framework.Audio({
    bgm1: { mp3: define.musicPath + "bgm1.mp3" },
    bgm2: { mp3: define.musicPath + "bgm2.mp3" },
    attack: { mp3: define.musicPath + "attack.mp3" },
    door: { mp3: define.musicPath + "door.mp3" },
    item: { mp3: define.musicPath + "item.mp3" },
    gate: { mp3: define.musicPath + "gate.mp3" },
    floor: { mp3: define.musicPath + "floor.mp3" },
    tryOpen: { mp3: define.musicPath + "tryOpen.mp3" },
  });
  this.playBGM = function (index) {
    var i = 0;
    if (index === 1) {
      for (i = 1; i >= 0; i -= 0.001) {
        this.audio.setVolume("bgm2", i);
      }
      this.audio.stop("bgm2");
      this.audio.play({ name: "bgm1", loop: true });
      for (i = 0; i <= 1; i += 0.001) {
        this.audio.setVolume("bgm1", i);
      }
    } else if (index === 2) {
      for (i = 1; i >= 0; i -= 0.001) {
        this.audio.setVolume("bgm1", i);
      }
      this.audio.stop("bgm1");
      this.audio.play({ name: "bgm2", loop: true });
      for (i = 0; i <= 1; i += 0.001) {
        this.audio.setVolume("bgm2", i);
      }
    } else if (index === 3) {
      this.audio.stop("bgm1");
      this.audio.stop("bgm2");
    } else {
      this.audio.play({ name: "bgm1", loop: true });
    }
  };
  this.playBGM(0);
  this.load = function () {
    this._numDoorPickAxe = 0;
    this.constants = new Constants();
    this.showLevelBoard = new ShowLevelBoard();
    this.showLevelBoard.position = { x: 200, y: 0 }; //分數板位置
    this.consoleBoard = new ConsoleBoard();
    this.consoleBoard.position = { x: 510, y: 500 };
    this.npcMessageBoard = new NPCMessageBoard();
    this.npcMessageBoard.position = { x: 600, y: 200 };
    this.playerState = new PlayerState();
    this.playerState.position = { x: 200, y: 100 }; //分數板位置
    this.yellowKeyItemInventory = new YellowKeyItemInventory();
    this.yellowKeyItemInventory.position = { x: 200, y: 600 }; //分數板位置
    this.blueKeyItemInventory = new BlueKeyItemInventory();
    this.blueKeyItemInventory.position = { x: 300, y: 600 }; //分數板位置
    this.redKeyItemInventory = new RedKeyItemInventory();
    this.redKeyItemInventory.position = { x: 400, y: 600 }; //分數板位置
    this.ironKeyItemInventory = new IronKeyItemInventory();
    this.ironKeyItemInventory.position = { x: 300, y: 700 }; //分數板位置
    this.settingBoard = new SettingBoard();
    this.settingBoard.position = { x: 500, y: 700 }; //分數板位置
    this.fightAnimation = new Framework.AnimationSprite({
      url: define.imagePath + "fight.png",
      col: 3,
      row: 1,
      loop: false,
      speed: 3,
    });
    this.fightAnimation.scale = 2;
    this.fightAnimation.index = 2;
    this.mapFloor = new Framework.Sprite(
      define.imagePath + "stone0.png",
      this,
      { down: { from: 0 } }
    ); //定義floor2
    this.mapWall = new Framework.Sprite(define.imagePath + "stone1.png"); //定義treeStone
    this.mapLightBlueStone = new Framework.Sprite(
      define.imagePath + "stone.png"
    ); //定義treeStone

    this.mapLightPinkStone = new Framework.Sprite(
      define.imagePath + "stone2.png"
    );

    var lavaWall = new Framework.AnimationSprite({
      url: define.imagePath + "lava.png",
      col: 4,
      row: 1,
      loop: true,
      speed: 6,
    });
    var skyWall = new Framework.AnimationSprite({
      url: define.imagePath + "sky.png",
      col: 4,
      row: 1,
      loop: true,
      speed: 6,
    });
    var yellowDoor = new Framework.AnimationSprite({
      url: define.imagePath + "d1.png",
      col: 4,
      row: 1,
      loop: true,
      speed: 6,
    });
    var blueDoor = new Framework.AnimationSprite({
      url: define.imagePath + "d2.png",
      col: 4,
      row: 1,
      loop: true,
      speed: 6,
    });
    var redDoor = new Framework.AnimationSprite({
      url: define.imagePath + "d3.png",
      col: 4,
      row: 1,
      loop: true,
      speed: 6,
    });
    var ironDoor = new Framework.AnimationSprite({
      url: define.imagePath + "d6.png",
      col: 4,
      row: 1,
      loop: true,
      speed: 6,
    });
    var whiteDoor = new Framework.AnimationSprite({
      url: define.imagePath + "d5.png",
      col: 4,
      row: 1,
      loop: true,
      speed: 6,
    });
    var newMonster = new Monster(define.imagePath + "monster.png", this, {
      down: { from: 0, to: 2 },
      left: { from: 3, to: 5 },
      right: { from: 6, to: 8 },
      up: { from: 9, to: 11 },
    }); //定義

    this.stageDown = new Framework.Sprite(define.imagePath + "doordown.png");
    this.stageUp = new Framework.Sprite(define.imagePath + "doorup.png");

    this.yellowKey = new Framework.Sprite(define.imagePath + "i1.png"); //定義道具甲
    this.blueKey = new Framework.Sprite(define.imagePath + "i2.png"); //定義道具乙
    this.redKey = new Framework.Sprite(define.imagePath + "i3.png"); //定義道具丙
    this.doorPickAxe = new Framework.Sprite(define.imagePath + "i27.png"); //定義道具丙
    this.ironKey = new Framework.Sprite(define.imagePath + "i5.png"); //定義道具丙
    this.redGem = new Framework.Sprite(define.imagePath + "i16.png");
    this.blueGem = new Framework.Sprite(define.imagePath + "i17.png");
    this.redPotion = new Framework.Sprite(define.imagePath + "i20.png");
    this.bluePotion = new Framework.Sprite(define.imagePath + "i21.png");
    this.silverSword = new Framework.Sprite(define.imagePath + "i30.png");
    this.ironShield = new Framework.Sprite(define.imagePath + "i31.png");
    this.silverShield = new Framework.Sprite(define.imagePath + "i32.png");
    this.ironSword = new Framework.Sprite(define.imagePath + "i28.png");
    this.hollyWater = new Framework.Sprite(define.imagePath + "i35.png");
    this.blueShop0 = new Framework.Sprite(define.imagePath + "s25.png");
    this.blueShop1 = new Framework.Sprite(
      define.imagePath + "NPC01-02_3_1.png"
    );
    this.blueShop2 = new Framework.Sprite(define.imagePath + "s26.png");
    if (this.mapList.terrainList[0][0][0] === -99) {
      this.player1 = new BombMan(define.imagePath + "player1.png", {
        down: { from: 0, to: 2 },
        left: { from: 3, to: 5 },
        right: { from: 6, to: 8 },
        up: { from: 9, to: 11 },
      }); //定義 玩家
    } else {
      this.player1 = new BombMan(define.imagePath + "player2.png", {
        down: { from: 0, to: 2 },
        left: { from: 3, to: 5 },
        right: { from: 6, to: 8 },
        up: { from: 9, to: 11 },
      });
    }
    this.player1.position = { x: 1, y: 1 }; //初始玩家位置 可以用.setPlayerPosition(x:,y:)改

    var greenSlime = new Framework.AnimationSprite({
      url: define.imagePath + "e1.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var redSlime = new Framework.AnimationSprite({
      url: define.imagePath + "e2.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var blackSlime = new Framework.AnimationSprite({
      url: define.imagePath + "e3.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var skeletonMan = new Framework.AnimationSprite({
      url: define.imagePath + "e9.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 1,
    });
    var skeletonSoldier = new Framework.AnimationSprite({
      url: define.imagePath + "e10.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var skeletonCaptain = new Framework.AnimationSprite({
      url: define.imagePath + "e11.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var zombieMan = new Framework.AnimationSprite({
      url: define.imagePath + "e13.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var zombieKnight = new Framework.AnimationSprite({
      url: define.imagePath + "e14.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var smallBat = new Framework.AnimationSprite({
      url: define.imagePath + "e5.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var bigBat = new Framework.AnimationSprite({
      url: define.imagePath + "e6.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var bluePriest = new Framework.AnimationSprite({
      url: define.imagePath + "e17.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var redPriest = new Framework.AnimationSprite({
      url: define.imagePath + "e18.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var yellowGuard = new Framework.AnimationSprite({
      url: define.imagePath + "e21.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var blueGuard = new Framework.AnimationSprite({
      url: define.imagePath + "e22.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var slimeMan = new Framework.AnimationSprite({
      url: define.imagePath + "e16.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_1 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.1.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_2 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.2.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_3 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.3.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_4 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.4.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_5 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.5.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_6 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.6.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_7 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.7.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_8 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.8.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var squid_9 = new Framework.AnimationSprite({
      url: define.imagePath + "n7.9.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var rock = new Framework.AnimationSprite({
      url: define.imagePath + "e15.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var vampire = new Framework.AnimationSprite({
      url: define.imagePath + "e8.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var man = new Framework.AnimationSprite({
      url: define.imagePath + "n1.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var woman = new Framework.AnimationSprite({
      url: define.imagePath + "n2.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var thief = new Framework.AnimationSprite({
      url: define.imagePath + "n3.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var oldMan = new Framework.AnimationSprite({
      url: define.imagePath + "n1.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });
    var princess = new Framework.AnimationSprite({
      url: define.imagePath + "n6.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });

    var princess = new Framework.AnimationSprite({
      url: define.imagePath + "e30.png",
      col: 2,
      row: 1,
      loop: true,
      speed: 6,
    });

    this.monster = []; //有n個怪物 怪物array
    this.stopMonster = false;
    this.stopMonsterCounter = 0;
  };

  this.init = function () {
    this.player1.StepMovedCallBack = []; //delete
    this.deleteTileArray();
    this.player1.StepMovedCallBack.push(this.playerMovedHandler);
    this.tileArray = [];

    for (var i = 0; i < this.mapArray.length; i++) {
      //道具
      var line = this.mapArray[i];
      for (var j = 0; j < line.length; j++) {
        if (
          line[j] === this.constants.ItemEnum.STONE_WALL ||
          line[j] === this.constants.ItemEnum.BLUE_STONE ||
          line[j] === this.constants.ItemEnum.PINK_STONE
        ) {
          var stoneWall = new StoneWall();
          stoneWall.position = { x: j, y: i };
          stoneWall.tileType = line[j];
          this.tileArray.push(stoneWall);
        } else if (
          line[j] === this.constants.ItemEnum.LAVA_WALL ||
          line[j] === this.constants.ItemEnum.SKY_WALL
        ) {
          var animationWall = new AnimationWall();
          animationWall.position = { x: j, y: i };
          animationWall.tileType = line[j];
          this.tileArray.push(animationWall);
        } else if (
          line[j] >= this.constants.ItemEnum.YELLOW_DOOR &&
          line[j] <= this.constants.ItemEnum.WHITE_DOOR
        ) {
          var door = new Door();
          door.position = { x: j, y: i };
          door.tileType = line[j];
          this.tileArray.push(door);
        } else if (
          line[j] <= this.constants.ItemEnum.YELLOW_KEY &&
          line[j] >= this.constants.ItemEnum.IRON_KEY
        ) {
          var keys = new Keys();
          keys.position = { x: j, y: i };
          keys.tileType = line[j];
          this.tileArray.push(keys);
        } else if (
          line[j] === this.constants.ItemEnum.STAGE_UP ||
          line[j] === this.constants.ItemEnum.STAGE_DOWN
        ) {
          //console.log("init stage");
          var stage = new Stage();
          stage.position = { x: j, y: i };
          stage.tileType = line[j];
          this.tileArray.push(stage);
        } else if (line[j] === this.constants.ItemEnum.DOOR_PICK_AXE) {
          var doorPickAxe = new DoorPickAxe();
          doorPickAxe.position = { x: j, y: i };
          doorPickAxe.tileType = line[j];
          this.tileArray.push(doorPickAxe);
        } else if (
          line[j] === this.constants.ItemEnum.RED_GEM ||
          line[j] === this.constants.ItemEnum.BLUE_GEM
        ) {
          var gems = new Gems();
          gems.position = { x: j, y: i };
          gems.tileType = line[j];
          this.tileArray.push(gems);
        } else if (
          (line[j] >= this.constants.ItemEnum.GREEN_SLIME &&
            line[j] <= this.constants.ItemEnum.BLACK_SLIME) ||
          line[j] === this.constants.ItemEnum.SLIME_MAN
        ) {
          var slime = new Slime();
          slime.position = { x: j, y: i };
          slime.tileType = line[j];
          this.tileArray.push(slime);
        } else if (
          line[j] === this.constants.ItemEnum.RED_POTION ||
          line[j] === this.constants.ItemEnum.BLUE_POTION
        ) {
          var potion = new Potions();
          potion.position = { x: j, y: i };
          potion.tileType = line[j];
          this.tileArray.push(potion);
        } else if (
          line[j] <= this.constants.ItemEnum.SILVER_SWORD &&
          line[j] >= this.constants.ItemEnum.HOLLY_WATER
        ) {
          var items = new Items();
          items.position = { x: j, y: i };
          items.tileType = line[j];
          this.tileArray.push(items);
        } else if (
          line[j] >= this.constants.ItemEnum.SKELETON_MAN &&
          line[j] <= this.constants.ItemEnum.SKELETON_CAPTAIN
        ) {
          var skeleton = new Skeleton();
          skeleton.position = { x: j, y: i };
          skeleton.tileType = line[j];
          this.tileArray.push(skeleton);
        } else if (
          line[j] >= this.constants.ItemEnum.ZOMBIE_MAN &&
          line[j] <= this.constants.ItemEnum.ZOMBIE_KNIGHT
        ) {
          var zombie = new Zombie();
          zombie.position = { x: j, y: i };
          zombie.tileType = line[j];
          this.tileArray.push(zombie);
        } else if (
          line[j] >= this.constants.ItemEnum.SMALL_BAT &&
          line[j] <= this.constants.ItemEnum.BIG_BAT
        ) {
          var bat = new Bat();
          bat.position = { x: j, y: i };
          bat.tileType = line[j];
          this.tileArray.push(bat);
        } else if (
          line[j] >= this.constants.ItemEnum.BLUE_PRIEST &&
          line[j] <= this.constants.ItemEnum.RED_PRIEST
        ) {
          var priest = new Priest();
          priest.position = { x: j, y: i };
          priest.tileType = line[j];
          this.tileArray.push(priest);
        } else if (
          line[j] >= this.constants.ItemEnum.YELLOW_GUARD &&
          line[j] <= this.constants.ItemEnum.BLUE_GUARD
        ) {
          var guard = new Guard();
          guard.position = { x: j, y: i };
          guard.tileType = line[j];
          this.tileArray.push(guard);
        } else if (
          (line[j] >= this.constants.ItemEnum.ROCK &&
            line[j] <= this.constants.ItemEnum.VAMPIRE) ||
          line[j] === this.constants.ItemEnum.VAMPIRE_WHITE_DOOR
        ) {
          var specialEnemys = new SpecialEnemys();
          specialEnemys.position = { x: j, y: i };
          specialEnemys.tileType = line[j];
          this.tileArray.push(specialEnemys);
        } else if (
          line[j] >= this.constants.ItemEnum.FAIRY_NPC &&
          line[j] <= this.constants.ItemEnum.OLD_MAN_NPC
        ) {
          var npc = new NPC();
          npc.position = { x: j, y: i };
          npc.tileType = line[j];
          this.tileArray.push(npc);
        } else if (
          line[j] >= this.constants.ItemEnum.SQUID_1 &&
          line[j] <= this.constants.ItemEnum.SQUID_9
        ) {
          var squid = new Squid();
          squid.position = { x: j, y: i };
          squid.tileType = line[j];
          this.tileArray.push(squid);
        } else {
          var tile = new MapTile();
          tile.position = { x: j, y: i };
          tile.tileType = line[j];
          this.tileArray.push(tile);
        }
      }
    }
    this.setMonsterMinusHP();
  };

  this.setMapPosition = function (newMapPosition) {
    //切換地圖
    mapPosition = newMapPosition;
    console.log("Map Position: " + mapPosition);
    this.mapArray = this.mapList.terrainList[mapPosition]; //設定顯示第幾張地圖
    this.showLevelBoard.setMapLevel(mapPosition);
    this.init();
  };

  this.deleteTileArray = function () {
    if (this.tileArray != null) {
      for (var i = 0; i < this.tileArray.length; i++) {
        this.tileArray[i].delete();
      }
      this.tileArray = null; //delete
    }
  };

  this.setPlayerPosition = function (playerPosition) {
    //改玩家位置
    this.player1.position = playerPosition;
  };
  this.addMonster = function (monsterPosition) {
    var newMonster = new Monster(define.imagePath + "monster.png", this, {
      down: { from: 0, to: 2 },
      left: { from: 3, to: 5 },
      right: { from: 6, to: 8 },
      up: { from: 9, to: 11 },
    });
    newMonster.position = monsterPosition;
    this.monster.push(newMonster);
  };

  this.playerMovedHandler = function (player) {
    //玩家移到道具後事件 Interact with item
    var item = m_map.mapArray[player.position.y][player.position.x];
    if (item === m_map.constants.ItemEnum.STAGE_UP) {
      //上樓
      m_map.audio.play({ name: "floor", loop: false });
      m_map.setMapPosition(++mapPosition);
      m_map.setPlayerPosition(m_map.mapList["position" + mapPosition][0]);
    } else if (item === m_map.constants.ItemEnum.STAGE_DOWN) {
      //下樓
      m_map.audio.play({ name: "floor", loop: false });
      m_map.setMapPosition(--mapPosition);
      m_map.setPlayerPosition(m_map.mapList["position" + mapPosition][1]);
    } else if (item === m_map.constants.ItemEnum.YELLOW_KEY) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0; //碰撞盒換成0
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0; //圖片換成0
      m_map.yellowKeyItemInventory.addYellowKey(1);
      m_map.consoleBoard.setMessage("Get:", "Yellow Key !");
    } else if (item === m_map.constants.ItemEnum.BLUE_KEY) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.blueKeyItemInventory.addBlueKey(1);
      m_map.consoleBoard.setMessage("Get:", "Blue Key !");
    } else if (item === m_map.constants.ItemEnum.RED_KEY) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.consoleBoard.setMessage("Get:", "Red Key !");
      m_map.redKeyItemInventory.addRedKey(1);
    } else if (item === m_map.constants.ItemEnum.IRON_KEY) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.ironKeyItemInventory.addIronKey(1);
      m_map.consoleBoard.setMessage("Get:", "Iron Key !");
      console.log(m_map._numIronKey);
    } else if (item === m_map.constants.ItemEnum.DOOR_PICK_AXE) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map._numDoorPickAxe = 1;
      m_map.consoleBoard.setMessage("Get:", "Pick Axe !");
    } else if (item === m_map.constants.ItemEnum.RED_GEM) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increasePower(3);
      m_map.consoleBoard.setMessage("Get:", "Red Gem !", "ATK +3");
      m_map.setMonsterMinusHP();
    } else if (item === m_map.constants.ItemEnum.BLUE_GEM) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increaseDef(3);
      m_map.consoleBoard.setMessage("Get:", "Blue Gem !", "DEF +3");
      m_map.setMonsterMinusHP();
    } else if (item === m_map.constants.ItemEnum.RED_POTION) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increaseHp(0);
      m_map.consoleBoard.setMessage("This potion is", "deteriorated!");
    } else if (item === m_map.constants.ItemEnum.BLUE_POTION) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increaseHp(0);
      m_map.consoleBoard.setMessage("This potion is", "deteriorated!");
    } else if (item === m_map.constants.ItemEnum.SILVER_SWORD) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increasePower(10);
      m_map.consoleBoard.setMessage("Get:", "Silver Sword !", "ATK +10");
      m_map.setMonsterMinusHP();
    } else if (item === m_map.constants.ItemEnum.IRON_SHIELD) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increaseDef(5);
      m_map.consoleBoard.setMessage("Get:", "Iron Shield !", "DEF +5");
      m_map.setMonsterMinusHP();
    } else if (item === m_map.constants.ItemEnum.SILVER_SHIELD) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increaseDef(10);
      m_map.consoleBoard.setMessage("Get:", "Silver Shield !", "DEF +10");
      m_map.setMonsterMinusHP();
    } else if (item === m_map.constants.ItemEnum.IRON_SWORD) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.increasePower(5);
      m_map.consoleBoard.setMessage("Get:", "Iron Sword !", "ATK +5");
      m_map.setMonsterMinusHP();
    } else if (item === m_map.constants.ItemEnum.HOLLY_WATER) {
      m_map.audio.play({ name: "item", loop: false });
      m_map.mapArray[player.position.y][player.position.x] = 0;
      m_map.tileArray[player.position.y * 26 + player.position.x].tileType = 0;
      m_map.playerState.doubleHp();
      m_map.consoleBoard.setMessage("Get:", "Holly Water !", "HP DOUBLED");
      m_map.setMonsterMinusHP();
    }

    if (mapPosition === 20) {
      if (
        player.position.y === 8 &&
        player.position.x === 19 &&
        _levelBoss === false
      ) {
        m_map.audio.play({ name: "door", loop: false });
        m_map.mapArray[player.position.y + 1][player.position.x] =
          m_map.constants.ItemEnum.VAMPIRE_WHITE_DOOR;
        _levelBoss = true;
        m_map.init();
        m_map.playBGM(2);
      }
    } else if (mapPosition === 17) {
    }
  };

  this.update = function () {
    // for (var i = 0; i < this.tileArray.length; i++) {
    //   this.tileArray[i].update();
    // }
    if (this.pressWalk === true && this.player1.isWalking === false) {
      if (
        this.checkIsWalkAble(
          this.player1.position.x + this.playerWalkDirection.x,
          this.player1.position.y + this.playerWalkDirection.y
        )
      ) {
        this.player1.walk(this.playerWalkDirection);
      }
    }
    this.player1.update();
    if (this.stopMonster === true) {
      this.stopMonsterCounter++;
      if (this.stopMonsterCounter > 1000) {
        this.stopMonster = false;
      }
    } else {
      for (
        var i = 0;
        i < this.monster.length;
        i++ //偵測碰到怪物死亡
      ) {
        this.monster[i].update();
        if (
          this.monster[i].isDead == false &&
          this.monster[i].position.x == this.player1.position.x &&
          this.monster[i].position.y == this.player1.position.y
        ) {
          this.player1.die();
          break;
        }
      }
    }
    for (let i = 0; i < this.tileArray.length; i++) {
      this.tileArray[i].update();
    }
    this.showLevelBoard.update();
    this.playerState.update();
    this.yellowKeyItemInventory.update();
    this.blueKeyItemInventory.update();
    this.redKeyItemInventory.update();
    this.ironKeyItemInventory.update();
    this.consoleBoard.update();
    this.npcMessageBoard.update();
    this.fightAnimation.update();
    this.draw(Framework.Game._context);
  };
  this.draw = function (ctx) {
    for (var i = 0; i < this.tileArray.length; i++) {
      this.tileArray[i].draw(ctx);
    }
    for (var i = 0; i < this.monster.length; i++) {
      this.monster[i].draw(ctx);
    }
    this.player1.draw(ctx);
    this.showLevelBoard.draw(ctx);
    this.playerState.draw(ctx);
    this.yellowKeyItemInventory.draw(ctx);
    this.blueKeyItemInventory.draw(ctx);
    this.redKeyItemInventory.draw(ctx);
    this.ironKeyItemInventory.draw(ctx);
    this.consoleBoard.draw(ctx);
    this.npcMessageBoard.draw(ctx);
    this.settingBoard.draw(ctx);
    this.fightAnimation.draw(ctx);
  };

  this.getLeftMonsterNum = function () {
    var count = 0;
    for (var i = 0; i < this.monster.length; i++) {
      if (this.monster[i].isDead === false) {
        count++;
      }
    }
    return count;
  };

  this.countCurrentLevelTotalMapCoinSystem = function () {
    var totalCoin = 0;
    var data = { totalCoin: 0, totalHP: 0 };
    for (var i = 0; i < this.tileArray.length; i++) {
      if (
        this.tileArray[i]._tileType >= 30 &&
        this.tileArray[i]._tileType <= 47
      ) {
        console.log(this.tileArray[i].getGainCoin(this.tileArray[i]._tileType));
        totalCoin += this.tileArray[i].getGainCoin(this.tileArray[i]._tileType);
        data.totalCoin += this.tileArray[i].getGainCoin(
          this.tileArray[i]._tileType
        );
        //data.totalHP += this.tileArray[i].getMinus(this.tileArray[i]._tileType);
      }
    }
    //console.log("data:" + data.totalCoin + ", " + data.totalHP);
    return totalCoin;
  };

  this.playerWalkDirection = { x: 0, y: 0 };
  this.pressWalk = false;
  this.keyPress = "";
  this.confirmBox = undefined;
  this.confirmItem_1 = false;
  this.confirmItem_2 = false;
  this.confirmItem_3 = false;
  this.keydown = function (e, list) {
    var playerPosition = this.player1.position;
    if (e.key === "Down") {
      if (this.checkIsWalkAble(playerPosition.x, playerPosition.y + 1)) {
        this.playerWalkDirection = { x: 0, y: 1 };
        this.pressWalk = true;
        this.keyPress = "Down";
      } else {
        this.arrowClickEvent(playerPosition.x, playerPosition.y + 1);
        tempPlayerPosition.x = playerPosition.x;
        tempPlayerPosition.y = playerPosition.y + 1;
      }
    }

    if (e.key === "Left") {
      if (this.checkIsWalkAble(playerPosition.x - 1, playerPosition.y)) {
        this.playerWalkDirection = { x: -1, y: 0 };
        this.pressWalk = true;
        this.keyPress = "Left";
      } else {
        this.arrowClickEvent(playerPosition.x - 1, playerPosition.y);
        tempPlayerPosition.x = playerPosition.x - 1;
        tempPlayerPosition.y = playerPosition.y;
      }
    }

    if (e.key === "Right") {
      if (this.checkIsWalkAble(playerPosition.x + 1, playerPosition.y)) {
        this.playerWalkDirection = { x: 1, y: 0 };
        this.pressWalk = true;
        this.keyPress = "Right";
      } else {
        this.arrowClickEvent(playerPosition.x + 1, playerPosition.y);
        tempPlayerPosition.x = playerPosition.x + 1;
        tempPlayerPosition.y = playerPosition.y;
      }
    }

    if (e.key === "Up") {
      if (this.checkIsWalkAble(playerPosition.x, playerPosition.y - 1)) {
        this.playerWalkDirection = { x: 0, y: -1 };
        this.pressWalk = true;
        this.keyPress = "Up";
      } else {
        this.arrowClickEvent(playerPosition.x, playerPosition.y - 1);
        tempPlayerPosition.x = playerPosition.x;
        tempPlayerPosition.y = playerPosition.y - 1;
      }
    }
    if (e.key === "A") {
      if (mapPosition > 0) {
        this.setMapPosition(--mapPosition);
      } else {
        console.log("You can not go deeper, there is hell!!");
      }
    }
    if (e.key === "D") {
      if (mapPosition < this.mapList.terrainList.length - 1) {
        this.setMapPosition(++mapPosition);
      } else {
        console.log("You can not go upper, there is sky!!");
      }
    }
    if (e.key === "U") {
      this.ironKeyItemInventory.addIronKey(1);
    }
    if (e.key === "I") {
      this.yellowKeyItemInventory.addYellowKey(1);
    }
    if (e.key === "O") {
      this.blueKeyItemInventory.addBlueKey(1);
    }
    if (e.key === "P") {
      this.redKeyItemInventory.addRedKey(1);
    }
    if (e.key === "Q") {
      this.playerState.increaseHp(1000);
    }
    if (e.key === "W") {
      this.playerState.increasePower(50);
      this.setMonsterMinusHP();
    }
    if (e.key === "C") {
      this.playerState.increaseCoin(50);
    }
    if (e.key === "Y") {
      if (this.npcMessageBoard.display) {
        this.confirmBox = true;
        this.npcMessageBoard.display = false;
        this.npcChatSystem(tempPlayerPosition.x, tempPlayerPosition.y);
      }
    }

    if (e.key === "S") {
      console.log("Press S for Stat.");
      if (!this.npcMessageBoard.display) {
        this.npcMessageBoard.display = true;
        this.npcMessageBoard.setMessage(
          "The total coin in this level: " +
            this.countCurrentLevelTotalMapCoinSystem()
        );
      }
    }

    if (e.key === "N") {
      if (this.npcMessageBoard.display) {
        this.confirmBox = false;
        this.npcMessageBoard.display = false;
      }
    }
    if (e.key === "1") {
      if (this.npcMessageBoard.display) {
        this.confirmBox = true;
        this.confirmItem_1 = true;
        this.npcMessageBoard.display = false;
        this.npcChatSystem(tempPlayerPosition.x, tempPlayerPosition.y);
      }
    }
    if (e.key === "2") {
      if (this.npcMessageBoard.display) {
        this.confirmBox = true;
        this.confirmItem_2 = true;
        this.npcMessageBoard.display = false;
        this.npcChatSystem(tempPlayerPosition.x, tempPlayerPosition.y);
      }
    }
    if (e.key === "3") {
      if (this.npcMessageBoard.display) {
        this.confirmBox = true;
        this.confirmItem_3 = true;
        this.npcMessageBoard.display = false;
        this.npcChatSystem(tempPlayerPosition.x, tempPlayerPosition.y);
      }
    }
    if (e.key === "Space") {
      console.log("Pressed Space");
      this.npcMessageBoard.display = false;
      if (_isFairyChat === true) {
        this.npcChatSystem(tempPlayerPosition.x, tempPlayerPosition.y);
      }
      if (_winGameFlag === true) {
        this.player1.win();
        this.playBGM(3);
      } else if (_loseGameFlag === true) {
        this.player1.die();
      }
    }
  };

  this.arrowClickEvent = function (x, y) {
    this.checkIsOpenDoor(x, y);
    this.monsterFightSystem(x, y);
    this.npcChatSystem(x, y);
  };

  this.stopAllMonsterWalk = function () {
    for (var i = 0; i < this.monster.length; i++) {
      this.monster[i].stopWalk();
    }
  };

  this.checkIsWalkAble = function (x, y) {
    if (x < 0 || x > this.mapArray[0].length) {
      return false;
    }
    if (y < 0 || y > this.mapArray.length) {
      return false;
    }
    if (this.mapArray[y][x] > 0) {
      return false;
    } else {
      return true;
    }
  };

  this.checkIsOpenDoor = function (x, y) {
    if (this.mapArray[y][x] === this.constants.ItemEnum.YELLOW_DOOR) {
      if (this.yellowKeyItemInventory._yellowKey > 0) {
        this.tileArray[y * 26 + x].doorOpened = true;
        this.audio.play({ name: "door", loop: false });
        this.mapArray[y][x] = 0; //碰撞盒換成0
        // this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        this.yellowKeyItemInventory.addYellowKey(-1);
        m_map.consoleBoard.setMessage("Door Unlocked!", "Yellow Key -1");
      } else {
        this.audio.play({ name: "tryOpen", loop: false });
        m_map.consoleBoard.setMessage("Require:", "Yellow Key x 1");
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.BLUE_DOOR) {
      if (this.mapArray[y][x] === this.constants.ItemEnum.BLUE_DOOR) {
        if (this.blueKeyItemInventory._blueKey > 0) {
          this.tileArray[y * 26 + x].doorOpened = true;
          this.audio.play({ name: "door", loop: false });
          this.mapArray[y][x] = 0; //碰撞盒換成0
          // this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
          this.blueKeyItemInventory.addBlueKey(-1);
          m_map.consoleBoard.setMessage("Door Unlocked!", "Blue Key -1");
        } else {
          this.audio.play({ name: "tryOpen", loop: false });
          m_map.consoleBoard.setMessage("Require:", "Blue Key x 1");
        }
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.RED_DOOR) {
      if (this.mapArray[y][x] === this.constants.ItemEnum.RED_DOOR) {
        if (this.redKeyItemInventory._redKey > 0) {
          this.tileArray[y * 26 + x].doorOpened = true;
          this.audio.play({ name: "door", loop: false });
          this.mapArray[y][x] = 0; //碰撞盒換成0
          // this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
          this.redKeyItemInventory.addRedKey(-1);
          m_map.consoleBoard.setMessage("Door Unlocked!", "Red Key -1");
        } else {
          this.audio.play({ name: "tryOpen", loop: false });
          m_map.consoleBoard.setMessage("Require:", "Red Key x 1");
        }
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.IRON_DOOR) {
      if (this.ironKeyItemInventory._ironKey > 0) {
        this.tileArray[y * 26 + x].doorOpened = true;
        this.audio.play({ name: "gate", loop: false });
        this.mapArray[y][x] = 0; //碰撞盒換成0
        // this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        this.ironKeyItemInventory.addIronKey(-1);
        m_map.consoleBoard.setMessage("Door Unlocked!", "Iron Key -1");
      } else {
        this.audio.play({ name: "tryOpen", loop: false });
        m_map.consoleBoard.setMessage("Require:", "Iron Key x 1");
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.WHITE_DOOR) {
      if (this._numDoorPickAxe > 0) {
        this.tileArray[y * 26 + x].doorOpened = true;
        this.audio.play({ name: "door", loop: false });
        this.mapArray[y][x] = 0; //碰撞盒換成0
        // this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        m_map.consoleBoard.setMessage("Door Unlocked!");
      } else {
        this.audio.play({ name: "tryOpen", loop: false });
        m_map.consoleBoard.setMessage("You can't open", "this door");
      }
    } else if (
      this.mapArray[y][x] === this.constants.ItemEnum.VAMPIRE_WHITE_DOOR
    ) {
      this.consoleBoard.setMessage(
        "You can't get out",
        "untill all monsters",
        "are defeated!!!"
      );
    }
    this.update();
    this.draw(Framework.Game._context);
  };

  this.npcChatSystem = function (x, y) {
    if (this.mapArray[y][x] === this.constants.ItemEnum.MAN_NPC) {
      if (mapPosition === 2) {
        this.mapArray[y][x] = 0; //碰撞盒換成0
        this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        this.npcMessageBoard.setMessage(
          "Thanks for your help! I love you !!",
          "Here is all the money I have,",
          "please take 500 coins!"
        );
        this.playerState.increaseCoin(500);
      } else if (mapPosition === 12) {
        this.mapArray[y][x] = 0; //碰撞盒換成0
        this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        this.redKeyItemInventory.addRedKey(1);
        this.npcMessageBoard.setMessage(
          "No one is willing to spend 800 coins",
          "for a red key. And I've to leave too.",
          "Here's my last red key, take it"
        );
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.WOMAN_NPC) {
      if (mapPosition === 2) {
        this.mapArray[y][x] = 0; //碰撞盒換成0
        this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        this.playerState._hp *= 1.03;
        this.npcMessageBoard.setMessage(
          "Thanks for your help!",
          "I can increase 3% of your",
          "power and defense!"
        );
      }
      if (mapPosition === 6) {
        this.npcMessageBoard.setMessage(
          "Do you want to spend 50 coins",
          "to exchange for a blue key?",
          "",
          true
        );
        console.log("checking confirm input");
        if (m_map.playerState._coin >= 50 && m_map.confirmBox) {
          m_map.playerState.increaseCoin(-50);
          m_map.blueKeyItemInventory.addBlueKey(1);
        } else if (m_map.confirmBox) {
          m_map.npcMessageBoard.setMessage(
            "You don't have enough money,",
            "poor guy!"
          );
        } else if (map.confirmBox === undefined) {
          console.log("confirm box undefined");
        }
        m_map.confirmBox = undefined;
      } else if (mapPosition === 7) {
        this.npcMessageBoard.setMessage(
          "Do you want to spend 50 coins",
          "to exchange for 5 yellow keys?",
          "",
          true
        );
        if (this.playerState._coin >= 50 && this.confirmBox) {
          this.playerState.increaseCoin(-50);
          this.yellowKeyItemInventory.addYellowKey(5);
        } else if (this.confirmBox) {
          this.npcMessageBoard.setMessage(
            "You don't have enough money,",
            "poor guy!"
          );
        }
        this.confirmBox = undefined;
      } else if (mapPosition === 12) {
        this.npcMessageBoard.setMessage(
          "Do you want to spend 800 coins",
          "to exchange for an iron key?",
          "",
          true
        );
        if (this.playerState._coin >= 800 && this.confirmBox) {
          this.playerState.increaseCoin(-800);
          this.ironKeyItemInventory.addIronKey(1);
        } else if (this.confirmBox) {
          this.npcMessageBoard.setMessage(
            "You don't have enough money,",
            "poor guy!"
          );
        }
        this.confirmBox = undefined;
      } else if (mapPosition === 15) {
        this.npcMessageBoard.setMessage(
          "Do you want to spend 200 coins",
          "to exchange for a blue key?",
          "",
          true
        );
        if (this.playerState._coin >= 200 && this.confirmBox) {
          this.playerState.increaseCoin(-200);
          this.blueKeyItemInventory.addBlueKey(1);
        } else if (this.confirmBox) {
          this.npcMessageBoard.setMessage(
            "You don't have enough money,",
            "poor guy!"
          );
        }
        this.confirmBox = undefined;
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.THIEF_NPC) {
      if (mapPosition === 2) {
        this.mapArray[y][x] = 0; //碰撞盒換成0
        this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        this.mapList.terrainList[13][7][19] = 0;
        this.npcMessageBoard.setMessage(
          "Thanks for your help!",
          "I can unlock the door in level 13 for you."
        );
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.OLD_MAN_NPC) {
      if (mapPosition === 2) {
        this.mapArray[y][x] = 0; //碰撞盒換成0
        this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
        this.npcMessageBoard.setMessage(
          "Thanks for your help! I love you !!",
          "But I have nothing to give."
        );
      }
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.BLUE_SHOP__1) {
      let price = this.tileArray[y * 26 + x].store.getPrice(storeUsages);
      if (this.playerState._coin < price) {
        this.npcMessageBoard.setMessage(
          "You need " + price + " coins to enter"
        );
      } else if (this.confirmBox != true) {
        this.npcMessageBoard.setMessage(
          "[1] increase 100 HP: $" + price,
          "[2] increase 2 ATK points: $" + price,
          "[3] increase 4 DEF points: $" + price
        );
      } else {
        if (this.confirmItem_1) {
          this.playerState.increaseHp(100);
          this.consoleBoard.setMessage("HP +100");
          this.setMonsterMinusHP();
        } else if (this.confirmItem_2) {
          this.playerState.increasePower(2);
          this.setMonsterMinusHP();
          this.consoleBoard.setMessage("ATK +2");
        } else if (this.confirmItem_3) {
          this.playerState.increaseDef(4);
          this.setMonsterMinusHP();
          this.consoleBoard.setMessage("DEF +4");
        }
        this.playerState.increaseCoin(-price);
        storeUsages++;
        this.confirmItem_1 = false;
        this.confirmItem_2 = false;
        this.confirmItem_3 = false;
        this.confirmBox = undefined;
      }
      //The cost of each item should be a valuable, the cost will change depence on the buying times.
    } else if (
      this.mapArray[y][x] === this.constants.ItemEnum.SKELETON_CAPTAIN_NPC
    ) {
      this.playBGM(2);
      this.npcMessageBoard.setMessage(
        "HA HA HA You are trapped",
        "You can only battle with me after",
        "defeating all my soldiers!!"
      );
      this.mapArray[y][x] = this.constants.ItemEnum.SKELETON_SOLDIER; //碰撞盒換成0
      this.mapArray[5][18] = this.constants.ItemEnum.SKELETON_MAN;
      this.mapArray[4][18] = this.constants.ItemEnum.SKELETON_MAN;
      this.mapArray[4][20] = this.constants.ItemEnum.SKELETON_MAN;
      this.mapArray[5][20] = this.constants.ItemEnum.SKELETON_MAN;
      this.mapArray[6][18] = this.constants.ItemEnum.SKELETON_MAN;
      this.mapArray[6][20] = this.constants.ItemEnum.SKELETON_MAN;
      this.mapArray[6][19] = this.constants.ItemEnum.SKELETON_SOLDIER;
      this.mapArray[7][19] = this.constants.ItemEnum.VAMPIRE_WHITE_DOOR;
      this.mapArray[1][19] = this.constants.ItemEnum.SKELETON_CAPTAIN;
      _levelBoss = true;
      m_map.init();
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.PRINCESS_NPC) {
      this.npcMessageBoard.setMessage(
        "OMG! Darling! You come to get me",
        "out of here~ I love you!",
        "Let's get married!"
      );
      _winGameFlag = true;
    } else if (this.mapArray[y][x] === this.constants.ItemEnum.FAIRY_NPC) {
      switch (_fairyChatCounter) {
        case 0:
          _isFairyChat = true;
          this.npcMessageBoard.setMessage(
            "Welcome to Tower of the Sorcerer",
            "21-level verson!"
          );
          break;
        case 1:
          this.npcMessageBoard.setMessage(
            "This tower is too old now,",
            "so levels over 21 are doomed."
          );
          break;
        case 2:
          this.npcMessageBoard.setMessage(
            "Also, the power of all the enemys",
            "are weakened, but all the potions",
            "have become ineffective."
          );
          break;
        case 3:
          this.npcMessageBoard.setMessage(
            "By the way I think it's just a piece",
            "of cake for you."
          );
          break;
        case 4:
          _isFairyChat = false;
          this.npcMessageBoard.setMessage(
            "Let's crack on to find you princess!",
            "Good Luck!"
          );
          this.mapArray[y][x] = 0; //碰撞盒換成0
          this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
          break;
        default:
        // code block
      }
      _fairyChatCounter += 1;
    }
    this.update();
    this.draw(Framework.Game._context);
  };
  this.monsterFightSystem = function (x, y) {
    let monster = this.tileArray[x + 26 * y];
    let counteredSquid = false;
    console.log(this.player1.position.y + ", " + this.player1.position.x);
    if (typeof monster.squid_1 !== "undefined") {
      console.log("COUNTER SQUID " + (x + 26 * y));
      monster = this.tileArray[201];
      counteredSquid = true;
    }
    if (
      this.mapArray[y][x] >= this.constants.ItemEnum.GREEN_SLIME &&
      this.mapArray[y][x] <= 55
    ) {
      var tileType = this.mapArray[y][x];
      var monsterHP = monster.getHP(tileType);
      var monsterATK = monster.getATK(tileType);
      var monsterDEF = monster.getDEF(tileType);
      var playerATK = this.playerState._power;
      var playerDEF = this.playerState._defense;
      var numberOfRound = Math.ceil(monsterHP / (playerATK - monsterDEF));
      var minusHP = Math.max(0, (monsterATK - playerDEF) * numberOfRound);
      console.log(
        "Monster HP :" +
          monsterHP +
          " monsterATK: " +
          monsterATK +
          " monsterDEF: " +
          monsterDEF +
          " PlayerATKmonsterInRound: " +
          (playerATK - monsterDEF) +
          " monsterATKplayerInRound: " +
          (monsterATK - playerDEF) +
          " Round: " +
          numberOfRound +
          " minusHP: " +
          minusHP
      );
      if (this.playerState._hp > minusHP) {
        if (playerATK - monsterDEF > 0) {
          this.fightAnimation.position = { x: x * 64, y: y * 64 };
          this.fightAnimation.start({ from: 0, to: 2 });
          this.audio.play({ name: "attack", loop: false });
          this.playerState.increaseHp(-minusHP);
          this.playerState.increaseExp(
            this.tileArray[y * 26 + x].getGainExp(tileType)
          );
          this.playerState.increaseCoin(
            this.tileArray[y * 26 + x].getGainCoin(tileType)
          );
          this.mapArray[y][x] = 0; //碰撞盒換成0
          this.tileArray[y * 26 + x].tileType = 0; //圖片換成0
          m_map.consoleBoard.setMessage(
            "Monster",
            "Defeated !",
            "You lost " + minusHP + " Hp"
          );
          if (counteredSquid) {
            console.log("SQUID DEFEATED");
            console.log("SQUID DEAD");
            for (let i = 5; i < 8; i++) {
              for (let j = 18; j < 21; j++) {
                this.mapArray[i][j] = 0;
                this.tileArray[i * 26 + j].tileType = 0;
              }
            }
          }
          if (mapPosition === 10 && _levelBoss === true) {
            _level10MonsterCounter += 1;
            console.log(_level10MonsterCounter);
            if (_level10MonsterCounter === 8) {
              this.audio.play({ name: "door", loop: false });
              this.tileArray[3 * 26 + 19].doorOpened = true;
              this.mapArray[3][19] = 0;
            }
            if (_level10MonsterCounter === 9) {
              this.audio.play({ name: "door", loop: false });
              this.audio.play({ name: "door", loop: false });
              this.audio.play({ name: "door", loop: false });
              this.tileArray[4 * 26 + 17].doorOpened = true;
              this.tileArray[4 * 26 + 21].doorOpened = true;
              this.tileArray[7 * 26 + 19].doorOpened = true;
              this.mapArray[4][17] = 0;
              this.mapArray[4][21] = 0;
              this.mapArray[7][19] = 0;
              this.mapArray[11][19] = this.constants.ItemEnum.STAGE_UP;
              this.tileArray[11 * 26 + 19] = new Stage();
              this.tileArray[
                11 * 26 + 19
              ].tileType = this.constants.ItemEnum.STAGE_UP;
              this.tileArray[11 * 26 + 19].position = { x: 19, y: 11 };

              _levelBoss = false;
              this.playBGM(1);
            }
          }
        } else {
          if (_levelBoss === true) {
            this.npcMessageBoard.setMessage(
              "You are too weak, you can't",
              "damage the Boss!!!",
              "You Are Dead!!"
            );
            _loseGameFlag = true;
          } else {
            this.consoleBoard.setMessage(
              "You are too weak!",
              "You can't damage ",
              "this monster!!!"
            );
          }
          // this.update();
          // this.draw(Framework.Game._context);
          console.log("You are too weak, you can't damage the monster!!!");
          return;
        }
      } else {
        if (_levelBoss === true) {
          this.npcMessageBoard.setMessage(
            "You are too weak! You can't",
            "figth this Boss!!!",
            "You Are Dead!!"
          );
          _loseGameFlag = true;
        }
        this.consoleBoard.setMessage(
          "You are too weak!",
          "You can't figth",
          "this monster!!!"
        );
        // this.update();
        // this.draw(Framework.Game._context);
        console.log("You are too weak, you can't figth this monster!!!");
      }
      if (mapPosition === 20) {
        var numOfBigBat = 0;
        var numOfvampire = 0;
        for (var i = 0; i < this.mapArray.length; i++) {
          for (var j = 0; j < this.mapArray[y].length; j++) {
            if (this.mapArray[i][j] === this.constants.ItemEnum.VAMPIRE) {
              return;
            } else if (
              this.mapArray[i][j] === this.constants.ItemEnum.BIG_BAT
            ) {
              numOfBigBat += 1;
            }
            if (
              this.mapArray[i][j] === this.constants.ItemEnum.VAMPIRE_WHITE_DOOR
            ) {
              console.log(i + " " + j);
            }
          }
        }

        if (numOfvampire === 0 && numOfBigBat === 0) {
          this.audio.play({ name: "door", loop: false });
          this.audio.play({ name: "door", loop: false });
          this.mapArray[3][19] = 0; //碰撞盒換成0
          this.tileArray[3 * 26 + 19].tileType = 0; //圖片換成0
          this.mapArray[9][19] = 0; //碰撞盒換成0
          this.tileArray[9 * 26 + 19].tileType = 0; //圖片換成0
          _levelBoss = false;
          this.update();
          this.draw(Framework.Game._context);
        }
      }
      if (mapPosition === 8 && this.mapArray[4][23] != 0) {
        var numOfYellowGuard = 0;
        for (var i = 0; i < this.mapArray.length; i++) {
          for (var j = 0; j < this.mapArray[y].length; j++) {
            if (this.mapArray[i][j] === this.constants.ItemEnum.YELLOW_GUARD) {
              numOfYellowGuard += 1;
            }
          }
        }
        if (numOfYellowGuard === 0) {
          this.audio.play({ name: "door", loop: false });
          this.mapArray[4][23] = 0; //碰撞盒換成0
          this.tileArray[4 * 26 + 23].tileType = 0; //圖片換成0
          this.update();
          this.draw(Framework.Game._context);
        }
      }
      if (mapPosition === 11 && this.mapArray[4][15] != 0) {
        if (this.mapArray[5][14] === 0 && this.mapArray[5][16] === 0) {
          this.audio.play({ name: "door", loop: false });
          this.mapArray[4][15] = 0; //碰撞盒換成0
          this.tileArray[4 * 26 + 15].tileType = 0; //圖片換成0
          this.update();
          this.draw(Framework.Game._context);
        }
      }
      if (mapPosition === 17) {
        if (
          this.mapArray[8][14] === 0 &&
          this.mapArray[8][16] === 0 &&
          this.mapArray[7][15] != 0
        ) {
          this.audio.play({ name: "door", loop: false });
          this.mapArray[7][15] = 0; //碰撞盒換成0
          this.tileArray[7 * 26 + 15].tileType = 0; //圖片換成0
          this.update();
          this.draw(Framework.Game._context);
        } else if (
          this.mapArray[5][14] === 0 &&
          this.mapArray[5][16] === 0 &&
          this.mapArray[4][15] != 0
        ) {
          this.audio.play({ name: "door", loop: false });
          this.mapArray[4][15] = 0; //碰撞盒換成0
          this.tileArray[4 * 26 + 15].tileType = 0; //圖片換成0
          this.update();
          this.draw(Framework.Game._context);
        } else if (
          this.mapArray[8][22] === 0 &&
          this.mapArray[8][24] === 0 &&
          this.mapArray[7][23] != 0
        ) {
          this.audio.play({ name: "door", loop: false });
          this.mapArray[7][23] = 0; //碰撞盒換成0
          this.tileArray[7 * 26 + 23].tileType = 0; //圖片換成0
          this.update();
          this.draw(Framework.Game._context);
        } else if (
          this.mapArray[5][22] === 0 &&
          this.mapArray[5][24] === 0 &&
          this.mapArray[4][23] != 0
        ) {
          this.audio.play({ name: "door", loop: false });
          this.mapArray[4][23] = 0; //碰撞盒換成0
          this.tileArray[4 * 26 + 23].tileType = 0; //圖片換成0
          this.update();
          this.draw(Framework.Game._context);
        }
      }
    }
    this.setMonsterMinusHP();
  };

  this.setMonsterMinusHP = function () {
    if (this.tileArray != null) {
      for (var i = 0; i < this.tileArray.length; i++) {
        if (
          (this.tileArray[i]._tileType >= 30 &&
            this.tileArray[i]._tileType <= 46) ||
          this.tileArray[i]._tileType == 55
        ) {
          //this.tileArray[i]._tileType <= 55
          var tileType = this.tileArray[i]._tileType;
          var monsterHP = this.tileArray[i].getHP(tileType);
          var monsterATK = this.tileArray[i].getATK(tileType);
          var monsterDEF = this.tileArray[i].getDEF(tileType);
          var playerHP = this.playerState._hp;
          var playerATK = this.playerState._power;
          var playerDEF = this.playerState._defense;
          var numberOfRound = Math.ceil(monsterHP / (playerATK - monsterDEF));
          var minusHP = Math.max(0, (monsterATK - playerDEF) * numberOfRound);
          // console.log(monsterHP, monsterATK, monsterDEF, playerATK, playerDEF, numberOfRound, minusHP);
          if (
            numberOfRound < 0 ||
            minusHP >= playerHP ||
            playerATK < monsterDEF
          ) {
            this.tileArray[i].setMinusHP(tileType, "???");
          } else {
            this.tileArray[i].setMinusHP(tileType, minusHP);
          }
        }
      }
    }
  };
  this.keyup = function (e, list) {
    if (
      e.key === "Down" ||
      e.key === "Up" ||
      e.key === "Left" ||
      e.key === "Right"
    ) {
      if (this.keyPress == e.key) {
        this.player1.walkEnd();
        this.pressWalk = false;
      }
    }
  };
};
