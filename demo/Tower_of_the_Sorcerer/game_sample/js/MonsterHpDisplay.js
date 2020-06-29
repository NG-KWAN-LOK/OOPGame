var monsterHpDisplay = function (ctx, hp = 0) {
  if (hp === 0) {
    ctx.font = "15pt Algerian";
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#74F567';
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
  }
  else if (hp === "???") {
    ctx.font = "15pt Algerian";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#FF5252";
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
  }
  else {
    ctx.font = "15pt Algerian";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#FF7A1E";
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
  }
  return ctx;
};
