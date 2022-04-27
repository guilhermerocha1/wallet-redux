import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteLine } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, prevDelete } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {
              expenses.map(({
                id, description, tag, method, value, coin,
                exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[coin].name}</td>
                  <td>{Number(exchangeRates[coin].ask).toFixed(2)}</td>
                  <td>{Number(value * exchangeRates[coin].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => prevDelete(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
  prevDelete: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  prevDelete: (id) => dispatch(deleteLine(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
