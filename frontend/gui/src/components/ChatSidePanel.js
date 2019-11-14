import React from "react";
import Contact from "./ChatSidePanelContact";

const SidePanel = props => (
  <div id="sidepanel">
    <div id="profile">
      <div className="wrap">
        <img
          id="profile-img"
          src="https://s3-us-west-2.amazonaws.com/snap-sale/20180324200210/no-avatar.png"
          className="online"
          alt=""
        />
        <p>Mike Ross</p>
        <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
        <div id="status-options">
          <ul>
            <li id="status-online" className="active">
              <span className="status-circle"></span>
              <p>Online</p>
            </li>
            <li id="status-away">
              <span className="status-circle"></span>
              <p>Away</p>
            </li>
            <li id="status-busy">
              <span className="status-circle"></span>
              <p>Busy</p>
            </li>
            <li id="status-offline">
              <span className="status-circle"></span>
              <p>Offline</p>
            </li>
          </ul>
        </div>
        {/* <div id="expanded">
          <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
          <input name="twitter" type="text" value="mikeross" />
          <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
          <input name="twitter" type="text" value="ross81" />
          <label htmlFor="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
          <input name="twitter" type="text" value="mike.ross" />
        </div> */}
      </div>
    </div>
    <div id="search">
      <label htmlFor="">
        <i className="fa fa-search" aria-hidden="true"></i>
      </label>
      <input type="text" placeholder="Search contacts..." />
    </div>
    <div id="contacts">
      <ul>
        <Contact
          name="Name"
          status="online"
          imgURL="https://s3-us-west-2.amazonaws.com/snap-sale/20180324200210/no-avatar.png"
          chatURL="/chatroomname"
        />
        <Contact
          name="Name2"
          status="online"
          imgURL="https://s3-us-west-2.amazonaws.com/snap-sale/20180324200210/no-avatar.png"
          chatURL="/chatroomname"
        />
      </ul>
    </div>
    <div id="bottom-bar">
      <button id="addcontact">
        <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
        <span>Add contact</span>
      </button>
      <button id="settings">
        <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
        <span>Settings</span>
      </button>
    </div>
  </div>
);

export default SidePanel;
