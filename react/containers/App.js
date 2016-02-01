import React, {Component} from 'react';
import STLViewer from '../../src/STLViewer';
import qs from 'query-string';

class App extends Component{

  constructor(props){
    super(props);

    let query = qs.parse(location.search);

    this.state = {
      url: query.url || 'http://localhost:4001/static/bottle.stl',
      xDims:  parseInt(query.xDims, 10) || 53,
      yDims:  parseInt(query.yDims, 10) || 85,
      zDims:  parseInt(query.zDims, 10) || 27,
      width:  parseInt(query.width, 10) || 400,
      height: parseInt(query.height, 10) || 400,
    };
  }

  render(){
    const { url, xDims, yDims, zDims, width, height } = this.state;

    return (
      <div>
        <STLViewer
          url={url}
          xDims={xDims}
          yDims={yDims}
          zDims={zDims}
          width={width}
          height={height}
          modelColor={0x005B83}
          backgroundColor={0xEAEAEA}
        />
        <div>You can modify with following query strings: url, xDims, yDims, zDims, width, height.</div>
      </div>
    );
  }
};
export default App;
