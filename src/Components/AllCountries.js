import React, {Component} from 'react';

import CountryWise from './CountryWise';
import virusImage from '../Images/virus_spread.gif';

class AllCountries extends Component {
    constructor(props) {
        super(props);
        this.state= {
            loading: false,
            information: '',
            search : false
          }
    }

    componentDidMount() {
        fetch('https://covid2019-api.herokuapp.com/v2/total')
          .then(res => res.json())
          .then(json => {
          this.setState({
            loading: true,
            information: json,
          });
        });
    }

    viewCountryWiseData = () => {
        this.setState({search: true});
  }

    render() {
        const {loading, information} = this.state;
        const {data} = information;
   
      if(this.state.search === true) {
        return (
          <CountryWise/>
        )
      }
        return(
            <div>
                <div>
          <div className="TitleImage">
          <h1>COVID-19 Data Worldwide</h1>
          <img src={virusImage} alt="loading..." height="200px" width="300px"/>
          </div>
          <div>
                {!loading || !information ? (
                    <div>Loading....</div>
                      ) : (
                      <div className="MainData">
                        <div className="dataDiv">
                          <h2>Total Cases </h2>
                          <h2>{data?.confirmed}</h2>
                        </div>
                        <div className="dataDiv">
                          <h2>Deaths</h2>
                          <h2>{data?.deaths}</h2>
                        </div>
                        <div className="dataDiv">
                          <h2>Recovered</h2>
                          <h2>{data?.recovered}</h2>
                          </div>
                        <div className="dataDiv">
                          <h2>Active</h2>
                          <h2>{data?.active}</h2>
                          </div>
                      </div>
                )}
          <div className="ButtonDiv">
            <button id="countryWiseButton" onClick={this.viewCountryWiseData.bind(this)}>Click here to view country wise data</button>            
          </div>
          </div>
      </div>
            </div>
        )
    }
}

export default AllCountries;