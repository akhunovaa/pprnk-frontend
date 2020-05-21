import React, {Component} from 'react';
import './AppHeader.css';
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import {Dropdown, Icon} from "semantic-ui-react";
import HeaderNotAuthenticatedUserPortal from "../header/HeaderNotAuthenticatedUserPortal";
import SearchBox from "./SearchBox";

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        const {onLogout, authenticated, currentUser, handleSliderChange, visible} = this.props;
        return (
            <div style={{maxHeight: '64px'}}>
                <Switch>
                    <Route exact path="/" render={(props) => <HomeHeader handleSliderChange={handleSliderChange}
                                                                         authenticated={authenticated}
                                                                         currentUser={currentUser} visible={visible}
                                                                         onLogout={onLogout} {...props} />}/>

                </Switch>
            </div>
        )
    }
}

class HomeHeader extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({
                loading: false
            });
        }
    }

    componentWillMount() {
        this._isMounted = false;
    }


    handleOpenSearchOpen = () => {
        let element = document.getElementById('searchInput');
        let childNodes = element.parentNode.childNodes;
        for (let item of childNodes) {
            let classes = item.classList;
            if (classes.contains('clicked')) {
                // setTimeout(function () {
                //     item.classList.remove('clicked');
                // }, 100);
                item.classList.remove('clicked');
            }
        }
        if (element.classList.contains('clicked')) {
            setTimeout(function () {
                element.classList.remove('clicked');
            }, 50);
        } else {
            element.classList.add('clicked');
        }
    };


    render() {

        const {currentUser, onLogout, authenticated, handleSliderChange, visible} = this.props;

        return (
            <div className="header-authenticated">
                <div className='header-left-logo'>
                    <NavLink to="/" className='black-inactive-link'>ППРНК</NavLink>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-search-input'>
                        <SearchBox onClick={this.handleOpenSearchOpen}/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-navlink blue-hover'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item text='RU' description='Русский'/>
                                <Dropdown.Item text='EN' description='English'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='header-right-navlink-bell blue-hover'>
                        <Icon link size={'large'} name='bell outline'/>
                    </div>
                    <div className='header-right-navlink-bookmark blue-hover'>
                        <Icon link size={'large'} name='bookmark outline'/>
                    </div>

                    <div className='header-right-navlink-profile blue-hover'>
                        <HeaderNotAuthenticatedUserPortal visible={visible}
                                                          handleSliderChange={handleSliderChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AppHeader);
