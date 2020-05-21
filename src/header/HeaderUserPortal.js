import React, {Component} from 'react';
import './HeaderUserPortal.css';
import {NavLink} from "react-router-dom";
import {Divider, Icon, List, Popup} from "semantic-ui-react";
import LazyImage from '../util/LazyImage';
import * as PropTypes from "prop-types";
import LoadingIndicator from '../common/LoadingIndicator';

class HeaderUserPortal extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };


    render() {

        const {currentUser, onLogout} = this.props;
        const {open, loading} = this.state;

        if (loading) {
            return <LoadingIndicator/>
        }

        const imageUrl = currentUser ? currentUser.imageUrl ? currentUser.imageUrl.includes("yourapi.ru") ? currentUser.imageUrl + '/40/40.jpg' : currentUser.imageUrl : '' : '';

        const styles = {
            Segment: {},
            Divider: {
                marginTop: 0, marginBottom: 0, marginLeft: -13, marginRight: -13, paddingTop: 0, paddingBottom: 0
            },
            Image: {
                display: 'none'
            }
        };

        return (
            <Popup
                trigger={imageUrl ? (
                    <div className="profile-header-avatar">
                        <LazyImage src={imageUrl} size='small' circular verticalAlign='middle' alt={currentUser.name}/>
                    </div>
                ) : (
                    <div className="header-right-navlink-profile-icon">
                        <Icon link name='user circle'/>
                    </div>
                )}
                on='click' wide size={'small'} position='bottom right'
                content={
                    <div id='profile-portal'>
                        <List size={"big"}>
                            <List.Item>
                                <NavLink to="/" className='portal-item-blue-hover'>
                                    <List.Content>
                                   <span
                                       className="portal-item portal-item-main blue-hover">Главная страница</span>
                                    </List.Content>
                                </NavLink>
                            </List.Item>
                            <List.Item>
                                <NavLink to="/profile" className='portal-item-blue-hover'>
                                    <List.Content>

                                        <span className="portal-item blue-hover">Настройка профиля</span>

                                    </List.Content>
                                </NavLink>
                            </List.Item>
                            <List.Item>
                                <NavLink to="/profile/administration" className='portal-item-blue-hover'>
                                    <List.Content>
                                        <span className="portal-item">Администрирование</span>
                                    </List.Content>
                                </NavLink>
                            </List.Item>
                            <List.Item>
                                <Divider style={styles.Divider}/>
                            </List.Item>
                            <List.Item>
                                <NavLink to="/help" className='portal-item-blue-hover'>
                                    <List.Content>
                                        <span className="portal-item blue-hover">Справка</span>
                                    </List.Content>
                                </NavLink>
                            </List.Item>
                            <List.Item>
                                <Divider style={styles.Divider}/>
                            </List.Item>
                            <List.Item>
                                <a onClick={onLogout} className='portal-item-blue-hover'>
                                    <List.Content>

                                        <span className="portal-item blue-hover">Выйти</span>

                                    </List.Content>
                                </a>
                            </List.Item>
                        </List>
                    </div>}
            />
        )
    }
}


HeaderUserPortal.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default HeaderUserPortal;
