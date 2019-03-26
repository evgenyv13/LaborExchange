import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

export default class ProjectsTokens extends PureComponent {
  static propTypes = {
    tokenData: PropTypes.shape({
      tradingProject: PropTypes.shape({
        content: PropTypes.arrayOf(PropTypes.shape)
      })
    })
  };

  static defaultProps = {
    tokenData: {
      tradingProject: {
        content: []
      }
    }
  };

  state = {
    showProjectInvestmentManagementPanel: false,
    project: {
      project: {}
    }
  };

  componentDidMount() {
    const { onGetTokenTrading, onGetInfoAboutMe } = this.props;
    onGetTokenTrading(1);
    onGetInfoAboutMe();
  }

  handleProjectClick = project => {
    const {
      project: { id }
    } = project;
    const { onGetProjectTokenSalary } = this.props;

    onGetProjectTokenSalary(id, 1);
    this.setState({
      showProjectInvestmentManagementPanel: true,
      project
    });
  };

  handleBuyTokensClick = seller => {
    const { id, freeToSellToken } = seller;
    const { onBuyToken } = this.props;
    const formData = new FormData();
    formData.append('tokenAmmount', freeToSellToken);
    formData.append('tokenId', id);

    onBuyToken(formData);
  };

  renderProjectsTableBody = projects => {
    return (
      Array.isArray(projects) &&
      projects.map(project => {
        const {
          countOfTraders,
          project: { id, name }
        } = project;
        return (
          <tr key={id} onClick={() => this.handleProjectClick(project)}>
            <td>{name}</td>
            <td>{countOfTraders}</td>
          </tr>
        );
      })
    );
  };

  renderSellersTableBody = (sellers, user) => {
    return (
      Array.isArray(sellers) &&
      sellers.map(seller => {
        const {
          freeToSellPerTokenPrice,
          freeToSellToken,
          user: { username, id: sellerId },
          id
        } = seller;
        const { id: currentUserId } = user;
        return (
          <tr key={id}>
            <td>{username}</td>
            <td>{freeToSellToken}</td>
            <td>{freeToSellPerTokenPrice}</td>
            <td>
              {currentUserId === sellerId ? (
                <div>-</div>
              ) : (
                <MDBBtn onClick={() => this.handleBuyTokensClick(seller)}>
                  Buy
                </MDBBtn>
              )}
            </td>
          </tr>
        );
      })
    );
  };

  render() {
    const {
      tokenData: {
        tradingProject: { content: tradingProjectContent },
        tokenSellers: { content: tokenSellersContent }
      },
      userData: { user }
    } = this.props;
    const { showProjectInvestmentManagementPanel } = this.state;

    return (
      <>
        {showProjectInvestmentManagementPanel ? (
          <>
            <MDBTable>
              <MDBTableHead color="default-color" textWhite>
                <tr>
                  <th>User Name</th>
                  <th>Tokens For Sale</th>
                  <th>Tokens Price</th>
                  <th>Buy Tokens</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {this.renderSellersTableBody(tokenSellersContent, user)}
              </MDBTableBody>
            </MDBTable>
          </>
        ) : (
          <MDBTable>
            <MDBTableHead color="default-color" textWhite>
              <tr>
                <th>Project</th>
                <th>Traders</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.renderProjectsTableBody(tradingProjectContent)}
            </MDBTableBody>
          </MDBTable>
        )}
      </>
    );
  }
}
