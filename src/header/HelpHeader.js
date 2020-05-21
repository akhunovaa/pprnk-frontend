import React, {Component} from 'react';
import './HelpHeader.css';
import {NavLink} from "react-router-dom";
import {Dropdown, Icon} from "semantic-ui-react";
import HeaderUserPortal from "../header/HeaderUserPortal";
import HeaderNotAuthenticatedUserPortal from "../header/HeaderNotAuthenticatedUserPortal";
import BookmarkList from "../common/elements/BookmarkList";

class HelpHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const styles = {
            navLink: {
                color: 'white',
                fontSize: '16px',
                width: '100%'
            },
            span:
                {
                    color: 'white'
                }
        };

        const {currentUser, onLogout, authenticated, handleSliderChange, visible} = this.props;

        return (
            <div className="help-header">
                <div className='left-help-header-links'>
                    <div className='header-help-logo'>
                        <NavLink to="/" className='white-yellow-inactive-link blue-hover'>YourAPI</NavLink>
                    </div>
                    <div className='header-help-sub'>
                        <NavLink to="/help" className='white-yellow-inactive-link blue-hover'>Справка</NavLink>
                    </div>
                </div>
                <div className='right-profile-administration-header-links'>
                    <div className='help-header-navlink'>
                        <NavLink to="/shop" className='blue-hover white-yellow-inactive-link'>Магазин API</NavLink>
                    </div>
                    <div className="header-right-menu">
                        <div className='header-right-navlink blue-hover white-yellow-inactive-link'>
                            <Dropdown text='RU' closeOnChange>
                                <Dropdown.Menu>
                                    <Dropdown.Item text='RU' description='Русский'/>
                                    <Dropdown.Item text='EN' description='English'/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='header-right-navlink-bell blue-hover white-yellow-inactive-link'>
                            <Icon link size={'large'} name='bell outline'/>
                        </div>
                        {
                            authenticated ? (<BookmarkList colored={'white-yellow-inactive-link'}/>) : (
                                <div className='header-right-navlink-bookmark blue-hover white-yellow-inactive-link'>
                                    <Icon link size={'large'} name='bookmark outline' onClick={handleSliderChange}/>
                                </div>)
                        }
                        <div className='header-right-navlink-profile blue-hover white-yellow-inactive-link'>
                            {authenticated ? (
                                <HeaderUserPortal currentUser={currentUser} onLogout={onLogout}/>) : (
                                <HeaderNotAuthenticatedUserPortal visible={visible} handleSliderChange={handleSliderChange}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HelpHeader;
