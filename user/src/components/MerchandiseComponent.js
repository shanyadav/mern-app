import React, { Component } from "react";
import { Link } from 'react-router-dom';
class MerchandiseComponent extends Component {

  render() {
    const { ItemsData } = this.props;
    return (
      <>
        <header id="page-top" className="single-banner">
          <div className="container">
            <div className="row banner-text">
              <div className="col-sm-12">
                <h3>Merchandise</h3>
                <p>
                  <Link to="/home"> Home </Link>{" "}
                  <i className="icofont-rounded-right"></i>Merchandise{" "}
                </p>
              </div>
            </div>
          </div>
        </header>
        <section className="catering-section">
          <div className="container">
            <div className="base-header">
              <small>Event By Tastery </small>
              <h2>Cart Items</h2>
            </div>
            <div className="row">                      {ItemsData &&
                ItemsData.data &&
                ItemsData.data.length
                ? ItemsData.data.map((item1, indx1) => {
                  return (
                    <div className="col-md-4 col-sm-12 mt-3">
                      <div className="catering-wrap">
                        <div className="catering-img">
                          <img src="../images/product_1.jpg" alt="" />
                          <span> $ {item1.online_price ? item1.online_price : 0}</span>
                        </div>
                        <div className="catering-text">
                          <h4>{item1.name && item1.name} </h4>
                          <ul>
                            <li> Lorem ipsum dolor sit amet. </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                  );
                })
                : null}

            </div>
          </div>
        </section>
      </>
    );
  }
}

export default MerchandiseComponent;
