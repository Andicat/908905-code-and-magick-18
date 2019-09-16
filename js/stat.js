'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TITLE_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_FIRST_X = CLOUD_X + BAR_WIDTH;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px  PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';

  ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TITLE_GAP, CLOUD_Y + TITLE_GAP * 2);

  var maxTime = getMaxElement(times);
  var barNextX = BAR_FIRST_X + BAR_WIDTH + BAR_GAP;
  var barHeight;
  var barY;
  var barX;

  for (var i = 0; i < players.length; i++) {
    barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    barY = CLOUD_HEIGHT - TITLE_GAP - GAP - barHeight;
    barX = (players[i] === 'Вы' ? BAR_FIRST_X : barNextX);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], barX, CLOUD_HEIGHT - TITLE_GAP);
    ctx.fillText(Math.round(times[i]), barX, barY - TITLE_GAP);
    ctx.fillStyle = (players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + 100 * Math.random() + '%, 50%)');
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    barNextX = barNextX + (players[i] === 'Вы' ? 0 : BAR_WIDTH + BAR_GAP);
  }
};
