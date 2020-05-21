import React, { Component } from 'react';
import './NotFound.css';
import {Button} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {Helmet} from "react-helmet";

class NotFound extends Component {

    componentDidMount() {
        document.title  = 'YourAPI | 404 Страница не найдена';
    }


    render() {
        const seo = {
            title: "YourAPI | Страница не найдена",
            type: "website",
            siteName: 'yourapi.ru',
            description: "Marketplace IT решений. Find here your own IT decision! Your Marketplace. Artificial. Programmable. Intelligence.",
            url: "https://yourapi.ru/",
            image: "https://yourapi.ru/img/yourapi_img.jpg",
            site: "@yourapi_ru",
            domain: "yourapi.ru",
            card: "summary"
        };

        return (
                    <div className="page-not-found" unselectable='on'>
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
                        <h1 className="page-not-found-title-2">
                            404
                        </h1>
                        <h1 className="page-not-found-title">
                            404
                        </h1>
                        <div className="page-not-found-desc">
                         <p>Страница
                        </p>не найдена
                        </div>
                        <div className='page-not-found-go-back-btn'>
                            <NavLink to="/"><Button style={{background: '#F39847'}}><span className='go-back-404-text-button'>Вернуться назад</span></Button></NavLink>
                        </div>
                    </div>
        );
    }
}
export default NotFound;