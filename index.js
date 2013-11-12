function e(f, s) {
  var r = {};
  for(var i in f) r[i] = f[i];
  for(var i in s) r[i] = s[i];
  return r;
};

module.exports = function(game) {
  var T = game.THREE;

  var defaults = {
    size: 0.407
  };

  return function(options) {
    options = e(defaults, options);

    var body = new T.Object3D;

    var sphereGeo = new T.SphereGeometry(options.size, 50, 50);
    var sphereMaterial = new T.MeshLambertMaterial({
      map: T.ImageUtils.loadTexture("textures/sphero.png")
    });

    var sphere = new T.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(0, options.size, 0);
    //sphere.rotation.z = 1;
    //sphere.rotation.y = 0.5;
    body.add(sphere);

    var phys = game.makePhysical(body, [ options.size, options.size, options.size ]);
    phys.subjectTo(game.gravity);

    var voxel = game.addItem(phys);
    game.scene.add(body);

    body._sphere = sphere;
    body._voxel = voxel;
    body._phys = phys;

    var scaler = 0.0000004;
    var rotationalScaler = 0.004;
    var rolling = true;
    var delta;

    spheroController.on("data", function(d) {
      if(d[0] === 0 && d[1] === 0) rolling = false;
      else rolling = true;
      delta = d;

      var x = d[0] * scaler;
      var z = d[1] * scaler;

      phys.forces.x = x;
      phys.forces.z = z;
    });

    // bit of a hack as voxel-physical doesn't handle
    // rotational forces
    game.on("tick", function() {
      if(delta && rolling) {
        if(delta[0] !== 0)
          sphere.rotation.z += (delta[0] * rotationalScaler);
        if(delta[1] !== 0)
          sphere.rotation.x += (delta[1] * rotationalScaler);
      }
    });

    return body;
  };
};
