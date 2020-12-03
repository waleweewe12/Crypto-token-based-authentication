import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios'
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false,
            img : '',
            user: "",
            pswd: "",
            helloName: "",
        }
    }

    login = () => {
        this.callLoginApi().then(() => {
            console.log("finish");
        })
    }

    getText = () => {
        this.callGetTextApi()
    }

    callGetTextApi = () => {
        return axios.get("http://localhost:5000/login/gettext", {
            withCredentials: true,
            crossDomain: true
        }).then(response => {
            console.log(response.data);
            if(response.data.status === "success") {
                alert(response.data.message)
            } else {
                alert("fail", response.data.message)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    callLoginApi = () => {
        console.log(this.state.user, this.state.pswd);
        return axios.post("http://localhost:5000/login/", {
            username: this.state.user,
            passwords: this.state.pswd
        }, {
            withCredentials: true,
            crossDomain: true
        }).then(response => {
            console.log(response.data);
            if(response.data.status == "success") {
                this.showHello(response.data.username)
            } else {
                alert("Login error," + response.data.message)
                console.log(response.data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    showHello = (username) => {
        const birthday = new Date();
        const day = birthday.getDay();
        let imgs = ''
        if (day ==1){
            imgs= "https://www.xn--k3cc7brobq0b3a7a3s.com/wp-content/uploads/2020/11/765643333333-940x1044.jpg"
        }else if (day ==2){
            imgs= "https://www.xn--k3cc7brobq0b3a7a3s.com/wp-content/uploads/2020/11/DSC_81455555550000-1024x965.jpg"
        }else if (day ==3){
            imgs= "https://www.xn--k3cc7brobq0b3a7a3s.com/wp-content/uploads/2020/12/DSC_2038-1024x1007.jpg"
        }else if (day ==4){
            imgs= "https://www.xn--k3cc7brobq0b3a7a3s.com/wp-content/uploads/2020/11/DSC_7846-1016x1024.jpg"
        }else if (day ==5){
            imgs= "https://www.xn--k3cc7brobq0b3a7a3s.com/wp-content/uploads/2020/11/DSC_4739-1024x949.jpg"
        }else if (day ==6){
            imgs= "https://www.xn--k3cc7brobq0b3a7a3s.com/wp-content/uploads/2020/11/DSC_1126-1024x971.jpg"
        }
        else if (day ==7){
            imgs= "https://www.xn--k3cc7brobq0b3a7a3s.com/wp-content/uploads/2020/11/DSC_6482-1024x995.jpg"
        }
        this.setState({ isLoggedIn: true, img:imgs, helloName: username })
    }
    render() {
        if(this.state.isLoggedIn) {
            return (
                <Card >
                <Card.Img variant="top" src={this.state.img} />
                <Card.Body>
                  <Card.Text>
                    สวัสดี คุณ {this.state.helloName}
                  </Card.Text>
                  <button type="button" className="btn btn-dark btn-lg btn-block" onClick={this.getText}>
                ดูดวงวันนี้</button>
                </Card.Body>
              </Card>
            )
        }

        
        return (
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="Enter email" onChange={e => this.setState({ user: e.target.value })}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e => this.setState({ pswd: e.target.value })}/>
                </div>

                <button type="button" className="btn btn-dark btn-lg btn-block" onClick={this.login}>
                Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
