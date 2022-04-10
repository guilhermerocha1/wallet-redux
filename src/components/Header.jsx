import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkGetAPIEconomia } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">Despesa Total: 0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  requestApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(thunkGetAPIEconomia()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
