import React, {Component} from 'react';
import STLViewer from '../../src/STLViewer';
import qs from 'query-string';

class App extends Component{

  constructor(props){
    super(props);

    let query = qs.parse(location.search);

    this.state = {
      url: query.url || 'http://localhost:4001/static/bottle.stl',
    };
  }

  render(){
    const { url  } = this.state;

    return (
      <div>
        <STLViewer url={url} />
        <div><a href="http://localhost:4001">Example A</a></div>
        <div><a href="http://localhost:4001/?url=http://localhost:4001/static/crazy-thing.stl">Example B</a></div>
      </div>
    );
  }
};
export default App;
