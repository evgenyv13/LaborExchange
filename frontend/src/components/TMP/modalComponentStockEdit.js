import React from 'react';
import { MDBBtn, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact';

export default class ModalComponentStockEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modal: false,stockName: props.stockName,stockAddress:props.stockAddress};

        this.toggle = this.toggle.bind(this);
        this.handleChangeStockName = this.handleChangeStockName.bind(this);
        this.handleChangeStockAddress = this.handleChangeStockAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChangeStockName(event) {
        this.setState({stockName: event.target.value});
    }
    handleChangeStockAddress(event) {
        this.setState({stockAddress: event.target.value});
    }


    handleSubmit(event) {
        this.props.clickfunc(this.state.stockName,this.state.stockAddress,this.props.stockId);
        this.setState({
            modal: !this.state.modal,
        });
    }



    render() {
        return (

            <div>
                <a className={this.props.className} onClick={this.toggle}>Изменить</a>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>Редактирование склада</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="form-group MDBCol-md-8 offset-md-2">
                                    <MDBLabel>Название:</MDBLabel>
                                    <MDBInput type="text" value={this.state.stockName} onChange={this.handleChangeStockName} className="form-control" />
                                    <MDBLabel>Адрес:</MDBLabel>
                                    <MDBInput type="text" value={this.state.stockAddress} onChange={this.handleChangeStockAddress} className="form-control" />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <MDBBtn color="danger" onClick={this.handleSubmit}>Подтвердить</MDBBtn>
                            <MDBBtn color="info" onClick={this.toggle}>Выйти</MDBBtn>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>

        );
    }
}
