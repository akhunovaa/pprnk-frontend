import React, {Component} from 'react';
import './Home.css';
import {Button, Grid, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {apiProjectFullListGet, bookmarkAdd, bookmarkRemove} from "../util/APIUtils";
import Alert from "react-s-alert";
import {getClassName4Color, getIconColor, getLink4Category, getLink4Description} from "../util/ElementsDataUtils";
import {HomeCellLoadingIndicator, HomeLoadingIndicator} from '../common/LoadingIndicator';
import LazyMiniImage from '../util/LazyMiniImage';
import AuthContainerWrapper from "./AuthContainerWrapper";
import {Helmet} from "react-helmet";

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false,
            roleAdmin: true,
            noveltyProjects: [],
            topProjects: [],
            recommendedProjects: [],
            loading: true,
            noveltyHidden: true,
            topHidden: true,
            recommendedHidden: true
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            apiProjectFullListGet()
                .then(response => {
                    if (this._isMounted) {
                        this.setState({
                            noveltyProjects: response.response.new_api_list,
                            topProjects: response.response.top_api_list,
                            recommendedProjects: response.response.recommended_api_list,
                            loading: false
                        })
                    }
                }).catch(error => {
                Alert.error('Ошибка запросе на получение проектов' || (error && error.message));
            });
        }
    }

    handleChange = (e, {id, name}) => {
        const {authenticated} = this.props;

        const bookmarked = name === 'bookmark' ? 'bookmark' : 'bookmark outline';
        this.setState({
            [id]: name
        });

        if (!authenticated) {
            this.setState({
                [id]: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
            });
            return;
        }

        if (bookmarked === 'bookmark') {
            bookmarkRemove(id)
                .then(response => {
                    this.setState({
                        [id]: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
                    })
                }).catch(error => {
                Alert.error('Ошибка при удалении для Bookmark' || (error && error.message));
            });
        } else {
            bookmarkAdd(id)
                .then(response => {
                    this.setState({
                        [id]: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
                    })
                }).catch(error => {
                Alert.error('Ошибка при добавлении для Bookmark' || (error && error.message));
            });
        }

    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    render() {

        const host = window.location.origin.toString();


        const {visible, authenticated, handleSliderChange} = this.props;

        const seo = {
            title: "ППРНК | Перспективная платформа развития навыков коммуникаций",
            type: "website",
            siteName: 'pprnk.yourapi.ru',
            description: "ППРНК | Перспективная платформа развития навыков коммуникаций",
            url: "https://pprnk.yourapi.ru/",
            image: "https://yourapi.ru/img/header.jpg",
            site: "@yourapi_ru",
            card: "summary",
            domain: "pprnk.yourapi.ru"
        };


        return (
            <div className="main">
                <Helmet
                    title={seo.title}
                    defer
                    meta={[
                        {
                            name: "description",
                            property: "og:description",
                            content: seo.description
                        },
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
                <div className="header-picture">
                                <div className='header-text'>
                                    <div className="header-text-main">
                                        <NavLink to="/"><b style={{color: '#F2F2F2'}}>ППРНК</b></NavLink>
                                    </div>
                                    <div className="header-slogan">
                                        <span>Перспективная платформа развития навыков коммуникаций</span><br/>
                                    </div>
                                    <div className="header-buttons">

                                    </div>
                                </div>
                            </div>

            </div>
        )
    }
}

export default Home;