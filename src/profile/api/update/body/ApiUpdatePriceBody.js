import React, {Component} from 'react';

class ApiUpdatePriceBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        document.title  = 'YourAPI | Настройка стоимости';
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

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };


    render() {
        return (
            <div>
              <h1></h1>
              <h1></h1>
              <h1></h1>
              <h1>Цены</h1>
            </div>

        )
    }
}

export default ApiUpdatePriceBody;
