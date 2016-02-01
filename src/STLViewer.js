import React, { PropTypes, Component } from 'react';
import ReactDOM  from 'react-dom';
import THREE from './Three';
import Loader from 'halogen/ScaleLoader';

class STLViewer extends Component {
  static propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    modelColor: PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: '#EAEAEA',
    modelColor: '#B92C2C',
    height: 400,
    width: 400,
  };

  componentDidMount() {
    let camera, scene, renderer, mesh, distance;
    let { url, width, height, modelColor, backgroundColor } = this.props;
    let xDims, yDims, zDims;
    let component = this;

    let hexBackgroundColor = parseInt(backgroundColor.replace(/^#/, ''), 16);
    let hexModelColor = parseInt(modelColor.replace(/^#/, ''), 16);

    init();

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
        // Set the object's dimensions
        geometry.computeBoundingBox();
        xDims = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        yDims = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        zDims = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        mesh.rotation.x = 5;
        mesh.rotation.z = .25;
        scene.add( mesh );

        // Add the camera
        camera = new THREE.PerspectiveCamera( 30, width / height, 1, distance );
        camera.position.set(0,0,Math.max(xDims*3,yDims*3,zDims*3));

        scene.add( camera );

        renderer = new THREE.WebGLRenderer(); //new THREE.CanvasRenderer();
        renderer.setSize( width, height );
        renderer.setClearColor(backgroundColor, 1);

        // Add to the React Component
        ReactDOM.findDOMNode(component).replaceChild( renderer.domElement,
          ReactDOM.findDOMNode(component).firstChild);

        // Start the animation
        animate();
      });
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
    const {width, height, modelColor} = this.props;

    return(
      <div
        className={this.props.className}
        style={{ width: width, height: height }}
      >
        <div style={{textAlign: 'center', marginTop: height/2 - 8 }} >
          <Loader color={modelColor} size="16px" />
        </div>
      </div>
    );
  };
};

module.exports = STLViewer;
