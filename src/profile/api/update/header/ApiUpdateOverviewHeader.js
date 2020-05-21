import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './ApiDetailHeader.css';
import {Icon} from "semantic-ui-react";

class ApiUpdateOverviewHeader extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };


    render() {
        const externalLink = this.props.externalLink ? this.props.externalLink : 'https://yourapi.ru/';
        return (
            <div className='update-header-links-list'>
                <div className='left-link-header-font update-header-links-methods update-header-links-font update-active-header-container'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=overview'} className='update-active-header-link'>Описание</NavLink>
                </div>
                <div className='left-link-header-font update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=settings'} className='update-inactive-header-link'>Основные</NavLink>
                </div>
                <div className='left-link-header-font update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=endpoints'} className='update-inactive-header-link'>Endpoint'ы</NavLink>
                </div>
                <div className='left-link-header-font update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=price'} className='update-inactive-header-link'>Цены</NavLink>
                </div>
                <div className='left-link-header-font update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=docs'} className='update-inactive-header-link'>Документация</NavLink>
                </div>
                <div className='left-link-header-font update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=announcements'} className='update-inactive-header-link'>Оповещения</NavLink>
                </div>
                <div className='update-header-links-methods update-header-links-font external-link-header-font'>
                    <a target='_blank' href={externalLink} className='update-inactive-header-link colored-to-blue'><Icon name='external share' link/>На Marketplace</a>
                </div>
            </div>
        )
    }
}

export default ApiUpdateOverviewHeader;