import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdbreact';
import {
  sellProjectTokens,
  getProjectOwners,
  getProjectTokenSalary,
  setProjectTokenPrice,
  backSellProjectTokens,
  buyToken,
  getTokenTrading,
  getUserTokens
} from '../../actions/token';
import { getInfoAboutMe } from '../../actions/user';

import BuyTokens from './BuyTokens';
import MyTokens from './MyTokens';
import ProjectsTokens from './ProjectsTokens';

class Exchange extends Component {
  state = {
    content: 'myTokens'
  };

  menuItems = {
    myTokens: {
      label: 'My Tokens',
      value: 'myTokens'
    },
    projectsTokens: {
      label: 'Projects Tokens',
      value: 'projectsTokens'
    },
    buyTokens: {
      label: 'Buy Token',
      value: 'buyTokens'
    }
  };

  componentDidMount() {
    // this.props.onSellProjectTokens(projectId, formData);
    // this.props.onBuyToken(formData);
    // this.props.onBackSellProjectTokens(projectId, formData);
    // this.props.onSetProjectTokenPrice(projectId, tokenPrice);
    /* const formData = new FormData();
    formData.append('tokensAmmount', 10);
    const projectId = 10;
    const page = 1;
    const tokenPrice = new FormData();
    tokenPrice.append('tokenPrice', 99); */
    // this.props.onGetProjectTokenOwners(projectId, page);
    // this.props.onGetProjectTokenSalary(projectId, page);
    // this.props.onGetTokenTrading(1);
    // this.props.onGetUserTokens(1);
  }

  openMenuItemContent = value => {
    this.setState({
      content: value
    });
  };

  renderContent = () => {
    const { content } = this.state;
    const {
      menuItems: { myTokens, projectsTokens, buyTokens }
    } = this;
    const {
      onGetUserTokens,
      onGetTokenTrading,
      onSellProjectTokens,
      onBackSellProjectTokens,
      onSetProjectTokenPrice,
      onGetProjectTokenSalary,
      onBuyToken,
      tokenData,
      userData,
      onGetInfoAboutMe
    } = this.props;

    switch (content) {
      case myTokens.value:
        return (
          <MyTokens
            onGetUserTokens={onGetUserTokens}
            onSellProjectTokens={onSellProjectTokens}
            onBackSellProjectTokens={onBackSellProjectTokens}
            onSetProjectTokenPrice={onSetProjectTokenPrice}
            tokenData={tokenData}
          />
        );
      case projectsTokens.value:
        return (
          <ProjectsTokens
            onGetTokenTrading={onGetTokenTrading}
            onGetProjectTokenSalary={onGetProjectTokenSalary}
            onBuyToken={onBuyToken}
            tokenData={tokenData}
            userData={userData}
            onGetInfoAboutMe={onGetInfoAboutMe}
          />
        );
      case buyTokens.value:
        return <BuyTokens />;
      default:
        return (
          <MyTokens
            onGetUserTokens={onGetUserTokens}
            onSellProjectTokens={onSellProjectTokens}
            onBackSellProjectTokens={onBackSellProjectTokens}
            onSetProjectTokenPrice={onSetProjectTokenPrice}
            tokenData={tokenData}
          />
        );
    }
  };

  renderMenu = () => {
    const menuItemsArray = Object.values(this.menuItems);
    const { content } = this.state;
    return (
      <MDBContainer>
        <MDBListGroup>
          {Array.isArray(menuItemsArray) &&
            menuItemsArray.map(menuItem => (
              <MDBListGroupItem
                color={content === menuItem.value ? 'dark' : ''}
                key={`${menuItem.label}${menuItem.value}`}
                onClick={() => this.openMenuItemContent(menuItem.value)}
              >
                {menuItem.label}
              </MDBListGroupItem>
            ))}
        </MDBListGroup>
      </MDBContainer>
    );
  };

  render() {
    return (
      <>
        <MDBRow>
          <MDBCol xs="4" sm="4" md="4" lg="4" xl="3">
            {this.renderMenu()}
          </MDBCol>
          <MDBCol xs="6" sm="6" md="6" lg="6" xl="6">
            {this.renderContent()}
          </MDBCol>
        </MDBRow>
      </>
    );
  }
}

const mapStateToProps = state => ({
  tokenData: state.token,
  userData: state.user
});

const mapDispatchToProps = dispatch => ({
  onSellProjectTokens: (projectId, tokensAmount) =>
    dispatch(sellProjectTokens(projectId, tokensAmount)),
  onGetProjectTokenOwners: (projectId, page) =>
    dispatch(getProjectOwners(projectId, page)),
  onGetProjectTokenSalary: (projectId, page) =>
    dispatch(getProjectTokenSalary(projectId, page)),
  onSetProjectTokenPrice: (projectId, tokenPrice) =>
    dispatch(setProjectTokenPrice(projectId, tokenPrice)),
  onBackSellProjectTokens: (projectId, tokensAmount) =>
    dispatch(backSellProjectTokens(projectId, tokensAmount)),
  onBuyToken: tokenAmount => dispatch(buyToken(tokenAmount)),
  onGetTokenTrading: page => dispatch(getTokenTrading(page)),
  onGetUserTokens: page => dispatch(getUserTokens(page)),
  onGetInfoAboutMe: () => dispatch(getInfoAboutMe())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);
