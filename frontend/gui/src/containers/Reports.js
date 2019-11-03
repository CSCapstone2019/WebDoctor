import React, { Component } from 'react';
import Footer from '../components/Footer';
import '../assets/masthead.css';
import samplePDF from '../assets/report.pdf';
import PDFViewer from 'pdf-viewer-reactjs';
import { pdfjs } from 'react-pdf';
import { 
  Jumbotron,
  Col,
  Row,
  Container,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle 
} from 'reactstrap';




const SomeComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    {text}
  </div>
);

class Reports extends Component {
  componentDidMount() {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  render() {
    return (
      <>
        <Jumbotron>
          <h1 className="display-3">Your Reports</h1>
          <p className="lead">
          </p>
          <hr className="my-2" />
        </Jumbotron>

        <Container>
          <Row>
            <Col >
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  Reports
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Statement</DropdownItem>
                  <DropdownItem>September 2019</DropdownItem>
                  <DropdownItem>October 2019</DropdownItem>
                  <DropdownItem>November 2019</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Initial Examimation</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col >
              <div style={{ width: '50vw' }}>
                <PDFViewer
                  document={{
                    file: samplePDF,

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
