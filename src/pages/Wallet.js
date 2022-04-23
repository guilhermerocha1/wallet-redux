import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import { actionSaveInfo, thunkGetCoin } from '../actions';

const arrMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const arrTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      coin: 'USD',
      method: 'Dinheito',
      tag: 'Alimentação',
    };
  }

  handleGeneric = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  saveInfoUser = async () => {
    const { id, coin, value, description, method, tag } = this.state;
    const { saveInfo } = this.props;
    this.setState({ id: id + 1 });
    saveInfo({ id, coin, value, description, method, tag });
    this.setState({ value: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, coin, method, tag } = this.state;
    return (
      <div>
        <Header />
        <div>
          <label htmlFor="value" data-testid="value-input">
            Valor:
            <input
              type="number"
              onChange={ this.handleGeneric }
              value={ value }
              name="value"
            />
          </label>

          <label htmlFor="description" data-testid="description-input">
            Descrição:
            <input
              type="text"
              onChange={ this.handleGeneric }
              value={ description }
              name="description"
            />
          </label>

          <label htmlFor="coin">
            Moeda:
            <select id="coin" value={ coin } onChange={ this.handleGeneric } name="coin">
              {
                currencies.map((selectCoins) => (
                  <option
                    data-testid="currency-input"
                    key={ selectCoins }
                    value={ selectCoins }
                  >
                    {selectCoins}
                  </option>
                ))
              }
            </select>
          </label>

          <label
            htmlFor="method"
            data-testid="method-input"
          >
            Método de pagamento:
            <select onChange={ this.handleGeneric } value={ method } name="method">
              {
                arrMethod.map((selectMethod) => (
                  <option
                    key={ selectMethod }
                    value={ selectMethod }
                  >
                    {selectMethod}
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="tag" data-testid="tag-input">
            Tag:
            <select onChange={ this.handleGeneric } value={ tag } name="tag">
              {
                arrTag.map((selectTag) => (
                  <option
                    key={ selectTag }
                    value={ selectTag }
                  >
                    {selectTag}
                  </option>
                ))
              }
            </select>
          </label>
          <button
            type="button"
            onClick={ this.saveInfoUser }
          >
            Adicionar despesa
          </button>
        </div>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.string,
  saveInfo: PropTypes.func,
  requestApi: PropTypes.func,
  expenses: PropTypes.array,
  requestApiExchage: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (info) => dispatch(actionSaveInfo(info)),
  requestApiExchage: () => dispatch(thunkGetCoin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
