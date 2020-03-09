import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import asyncComponent from '../../util/asyncComponent';
import "react-toastify/dist/ReactToastify.css";
import axios from '../../Services/admin';



class Admin extends Component {
    render() {
        return (
            <Router props={this.props} />
        );
    }
}

const Router = ({props}) => {
    if(localStorage.getItem('adminData') && props.history.location.pathname == '/admin/login') {
        props.history.push('/admin');
    }
    if(localStorage.getItem('adminData')) {
        const token = JSON.parse(localStorage.getItem("adminData")).accessToken;
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            axios.defaults.headers.common.Authorization = null;
        }
        return (
            <Switch>
                <Route
                    path="/admin"
                    exact
                    component={asyncComponent(() => import('./Dashboard/Dashboard'))}
                />
            </Switch>
        );
    } else {
        return (
            <Switch>
                <Route
                    path="/admin/login"
                    component={asyncComponent(() => import('./Login/Login'))}
                />
                <Redirect to="/admin/login" />
            </Switch>
        );
    }
}

export default withRouter(Admin);
