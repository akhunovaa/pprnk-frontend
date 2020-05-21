import React, {Component} from 'react';
import './ApiDetailsBody.css';
import {Button, Dropdown, Form, Image, Input, TextArea} from "semantic-ui-react";
import ApiImageDropzone from "../../../../dropzone/ApiImageDropzone";
import {overviewInformationUpdate} from "../../../../util/APIUtils";
import Alert from "react-s-alert";

class ApiUpdateOverviewBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            description: 'Описание',
            category: 'Финансы',
            terms: 'Особые условия',
            uuid: '',
            formUpdateDisabled: false,
            apiProjectImageUrl: '',
            loading: true,
            editable: true,
            api: []
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.onClickReset = this.onClickReset.bind(this);
        this.iterateApiProjectList = this.iterateApiProjectList.bind(this);
        this.handleNamingCheck = this.handleNamingCheck.bind(this);
        this.handleOverviewInformationSubmit = this.handleOverviewInformationSubmit.bind(this);
        this.editableHandle = this.editableHandle.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.iterateApiProjectList(this.props.projects, this.props.naming);
        document.title  = 'YourAPI | Описание';
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

    handleDropdownChange = (e, {name, value}) => this.setState({[name]: value});

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };

    onClickReset() {
       this.reload();
    }

    handleNamingCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item.name === val);
    }

    editableHandle(event){
        event.preventDefault();
        const edit = !this.state.editable;
        this.setState({editable: edit});
    }

    iterateApiProjectList(array, val) {
        for (const arrayElement of array) {
            if(arrayElement.name === val){
                this.setState({
                    id: arrayElement.id,
                    name: arrayElement.fullName,
                    category: arrayElement.category,
                    description: arrayElement.description,
                    uuid: arrayElement.uuid,
                    terms: arrayElement.info ? arrayElement.info.termsOfService : '',
                    apiProjectImageUrl: arrayElement.image,
                    loading: false
                });
                return arrayElement;
            }
        }
    }

    handleOverviewInformationSubmit(event) {
        event.preventDefault();
        const id = this.state.id ? this.state.id : 0;
        const {name, description, category, terms, uuid} = this.state;

        const mainInfoRequest = Object.assign({}, {
            'id': id,
            'fullName': name,
            'description': description,
            'category': category,
            'terms': terms,
            'uuid': uuid
        });

        overviewInformationUpdate(mainInfoRequest)
            .then(response => {
                if (response.error) {
                    this.setState({editable: true});
                    Alert.warning(response.error + '. Необходимо заново авторизоваться.');
                } else if (response.success === false) {
                    this.setState({editable: true});
                    Alert.warning(response.message);
                } else {
                    this.setState({editable: true});
                    Alert.success('Данные успешно сохранены');
                }
            }).catch(error => {
            this.setState({editable: true});
            Alert.error('Что-то пошло не так! Попробуйте заново.' || (error && error.message));
        });
    }

    render() {
        const apiCategoryOptions = [
            {
                name: 'Спорт',
                text: 'Спорт',
                value: 'Спорт'
            },
            {
                name: 'Новости',
                text: 'Новости',
                value: 'Новости'
            },
            {
                name: 'Данные',
                text: 'Данные',
                value: 'Данные'
            },
            {
                name: 'Финансы',
                text: 'Финансы',
                value: 'Финансы'
            },
            {
                name: 'Мобильные',
                text: 'Мобильные',
                value: 'Мобильные'
            },
            {
                name: 'Карты',
                text: 'Карты',
                value: 'Карты'
            },
            {
                name: 'Реклама',
                text: 'Реклама',
                value: 'Реклама'
            },
            {
                name: 'Социальные сети',
                text: 'Социальные сети',
                value: 'Социальные сети'
            },
            {
                name: 'Здравохранение',
                text: 'Здравохранение',
                value: 'Здравохранение'
            },
            {
                name: 'Web',
                text: 'Web',
                value: 'Web'
            },
            {
                name: 'Медиа',
                text: 'Медиа',
                value: 'Медиа'
            },
            {
                name: 'Другое',
                text: 'Другое',
                value: 'Другое'
            }
        ];

        return (
            <div className='detail-overview-body'>
                <h1 className="title"><span>Описание API</span></h1>
                <form>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left'}}>Наименование API</label>
                        <Input onChange={this.handleInputChange} value={this.state.name}
                               className="form-input" id="apiName" disabled style={{cursor: this.state.editable ? "no-drop " : "default"}}
                               name="name" required placeholder='Наименование API'/>
                    </div>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Описание</label>
                        <Form>
                                        <TextArea className='detail-overview-api-name-textarea'
                                                  onChange={this.handleInputChange} placeholder='Расскажите о своем API'
                                                  id="description" disabled={this.state.editable}
                                                  name="description" value={this.state.description} style={{cursor: this.state.editable ? "no-drop " : "default"}}/>
                        </Form>
                    </div>

                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Загрузка изображения (JPEG/PNG 500x500)</label>
                        <ApiImageDropzone key={this.state.id} onFilesAdded={this.onFilesAdded} editable={this.state.editable} disabled={this.state.editable}
                                onClickReset={this.onClickReset}
                                hasExtension={this.hasExtension}
                                file={this.state.file} uploading={this.state.uploading}
                                uploadProgress={this.state.uploadProgress}
                                successfullUploaded={this.state.successfullUploaded}
                                          setErrorFileState={this.setErrorFileState}
                                          apiName={this.state.name}
                                          apiId={this.state.id} apiImage={this.state.apiProjectImageUrl}/>

                    </div>

                    <div className="api-add-container-input api-add-container-input-element">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Категория</label>
                        <Dropdown onChange={this.handleDropdownChange} placeholder='Категория' fluid search
                                  selection id="category" name="category" noResultsMessage="Москва - лучший город"
                                  className="form-input" options={apiCategoryOptions}
                                  disabled={this.state.editable}
                                  value={this.state.category} style={{cursor: this.state.editable ? "no-drop " : "default"}}/>
                    </div>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Условия использования</label>
                        <Form>
                                        <TextArea className='detail-overview-api-name-textarea'
                                                  onChange={this.handleInputChange}
                                                  placeholder='Опишите условия по использованию'
                                                  id="terms" disabled={this.state.editable}
                                                  name="terms" value={this.state.terms ? this.state.terms : ' '} style={{cursor: this.state.editable ? "no-drop " : "default"}}/>
                        </Form>
                    </div>

                    <div className="api-update-buttons">
                        {this.state.editable ?
                                <div className='apply-button-container'>
                                    <Button fluid className="apply-button"
                                            style={{width: 112, height: 32, background: '#2F80ED'}}><span
                                        className='command-approve-buttons-text' onClick={this.editableHandle}>Редактировать</span></Button>
                                </div>
                            : <><div className='apply-button-container'>
                                <Button fluid className="apply-button"
                                        style={{width: 112, height: 32, background: '#2F80ED'}}><span
                                    className='command-approve-buttons-text' onClick={this.handleOverviewInformationSubmit}>Сохранить</span></Button>
                            </div>
                            <div className='cancel-button-container api-info-cancel-button'>
                                <Button fluid className="cancel-button"
                                        style={{background: '#A5A5A5', width: 112, height: 32, backgroundColor: '#A5A5A5'}} onClick={this.editableHandle}>
                                    <span className='command-approve-buttons-text'>Отмена</span>
                                </Button>
                            </div></>
                        }
                        </div>
                </form>
            </div>

        )
    }
}

export default ApiUpdateOverviewBody;
