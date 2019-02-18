import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//set up data needed.  not exported, defined outside the class, and thus "hidden"
let validLangs = new Map([['en', 'English'],['es', 'Spanish'],  ['se', 'Swedish']]);
let greetings = new Map([
    ["en", "Hi"],
    ["es", "Hola"],
    ["se", "Hejsan"]
]);
let formalGreetings = new Map([
    ["en", "Hello"],
    ["es", "Saludos"],
    ["se", "Hej"]
]);
let logMessages = new Map([
    ["en", "Logged In"],
    ["es", "Indicio Session"],
    ["se", "Inloggad"]
]);




class WelcomeBox extends React.Component {
    constructor(props) {
        //super() runs the function of the same name (here constructor()) inside the "parent" class (here React.Component)
        super(props);
        console.log(`Firstname is ${this.props.firstname}`);
    }     
    //set default options.  can be set outside the constructor in which case you don't need to use "this." here (use it when referencing these values however). Use setState to change these to trigger a new render
    
    //before rendering, fetch info from API
    componentWillMount(){
        // this._fetchInfo();
    }
    render () {
        let isLoggedIn = this.props.firstname ? true : false;
        if(isLoggedIn) {
            //don't call setState inside any functions called inside render() because they are already rendering.
            console.log(this.props.formal);
            let greeting = this._greeting (this.props.formal);
            let languageText = this.language;
            //we have all the values, ready to render view. 
            this._log();
            let languageOptions =[];
            validLangs.forEach((value, key) => {
                languageOptions.push(<option value={key}>{value}</option>)
            });
            return( <div>
            <h1 id='greeting'>{greeting}</h1>
            <p>Chosen Language: {languageText}</p>
            <select id="lang" value={this.props.language}  onChange={this._onFieldChange.bind(this)}>
            {languageOptions}
                {/* <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="se">Swedish</option> */}
            </select>
            <select id="formal" value={this.props.formal}  onChange={this._onGreetChange.bind(this)}>
                <option value="false">Informal Greeting</option>
                <option value="true">Formal Greeting</option>
            </select>
            <input type="button" value="LogOut" id="logout" onClick={this.props.onLogOut} />
            </div>);
        } else {
            return <div>
                <Link to="/login">Log in</Link>
            </div>
        }
        
    }
       
    //after rendering, set interval to check for updates from API
    componentDidMount(){
        // this._timer = setInterval(() => this._fetchEvents(), 5000);
    }
    //before removing, clear any timers that are running
    componentWillUnmount() {
        // clearInterval(this._timer);
    }
    _onLogoutSubmit () {
        
    }
    _onFieldChange (event) {
        this.props.onChangeLanguage(event.target.value);
    }
    _onGreetChange (event) {
        this.props.onChangeGreeting(event.target.value);
    }
    //sets up methods
    _fullname () {
        // use computed member access operator ([]) to access properties set up with Symbol()
        return `${this.props.firstname} ${this.props.lastname}`;
    };
    
    _greeting (formal) {
        let msg;
        if (formal === "true") {
            //go out to formalGreetings map and get value for property matching the language
            msg = `${formalGreetings.get(this.props.language)} ${this._fullname()}`;
            
        } else {
            //go out to greetings map and get value for property matching the language
            msg = `${greetings.get(this.props.language)} ${this.props.firstname}`;

        }
        return msg;
    };
    
    _validate () {
        //go out to validLangs set and check if it has a value matching the current language
        if (!validLangs.has(this.props.language)) {
            throw "invalid language";
        }
        return this;
    };
    
    _log() {
        if (console) {
            console.log(`${logMessages.get(this.props.language)}: ${this._fullname()}`);
        }
        return this;
    };
    
    
    get language () {
        switch(this.props.language){
            case 'en':
                return "English";
            case 'es':
                return "Spanish";
            case 'se':
                return "Swedish";
            default:
                throw "not valid language";
        }
       /*  if(this.props.language === 'en') {
            return "English";
        } else if (this.props.language === 'se'){
            return "Swedish";
        } else if (this.props.language === 'es') {
            return "Spanish";
        } else {
            throw "not valid language";
        } */
    } 
}
function mapStateToProps(state) {
    return{
        firstname: state.firstname,
        lastname: state.lastname,
        language: state.language,
        formal: state.formal
    }
}
function mapDispatchToProps(dispatch){
    return{
        onChangeLanguage: (language) => {
            dispatch({type: 'CHANGE_LANGUAGE', language});
        },
        onLogOut: () => {
            dispatch({type: 'LOG_OUT'});
        },
        onChangeGreeting: (formal) => {
            dispatch({type: 'CHANGE_GREETING', formal});
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBox)

    //sets up object
 /*class GreetrInit extends Greetr {
     constructor(firstName = "First", lastName = "Last", language = "en") {
         //needed to have access to Greetr methods
        super();
        this[s_firstname] = firstName;
        this[s_lastname] = lastName;
        this[s_language] = language;
        this.validate();
     } 
 }*/