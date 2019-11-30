import React, { Component } from 'react';
import { Upload, message, Button, Icon, Avatar, Card } from 'antd';

import Footer from '../components/layout/Footer';
import '../assets/masthead.css';
import samplePDF from '../assets/report.pdf';
import PDFViewer from 'pdf-viewer-reactjs';
import { pdfjs } from 'react-pdf';
import {
  Jumbotron,
  Col,
  Row,
  Container,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';


const { Meta } = Card;
class Reports extends Component {

  state = {
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      },
    ],
  };

  componentDidMount() {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
        console.log("FILE URL:", file.response.url)
      }
      return file;
    });

    this.setState({ fileList });
  };


  render() {
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true,
    };

    return (
      <>
        <Jumbotron>
          <h1 className="display-3">Your Reports</h1>
          <p className="lead"></p>
          <hr className="my-2" />
        </Jumbotron>

        <Container>
          <Card style={{ width: 300 }}>
            <Meta
              avatar={
                <Avatar src="https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png" />
              }
              title="Upload Patient Reports"
            />
          </Card>

          <Upload {...props} fileList={this.state.fileList}>
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
          <br/>
        </Container>
       
        <Container>
          <Row>
            <Col>
              
            </Col>
            <Col>
              <div style={{ width: '50vw' }}>
                <PDFViewer
                  document={{
                    file: samplePDF
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <Footer />
      </>
    );
  }
}

export default Reports;
