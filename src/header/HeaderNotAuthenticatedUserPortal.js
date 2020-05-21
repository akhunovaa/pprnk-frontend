import React, {Component} from 'react';
import './HeaderUserPortal.css';
import {Icon} from "semantic-ui-react";

class HeaderNotAuthenticatedUserPortal extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };


    render() {

        const {handleSliderChange, visible} = this.props;

        return (
            <div className="header-right-navlink-profile-icon not-authorized-icon-sign blue-hover">
                <Icon link name={visible ? 'close' : 'sign-in'} onClick={handleSliderChange}/>
            </div>
        )
    }
}

export default HeaderNotAuthenticatedUserPortal;
