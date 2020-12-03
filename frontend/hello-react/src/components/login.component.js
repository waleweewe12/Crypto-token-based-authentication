import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false,
            img : ''
        }
    }

    login = () => {
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
        this.setState({ isLoggedIn: true })
        this.setState({ img:imgs })
    }
    render() {
        if(this.state.isLoggedIn) {
        

            return (
                <Card >
                <Card.Img variant="top" src={this.state.img} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            )
        }

        
        return (
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
               

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={this.login}>
                Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
