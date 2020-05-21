import React, {Component} from 'react';
import './Administration.css';
import {Button, Divider, Icon, Image, Table, Dropdown} from "semantic-ui-react";
import {NavLink, withRouter} from "react-router-dom";
import volgaImage from '../../img/volga.png';
import uralImage from '../../img/ural.png';

class AdministrationCommandMembers extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            command: {
                imageUrl: '',
                name: '',
                page: ''
            },
            commandName: 'Волга',
            company_name: '',
            info: '',
            city: '',
            site: '',
            phone: '',
            email: ''
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
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

    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }


    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const naming  = this.props.naming;
        let imageUrl;
        switch (naming) {
            case 'Волга':
                imageUrl = volgaImage;
                break;
            default:
                imageUrl = uralImage;
        }
        return (
            <div className='administration-body-main'>
                <div className="command-avatar-container">
                    <div className="command-avatar">
                        {
                            imageUrl ? (
                                <Image src={imageUrl} verticalAlign='middle' className='command-avatar-center'
                                       alt={naming}/>
                            ) : (
                                <div className="text-avatar">
                                    <span>{naming && naming[0]}</span>
                                </div>
                            )
                        }
                        <div className="command-avatar-footer">
                            <Icon link name='photo' size={'large'} color={'grey'}/>
                        </div>
                    </div>
                    <div className="command-name-container">
                        <span style={{paddingRight: '8px', height: 28}}>{naming}</span>
                        <span className='command-label'>Команда</span>
                    </div>
                    <div className="command-custom-icon-container">
                        <Icon link name='cog' size={'large'} color={'grey'}/>
                    </div>
                </div>
                <div className="command-info-container">
                    <div className="command-info-container-name-members">
                        <span>Участники</span>
                    </div>
                    <div className="command-member-container-table">
                        <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell><span style={{color: '#A5A5A5'}}>Участник</span></Table.HeaderCell>
                                    <Table.HeaderCell><span style={{color: '#A5A5A5'}}>Роль</span></Table.HeaderCell>
                                    <Table.HeaderCell><span style={{color: '#A5A5A5'}}>Статус</span></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell><div className='command-member-table'><div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div><div className='member-user-text custom-text'><span>ivan_ivanov</span></div></div></Table.Cell>
                                    <Table.Cell><div className='command-member-table'><div className='member-user-text'><span>Роль 1</span></div></div></Table.Cell>
                                    <Table.Cell><div className='command-member-table habmburger-member-table-cell'><div className=''><Icon color='green' name='dot circle' size='small'/></div><div className='member-user-text'><span className='member-user-text'>В команде</span></div><div className='hamburger-menu'><a href="#" onClick={this.handleClose} className='hamburger-menu-link'>&#8942;</a></div></div></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><div className='command-member-table'><div className='member-user-icon'><Icon fitted link name='user outline' size={'large'}/></div><div className='member-user-text custom-text'><span>petrov@mail.ru</span></div></div></Table.Cell>
                                    <Table.Cell><div className='command-member-table'><div className='member-user-text'><span>Роль 2</span></div></div></Table.Cell>
                                    <Table.Cell><div className='command-member-table'><div className=''><Icon color='orange' name='dot circle' size='small'/></div><div className='member-user-text'><span className='member-user-text'>Отправлено приглашение</span></div><div className='hamburger-menu'><a href="#" onClick={this.handleClose} className='hamburger-menu-link'>&#8942;</a></div></div></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                    <div className="profile-info-container-name-input command-add-link">
                            <NavLink to="#"><span style={{color: '#2F80ED'}}>+ Добавить участника</span></NavLink>
                    </div>
                </div>
                <Divider style={{marginTop: '40px',  marginBottom: 0}}/>
                <div className="command-info-buttons">
                    <div className='apply-button-container'>
                        <Button fluid className="apply-button" style={{width: 165, height: 32}}><span
                            className='command-approve-buttons-text'>Сохранить</span></Button>
                    </div>
                    <div className='cancel-button-container'>
                        <Button fluid className="cancel-button" style={{width: 165, height: 32, backgroundColor: '#A5A5A5'}}><span
                            className='command-approve-buttons-text'>Отмена</span></Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(AdministrationCommandMembers)