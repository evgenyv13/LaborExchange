import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBInput
} from 'mdbreact';

export default class MyTokens extends PureComponent {
  static propTypes = {
    tokenData: PropTypes.shape({
      tokens: PropTypes.shape({
        content: PropTypes.arrayOf(PropTypes.shape)
      })
    })
  };

  static defaultProps = {
    tokenData: {
      tokens: {
        content: []
      }
    }
  };

  state = {
    showTokenManagementPanel: false,
    token: {
      project: {}
    },
    tokenPrice: '',
    tokensToSell: '',
    tokensToWithdraw: ''
  };

  componentDidMount() {
    const { onGetUserTokens } = this.props;
    onGetUserTokens(1);
  }

  handleTokenClick = token => {
    this.setState({
      showTokenManagementPanel: true,
      token
    });
  };

  handleTokenPriceChange = e => {
    this.setState({
      tokenPrice: e.target.value
    });
  };

  handleNumberOfTokensToSellChange = e => {
    this.setState({
      tokensToSell: e.target.value
    });
  };

  handleNumberOfTokensToWithdraw = e => {
    this.setState({
      tokensToWithdraw: e.target.value
    });
  };

  changeTokenPrice = async () => {
    const {
      tokenPrice,
      token: {
        project: { id }
      }
    } = this.state;
    const { onSetProjectTokenPrice } = this.props;
    const formData = new FormData();
    formData.append('tokenPrice', tokenPrice);

    await onSetProjectTokenPrice(id, formData);
    await this.props.onGetUserTokens(1);
    this.setState({
      showTokenManagementPanel: false
    });
  };

  sellTokens = async () => {
    const {
      tokensToSell,
      token: {
        project: { id }
      }
    } = this.state;
    const { onSellProjectTokens } = this.props;
    const formData = new FormData();
    formData.append('tokensAmmount', tokensToSell);

    await onSellProjectTokens(id, formData);
    await this.props.onGetUserTokens(1);
    this.setState({
      showTokenManagementPanel: false
    });
  };

  withdrawTokens = async () => {
    const {
      tokensToWithdraw,
      token: {
        project: { id }
      }
    } = this.state;
    const { onBackSellProjectTokens } = this.props;
    const formData = new FormData();
    formData.append('tokensAmmount', tokensToWithdraw);

    await onBackSellProjectTokens(id, formData);
    await this.props.onGetUserTokens(1);
    this.setState({
      showTokenManagementPanel: false
    });
  };

  renderTokensTableBody = tokens => {
    return (
      Array.isArray(tokens) &&
      tokens.map(token => {
        const {
          project: { name },
          freeToSellPerTokenPrice,
          freeToSellToken,
          percent,
          id
        } = token;
        return (
          <tr key={id} onClick={() => this.handleTokenClick(token)}>
            <td>{name}</td>
            <td>{freeToSellPerTokenPrice}</td>
            <td>{freeToSellToken}</td>
            <td>{percent}</td>
          </tr>
        );
      })
    );
  };

  render() {
    const {
      tokenData: {
        tokens: { content }
      }
    } = this.props;
    const {
      showTokenManagementPanel,
      token: {
        project: { name },
        freeToSellToken,
        freeToSellPerTokenPrice
      },
      tokenPrice,
      tokensToSell,
      tokensToWithdraw
    } = this.state;

    console.log(this.state.token);

    return (
      <>
        {showTokenManagementPanel ? (
          <>
            <MDBInput
              type="text"
              value={tokenPrice}
              onChange={this.handleTokenPriceChange}
              placeHolder="PRICE OF THE TOKEN"
              required=""
            />
            <MDBBtn onClick={this.changeTokenPrice}>Change Price</MDBBtn>
            <MDBInput
              type="text"
              value={tokensToSell}
              onChange={this.handleNumberOfTokensToSellChange}
              placeHolder="NUMBER OF TOKENS TO SELL"
              required=""
            />
            <MDBBtn onClick={this.sellTokens}>Sell</MDBBtn>
            <MDBInput
              type="text"
              value={tokensToWithdraw}
              onChange={this.handleNumberOfTokensToWithdraw}
              placeHolder="NUMBER OF TOKENS TO WITHDRAW"
              required=""
            />
            <MDBBtn onClick={this.withdrawTokens}>Withdraw</MDBBtn>
          </>
        ) : (
          <MDBTable>
            <MDBTableHead color="default-color" textWhite>
              <tr>
                <th>Token</th>
                <th>Price</th>
                <th>For Sale</th>
                <th>Seller balance</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>{this.renderTokensTableBody(content)}</MDBTableBody>
          </MDBTable>
        )}
      </>
    );
  }
}
