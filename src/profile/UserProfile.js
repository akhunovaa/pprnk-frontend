import React, {Component} from 'react';
import './UserProfile.css';
import {NavLink} from "react-router-dom";
import {
    Breadcrumb,
    Button,
    Divider,
    Dropdown,
    Form,
    Header,
    Icon,
    Input,
    Menu,
    Modal,
    Segment,
    Sidebar,
    Table,
    TextArea
} from "semantic-ui-react";
import LazyImage from '../util/LazyImage';
import {getUserProfile} from "../util/APIUtils";
import AuthContainerWrapper from "../home/AuthContainerWrapper";
import {Helmet} from "react-helmet";

class UserProfile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                name: '',
                surname: '',
                patrName: '',
                nickName: '',
                birthDate: '',
                gender: '',
                language: '',
                city: '',
                imageUrl: '',
                info: ''
            },
            loading: true,
            error: false,
            errorMassage: '',
            open: false,
            close: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.loadRequestedUser();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadRequestedUser = () => {
        const profileTitle = 'YourAPI | ';
        const {id} = this.props.match.params;
        getUserProfile(id)
            .then(response => {
                if (!response.success) {
                    this.setState({
                        errorMassage: response.message,
                        error: true,
                        open: true
                    });
                    return Promise.reject(response.message);
                } else {
                    this.setState({
                        user: response.response,
                        loading: false
                    });
                }
            }).catch(error => {
            document.title = profileTitle + '???????????????????????? ???? ????????????';
            this.setState({
                loading: false
            });
        });
    };

    reload = () => {
        this.setState({loading: true});
        window.location.reload();
        this.setState({loading: false});
    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    show = () => () => this.setState({open: true});
    close = () => this.setState({open: false});

    render() {
        const {id} = this.props.match.params;
        const {user, loading, open} = this.state;
        const {authenticated, history, visible, handleSliderChange} = this.props;
        const imageUrl = user.imageUrl ? user.imageUrl.includes("yourapi.ru") ? user.imageUrl + '/150/150.jpg' : user.imageUrl : '';
        const sexOptions = [
            {
                sex: '??????????????',
                text: '??????????????',
                value: '??????????????'
            },
            {
                sex: '??????????????',
                text: '??????????????',
                value: '??????????????'
            },
            {
                sex: '????????????????????',
                text: '????????????????????',
                value: '????????????????????'
            }
        ];
        const languageOptions = [
            {
                language: '??????????????',
                text: '??????????????',
                value: '??????????????'
            },
            {
                language: 'English',
                text: 'English',
                value: 'English'
            },
            {
                language: 'English',
                text: 'English',
                value: 'en'
            },
            {
                language: '??????????????',
                text: '??????????????',
                value: 'ru'
            },
            {
                city: '???????????? ??????????????????????',
                text: '???????????? ??????????????????????',
                value: '???????????? ??????????????????????'
            }
        ];
        const cityOptions = [
            {
                city: '????????????, ????????????',
                text: '????????????, ????????????',
                value: '????????????, ????????????'
            },
            {
                city: '????????????, ????????????',
                text: '????????????, ????????????',
                value: '????????????, ????????????'
            },
            {
                city: '???????????????????? ??????????, ????????????',
                text: '???????????????????? ??????????, ????????????',
                value: '???????????????????? ??????????, ????????????'
            },
            {
                city: '????????????, ????????????',
                text: '????????????, ????????????',
                value: '????????????, ????????????'
            },
            {
                city: '??????????, ????????????',
                text: '??????????, ????????????',
                value: '??????????, ????????????'
            },
            {
                city: '????????????????????, ????????????',
                text: '????????????????????, ????????????',
                value: '????????????????????, ????????????'
            },
            {
                city: 'Braunschweig, Germany',
                text: 'Braunschweig, Germany',
                value: 'Braunschweig, Germany'
            },
            {
                city: 'Reykjav??k, Iceland',
                text: 'Reykjav??k, Iceland',
                value: 'Reykjav??k, Iceland'
            },
            {
                city: '???????????? ??????????????????????',
                text: '???????????? ??????????????????????',
                value: '???????????? ??????????????????????'
            }
        ];

        const surname = user.surname ? user.surname : '';
        const name = user.name ? user.name : '';
        const patrName = user.patrName ? user.patrName : '';
        const nickName = user.nickName ? user.nickName : '';
        const gender = user.gender === '??????????????' ? 'male' : 'female';

        const seo = {
            title: "YourAPI | " + surname + ' ' + name + ' ' + patrName,
            type: "profile",
            firstName: name,
            lastName: surname,
            userName: nickName,
            gender: gender,
            siteName: 'yourapi.ru',
            description: user.info ? user.info.substring(0, 160) : "YourAPI | " + surname + ' ' + name + ' ' + patrName,
            url: "https://yourapi.ru/profile/id" + id,
            image: imageUrl ? imageUrl : "https://pprnk.yourapi.ru/img/header.jpg",
            site: "@yourapi_ru",
            domain: "yourapi.ru",
            card: "summary"
        };

        return (
            <div>
                <Helmet
                    title={seo.title}
                    meta={[
                        {name: "description", property: "og:description", content: seo.description},
                        {property: "og:title", content: seo.title},
                        {property: "og:description", content: seo.description},
                        {property: "og:type", content: seo.type},
                        {property: "og:site_name", content: seo.siteName},
                        {property: "profile:first_name", content: seo.firstName},
                        {property: "profile:last_name", content: seo.lastName},
                        {property: "profile:username", content: seo.userName},
                        {property: "profile:gender", content: seo.gender},
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
                <Sidebar.Pushable as={Segment} className='login-sidebar-pushable'>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='right'
                        vertical
                        visible={visible}
                        onHide={() => handleSliderChange()}
                        className='login-slider-pushable'>
                        {authenticated ? (<div/>) : (<AuthContainerWrapper authenticated={authenticated} {...this.props}/>)}
                    </Sidebar>
                    <Sidebar.Pusher dimmed={visible}>
                        <Segment className='login-sidebar-pushable'>
                            <div className="user-profile-main">
                                <div className="user-profile-main-container">
                                    <div className="container-breadcrumb">
                                        <Breadcrumb>
                                            <Breadcrumb.Section as={NavLink} to={'/'} link><span className='text-disabled-color blue-hover'>??????????????</span></Breadcrumb.Section>
                                            <Breadcrumb.Divider icon='right chevron'/>
                                            <Breadcrumb.Section as={NavLink} to={'/profile' + '/' + id} link><span className='text-disabled-color blue-hover'>?????????????? ????????????????????????</span></Breadcrumb.Section>
                                            <Breadcrumb.Divider icon='right arrow'/>
                                            <Breadcrumb.Section active link><span className='text-disabled-color blue-hover'>???????????????? ??????????????</span></Breadcrumb.Section>
                                        </Breadcrumb>
                                    </div>
                                    <div className="user-profile-form-container">
                                        <div className="profile-avatar-container">
                                            <div className="profile-avatar">
                                                {
                                                    imageUrl ? (
                                                        <LazyImage src={imageUrl} size='medium' circular verticalAlign='top'
                                                                   alt={user.name}/>
                                                    ) : (
                                                        <div className="text-avatar">
                                                            <span>{user.name && user.name[0]}</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="user-name-container">
                                                <span style={{paddingRight: '8px'}}>{user.surname}</span>
                                                <span style={{paddingRight: '8px'}}>{user.name}</span>
                                                <span style={{paddingRight: '8px'}}>{user.patrName}</span>
                                            </div>
                                        </div>
                                        <div className="profile-info-container">
                                            <div className="profile-info-container-name">
                                                <span>??????????????</span>
                                            </div>
                                            <div className="profile-info-container-name-inputs">
                                                <div className="profile-info-container-name-input">
                                                    <label>??????????????</label>
                                                    <Input loading={loading} value={user.surname ? user.surname : ''}
                                                           className="form-input" id="surname" disabled
                                                           name="surname"/>
                                                </div>
                                                <div className="profile-info-container-name-input">
                                                    <label>??????</label>
                                                    <Input value={user.name ? user.name : ''} className="form-input"
                                                           id="name"
                                                           name="name" disabled/>
                                                </div>
                                                <div className="profile-info-container-name-input">
                                                    <label>????????????????</label>
                                                    <Input loading={loading} value={user.patrName ? user.patrName : ''}
                                                           className="form-input" id="patrName"
                                                           name="patrName" disabled/>
                                                </div>
                                            </div>
                                            <div className="profile-info-container-nickname-input">
                                                <div className="profile-info-container-name-input">
                                                    <label>?????? ??????????????</label>
                                                    <Input loading={loading} value={user.nickName ? user.nickName : ''}
                                                           className="form-input" id="nickName" name="nickName"
                                                           disabled/>
                                                </div>
                                            </div>
                                            <div className="profile-info-container-date-birth-input">
                                                <div className="profile-info-container-name-input">
                                                    <label>???????? ????????????????</label>
                                                    <Input loading={loading} value={user.birthDate ? user.birthDate : ''}
                                                           className="form-input" id="birthDate"
                                                           name="birthDate" disabled/>
                                                </div>
                                            </div>
                                            <div className="profile-info-container-sex-input">
                                                <div className="profile-info-container-name-input">
                                                    <label style={{paddingBottom: '6px'}}>??????</label>
                                                    <Dropdown loading={loading} placeholder='??????' fluid selection
                                                              id="gender" name="gender" className="form-input"
                                                              options={sexOptions}
                                                              value={user.gender ? user.gender : '????????????????????'} disabled/>
                                                </div>
                                            </div>
                                            <div className="profile-info-container-input">
                                                <div className="profile-info-container-name-input">
                                                    <label style={{paddingBottom: '6px'}}>????????</label>
                                                    <Dropdown fluid selection id="language" name="language"
                                                              className="form-input"
                                                              options={languageOptions}
                                                              value={user.language ? user.language : '???????????? ??????????????????????'}
                                                              disabled/>
                                                </div>
                                            </div>
                                            <div className="profile-info-container-input">
                                                <div className="profile-info-container-name-input">
                                                    <label style={{paddingBottom: '6px'}}>??????????</label>
                                                    <Dropdown loading={loading} fluid search
                                                              selection id="city" name="city"
                                                              noResultsMessage="???????????? - ???????????? ??????????"
                                                              className="form-input" options={cityOptions}
                                                              value={user.city ? user.city : '???????????? ??????????????????????'}
                                                              disabled/>
                                                </div>
                                            </div>
                                            <div className="profile-info-container-input">
                                                <div className="profile-info-container-name-textarea">
                                                    <label style={{paddingBottom: '6px'}}>????????????????????</label>
                                                    <Form style={{paddingTop: '6px'}}>
                                        <TextArea style={{minHeight: 265, maxHeight: 265, minWidth: 382}} id="info"
                                                  name="info" value={user.info ? user.info : ''} disabled/>
                                                    </Form>
                                                </div>
                                            </div>
                                            <Divider style={{marginTop: '40px', marginBottom: 0}}/>
                                        </div>
                                        <div className="profile-info-container">
                                            <div className="profile-info-container-name">
                                                <span>???????????????? ????????????</span>
                                            </div>
                                            <div className="profile-info-container-command-table">
                                                <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell><span
                                                                style={{color: '#A5A5A5'}}>??????????????</span></Table.HeaderCell>
                                                            <Table.HeaderCell><span
                                                                style={{color: '#A5A5A5'}}>????????</span></Table.HeaderCell>
                                                            <Table.HeaderCell><span
                                                                style={{color: '#A5A5A5'}}>????????????</span></Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell>??????????</Table.Cell>
                                                            <Table.Cell>???????? 1</Table.Cell>
                                                            <Table.Cell><Icon color='green' name='dot circle' size='small'/>??
                                                                ??????????????</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>????????</Table.Cell>
                                                            <Table.Cell>???????? 3</Table.Cell>
                                                            <Table.Cell><Icon color='orange' name='dot circle'
                                                                              size='small'/>???????????? ???? ??????????????</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </div>
                                            <div className="profile-info-container-name-input command-search-link">
                                                <NavLink to="#"><span
                                                    style={{color: '#2F80ED'}}>+ ???????????????????? ?? ??????????????</span></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal open={open} onClose={this.close} basic size='small'>
                                    <Header icon='user' content='???????????????????????? ???? ????????????'/>
                                    <Modal.Content>
                                        <p>
                                            ???????????? ???????????????????????? ???? ?????????????????????????????? ?? ??????????????
                                        </p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button basic color='red' inverted onClick={() => {
                                            const path = authenticated ? '/profile' : '/';
                                            history.push(path);
                                        }}>
                                            <Icon name='remove'/> ??????????
                                        </Button>
                                    </Modal.Actions>
                                </Modal>

                            </div>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default UserProfile;