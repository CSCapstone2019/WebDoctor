import React from 'react';
import { NavLink } from 'react-router-dom';

const ChatSidePanelContact = (props) => (
  <NavLink to={`${props.chatURL}`}>
    <li className="contact">
      <div className="wrap">
        <span className="contact-status online"></span>
        <img
          src={props.imgURL}
        />
        <div className="meta">
          <p className="name">{props.name}</p>
          {/* <p className="preview">Hello Harvey.</p> */}
        </div>
      </div>
    </li>
  </NavLink>
)

export default ChatSidePanelContact;