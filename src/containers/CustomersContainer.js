import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppFrame from '../components/AppFrame';
import CustomerList from '../components/CustomerList';
import CustomerActions from '../components/CustomerActions';
import { fetchCustomers } from './../actions/fetchCustomers';
import { getCustomers } from './../selectors/customers';

class CustomersContainer extends Component {

    componentDidMount() {
        if (this.props.customers.length === 0) {
            this.props.fetchCustomers();
        }
    }
    
    handleAddNew = () => {
        this.props.history.push("/customers/new");
    }
    
    rednderBody = customers => (
        <div>
            <CustomerList 
                customers={customers} 
                urlPath={'customers/'}
            />
            <CustomerActions>
                <button onClick={this.handleAddNew}>Nuevo Cliente</button>
            </CustomerActions>
        </div>
    );

    render() {
        return (
            <div>
                <AppFrame
                    header={'listado de clientes'}
                    body={this.rednderBody(this.props.customers)}
                />
            </div>
        );
    }
}

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired,
}

CustomersContainer.defaultProps = {
    customers: []
}

const mapDispatchToProps = { fetchCustomers };

const mapStateToProps = state => ({
    customers: getCustomers(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomersContainer));