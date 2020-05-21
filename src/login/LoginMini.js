import React, {Component} from 'react';
import './Login.css';
import Alert from 'react-s-alert';
import {Button, Checkbox, Divider, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";
import {login} from "../util/APIUtils";
import {Link, NavLink, Redirect} from "react-router-dom";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN, VK_AUTH_URL, YANDEX_AUTH_URL, OAUTH2_REDIRECT_URI, BATTLE_NET_AUTH_URL } from '../constants';
import registerServiceWorker from '../util/../registerServiceWorker';
import {unregister} from '../util/../registerServiceWorker';
import LoadingIndicator from '../common/LoadingIndicator';
import { Icon as Iconx } from '@iconify/react';
import battleNet from '@iconify/icons-fa-brands/battle-net';

class LoginMini extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousUrl: '',
            windowObjectReference: null,
            loading: true
        };
    }

    componentDidMount() {
        const {location, history} = this.props;
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (location && location.state && location.state.error) {
            setTimeout(() => {
                Alert.error(location.state.error, {
                    timeout: 5000
                });
                history.replace({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
        this.setState({loading: false})
    }

    componentWillUnmount() {
        this.setState({loading: false})
    }

    receiveMessage = event => {
        window.location.reload();
    };

    openSignInWindow = (event) => {
        event.preventDefault();
        const target = event.target;
        const inputId = target.id;
        unregister();

        //const host = window.location.origin.toString();
        const host = "https://yourapi.ru";
        let redirectUri = host + OAUTH2_REDIRECT_URI;
        let authUrl;
        switch (inputId) {
            case "google":
                authUrl = host + GOOGLE_AUTH_URL + redirectUri;
                break;
            case "facebook":
                authUrl = host + FACEBOOK_AUTH_URL + redirectUri;
                break;
            case "vk":
                authUrl = host + VK_AUTH_URL + redirectUri;
                break;
            case "yandex":
                authUrl = host + YANDEX_AUTH_URL + redirectUri;
                break;
            case "battlenet":
                authUrl = host + BATTLE_NET_AUTH_URL + redirectUri;
                break;
        }
        let width = 600, height = 700;
        let leftPosition, topPosition;
        let windowObjectReference = this.state.windowObjectReference;
        let previousUrl = this.state.previousUrl;
        window.removeEventListener('message', this.receiveMessage);
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        const strWindowFeatures = "status=no, height=" + height + ",width=" + width + ",resizable=yes,left="
            + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
            + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";


        if (windowObjectReference === null || windowObjectReference.closed) {
           window.open(authUrl, 'Окно авторизации', strWindowFeatures);
        } else if (previousUrl !== authUrl) {
            windowObjectReference = window.open(authUrl, 'Окно авторизации', strWindowFeatures);
            windowObjectReference.focus();
        } else {
            windowObjectReference.focus();
        }

        window.addEventListener('message', event => this.receiveMessage(event), false);
        previousUrl = authUrl;
        this.setState({
            previousUrl: previousUrl
        });
        registerServiceWorker();
    };

    render() {
        const {authenticated, location, isMobile, handleAuthTypeChange} = this.props;
        const {loading} = this.state;
        if (authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: location}
                }}/>;
        }

        if (loading) {
            return <LoadingIndicator/>
        }


        //const host = window.location.origin.toString();
        const host = "https://yourapi.ru";
        let redirectUri = host + OAUTH2_REDIRECT_URI;
        const googleAuthUrl = host + GOOGLE_AUTH_URL + redirectUri;
        const facebookAuthUrl = host + FACEBOOK_AUTH_URL + redirectUri;
        const vkAuthUrl = host + VK_AUTH_URL + redirectUri;
        const yandexAuthUrl = host + YANDEX_AUTH_URL + redirectUri;
        const battlenetAuthUrl = host + BATTLE_NET_AUTH_URL + redirectUri;

        const styles = {
            iconStyle: {
                marginRight: 44,
                color: '#A5A5A5'
            },
            linkStyle: {
                color: '#4F4F4F'
            },
            dividerStyle: {
                marginTop: 0,
                marginBottom: 0
            }
        };

        return (
            <div className="mini-login-container">
                <div className="login-mini-container-right">
                    <div className="login-mini-container-right-form">
                        <div className='navigate-links'>
                            <div className='login-nav-link-left' onClick={() => handleAuthTypeChange(false)}>
                                <b style={styles.linkStyle}>Вход</b>
                            </div>
                            <div className='signup-nav-link-right-login' onClick={() => handleAuthTypeChange(true)}>
                                <b style={styles.linkStyle}>Регистрация</b>
                            </div>
                        </div>
                        <LoginForm2 {...this.props} />
                    </div>
                    <Divider style={styles.dividerStyle}/>
                    <div className="login-mini-container-right-footer">
                            <div className='footer-icon-group-label'>
                                <label style={{color: '#4F4F4F'}}>Войти с помощью</label>
                            </div>

                            <div className='footer-icon-group'>
                                {isMobile ?  <a href={googleAuthUrl}><Icon style={styles.iconStyle} link name='google' size={'large'}/></a> : <Icon style={styles.iconStyle} link id='google' name='google' size={'large'} onClick={this.openSignInWindow}/>}
                                {isMobile ?  <a href={facebookAuthUrl}><Icon style={styles.iconStyle} link name='facebook' size={'large'}/></a> : <Icon style={styles.iconStyle} link id='facebook' name='facebook' size={'large'} onClick={this.openSignInWindow}/>}
                                {isMobile ?  <a href={vkAuthUrl}><Icon style={styles.iconStyle} link name='vk' size={'large'}/></a> : <Icon style={styles.iconStyle} link id='vk' name='vk' size={'large'} onClick={this.openSignInWindow}/>}
                                {isMobile ?  <a href={yandexAuthUrl}><Icon style={styles.iconStyle} link name='yandex' size={'large'}/></a> : <Icon style={styles.iconStyle} link id='yandex' name='yandex' size={'large'} onClick={this.openSignInWindow}/>}
                                {isMobile ?  <a href={battlenetAuthUrl}><Iconx className='battle-net-auth-icon' icon={battleNet} id='battlenet' name='battlenet'/></a> : <Iconx className='battle-net-auth-icon' icon={battleNet} id='battlenet' name='battlenet' onClick={this.openSignInWindow}/>}
                            </div>
                        </div>
                </div>

            </div>
        )
    }
}

class LoginForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            showPassword: false,
            width: window.innerWidth
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordShow = this.handlePasswordShow.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handlePasswordShow(){
        const show = !this.state.showPassword;
        this.setState({showPassword: show, passwordDisabled: false});
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
            .then(response => {
                if (!response.success){
                    Alert.warning(response.message);
                }else {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    Alert.success("Вы авторизовались в системе!");
                    window.location.reload();
                }
            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так! Попробуйте заново.');
        });
    }

    render() {
        const {width} = this.state;
        const isWide = width >= 2200;

        const styles = {
            labelStyle: {
                float: 'left',
                color: '#A5A5A5'
            },
            linkStyleForgetPwd: {
                float: 'left',
                paddingTop: '0px',
                paddingBottom: '12px',
                color: '#2F80ED'
            },
            checkBoxRememberMeStyle: {
                float: 'left',
                color: '#4F4F4F',
                paddingTop: '12px',
                paddingBottom: '16px'
            }

        };

        return (
            <div className='login-form'>
                <Grid className={!isWide ? 'login-grid-form' : 'login-wide-grid-form'}>
                    <Grid.Column widescreen={16} tablet={16} mobile={16} largeScreen={16} computer={16} stretched>
                        <Form size='tiny' onSubmit={this.handleSubmit}>
                            <Segment className='login-data-segment-form'>
                                <Form.Field>
                                    <label style={styles.labelStyle}>Логин/Email</label>
                                    <Input onChange={this.handleInputChange} className="form-login-input" id="login"
                                           name="login" required placeholder='Логин/Email'/>
                                </Form.Field>
                                <Form.Field>
                                    <label style={styles.labelStyle}>Пароль</label>
                                    <Input onChange={this.handleInputChange}
                                           icon={<Icon name={this.state.showPassword ? 'eye slash outline' : 'eye'} link
                                                       onClick={this.handlePasswordShow}/>}
                                           placeholder='Пароль' id="password" name="password" required
                                           type={this.state.showPassword ? 'text' : 'password'}
                                    />
                                </Form.Field>
                                <Link style={styles.linkStyleForgetPwd} to="#">Забыли пароль?</Link>
                                <Form.Field>
                                    <Checkbox style={styles.checkBoxRememberMeStyle} label='Запомнить меня'/>
                                </Form.Field>
                                <Button type='submit' className='submit-button' fluid size='large'>Войти</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default LoginMini;