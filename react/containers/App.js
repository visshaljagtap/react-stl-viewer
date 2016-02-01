import React, {Component} from 'react';
import STLViewer from '../../src/STLViewer';

class App extends Component{

  render(){
    return (
      <div>
        <STLViewer url="http://localhost:4001/static/crazy-thing.stl" />
        <STLViewer url="http://localhost:4001/static/bottle.stl" rotate={true} />
      </div>
    );
  }
};
export default App;
