import React from 'react';
import './App.css';
import converter from 'json-2-csv';
import downloadFile from 'js-file-download';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.jsonRef = React.createRef();

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { value } = this.jsonRef.current;
    const obj = JSON.parse(value);
    const data = obj.Data[0].UserReportDayModels.map(item => {

      const projects = {}

      item.UserProjectTimeLogViewModels.forEach((pr) => {
        projects[pr.Name] = {
          Hours: pr.OfficialHoursModel.Hours || 0,
          Description: pr.OfficialHoursModel.Description || ''
        }
      });

      return {
        date: new Date(item.Day),
        ...projects
      }
    })

    console.log('data: ', data);
    converter.json2csv(data, (err, res) => {
      if (err) { throw err }
      downloadFile(res, 'report.csv')
    });
  }

  render() {
    return <div>
      <textarea
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
