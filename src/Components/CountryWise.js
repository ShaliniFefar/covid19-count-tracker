import React from 'react';
import countriesList from '../countries.json';


class CountryWise extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country: '',
            countryData: [],
            loading: false
        }
        this.SortData = this.SortData.bind(this);
    }
    componentDidMount() {
        fetch('https://covid2019-api.herokuapp.com/current')
        .then(res => res.json())
        .then(json => {
            this.setState({
                loading: true,
                countryData: json
            })
            console.log(this.state.countryData);
        })
        
    }

    renderTableData() {
        return this.state.countryData.map((c, i) => {
            const {confirmed, deaths, recovered} = c;  //destructuring
            return (
                <tr key={i}>
                    <td>{}</td>
                    <td>{confirmed}</td>
                    <td>{deaths}</td>
                    <td>{recovered}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.countryData.data[0]);
        return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    SortData = column => {
        const data = this.state.countryData.data;
        data.sort((a,b) => a[column].localeCompare(b[column]))
        this.setState({data});
    }
    getCountry = e => {
        this.setState({ country: e.target.value});
        //console.log(this.state.country);
    }

    searchByName = () => {
        console.log(this.state.countryData.data[0]);
    }

    render() {
        const {loading, countryData} = this.state;
        return(
            <div className="CountryWiseDiv">
                <div className="SearchBox"> 
                <input type="input" placeholder="Type Country name" onChange={this.getCountry.bind(this)}/>
                <button onClick={this.searchByName.bind(this)}>Search</button>
                </div>
                <div className="TableData">
                {!loading || !countryData ? (
                    <div>Loading....</div>
                      ) : (
                    <table>
                        <tbody>
                            <tr>
                                <th onClick={e => this.SortData(e, 'location')}>Countries</th>
                                <th>Confirmed</th>
                                <th>Deaths</th>
                                <th>Recovered</th>
                            </tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>                
                )}
            </div>
            </div>
        )
    }
}

export default CountryWise;