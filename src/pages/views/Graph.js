import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from "axios";

class Graph extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data : {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          data: ["14", "14", "14"],
          backgroundColor: [
          '#FF6384','#36A2EB','#FFCE56','#2f91df','#cf6edb',
          '#addb6e','#dbb1d0','#dbd4b1','#bfb5da','#b3ca62'
          ],
          hoverBackgroundColor: [
          '#FF6384','#36A2EB','#FFCE56','#2f91df','#cf6edb',
          '#addb6e','#dbb1d0','#dbd4b1','#bfb5da','#b3ca62'
          ],
        }]
      }
    }
  }

  componentDidMount = async () => {
    //const { isValid } = this.state;
    axios.post('/api/analGraph')
    .then( response => {

      let resLabel = [];
      let resData = [];
      console.log(response.data);
      for(let i=0; i<response.data.length; i++){
        resLabel.push(response.data[i].keyword);
        resData.push(response.data[i].kwrdCnt);
      }
      
      let objDatasets  = new Object();
      objDatasets.data = resData;
      const bckColor = [
        '#FF6384','#36A2EB','#FFCE56','#2f91df','#cf6edb',
        '#addb6e','#dbb1d0','#dbd4b1','#bfb5da','#b3ca62'
        ];
      objDatasets.backgroundColor = bckColor;
      objDatasets.hoverBackgroundColor = bckColor;

      let arrDatasets = [objDatasets];

      let objData = {
        labels:resLabel,
        datasets:arrDatasets
      }
      console.log(objData);
      this.setState({
        data:objData
      });
    })
    .catch(err => console.log(err));
  }


  render(){
    return(
      <div className="chart">
      <Pie data={this.state.data} />
      </div>
    )
  }
}
export default Graph;
