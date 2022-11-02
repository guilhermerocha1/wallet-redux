import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkGetAPIEconomia } from '../actions';
import '../style/Header.css';

class Header extends React.Component {
  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  handleUpdate = () => {
    const { expenses } = this.props;
    const totExpenses = expenses.reduce((acc, cur) => {
      const sumCot = Number(cur.value * cur.exchangeRates[cur.currency].ask);
      return sumCot + acc;
    }, 0);
    return totExpenses.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div className='container-header'>
        <h2 className='title'>TrybeWallet</h2>
        <p id='total-despensa' data-testid="total-field">Total Dispensa: {this.handleUpdate()} BRL</p>
        <p id='email' data-testid="email-field">{email}</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  requestCurrencies: PropTypes.func,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(thunkGetAPIEconomia()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
