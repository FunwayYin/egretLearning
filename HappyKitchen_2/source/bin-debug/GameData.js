/**
 * Created by Administrator on 2014/9/17.
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.curScene = 0;
    GameData.dataTimer = 0;
    GameData.winNum = 0;
    GameData.sorce = 0;
    GameData.threeWinNum = 20;
    GameData.fourWinNum = 30;
    GameData.overIsWin = true;
    GameData.n = ["1", "0", ".", "0", ".", "4", ".", "1", "8", "2", ":", "3", "0", "0", "0"];
    return GameData;
}());
egret.registerClass(GameData,'GameData');
