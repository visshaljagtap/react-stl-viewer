import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { ScaleLoader } from 'halogenium';
import Paint from './Paint';

class STLViewer extends Component {
  static propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    modelColor: PropTypes.string,
    rotate: PropTypes.bool,
    orbitControls: PropTypes.bool
  };

  static defaultProps = {
    backgroundColor: '#EAEAEA',
    modelColor: '#B92C2C',
    height: 400,
    width: 400,
    rotate: true,
    orbitControls: true
  };

  componentDidMount() {
    let camera, scene, renderer, mesh, distance, controls;
    const { url, width, height, modelColor, backgroundColor, orbitControls } = this.props;
    let xDims, yDims, zDims;
    let component = this;
    let rotate = this.props.rotate;
    let paint = new Paint(this)

    init();

    /**
     * The init method for the 3D scene
     * @returns {void}
     */
    function init() {
      paint.init();
    }

    /**
     * Animate the scene
     * @returns {void}
     */
    let animate = () => {
      // note: three.js includes requestAnimationFrame shim
      if (rotate) {
        requestAnimationFrame(animate);
      }
      if (this.props.orbitControls) {
        controls.update();
      }
      render();
    };

    /**
     * Render the scene after turning off the rotation
     * @returns {void}
     */
    let orbitRender = () => {
      if (rotate) {
        rotate = false;
      }

      render();
    };

    /**
     * Render the scene
     * @returns {void}
     */
    let render = () => {
      if (mesh && rotate) {
        mesh.rotation.z += 0.02;
      }

      renderer.render(scene, camera);
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false
    }
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    let camera, scene, renderer, mesh, distance, controls;
    const { url, width, height, modelColor, backgroundColor, orbitControls } = nextProps;
    let xDims, yDims, zDims;
    let component = this;
    let rotate = nextProps.rotate;

    this.props = nextProps;
    let paint = new Paint(this)

    init();

    /**
     * The init method for the 3D scene
     * @returns {void}
     */
    function init() {
      paint.init();
    }

    /**
     * Animate the scene
     * @returns {void}
     */
    let animate = () => {
      // note: three.js includes requestAnimationFrame shim
      if (rotate) {
        requestAnimationFrame(animate);
      }
      if (nextProps.orbitControls) {
        controls.update();
      }
      render();
    };

    /**
     * Render the scene after turning off the rotation
     * @returns {void}
     */
    let orbitRender = () => {
      if (rotate) {
        rotate = false;
      }

      render();
    };

    /**
     * Render the scene
     * @returns {void}
     */
    let render = () => {
      if (mesh && rotate) {
        mesh.rotation.z += 0.02;
      }

      renderer.render(scene, camera);
    };
  }

  render() {
    const { width, height, modelColor } = this.props;

    return(
      <div
        className={this.props.className}
        style={{
        width: width,
        height: height,
        overflow: 'hidden',
        }}
      >
        <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          }} >
          <ScaleLoader color={modelColor} size="16px" />
        </div>
      </div>
      );
};
};

module.exports = STLViewer;
