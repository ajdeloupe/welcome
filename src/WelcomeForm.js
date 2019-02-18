import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
class WelcomeForm extends React.Component  {
    state = {
        firstname: '',
        lastname: '',
        lang: 'en',
        formal: "false"
    }
    _onFieldChange() {
        this.setState(
            {
                [event.target.id]: event.target.value
            }
        )
    }
    _onLoginSubmit () {
        this.props.onLogin(this.state);
    }
    render () {
        return <div id="logindiv">
            <label >First Name</label>
            <input type="text" id="firstname" value={this.state.firstname} onChange={this._onFieldChange.bind(this)} /><br /><br />
            <label>Last Name</label>
            <input type="text" id="lastname" value={this.state.lastname} onChange={this._onFieldChange.bind(this)} /><br /><br />
            <select id="lang" value={this.state.lang}  onChange={this._onFieldChange.bind(this)}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="se">Swedish</option>
            </select>
            <select id="formal" value={this.state.formal}  onChange={this._onFieldChange.bind(this)}>
                <option value="false">Informal Greeting</option>
                <option value="true">Formal Greeting</option>
            </select>
            <input type="button" value="Login" id="login" onClick={this._onLoginSubmit.bind(this)} />
        </div>
    }
}
function mapStateToProps (state) { 
    return{}

}
function mapDispatchToProps (dispatch, props) {
    return {
        onLogin: (login) => {
            dispatch({type: 'LOG_IN', login});
            props.history.push('/');
        }
        
    }
    
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeForm)); 