import React, {Component} from 'react';
import STLViewer from '../../src/STLViewer';

class App extends Component{
  render(){
    return (
      <STLViewer
        url=""
        xDims={150}
        yDims={107}
        zDims={79}
        width={150}
        height={150}
        modelColor={0x005B83}
        backgroundColor={0xEAEAEA}
      />
    );
  }
};
export default App;
