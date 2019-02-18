import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as  ReactRedux from 'react-redux';
import WelcomeBox from "./components";
import WelcomeForm from './WelcomeForm';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

//use symbol to protect these from being changed directly
/* let s_firstname = Symbol();
let s_lastname = Symbol();
let s_language = Symbol();
let state = {
    firstname: '',
    lastname: '',
    language: 'en'
} */
function reducer(state = {
    firstname: '',
    lastname: '',
    language: 'en',
    formal: "false"
}, action) {
    switch(action.type) {
        case 'LOG_IN':
            return Object.assign({}, state, {firstname:action.login.firstname, lastname: action.login.lastname, language: action.login.lang, formal: action.login.formal});
        case 'LOG_OUT':
            return Object.assign({}, state, {firstname: '', lastname: '', language: 'en', formal: "false"});
        case 'CHANGE_LANGUAGE':
            return Object.assign({}, state, {language: action.language});
        case 'CHANGE_GREETING':
            return Object.assign({}, state, {formal: action.formal});
        default:
            console.log(`${action.type} not handled`);
            return state;
    }

}
let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* function onLogin(history, login) {
    state = {
        firstname: login.firstname,
        lastname: login.lastname,
        language: login.lang
    };
    history.push('/');
}
function onLangChange(language) {
    state.language = language;
    render();
} */
/* function WelcomeView () {
    return <WelcomeBox state={state} />;
} */
/* const LoginView = withRouter(({history}) => 
    <WelcomeForm onLogin={onLogin.bind(this,history)} onLangChange={onLangChange} />
) */
function render () {


    ReactDOM.render(
        <BrowserRouter>
            <ReactRedux.Provider store={store}>
                <>
                    <Route exact path="/" component={WelcomeBox} />
                    <Route path="/login" component={WelcomeForm} />
                </>
            </ReactRedux.Provider>
        </BrowserRouter>, document.getElementById('welcome-app')
    );
}
render();
//var g = G$('John', 'Doe', 'se').updateGreeting('#greeting');
//console.log(g);
/*$('#login').click(function(){
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let language =$('#lang').val();
    
    let Greet = G$(firstname, lastname);
    Greet.language = $('#lang').val();
   // Greet.firstName = 'Joy';
    Greet.updateGreeting('#greeting', true).log();
    console.log(Greet.firstname);
    console.log(Greet.language);
    $('#greeting').after(`Chosen language: ${Greet.language}`);
});*/