import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAction } from '../actions';

const MAX_LENGTH = 6;
const emailRegex = /\S+@\S+\.\S+/;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isValidationEmail: false,
      isValidationPass: false,
      validationBtn: true,
    };
  }

  validationEmail = ({ target: { value } }) => {
    this.setState({
      email: value,
      isValidationEmail: emailRegex.test(value),
    });
    this.validationBtnClick();
  }

  validatePassword = ({ target: { value } }) => {
    const passwordLength = value.length;
    this.setState({
      password: value,
      isValidationPass: MAX_LENGTH <= passwordLength,
    }, () => this.validationBtnClick());
  }

  validationBtnClick = () => {
    const { isValidationEmail, isValidationPass } = this.state;
    this.setState({
      validationBtn: !(isValidationEmail === true && isValidationPass === true),
    });
  }

  render() {
    const { saveUser } = this.props;
    const { email, password, validationBtn } = this.state;
    return (
      <div>
        <h2>Tela de Login</h2>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.validationEmail }
            value={ email }
            name="email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.validatePassword }
            value={ password }
            name="password"
          />
        </label>
        <Link to="/carteira">
          <button
            onClick={ () => saveUser(email) }
            type="button"
            disabled={ validationBtn }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => dispatch(userAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
