import React, { Component } from 'react';
import { Button } from 'reactstrap';
import doctor from '../doctor.jpg';

class Picture extends Component {
  render() {
    return (
      <div className="thumbnail text-center">
        <img src={doctor} alt="Background" className="img-fluid w-100 thumb" />
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
