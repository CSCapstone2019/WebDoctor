import React from "react";
import { Modal } from "antd";
import Form from "./ChatForm";

class AddChatModal extends React.Component {
  render() {
    return (
      <Modal
        centered
        footer={null}
        visible={this.props.isVisible}
        onCancel={this.props.close}
      >
        <Form />
      </Modal>
    );
  }
}

export default AddChatModal;