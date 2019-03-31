import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import { insertCustomer } from '../actions/insertCustomer';

class NewCustomerContainer extends Component {

    handleSubmit = values => {
        return this.props.insertCustomer(values).then(r => {
            if (r.error) {
                throw new SubmissionError(r.payload);
            }
        });
    }

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleonBack  = () => {
        this.props.history.goBack();
    }

    renderBody = () => {
        return <CustomerEdit
                    onSubmit={this.handleSubmit}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    onBack={this.handleonBack}
                />
    }
    render() {
        return (
            <div>
                <AppFrame 
                    header={`Nuevo de Cliente`}
                    body={this.renderBody()}
                />
            </div>
        );
    }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { insertCustomer })(NewCustomerContainer));