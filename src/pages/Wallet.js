import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <div>
          <label htmlFor="value" data-testid="value-input">
            Valor:
            <input type="number" />
          </label>

          <label htmlFor="description" data-testid="description-input">
            Descrição:
            <input type="text" />
          </label>

          <label htmlFor="coin">
            Moeda:
            <select id="coin">
              {
                currencies.map((selectCoins) => (
                  <option
                    key={ selectCoins }
                    value={ selectCoins }
                    data-testid="currency-input"
                  >
                    { selectCoins }
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="method" data-testid="method-input">
            Método de pagamento:
            <select>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag" data-testid="tag-input">
            Tag:
            <select>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Trasporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
