import React, {Component} from 'react';
import './Home.css';
import LoginMini from '../login/LoginMini';
import SignUpMini from '../signup/SignUpMini';

class AuthContainerWrapper extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            showSignUp: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleAuthTypeChange = (value) => {
        this.setState({showSignUp: value});
    };


    render() {

        const {showSignUp} = this.state;

        return (
            <>
                {showSignUp ? (<SignUpMini handleAuthTypeChange={this.handleAuthTypeChange} {...this.props}/>) : (
                    <LoginMini handleAuthTypeChange={this.handleAuthTypeChange} {...this.props}/>)}
            </>
        )
    }
}

export default AuthContainerWrapper;