import _ from 'lodash'
import React, {Component} from 'react'
import {Grid, Search} from 'semantic-ui-react'
import './SearchBox.css';
import {apiFullListGet} from "../util/APIUtils";
import Alert from "react-s-alert";
import LazySearchMiniImage from "../util/LazySearchMiniImage";
import {getLink4Description} from "../util/ElementsDataUtils";

const initialState = {loading: false, results: [], value: ''};

//const host = window.location.origin.toString();
const host = "https://yourapi.ru";
class SearchBox extends Component {

    state = initialState;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoading: false,
            wide: false,
            apiData: []
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
           apiFullListGet()
                .then(response => {
                    const apiData = [];
                    response.response.map((category) => {
                        category.list.map((api) => {
                            const data = {
                                api: api.id,
                                uuid: api.uuid,
                                title: api.fullName,
                                description: api.description,
                                category: api.category,
                                image: api.image ? host + "/api-data/image/" + api.image + "/73/73" : null,
                                loading: false
                            };
                            apiData.push(data);
                        });
                    });
                    this.setState({
                        loading: false,
                        apiData: apiData
                    });
                }).catch(error => {
                Alert.error('Ошибка запросе на получение проекта' || (error && error.message));
                this.setState({loading: false})
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            results: []
        });
        this._isMounted = false;
    }

    handleResultSelect = (e, {result}) => {
        this.setState({value: result.title});
    };

    handleSearchResultRenderer = ({api, uuid, title, description, category, image }) => {
        return ([image && (
            <a href={getLink4Description(category) + uuid} key={uuid +'image'}>
                <div className='result-image'>
                    <LazySearchMiniImage src={image}/>
                </div>
            </a>
        ),
            <a href={getLink4Description(category) + uuid} key={uuid +'content'}>
                <div className='result-content'>
                    {title && <div className='title'>{title}</div>}
                    {description && <div className='description'>{description}</div>}
                </div>
            </a>
        ])
    };


    handleSearchChange = (e, {value}) => {
        if (undefined === value) {
            return;
        }
        this.setState({loading: true, value});
        const {apiData} = this.state;

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState);
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = (result) => re.test(result.title);
            this.setState({
                loading: false,
                results: _.filter(apiData, isMatch)
            })
        }, 300)
    };


    render() {
        const {value, results, wide, loading} = this.state;

        return (
            <Grid columns='equal'>
                <Grid.Column width={ wide ? 20 : 12 }>
                    <Search fluid className='header-center-search-box' style={wide ? {opacity: 1} : {opacity: 0.3}}
                            noResultsMessage={'Ничего не найдено...'}
                            loading={loading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                leading: true
                            })}
                            results={results}
                            value={value}
                            placeholder='Поиск...'
                            resultRenderer={this.handleSearchResultRenderer}
                            onFocus={()=>this.setState({wide: true})}
                            onBlur={()=>this.setState({wide: false, results: []})}
                            icon={{name: 'search', link: true, onClick: _.debounce(this.handleSearchChange, 500, {
                                    leading: true
                                }) }}
                            {...this.props}
                            id="searchInput" name="searchInput"/>
                </Grid.Column>
            </Grid>
        )
    }
}

SearchBox.propTypes = {};


export default SearchBox;
