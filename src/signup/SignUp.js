import React, {Component} from 'react';
import './Signup.css';
import {Link, NavLink, Redirect} from 'react-router-dom'
import {Button, Checkbox, Divider, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";
import { signup } from "../util/APIUtils";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN, VK_AUTH_URL, YANDEX_AUTH_URL, OAUTH2_REDIRECT_URI, BATTLE_NET_AUTH_URL } from '../constants';
import Alert from "react-s-alert";
import { ReCaptcha } from 'react-recaptcha-google'
import {unregister} from "../registerServiceWorker";
import registerServiceWorker from "../registerServiceWorker";
import LoadingIndicator from '../common/LoadingIndicator';
import {Icon as Iconx} from "@iconify/react";
import battleNet from "@iconify/icons-fa-brands/battle-net";
import * as PropTypes from "prop-types";
import {Helmet} from "react-helmet";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousUrl: '',
            windowObjectReference: null,
            loading: true
        };
        this.openSignInWindow = this.openSignInWindow.bind(this);
    }

    componentDidMount() {

        if (this.captcha) {
            this.captcha.reset();
        }

        this.setState({loading: false});
    }

    receiveMessage = event => {
        window.location.reload();
    };

    openSignInWindow(event){
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
            window.open(authUrl, '???????? ??????????????????????', strWindowFeatures);
        } else if (previousUrl !== authUrl) {
            windowObjectReference = window.open(authUrl, '???????? ??????????????????????', strWindowFeatures);
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
        const { authenticated, isMobile, location } = this.props;

        if (authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: location}
                }}/>;
        }

        if (this.state.loading) {
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
                marginTop: 24,
                marginBottom: 0
            }
        };

        const seo = {
            title: "YourAPI | ??????????????????????",
            type: "website",
            siteName: 'yourapi.ru',
            description: "Marketplace IT ??????????????. Find here your own IT decision! Your Marketplace. Artificial. Programmable. Intelligence.",
            url: "https://yourapi.ru/signup",
            image: "https://pprnk.yourapi.ru/img/header.jpg",
            site: "@yourapi_ru",
            domain: "yourapi.ru",
            card: "summary"
        };


        return (
            <div id="login-container">
                <Helmet
                    title={seo.title}
                    defer
                    meta={[
                        {name: "description", property: "og:description", content: seo.description},
                        {property: "og:title", content: seo.title},
                        {property: "og:description", content: seo.description},
                        {property: "og:type", content: seo.type},
                        {property: "og:site_name", content: seo.siteName},
                        {property: "og:url", content: seo.url},
                        {property: "og:image", content: seo.image},
                        {property: "twitter:image", content: seo.image},
                        {property: "twitter:image:alt", content: seo.description},
                        {property: "twitter:title", content: seo.title},
                        {property: "twitter:description", content: seo.description},
                        {property: "twitter:site", content: seo.site},
                        {property: "twitter:domain", content: seo.domain},
                        {property: "twitter:card", content: seo.card}
                    ]}
                />
                {isMobile ? <div/> :  <div id="login-container-left"/>}

                <div id="login-container-right">
                    <div id="login-container-right-header">
                        <NavLink to={"/"}> <Header as='h3' className={'login-right-header'}>YourAPI</Header></NavLink>
                    </div>
                    <div className="signup-container-right-form">
                        <div className='navigate-links'>
                            <div className='login-nav-link-left-login'>
                                <Link to="/login"><b style={styles.linkStyle}>????????</b></Link>
                            </div>
                            <div className='signup-nav-link-right-1'>
                                <Link to="/signup"><b style={styles.linkStyle}>??????????????????????</b></Link>
                            </div>
                        </div>
                        <SignupForm2 {...this.props} />
                        <Divider style={styles.dividerStyle}/>
                    </div>
                    <div className="signup-container-right-footer">
                        <div className='footer-icon-group-label'>
                            <label style={styles.linkStyle}>?????????? ?? ??????????????</label>
                        </div>
                        <div className='footer-icon-group'>
                            {isMobile ?  <a href={googleAuthUrl}><Icon style={styles.iconStyle} link name='google' size={'large'}/></a>:  <Icon style={styles.iconStyle} link id='google' name='google' size={'large'} onClick={this.openSignInWindow}/>}
                            {isMobile ?  <a href={facebookAuthUrl}><Icon style={styles.iconStyle} link name='facebook' size={'large'}/></a>:  <Icon style={styles.iconStyle} link id='facebook' name='facebook' size={'large'} onClick={this.openSignInWindow}/>}
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

class SignupForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            patrName: '',
            login: '',
            email: '',
            password: '',
            captchaToken: '',
            phone: '+78000000000',
            showPassword: false,
            width: window.innerWidth
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handlePasswordShow = this.handlePasswordShow.bind(this);
    }

    componentDidMount() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }
    onLoadRecaptcha() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }

    handlePasswordShow(){
        const show = !this.state.showPassword;
        this.setState({showPassword: show, passwordDisabled: false});
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

    verifyCallback(recaptchaToken) {
        this.setState({
            captchaToken : recaptchaToken
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = Object.assign({}, this.state);
        if (signUpRequest.captchaToken != null) {
            signup(signUpRequest)
                .then(response => {
                    if (!response.success) {
                        this.onLoadRecaptcha();
                        Alert.warning(response.message);
                    } else {
                        Alert.success("???? ?????????????? ????????????????????????????????????!");
                        this.onLoadRecaptcha();
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        window.location.reload();
                    }
                }).catch(error => {
                Alert.error((error && error.message) || '??????-???? ?????????? ???? ??????! ???????????????????? ????????????.');
            });
        }

    }

    render() {
        const { width } = this.state;
        const isWide = width >= 2200;

        const styles = {
            labelStyle: {
                float: 'left',
                color: '#A5A5A5'
            },
            labelStyleWithMargin: {
                float: 'left',
                color: '#A5A5A5',
                marginBottom: 6
            },
            checkBoxStyle: {
                float: 'left',
                color: '#4F4F4F',
                paddingTop: '30px',
                paddingBottom: '16px'
            },
            reCaptchaStyle: {
                width: '100%'
            },
            licenseAgreementLabel: {
                float: 'left',
                color: '#A5A5A5',
                paddingTop: '8px',
                wordWrap: 'break-word'
            },
            licenseAgreementDiv: {
                float: 'left',
                paddingTop: '0px',
                color: '#2F80ED',
                wordWrap: 'break-word'
            },
            licenseAgreementDivColor: {
                color: '#A5A5A5'
            }
        };



        return (
            <Grid className={isWide ? 'signup-wide-grid-form' : 'signup-grid-form'}>
                <Grid.Column widescreen={16} tablet={16} mobile={16} largeScreen={16} computer={16} stretched>
                    <Form size='tiny' onSubmit={this.handleSubmit}>
                        <Segment className='login-data-segment-form'>
                            <Form.Field>
                                <label style={styles.labelStyle}>??????/??????????</label>
                                <Input onChange={this.handleInputChange} className="form-login-input" id="login" name="login" required placeholder='??????/??????????'/>
                            </Form.Field>
                            <Form.Field>
                                <label style={styles.labelStyle}>?????????????????????? ??????????</label>
                                <Input onChange={this.handleInputChange} className="form-login-input" type="email" id="email" name="email" required placeholder='Email'/>
                            </Form.Field>
                            <Form.Field style={{}}>
                                <label style={styles.labelStyle}>????????????</label>
                                <Input onChange={this.handleInputChange}
                                    icon={<Icon name={this.state.showPassword ? 'eye slash outline' : 'eye'} link onClick={this.handlePasswordShow}/>}
                                    placeholder='????????????' id="password" name="password" required type={this.state.showPassword ? 'text' : 'password'}/>
                            </Form.Field>
                            <label style={styles.labelStyleWithMargin}>?????????????? 6 ????????????????</label>
                            <ReCaptcha
                                ref={(el) => {this.captcha = el;}}
                                size="normal"
                                data-theme="light"
                                render="explicit"
                                sitekey="6LeulZwUAAAAAA07OHdhKen90gZauyUDCBe8GDEn"
                                onloadCallback={this.onLoadRecaptcha}
                                verifyCallback={this.verifyCallback}
                                hl="ru"
                                style={styles.reCaptchaStyle}
                            />
                            <Form.Field>
                                <Checkbox style={styles.checkBoxStyle} label='?????????????????? ????????'/>
                            </Form.Field>
                            <Button type='submit' className='submit-button' fluid size='large' >
                                ?????????????? ?????????????? ?? ??????????
                            </Button>
                            <div className='license-agreement'>
                                <label style={styles.licenseAgreementLabel}>???????????????? ??????????????, ???? ????????????????????</label>
                                <div style={styles.licenseAgreementDiv}>
                                     <a href="/agreement.html" target="_blank" rel="noopener noreferrer">???????????????????????????????? ???????????????????? </a>
                                     <span style={styles.licenseAgreementDivColor}>??</span>
                                     <a href="/privacy.html" target="_blank" rel="noopener noreferrer"> ???????????????? ????????????????????????????????????</a>
                                </div>
                            </div>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }

}

SignUp.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    history: PropTypes.any.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.any
};

export default SignUp;