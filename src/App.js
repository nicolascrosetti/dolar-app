import React, { Component } from 'react';
import './App.css';
import Price from './Price/Price';

class App extends Component {
  state = {
    dolarOficial: 0,
    dolarBlue: 0
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
    document.body.style = 'background: #F8F8FF;';
    const dolarSolidario = parseFloat(this.state.dolarOficial)+parseFloat(this.state.dolarOficial)*0.65;

    return (
      <div className="App">
        <nav class="navbar bg-dark navbar-dark">
          <ul class="navbar-nav">
            <li class="nav-item active">
            <h5 class="nav-link" href="#" >DolarApp</h5>
            </li>
          </ul>
        </nav>

        <br></br>
        <div className="container">
          <div className="jumbotron">
            <ul className="list-group col-6 offset-3">
              <li className="list-group-item">
                <Price type="Dolar Oficial" price={this.state.dolarOficial} />
              </li>
              <li className="list-group-item">
                <Price type="Dolar Solidario" price={dolarSolidario} />
              </li>
              <li className="list-group-item">
              <Price type="Dolar Blue" price={this.state.dolarBlue} />
              </li>
            </ul>
          </div>


        </div>
  
      </div>
    );
  }
}

export default App;
