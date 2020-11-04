import React, { Component } from 'react';
import './App.css';
import Price from './Price/Price';
import {ArrowSwitchIcon} from '@primer/octicons-react'

class App extends Component {
  state = {
    dolarOficial: 0,
    dolarBlue: 0,
    valueInput1: null,
    valueInput2: null,
    actualDolarValue: 'blue'
  }

  dropdownHandler = (event) => {
    console.log(event.target.value);
    this.setState({
                    actualDolarValue: event.target.value,
                    valueInput1: 0,
                    valueInput2: 0
                  });

  }

  convertionHandler = (event, currency) => {
    let dolarPrice = 0;

    switch(this.state.actualDolarValue){
      case 'blue':
        dolarPrice = this.state.dolarBlue;
        break;
      case 'oficial':
        dolarPrice = this.state.dolarOficial;
        break;
      case 'solidario':
        dolarPrice = parseFloat(this.state.dolarOficial)+parseFloat(this.state.dolarOficial)*0.65;
        break;
      default:
        console.log("error");
    }

    if(currency === "ars"){
      const convertedPrice = event.target.value / dolarPrice;
      this.setState({
            valueInput1: event.target.value,
            valueInput2: convertedPrice
      });
    }else if(currency === "usd"){
      const convertedPrice = event.target.value * dolarPrice;
      this.setState({
                      valueInput1: convertedPrice,
                      valueInput2: event.target.value
                    });
    }
  }

  componentDidMount () {
    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(cotizaciones => {
            const dolarBlue = cotizaciones[1].casa.venta;
            const dolarOficial = cotizaciones[0].casa.venta;
            this.setState({
              dolarBlue: parseFloat(dolarBlue),
              dolarOficial: parseFloat(dolarOficial)
            });
        });
  }
  
  render() {
    document.body.style = 'background: ghostwhite;';
    const dolarSolidario = parseFloat(this.state.dolarOficial)+parseFloat(this.state.dolarOficial)*0.65;

    return (
      <div className="App">
        <nav className="navbar bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item active">
            <h5 className="nav-link" href="#" >DolarApp</h5>
            </li>
          </ul>
        </nav>

        <br></br>
        <div className="container">
          <div className="jumbotron">
                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <Price type="Dolar Oficial" price={this.state.dolarOficial} />
                  </div>
                  <div className="col">
                    <div className="vl"></div>
                  </div>
                  <div className="col">
                    <Price type="Dolar Blue" price={this.state.dolarBlue} /> 
                  </div>
                  <div className="col"></div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <Price type="Dolar Solidario" price={dolarSolidario} />
                  </div>
                  <div className="col"></div>
                </div>
                {/* <Price type="Dolar Solidario" price={dolarSolidario} /> */}

          </div>

          <div className="d-flex justify-content-center convert-text">
              <p>Convertir pesos argentinos a</p>
              <select className="myInput" id="dropdown" value={this.state.actualDolarValue} onChange={(event) => this.dropdownHandler(event)}>
                <option value="blue">Dolar Blue</option>
                <option value="oficial">Dolar Oficial</option>
                <option value="solidario">Dolar Solidario</option>
              </select>
              <p>y viceversa.</p>
          </div>
          
          <div className="d-flex flex-column inputsDiv">
            <input placeholder="ars" className="myInput" type="number" value={this.state.valueInput1} onChange={(event) => this.convertionHandler(event, "ars")} />
            <ArrowSwitchIcon size={24} className="arrow-switch" />
            <input placeholder="usd" className="myInput" type="number" value={this.state.valueInput2} onChange={(event) => this.convertionHandler(event, "usd")}/>
          </div>

        </div>
  
      </div>
    );
  }
}

export default App;
