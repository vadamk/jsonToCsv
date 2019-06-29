import React from 'react';
import converter from 'json-2-csv';
import downloadFile from 'js-file-download';

import './App.css';
// import data from './data';
import { mapDataByProject } from './dataMaping';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.jsonRef = React.createRef();

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { value } = this.jsonRef.current;
    const obj = JSON.parse(value);
    const data = mapDataByProject(obj);
    converter.json2csv(data, (err, res) => {
      if (err) { throw err }
      downloadFile(res, 'report.csv')
    });
  }

  render() {
    return <div>
      <textarea
        // defaultValue={data}
        ref={this.jsonRef}
        name="json"
        id="json"
        cols="200"
        rows="40">
      </textarea>
      <button onClick={this.handleClick}>Convert</button>
    </div>
  }
}

export default App;
