Framework.Game.fps = 60;
Framework.Game.canvasWidth = 1920;
Framework.Game.canvasHeight = 900;
Framework.Game.isBackwardCompatiable = false;

//當有要加關卡時, 可以使用addNewLevel
//第一個被加進來的Level就是啟動點, 所以一開始遊戲就進入MyMenu
Framework.Game.addNewLevel({ menu: new MyMenu() });
Framework.Game.addNewLevel({ genderMenu: new GenderMenu() });
Framework.Game.addNewLevel({ myAbout: new MyAbout() });

//Framework.Game.addNewLevel({level1: new Level2()});
Framework.Game.addNewLevel({ maleLevel: new MaleLevel() });
Framework.Game.addNewLevel({ femaleLevel: new FemaleLevel() });
Framework.Game.addNewLevel({ gameOver: new GameOver() });
Framework.Game.addNewLevel({ winGame: new WinGame() });
Framework.Game.start();
