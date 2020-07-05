import React, { Component } from 'react';
import './App.css';
import Formulario from './Formulario';
import Produto from './Produto';

class App extends Component {
    constructor(props) {
        super(props);
        this.adicionar = this.adicionar.bind(this);
        this.remover = this.remover.bind(this);
        this.state = { lista: [], total: "0.00" };
    }

    adicionar(produto) {
        this.setState({lista: this.state.lista.concat(produto)},
            () => {
                let total = 0;
                for (let p in this.state.lista) {
                    console.log(p);
                    total += this.state.lista[p].preco * this.state.lista[p].quantidade;
                }
                this.setState({ total: total.toFixed(2) });
            });
    }

    remover(indice) {
        this.state.lista.splice(indice, 1);
        this.setState({ lista: this.state.lista });
        // console.log("teste");
    }

    render() {
        return (
          <div>
            <div class="complemento">
              <div class="sobreposicao"><h2>Lista de Compras</h2></div>
            </div>
            <fieldset>
              <legend>Adicionar Produto</legend>
              <Formulario evtAdicionar={this.adicionar}/>
            </fieldset>
            <fieldset class="segundo-fieldset">
              <legend>Carrinho</legend>
                <table cellpadding="0" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th>Subtotal</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.lista.map((prod,idx) => {
                        return <Produto evtDeletar={this.remover} key={idx} indice={idx} produto={prod}/>
                      })
                    }
                  </tbody>
                </table>
              </fieldset>
              <div class="complemento"></div>
              <div class="container-total"><span>Total: R$ {this.state.total}</span></div>
              
          </div>
        );
    }
}

export default App;