import React, {Component} from 'react';
import './AdministrationHeader.css';
import {NavLink} from "react-router-dom";
import {Icon, Dropdown} from "semantic-ui-react";
import HeaderUserPortal from "../header/HeaderUserPortal";
import BookmarkList from "../common/elements/BookmarkList";

class AdministrationHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {currentUser, onLogout} = this.props;

        return (
            <div className="profile-administration-header">
                <div className='left-profile-administration-header-links'>
                    <div className='header-left-logo'>
                        <NavLink to="/" className='white-inactive-link'>YourAPI</NavLink>
                    </div>
                    <div className='header-navigation-link'>
                        <NavLink to="/profile" className='white-inactive-link'>Личный кабинет</NavLink>
                    </div>
                    <div className='lk-page-link'>
                        <NavLink to="/profile" className='blue-inactive-link'>Настройки профиля</NavLink>
                    </div>
                    <div className='admin-page-link'>
                        <NavLink to="/profile/administration" className='white-inactive-link'>Администрирование</NavLink>
                    </div>
                    <div className='api-page-link'>
                        <NavLink to="/profile/api" className='blue-inactive-link'>Мои API</NavLink>
                    </div>
                    <div className='linked-api-page-link'>
                        <NavLink to="/profile/api" className='blue-inactive-link'>Подключенные API</NavLink>
                    </div>
                </div>
                <div className='right-profile-administration-header-links'>
                    <div className='profile-administration-header-navlink'>
                        <NavLink to="/shop" className='white-inactive-link'>Магазин</NavLink>
                    </div>
                    <div className='profile-administration-header-language-navlink'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item text='RU' description='Русский' />
                                <Dropdown.Item text='EN' description='English' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='header-right-navlink-bell'>
                        <Icon link size={'large'}  name='bell outline' />
                    </div>
                    <BookmarkList colored={'white-inactive-link'}/>
                    <div className='header-right-navlink-profile'>
                        <HeaderUserPortal currentUser={currentUser} onLogout={onLogout} {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdministrationHeader;
