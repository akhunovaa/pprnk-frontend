import React, {Component} from 'react';
import './Api.css';
import {Button, Divider, Dropdown, Form, Input, TextArea} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import Upload from "../../upload/Upload";
import Alert from "react-s-alert";
import {newApiUploadSend} from "../../util/APIUtils";

class ApiAddBody extends Component {

    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            api: {
                name: 'Sportspage Feeds',
                info: 'Результаты в реальном времени, расписание и коэффициенты ставок для лиг США',
                category: 'Новости'
            },
            apiId: 0,
            apiName: '',
            description: '',
            category: 'Новости',
            file: null,
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
            hasError: false,
            emptyFile: false,
            emptyName: false,
            disabledButton: true
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

        this.onFileAdded = this.onFileAdded.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onClickReset = this.onClickReset.bind(this);
        this.uploadNewApi = this.uploadNewApi.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.setErrorFileState = this.setErrorFileState.bind(this);
        this.setEmptyFileState = this.setEmptyFileState.bind(this);
        this.onValidate = this.onValidate.bind(this);
    }

    onFileAdded(file) {
        this.setState(prevState => ({
            file: file,
            emptyFile: false
        }));
    }

    setErrorFileState(state) {
        this.setState(prevState => ({
            hasError: prevState ? prevState : state
        }));
    }

    setEmptyFileState(state) {
        this.setState(prevState => ({
            emptyFile: prevState ? prevState : state
        }));
    }

    hasExtension(fileName, exts) {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

    onClickReset() {
        this.setState({file: null, successfullUploaded: false, hasError: false, emptyFile: false, emptyName: false, disabledButton: true, apiName: '', description: ''})
    }

    jsonPrettify = (json) => {
        if (typeof json === 'object' && json !== null) {
            return JSON.stringify(json, undefined, 4);
        }
    };


    uploadNewApi(file) {
        const apiName = this.state.apiName;
        const description = this.state.description;
        const category = this.state.category;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", apiName);
        formData.append("description", description);
        formData.append("category", category);
        if (apiName && apiName !== '' && apiName.length >= 3) {
            newApiUploadSend(formData)
                .then(response => {
                    this.setState({
                        createdApi: response.response,
                        uploadProgress: {
                            percentage: 100,
                            state: 'done'
                        }
                    });
                    if (this.state.createdApi) {
                        const redirectUrl = '/profile/api?page=update&name=';
                        const link = redirectUrl + this.state.createdApi.name;
                        this.props.history.push(link);
                        this.reload();
                    }

                }).catch(error => {
                const data = this.jsonPrettify(error);
                this.setState({
                    createdApi: data
                })
            });
        } else {
            console.log('error: empty name');
            this.onValidate('emptyName', 3000);
        }
    }

    uploadFile() {
        this.setState({uploadProgress: {}, uploading: true});
        if (!this.state.file) {
            this.onValidate('emptyFile', 3000);
        }
        if (this.state.file && !this.hasExtension(this.state.file.name, ['.yaml', '.yml', '.json'])) {
            this.setErrorFileState(true);
            this.setState({disabledButton: true});
        }
        try {
            if (this.state.file) {
                this.uploadNewApi(this.state.file);
            }
            this.setState({successfullUploaded: true, uploading: false});
            this.setState({disabledButton: true});
        } catch (e) {
            console.log(e);
            this.setState({disabledButton: true});
            Alert.error("Возникла ошибка в процессе загрузке файла");
            this.setState({successfullUploaded: true, uploading: false});
        }

    }

    componentDidMount() {
        this._isMounted = true;
        document.title  = 'YourAPI | Добавить API';
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    onValidate(value, time) {
        this.setState({[value]: true});
        const timer = setTimeout(() => this.setState({
            [value]: false,
            successfullUploaded: false,
            hasError: false,
            emptyName: false
        }), time);
        return () => clearTimeout(timer);
    };

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
        if (inputName === 'apiName' && inputValue.length > 2 && this.state.category.length > 2) {
            this.setState({disabledButton: false})
        }
    }

    handleDropdownChange(e, {name, value}) {
        name === 'category' && value.length > 2 && this.state.apiName.length > 2  ? this.setState({disabledButton: false}) : this.setState({disabledButton: true});
        this.setState({[name]: value});
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
                name: 'Медиа',
                text: 'Медиа',
                value: 'Медиа'
            },
            {
                name: 'Web',
                text: 'Web',
                value: 'Web'
            },
            {
                name: 'Другое',
                text: 'Другое',
                value: 'Другое'
            }
        ];


        return (
            <div className='api-body-main'>
                <div className="api-add-container">
                    <div className="api-add-container-title">
                        <span>Добавить API</span>
                    </div>
                    <div className="api-add-container-inputs">
                        <div className="api-add-container-input api-add-container-input-top">
                            <label className={this.state.emptyName ? 'required control-label' : 'control-label'}>Название (обязательно)</label>
                            <Input fluid onChange={this.handleInputChange}
                                   className="form-input" id="apiName"
                                   name="apiName" required placeholder='Название API' value={this.state.apiName}/>
                        </div>
                        <div className="api-add-container-input api-add-container-input-element">
                            <div className="api-add-container-input-textarea">
                                <label style={{paddingBottom: '6px'}}>Краткое описание</label>
                                <Form style={{paddingTop: '6px'}}>
                                    <TextArea onChange={this.handleInputChange}
                                              placeholder='Краткое описание создаваемого API'
                                              style={{minHeight: 64, maxHeight: 64, minWidth: 352}} id="description"
                                              name="description" value={this.state.description}/>
                                </Form>
                                <label className='helper-message'>70-80 символов</label>
                            </div>
                        </div>
                        <div className="api-add-container-input api-add-container-input-element">
                            <label style={{paddingBottom: '6px'}}>Категория</label>
                            <Dropdown onChange={this.handleDropdownChange} placeholder='Категория' fluid search
                                      selection id="category" name="category" noResultsMessage="Москва - лучший город"
                                      className="form-input" options={apiCategoryOptions}
                                      defaultValue={this.state.category}/>
                        </div>

                        <div className="api-add-container-input api-add-container-segment-element">
                            <Upload onFileAdded={this.onFileAdded} uploadFiles={this.uploadFile}
                                    onClickReset={this.onClickReset}
                                    setErrorFileState={this.setErrorFileState} hasError={this.state.hasError}
                                    file={this.state.file} uploading={this.state.uploading}
                                    setEmptyFileState={this.setEmptyFileState}
                                    uploadProgress={this.state.uploadProgress} emptyFile={this.state.emptyFile}
                                    successfullUploaded={this.state.successfullUploaded}/>
                            <div className="file-create-helper">Создать <a target='_blank' href='https://openapi.yourapi.ru'>файл</a> или ознакомиться с <a target='_blank' href='https://yourapi.ru/help/account/loader'>инструкцией</a></div>
                        </div>
                    </div>
                </div>
                <Divider style={{marginTop: '20px', marginBottom: 0}}/>
                <div className="api-info-buttons">
                    <div className='apply-button-container'>
                        <Button fluid className="apply-button" style={{width: 112, height: 32, background: '#2F80ED'}}
                                onClick={this.uploadFile} disabled={this.state.disabledButton}><span className='command-approve-buttons-text'>Добавить</span></Button>
                    </div>
                    <div className='cancel-button-container api-info-cancel-button'>
                        <Button onClick={this.onClickReset} fluid className="cancel-button"
                                style={{background: '#A5A5A5', width: 112, height: 32, backgroundColor: '#A5A5A5'}}>
                            <span className='command-approve-buttons-text'>Отмена</span>
                        </Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(ApiAddBody);