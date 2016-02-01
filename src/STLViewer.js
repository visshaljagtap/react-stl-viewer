import React, { PropTypes, Component } from 'react';
import ReactDOM  from 'react-dom';
import THREE from './Three';

class STLViewer extends Component {
  static propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
    xDims: PropTypes.number,
    yDims: PropTypes.number,
    zDims: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.number,
    modelColor: PropTypes.number,
  };

  componentDidMount() {
    let camera, scene, renderer, mesh, distance;
    let { url, xDims, yDims, zDims, width, height, modelColor, backgroundColor } = this.props;
    let component = this;

    init();
    animate();

    /**
     * The init method for the 3D scene
     * @returns {void}
     */
    function init() {
      //Detector.addGetWebGLMessage();
      scene = new THREE.Scene();
      distance = 10000;
      let directionalLight = new THREE.DirectionalLight( 0xffffff );
      directionalLight.position.x = 0;
      directionalLight.position.y = 0;
      directionalLight.position.z = 1;
      directionalLight.position.normalize();
      scene.add( directionalLight );

      let loader = new THREE.STLLoader();
      loader.load(url, ( geometry ) => {

        // Center the object
        geometry.center();

        mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshLambertMaterial({
            overdraw:true,
            color: modelColor,
          }
        ));

        mesh.rotation.x = 5;
        mesh.rotation.z = .25;
        scene.add( mesh );
      });

      // Add the camera
      camera = new THREE.PerspectiveCamera( 30, width / height, 1, distance );
      camera.position.set(0,0,Math.max(xDims*3,yDims*3,zDims*3));

      scene.add( camera );

      renderer = new THREE.WebGLRenderer(); //new THREE.CanvasRenderer();
      renderer.setSize( width, height );
      renderer.setClearColor(backgroundColor, 1);

      // Add to the React Component
      ReactDOM.findDOMNode(component).appendChild( renderer.domElement );
    }

    /**
     * Animate the scene
     * @returns {void}
     */
    function animate() {
      // note: three.js includes requestAnimationFrame shim
      requestAnimationFrame( animate );
      render();
    }

    /**
     * Render the scene
     * @returns {void}
     */
    function render() {
      if (mesh) {
        mesh.rotation.z += 0.02;
      }

      renderer.render( scene, camera );
    }
  }

  render() {
    return(
      <div className={this.props.className}>
      </div>
    );
  };
};

module.exports = STLViewer;
