import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAction } from '../actions';
import './Login.css';
import image from '../image/image1.jpg';

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
      <div className='container-main'>
        <div className='title'>
          <img src={ image } alt='imagem dinheiro' />
          <h1 id='trybe'>Trybe</h1><h1 id='wallet'> Wallet</h1>
        </div>
        <div className='container-login'>
          <label htmlFor="email">
            <input
              className='input-login'
              placeholder='Email'
              type="email"
              data-testid="email-input"
              onChange={ this.validationEmail }
              value={ email }
              name="email"
            />
          </label>
          <label htmlFor="password">
            <input
              className='input-login'
              placeholder='Senha'
              type="password"
              data-testid="password-input"
              onChange={ this.validatePassword }
              value={ password }
              name="password"
            />
          </label>
          <Link to="/carteira">
            <button
              className='button-login'
              onClick={ () => saveUser(email) }
              type="button"
              disabled={ validationBtn }
            >
              Entrar
            </button>
          </Link>
        </div>
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
