import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Picture extends Component {
  render() {
    return (
      <div className="thumbnail text-center">
        <img
          src="../../img/doctor.jpg"
          alt="Background"
          className="img-fluid w-100 thumb"
        />
        <div className="caption">
          <p>
            WebDoctor<br></br>
            <span>Find the greatest form of yourself, with us!</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Picture;
