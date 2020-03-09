import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Image from '../../../components/Image/Image';
// import Input from '../../../components/InputControls/Input/Input';
import axios from '../../../Services/admin';
import { Input, FormFeedback } from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      displayPrice: 0,
      errorPrice: ''
    }
  }
  Logout = () => {
    localStorage.removeItem('adminData');
    this.props.history.push('/admin/login');
  }

  componentWillMount() {
    this.getPrice();
  }

  getPrice = async (e) => {
    if(e != undefined) { e.preventDefault(); }
    let response = await axios.get('/getPrice');
    if(response.status == 200) {
        // console.log("PARTH : TCL: Login -> Login -> response", response)
        this.setState({ displayPrice: response.data.data[0].price, price: '' });
    } else {
        console.log('Errror')
    }
  }
  
  setPrice = async (e) => {
    e.preventDefault();
    let { price } = this.state;
    let response = await axios.post('/setPrice', {
      price
    });
    if(response.status == 200) {
        // console.log("PARTH : TCL: Login -> Login -> response", response)
        this.getPrice();
    } else {
        console.log('Errror')
    }
  }

  render() {
    const { modalName, history } = this.props;
    const { displayPrice, price, errorPrice } = this.state;
    // console.log("PARTH : TCL: Login -> render -> price", price)
    let Location = this.props.history.location.search;
    const path = history.location.pathname;
    if (modalName !== '' && this[modalName] !== undefined) {
      // console.log('modalName', modalName)
      this[modalName]();
    }
    return (
      <div>
        <div id="myHeader" className="sticky-top">
          <div className="container-big">
            <nav className="navbar navbar-expand-xl navbar-light  sticky-top">
              <NavLink className="slideanim" to="/" title="Aladin">
                <Image src={require('../../../assets/img/img-logo.png')} />
              </NavLink>
              <button
                className="btn btn-primary ml-3"
                type="button"
                data-toggle="modal"
                data-target="#modalLoginForm"
                onClick={this.Logout}
                style={{ float: 'right' }}
              >
                Logout
                    </button>
            </nav>
          </div>
        </div>
        <section className="page-section" id="view-a">
          <div className="bg-img1  d-flex align-items-center">
            <div className="container padbt-40 text-center  back-color">
              <div className="row  aos-item" data-aos="fade-down">
                <div className="col-12 mx-auto ">
                  <div id="Storage-pro">
                    <h2>ALA Token Price: ${displayPrice}</h2>
                    <form onSubmit={this.setPrice} onReset={this.getPrice}>
                      <div className="col-12 mt-4">
                        <Input
                          placeholder="ALA Token Price"
                          style={{ width: '100%', maxWidth: '460px', margin: '0 auto' }}
                          // type="number"
                          value={price}
                          valid={price != '' && errorPrice}
                          invalid={price != '' && !errorPrice}
                          onChange={(e) => {
                            this.setState({ price: e.target.value.replace(/[^0-9]*/, ''), errorPrice: e.target.value > 0 &&  /^\d{1,3}(\.\d{0,2})?$/.test(e.target.value) });
                          }}
                        />
                        <FormFeedback
                            style={{ textAlign: 'left' }}
                            //   valid={errorEmail != null && errorEmail.length}
                            invalid={price != '' && !errorPrice}
                        >
                            {price > 0 ? 'Please enter only digits' : isNaN(price) ? 'Please enter valid price' : 'Price should be greter than 0'}
                        </FormFeedback>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary mt-4 request_demo_send width-100" type="submit" data-dismiss="modal" data-toggle="modal">Save</button>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary mt-4 request_demo_send width-100" type="reset" data-dismiss="modal" data-toggle="modal">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;