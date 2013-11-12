voxel-sphero
=====
Sphero creature for [voxeljs]

example
------
also see `/example`

```
var Controller = require("rocker-controller");

var spheroController = new Controller;
spheroController.appendTo(document.getElementsByTagName("body")[0]);
window.spheroController = spheroController;

var game = require("voxel-engine")({
  generate: function(x, y, z) {
    return (Math.sqrt(x*x + y*y + z*z) > 100 || y*y > 10) ? 0 : (Math.random() * 3) + 1;
  },
  chunkDistance: 2,
  materials: [
    'obsidian',
    ['grass', 'dirt', 'grass_dirt'],
    'grass',
    'plank'
  ],
  texturePath: './textures/',
  worldOrigin: [0, 0, 0]
});
game.paused = false;

var createPlayer = require("voxel-player")(game);

game.appendTo(document.getElementById("container"));

var player = createPlayer('textures/plank.png');
player.possess();
player.yaw.position.set(0,10,0);
window.player = player;

var Sphero = require("../")(game);
var sphero = Sphero();

window.sphero = sphero;

sphero.position.x = 0;
sphero.position.y = 10;
sphero.position.z = -10;

window.sphero = sphero;
window.game = game;
```

Development
-----

```
git clone https://github.com/morganrallen/voxel-sphero.git
cd voxel-sphero
npm install
npm run dev
```

This installs and starts watchify with live reload. Hack away!

[voxeljs]: https://github.com/maxogden/voxeljs

