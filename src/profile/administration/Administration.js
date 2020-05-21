import React, {Component} from 'react';
import './Administration.css';
import {Button, Icon} from "semantic-ui-react";
import {loadUser} from "../../util/APIUtils";
import CommandsTreeSet from './CommandsTreeSet';
import CommandAdministration from './CommandAdministration';
import AdministrationCommandBody from './AdministrationCommandBody';
import AdministrationCompanyBody from './AdministrationCompanyBody';
import AdministrationCommandMembers from './AdministrationCommandMembers';
import AdministrationCompanyMembers from './AdministrationCompanyMembers';
import {withRouter} from "react-router";
import queryString from "query-string";

class Administration extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            command: {
                name: '',
                page: ''
            },
            open: false,
            page: ''
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        document.title  = 'YourAPI | Администрирование';
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadUser(handle) {
        this.setState({
            loading: true
        });
        let data = {
            "id": handle
        };
        loadUser(data)
            .then(response => {
                this.setState({
                    user: response.response,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
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


    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleCheck(array, val) {
        return array.some(item => item === val);
    }


    renderSwitchBody() {
        const namingArray = ['Волга', 'Урал'];
        const pagingArray = ['about', 'members'];
        const params = queryString.parse(this.props.location.search);
        const naming = (params.company !== 'undefined' && this.handleCheck(namingArray, params.company)) ? params.company : 'Волга';
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'about';
        switch(naming) {
            case 'Урал':
                if (paging === 'about') {
                    return <AdministrationCompanyBody naming={naming}/>;
                }else{
                    return <AdministrationCompanyMembers naming={naming}/>;
                }
            default:
                if (paging === 'about') {
                    return <AdministrationCommandBody naming={naming}/>;
                }else{
                    return <AdministrationCommandMembers naming={naming}/>;
                }
        }
    }

    render() {
        const namingArray = ['Волга', 'Урал'];
        const pagingArray = ['about', 'members'];
        const params = queryString.parse(this.props.location.search);
        const naming = (params.company !== 'undefined' && this.handleCheck(namingArray, params.company)) ? params.company : 'Волга';
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'about';
        let className;
        switch(naming) {
            case 'Урал':
                if (paging === 'about') {
                    className = 'administration-main-company';
                    break;
                }else{
                    className = 'administration-company-member';
                    break;
                }
            default:
                if (paging === 'about') {
                    className = 'administration-main';
                    break;
                }else{
                    className = 'administration-command-member';
                    break;
                }
        }

        return (
            <div className={className} >
                <div className='left-side-administration-body'>
                    <div className='left-side-administration-body-header'>
                        <div className='left-side-administration-body-header-button'>
                            <Button icon fluid labelPosition='left' style={{background: '#F39847'}}> <Icon
                                name='plus square'/><span
                                className='command-approve-buttons-text command-create-button'>Создать команду</span></Button>
                        </div>
                    </div>
                    <div className='left-side-administration-body-main-container'>
                        <CommandsTreeSet {...this.props}/>
                    </div>
                </div>
                <div className='right-side-administration'>
                    <div className="administration-breadcrumb">
                        <CommandAdministration naming={naming} paging={paging} {...this.props}/>
                    </div>
                    <div className="administration-body">
                        {this.renderSwitchBody()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Administration);