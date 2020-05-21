import React, {Component} from 'react';
import './CommandsTreeSet.css';
import {Icon, List} from "semantic-ui-react";
import {NavLink, withRouter} from 'react-router-dom';
import queryString from "query-string";
import classNames from 'classnames/bind';

class CommandsTreeSet extends Component {

    constructor(props){
        super(props);
        this.state = {
            hidden: false,
            hidden2: true,
            arrow: 'chevron up',
            arrow2: 'chevron down',
            company: {
                page:'',
                name: ''
            }

        };
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    toggle(){
        const open = this.state.hidden;
        this.setState({hidden: !open, arrow: open ? 'chevron up' : 'chevron down'})
    }

    toggle2(){
        const open = this.state.hidden2;
        this.setState({hidden2: !open, arrow2: open ? 'chevron up' : 'chevron down'})
    }

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    render(){
        const namingArray = ['Волга', 'Урал'];
        const pagingArray = ['about', 'members'];
        const params = queryString.parse(this.props.location.search);
        let naming = (params.company !== 'undefined' && this.handleCheck(namingArray, params.company)) ? params.company : 'Волга';
        let page = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'about';

        return (
            <div className='command-toggle'>
                <List verticalAlign='middle'>
                        <List.Item>
                            <List.Content floated='right'>
                                <Icon link name={this.state.arrow} onClick={this.toggle} className={naming !== 'Волга' ? 'command-disabled-color' : null}/>
                            </List.Content>
                            <Icon name='users' className={naming !== 'Волга' ? 'command-disabled-color' : null} />
                            <List.Content><span onClick={this.toggle} className={classNames({ 'command-disabled-color' : naming !== 'Волга'}, 'command-operation-text', 'command-bold-font-weight')}>Волга</span></List.Content>
                            <List.List hidden={this.state.hidden}>
                                <List.Content className='sub-command'>
                                    <NavLink to="/profile/administration?company=Волга&page=about"><span className={classNames({ 'command-disabled-color' : naming !== 'Волга'}, { 'command-link-color' : (naming === 'Волга' && page === 'about')}, 'command-operation-text')}>О команде</span></NavLink>
                                </List.Content>
                                <List.Content className='sub-command'>
                                    <NavLink to="/profile/administration?company=Волга&page=members"><span className={classNames({ 'command-disabled-color' : naming !== 'Волга'}, { 'command-link-color' : (naming === 'Волга' && page === 'members')}, 'command-operation-text')}>Участники</span></NavLink>
                                </List.Content>
                            </List.List>
                        </List.Item>

                        <List.Item style={{paddingTop: 32}}>
                            <List.Content floated='right'>
                                <Icon link name={this.state.arrow2} onClick={this.toggle2} className={naming !== 'Урал' ? 'command-disabled-color' : null}/>
                            </List.Content>
                            <Icon name='users' className={naming !== 'Урал' ? 'command-disabled-color' : null} />
                            <List.Content><span onClick={this.toggle2} className={classNames({ 'command-disabled-color' : naming !== 'Урал'}, 'command-operation-text', 'command-bold-font-weight')}>Урал</span></List.Content>
                            <List.List hidden={this.state.hidden2}>
                                <List.Content className='sub-command'>
                                    <NavLink to="/profile/administration?company=Урал&page=about"><span className={classNames({ 'command-disabled-color' : naming !== 'Урал'}, { 'command-link-color' : (naming === 'Урал' && page === 'about')}, 'command-operation-text')}>О компании</span></NavLink>
                                </List.Content>
                                <List.Content className='sub-command'>
                                    <NavLink to="/profile/administration?company=Урал&page=members"><span className={classNames({ 'command-disabled-color' : naming !== 'Урал'}, { 'command-link-color' : (naming === 'Урал' && page === 'members')}, 'command-operation-text')}>Сотрудники</span></NavLink>
                                </List.Content>
                            </List.List>
                        </List.Item>
                </List>
            </div>
        );
    }
}
export default withRouter(CommandsTreeSet);