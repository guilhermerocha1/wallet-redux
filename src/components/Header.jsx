import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkGetAPIEconomia } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  handleUpdate = () => {
    const { expenses } = this.props;
    const totExpenses = expenses.reduce((acc, cur) => {
      const sumCot = Number(cur.value); // * cur.exchangeRates[cur.coin].ask);
      return sumCot + acc;
    }, 0);
    return `Dispesa Total: ${totExpenses.toFixed(2)}`;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{this.handleUpdate()}</p>
        <p data-testid="header-currency-field">BRL</p>
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
