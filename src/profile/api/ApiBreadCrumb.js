import React, {Component} from 'react';
import './Api.css';
import {Breadcrumb} from "semantic-ui-react";
import {NavLink, withRouter} from "react-router-dom";

class ApiBreadCrumb extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
           page: ''
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


    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }


    render() {

        const page  = this.props.paging;
        const naming  = this.props.naming;

        let linkToPage = '/profile/api?page=' + page + "&name=" + naming;

        let message = 'Добавить API';

        switch(page) {
            case 'update':
                message = 'Редактировать API';
                break;
            default:
                message = 'Добавить API';
        }

        return (
                <Breadcrumb>
                    <Breadcrumb.Section as={NavLink} to={'/'} link><span className='text-disabled-color blue-hover'>Главная</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={'/profile'} link><span className='text-disabled-color blue-hover'>Личный кабинет</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={'/profile/api'} link><span className='text-disabled-color blue-hover'>Мои API</span></Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section as={NavLink} to={linkToPage} link><span className='text-disabled-color blue-hover'>{message}</span></Breadcrumb.Section>
                </Breadcrumb>

        )
    }
}

export default withRouter(ApiBreadCrumb);