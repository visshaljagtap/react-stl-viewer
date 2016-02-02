import React, {Component} from 'react';
import STLViewer from '../../src/STLViewer';

class App extends Component{

  render(){
    return (
      <div>
        <STLViewer url="/dist/static/crazy-thing.stl" />
        <STLViewer url="/dist/static/bottle.stl" rotate={false} />
      </div>
    );
  }
};
export default App;
