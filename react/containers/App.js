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
    };
  }

  render(){
    const { url, xDims, yDims, zDims } = this.state;
    console.dir(this.state);
    return (
      <div>
        <STLViewer
          url={url}
          xDims={xDims}
          yDims={yDims}
          zDims={zDims}
          width={400}
          height={400}
          modelColor={0x005B83}
          backgroundColor={0xEAEAEA}
        />
        <div><a href="http://localhost:4001">Example A</a></div>
        <div><a href="http://localhost:4001/?url=http://localhost:4001/static/crazy-thing.stl&width=400&height=400&xDims=146&yDims=106&zDims=78">Example B</a></div>
      </div>
    );
  }
};
export default App;
