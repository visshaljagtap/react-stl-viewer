'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Three = require('./Three');

var _Three2 = _interopRequireDefault(_Three);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrbitControls = require('three-orbit-controls')(_Three2.default);

var Paint = function () {
  function Paint(context) {
    _classCallCheck(this, Paint);

    this.component = context;
    this.url = context.props.url;
    this.width = context.props.width;
    this.height = context.props.height;
    this.modelColor = context.props.modelColor;
    this.backgroundColor = context.props.backgroundColor;
    this.orbitControls = context.props.orbitControls;
    this.rotate = context.props.rotate;

    this.camera;
    this.scene;
    this.renderer;
    this.mesh;
    this.distance;
    this.controls;
    this.xDims;
    this.yDims;
    this.zDims;
  }

  _createClass(Paint, [{
    key: 'init',
    value: function init() {
      //Detector.addGetWebGLMessage();
      this.scene = new _Three2.default.Scene();
      this.distance = 10000;
      var directionalLight = new _Three2.default.DirectionalLight(0xffffff);
      directionalLight.position.x = 0;
      directionalLight.position.y = 0;
      directionalLight.position.z = 1;
      directionalLight.position.normalize();
      this.scene.add(directionalLight);

      this.addSTLToScene();
    }
  }, {
    key: 'addSTLToScene',
    value: function addSTLToScene() {
      var _this = this;

      var loader = new _Three2.default.STLLoader();
      loader.crossOrigin = '';

      loader.load(this.url, function (geometry) {

        // Calculate mesh noramls for MeshLambertMaterial.
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        // Center the object
        geometry.center();

        _this.mesh = new _Three2.default.Mesh(geometry, new _Three2.default.MeshLambertMaterial({
          overdraw: true,
          color: _this.modelColor
        }));
        // Set the object's dimensions
        geometry.computeBoundingBox();
        _this.xDims = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        _this.yDims = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        _this.zDims = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        if (_this.rotate) {
          _this.mesh.rotation.x = 5;
          _this.mesh.rotation.z = .25;
        }

        _this.scene.add(_this.mesh);

        _this.addCamera();
        _this.addInteractionControls();
        _this.addToReactComponent();

        // Start the animation
        _this.animate();
      });
    }
  }, {
    key: 'addCamera',
    value: function addCamera() {
      // Add the camera
      this.camera = new _Three2.default.PerspectiveCamera(30, this.width / this.height, 1, this.distance);
      this.camera.position.set(0, 0, Math.max(this.xDims * 3, this.yDims * 3, this.zDims * 3));

      this.scene.add(this.camera);

      this.renderer = new _Three2.default.WebGLRenderer(); //new THREE.CanvasRenderer();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(this.backgroundColor, 1);
    }
  }, {
    key: 'addInteractionControls',
    value: function addInteractionControls() {
      // Add controls for mouse interaction
      if (this.orbitControls) {
        this.controls = new OrbitControls(this.camera, _reactDom2.default.findDOMNode(this.component));
        this.controls.enableKeys = false;
        this.controls.addEventListener('change', this.orbitRender.bind(this));
      }
    }
  }, {
    key: 'addToReactComponent',
    value: function addToReactComponent() {
      // Add to the React Component
      _reactDom2.default.findDOMNode(this.component).replaceChild(this.renderer.domElement, _reactDom2.default.findDOMNode(this.component).firstChild);
    }

    /**
     * Animate the scene
     * @returns {void}
     */

  }, {
    key: 'animate',
    value: function animate() {
      // note: three.js includes requestAnimationFrame shim
      if (this.rotate) {
        requestAnimationFrame(this.animate.bind(this));
      }
      if (this.orbitControls) {
        this.controls.update();
      }
      this.render();
    }

    /**
     * Render the scene after turning off the rotation
     * @returns {void}
     */

  }, {
    key: 'orbitRender',
    value: function orbitRender() {
      if (this.rotate) {
        this.rotate = false;
      }

      this.render();
    }

    /**
     * Render the scene
     * @returns {void}
     */

  }, {
    key: 'render',
    value: function render() {
      if (this.mesh && this.rotate) {
        this.mesh.rotation.z += 0.02;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }]);

  return Paint;
}();

exports.default = Paint;
module.exports = exports['default'];