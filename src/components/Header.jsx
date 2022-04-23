import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkGetAPIEconomia, thunkGetCoin } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { requestApi, requestApiExchage } = this.props;
    requestApi();
    requestApiExchage();
  }

  handleUpdate = () => {
    const { value, exchange } = this.props;
    if (value.length > 0) {
      const allExpenses = value.reduce((prev, curr) => {
        const currTotal = Number(curr.value)
        * exchange.filter(({ code }) => code === curr.coin)
          .map(({ ask }) => ask)[0];

        const sumExpensesTotal = prev + currTotal;

        return sumExpensesTotal;
      }, 0);
      return `Dispesa Total: ${allExpenses.toFixed(2)}`;
    }
    return 'Dispesa Total: 0,00';
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
  requestApi: PropTypes.func,
  value: PropTypes.array,
  requestApiExchage: PropTypes.func,
  exchange: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.expenses,
  exchange: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(thunkGetAPIEconomia()),
  requestApiExchage: () => dispatch(thunkGetCoin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
