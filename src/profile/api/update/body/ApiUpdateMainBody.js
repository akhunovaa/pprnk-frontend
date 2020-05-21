import React, {Component} from 'react';
import {Button, Icon, Input, Checkbox, Modal, Container} from "semantic-ui-react";

class ApiUpdateMainBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            editable: true,
            api: [],
            baseUrl: '',
            showPassword: false,
            secret: 'XMiOlt7I-mF1d-hvcm-l0eS-I6IlJPTEVfQU',
            privacy: false,
            openDelete: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loading: false});
        }
        document.title  = 'YourAPI | Основные настройки';
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    };

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});


    handleClose = () => {
        this.setState({open: false})
    };

    editableHandle = (event) => {
        event.preventDefault();
        const {editable} = this.state;
        const edit = !editable;
        this.setState({editable: edit});
    };

    handlePasswordShow = () => {
        const {showPassword} = this.state;
        const show = !showPassword;
        this.setState({showPassword: show, passwordDisabled: false});
    };

    handleMainInformationSubmit = (event) => {
        event.preventDefault();
        console.log("handleMainInformationSubmit command")
    };

    handleToggleChange = (e, {checked}) => {
        this.setState({
            privacy: checked
        });
    };

    modalClose = () => {
        this.setState({openDelete: false});
    };

    apiDelete = (event) => {
        event.preventDefault();
        console.log("delete command")
    };

    showDelete = () => this.setState({openDelete: true});

    render() {

        const {editable, baseUrl, secret, showPassword, privacy, openDelete} = this.state;

        const styles = {
            BaseUrlInputLabel: {
                textAlign: 'left'
            },
            HelperLabel: {
                textAlign: 'center',
                paddingTop: 4,
                fontSize: 10
            },
            Cursor: {
                Disabled: 'no-drop',
                Default: 'default'
            },
            UpdateButton: {
                width: 112,
                height: 32,
                background: '#2F80ED'
            },
            DeleteButton: {

            },
            SaveButton: {
                width: 112,
                height: 32,
                background: '#2F80ED'
            },
            CancelButton: {
                width: 112,
                height: 32,
               backgroundColor: '#A5A5A5'
            },
            PrivacySlider: {
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 10,
                width: 250
            }

        };

        return (
            <div className='detail-overview-body'>
                <h1 className="title"><span>Основные настройки</span></h1>
                <form>
                    <div className="detail-overview-api-name-input">
                        <label style={styles.BaseUrlInputLabel}>Базовый URL</label>
                        <Input onChange={this.handleInputChange} value={baseUrl}
                               className="form-input" id="baseUrl" disabled={this.state.editable}
                               style={{cursor: editable ? styles.Cursor.Disabled : styles.Cursor.Default}}
                               name="baseUrl" required placeholder='Базовый URL'/>
                    </div>
                    <div className="api-update-buttons">
                        {editable ?
                            <div className='apply-button-container'>
                                <Button fluid className="apply-button" style={styles.UpdateButton}>
                                    <span className='command-approve-buttons-text'
                                          onClick={this.editableHandle}>Редактировать</span>
                                </Button>
                            </div>
                            : <>
                                <div className='apply-button-container'>
                                    <Button fluid className="apply-button" style={styles.SaveButton}>
                                        <span className='command-approve-buttons-text'
                                              onClick={this.handleMainInformationSubmit}>Сохранить</span>
                                    </Button>
                                </div>
                                <div className='cancel-button-container api-info-cancel-button'>
                                    <Button fluid className="cancel-button" style={styles.CancelButton}
                                            onClick={this.editableHandle}>
                                        <span className='command-approve-buttons-text'>Отмена</span>
                                    </Button>
                                </div>
                            </>
                        }
                    </div>
                </form>

                <div className="detail-overview-api-name-input">
                    <label style={styles.BaseUrlInputLabel}>Защита API</label>
                    <Input icon={<Icon name={showPassword ? 'eye slash outline' : 'eye'} link
                                       onClick={this.handlePasswordShow}/>} className="form-input"
                           placeholder='X-Secret-YourAPI-Header' id="proxySecret" name="proxySecret" value={secret}
                           type={showPassword ? 'text' : 'password'}/>
                    <label style={styles.HelperLabel}>В целях безопасности и защиты Вашего API от запросов не
                        принадлежащих к инфраструктуре YourAPI, к каждому отдельному новому запросу добавляется
                        заголовок ,значение которого уникально для каждого API, опубликованного на Портале</label>
                </div>

                <div className="detail-overview-api-name-input">
                    <label style={styles.BaseUrlInputLabel}>Доступность API</label>
                    <Checkbox style={styles.PrivacySlider} slider id="privacy" name="privacy" onChange={this.handleToggleChange} label={privacy ? 'Публичный' : 'Частный'}/>
                </div>

                <div className="detail-overview-api-name-input delete-button">
                    <Button style={styles.DeleteButton} color='red' onClick={this.showDelete}><span className='command-approve-buttons-text'>Удалить</span></Button>
                </div>

                <Modal size="tiny" dimmer="blurring" open={openDelete} onClose={this.modalClose}
                       className="modal-conf-delete">
                    <Modal.Header className="modal-header">Удалить API проект</Modal.Header>
                    <Modal.Content>
                        <Container className="modal-container">
                            <p>
                                Вы уверены что хотите удалить свой API проект без восстановления?
                            </p>
                        </Container>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color='vk'
                            content="Отменить"
                            onClick={this.modalClose}
                        />
                        <Button
                            className="menu-update"
                            negative
                            content="Удалить"
                            onClick={this.apiDelete}
                        />
                    </Modal.Actions>
                </Modal>

            </div>
        )
    }
}

export default ApiUpdateMainBody;
