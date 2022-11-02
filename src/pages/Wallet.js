import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import { thunkGetCoin } from '../actions';
import '../style/Wallet.css';

const arrMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const arrTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheito',
      tag: 'Alimentação',
    };
  }

  handleGeneric = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  saveInfoUser = async () => {
    const { id } = this.state;
    const { saveInfo } = this.props;
    this.setState({ id: id + 1 });
    saveInfo(this.state);
    this.setState({ value: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <Header />
        <div className='container-atribute'>
          <label htmlFor="value" className='atributes'>
            Valor
            <input
              className='input-label'
              data-testid="value-input"
              type="number"
              onChange={this.handleGeneric}
              value={value}
              name="value"
            />
          </label>

          <label htmlFor="description" className='atributes'>
            Descrição
            <input
              className='input-label'
              data-testid="description-input"
              type="text"
              onChange={this.handleGeneric}
              value={description}
              name="description"
            />
          </label>

          <label htmlFor="currency" className='atributes'>
            Moeda
            <select
              className='input-label'
              id="currency"
              value={currency}
              onChange={this.handleGeneric}
              name="currency"
              data-testid="currency-input"
            >
              {
                currencies.map((selectCoins) => (
                  <option
                    key={selectCoins}
                    value={selectCoins}
                  >
                    {selectCoins}
                  </option>
                ))
              }
            </select>
          </label>

          <label
            htmlFor="method"
            className='atributes'
          >
            Método de pagamento
            <select
              className='input-label'
              onChange={this.handleGeneric}
              value={method}
              name="method"
              data-testid="method-input"
              id="method"
            >
              {
                arrMethod.map((selectMethod) => (
                  <option
                    key={selectMethod}
                    value={selectMethod}
                  >
                    {selectMethod}
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="tag" className='atributes'>
            Tag
            <select
              className='input-label'
              onChange={this.handleGeneric}
              value={tag}
              name="tag"
              data-testid="tag-input"
              id="tag"
            >
              {
                arrTag.map((selectTag) => (
                  <option
                    key={selectTag}
                    value={selectTag}
                  >
                    {selectTag}
                  </option>
                ))
              }
            </select>
          </label>
        </div>
        <div className='container-buuton'>
          <button
            type="button"
            onClick={this.saveInfoUser}
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
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (info) => dispatch(thunkGetCoin(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
