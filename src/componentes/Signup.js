import React, { Component } from 'react';
import {browserHistory} from  'react-router';

export default class Signup extends Component {

    constructor(props){

        super(props);        
        this.state = {msg:this.props.location.query.msg};      
    }

    
    envia(event){
        event.preventDefault();

        const login = this.login.value;
        const senha = this.senha1.value;
        const senha2 = this.senha2.value;
        const urlPerfil = this.urlPerfil.value;

        console.log(`Login: ${login}`);
        console.log(`Senha 1: ${senha}`);
        console.log(`Senha 2: ${senha2}`);
        console.log(`Foto: ${urlPerfil}`);
        

        if (login !== senha && senha  === senha2){

            console.log("O login e as senhas estão corretos");
        
            const requestInfo = {
                method:'POST',
                body:JSON.stringify({login,senha,urlPerfil}),
                headers:new Headers({
                    'Content-type' : 'application/json' 
                })
            };
    
            fetch(`http://localhost:8080/usuarios/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
                .then(response => {
                    if(response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Não foi possível fazer o signup');
                    }
                })
                .then(token => {
                    localStorage.removeItem('auth-token');
                })
                .catch(error => {
                   /* this.setState({msg:error.message}); */
                });
                browserHistory.push('/');
        
        } else {

                this.login.value = '';
                this.senha1.value = '';
                this.senha2.value = '';
                this.urlPerfil.value = '';
                this.setState({msg: ''});
                this.setState({msg2: ''});

                

                if(login === senha || login === senha2){

                    
                    this.setState({msg: 'Senha igual ao username'});
                }
                    
            
                if(senha !== senha2){
        
                    this.setState({msg2: 'Senha não confere'});
                  
                }    
        
        }


    }


    render(){
        return (
            <div className="login-box">
                <h1>Signup</h1>
                <span className="erro-signup">{this.state.msg}</span>
                <br/>
                <span className="erro-signup">{this.state.msg2}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <label>Login</label>
                    <input type="text" ref={(input) => this.login = input} required/>
                    
                    <label>Senha</label>                    
                    <input type="password" ref={(input) => this.senha1 = input} required/>

                    <label>Confimação</label> 
                    <input type="password" ref={(input) => this.senha2 = input} required/>

                    <label>Url do Perfil</label>
                    <input type="html" ref={(input) => this.urlPerfil = input} placeholder="http://endereco.com"/>

                    <input type="submit" value="Signup"/>
                </form>
            </div>
        );
    }

}

