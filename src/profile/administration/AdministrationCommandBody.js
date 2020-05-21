import React, {Component} from 'react';
import './Administration.css';
import {Button, Divider, Dropdown, Form, Icon, Image, Input, TextArea} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import volgaImage from '../../img/volga.png';
import uralImage from '../../img/ural.png';
import queryString from "query-string";

class AdministrationCommandBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            command: {
                imageUrl: '',
                name: '',
                page:''
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
        const naming = this.props.naming;
        let imageUrl;
        switch (naming) {
            case 'Волга':
                imageUrl = volgaImage;
                break;
            default:
                imageUrl = uralImage;
        }
        const cityOptions = [
            {
                city: 'Москва, Россия',
                text: 'Москва, Россия',
                value: 'Москва, Россия'
            },
            {
                city: 'Казань, Россия',
                text: 'Казань, Россия',
                value: 'Казань, Россия'
            },
            {
                city: 'Набережные Челны, Россия',
                text: 'Набережные Челны, Россия',
                value: 'Набережные Челны, Россия'
            },
            {
                city: 'Мытищи, Россия',
                text: 'Мытищи, Россия',
                value: 'Мытищи, Россия'
            },
            {
                city: 'Анапа, Россия',
                text: 'Анапа, Россия',
                value: 'Анапа, Россия'
            },
            {
                city: 'Лабытнанги, Россия',
                text: 'Лабытнанги, Россия',
                value: 'Лабытнанги, Россия'
            },
            {
                city: 'Braunschweig, Germany',
                text: 'Braunschweig, Germany',
                value: 'Braunschweig, Germany'
            },
            {
                city: 'Reykjavík, Iceland',
                text: 'Reykjavík, Iceland',
                value: 'Reykjavík, Iceland'
            }
        ];

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
                      <div className="command-info-container-name">
                          <span>О команде</span>
                      </div>
                      <div className="command-info-container-name-inputs">
                          <div className="command-info-container-name-input">
                              <label>Название</label>
                              <Input onChange={this.handleInputChange} defaultValue={this.state.command.name}
                                     className="form-input" id="commandName"
                                     name="commandName" required placeholder='Название команды'/>
                          </div>
                          <div className="command-info-container-name-input">
                              <label>Идентификатор</label>
                              <Input onChange={this.handleInputChange} defaultValue={this.state.company_name}
                                     className="form-input" id="company_name"
                                     name="company_name" required placeholder='company_name'/>
                          </div>
                          <div className="command-info-container-name-input">
                              <div className="command-info-container-name-textarea">
                                  <label style={{paddingBottom: '6px'}}>Описание</label>
                                  <Form style={{paddingTop: '6px'}}>
                                      <TextArea onChange={this.handleDropdownChange} placeholder='' style={{minHeight: 265, maxHeight: 265, minWidth: 382 }}  id="info" name="info" defaultValue={this.state.info}/>
                                  </Form>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="command-info-container">
                      <div className="command-info-container-name">
                          <span>Контакты</span>
                      </div>
                      <div className="command-info-container-name-input">
                          <label style={{paddingBottom: '6px'}}>Город</label>
                          <Dropdown onChange={this.handleDropdownChange} placeholder='Город' fluid search
                                    selection id="city" name="city" noResultsMessage="Москва - лучший город"
                                    className="form-input" options={cityOptions}
                                    defaultValue={this.state.city}/>
                      </div>
                      <div className="command-info-container-name-input">
                          <label>Сайт</label>
                          <Input onChange={this.handleInputChange} defaultValue={this.state.site}
                                 className="form-input" id="site"
                                 name="site" required placeholder=''/>
                      </div>
                      <div className="command-info-container-name-input">
                          <label style={{marginBottom: 6}}>Email</label>
                          <Input onChange={this.handleInputChange} defaultValue={this.state.email}
                                 id="email"
                                 name="email" placeholder='user@botmasterzzz.com' required/>
                      </div>
                      <div className="command-info-container-name-input">
                          <label style={{marginBottom: 6}}>Телефон</label>
                          <Input onChange={this.handleInputChange} defaultValue={this.state.phoneNumber}
                                 id="phoneNumber"
                                 name="phoneNumber" placeholder='+7( ___ ) ___ - __ - __ ' required/>
                      </div>
                  </div>
                  <Divider style={{marginTop: '40px',  marginBottom: 0}}/>
                  <div className="command-info-buttons">
                      <div className='apply-button-container'>
                          <Button fluid className="apply-button" style={{width: 165, height:32}}><span className='command-approve-buttons-text'>Сохранить</span></Button>
                      </div>
                      <div className='cancel-button-container'>
                          <Button fluid className="cancel-button"  style={{width: 165, height:32, backgroundColor: '#A5A5A5'}}><span className='command-approve-buttons-text'>Отмена</span></Button>
                      </div>
                  </div>
              </div>

        )
    }
}
export default withRouter(AdministrationCommandBody);