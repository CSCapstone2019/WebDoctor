import React from 'react';
import AppNavbar from './AppNavbar';
import { List, Avatar, Icon } from 'antd';
// import {
//   Card,
//   Button,
//   CardTitle,
//   CardText,
//   Row,
//   Col,
//   Container
// } from 'reactstrap';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const PatientLists = props => {
  // const res = props.data;
  // console.log(res);

  return (
    <>
      <AppNavbar />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3
        }}
        dataSource={props.data}
        renderItem={item => (
          <List.Item
            key={`${item.first_name} ${item.last_name}`}
            actions={[
              <IconText type="star-o" text="156" key="list-vertical-star-o" />,
              <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              <IconText type="message" text="2" key="list-vertical-message" />
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <a
                  href={`/${item.id}`}
                >{`${item.first_name} ${item.last_name}`}</a>
              }
              description={item.description}
            />
            {item.email}
          </List.Item>
        )}
      />
      {/* <Container>
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle>{`${res.first_name} ${res.last_name}`}</CardTitle>
              <CardText>{res.email}</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle>{`${res.first_name} ${res.last_name}`}</CardTitle>
              <CardText>{res.email}</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default PatientLists;
