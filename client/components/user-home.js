// import {
//   Editor,
//   EditorState,
//   RichUtils,
//   convertFromRaw,
//   convertToRaw
// } from 'draft-js';
// import ReactQuill from 'react-quill'; // ES6
// import { Delta } from 'quill';
// import 'react-quill/dist/quill.snow.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewts, createNewt, updateNewt, deleteNewt } from '../store/newt';
import { Segment, Form, Icon, List, Input } from 'semantic-ui-react';

export class UserHome extends Component {
  constructor() {
    super();
    this.state = {};
    //     this.quillRef = null;
    //     this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    //     this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ content: value });

  handleSubmit = () => {
    const { id } = this.props.user;
    const { content } = this.state;
    console.log(id);
    console.log(content);
    this.props.add({ content });
    this.setState({ content: '' });
  };

  handleDelete(e, data) {
    console.log('data, ', data);

    this.props.destroy(data);
  }
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { newt } = this.props;
    setTimeout(() => console.log(this.state), 1000);

    return (
      <div>
        <Segment>
          <List divided verticalAlign="middle">
            <List.Item>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <List.Content floated="right">
                    <Icon
                      type="submit"
                      onClick={this.handleSubmit}
                      size="large"
                      circular
                      bordered={false}
                      name="add"
                    />
                  </List.Content>
                  <Form.Field>
                    <Input
                      size="large"
                      // placeholder="Newt..."
                      required
                      name="content"
                      value={this.state.content}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </List.Item>
            {newt &&
              newt.map(thisnewt => (
                <List.Item key={thisnewt.id}>
                  <Segment>
                    <List.Content floated="right">
                      <Icon
                        name="delete"
                        onClick={(e) => this.props.destroy(thisnewt.id)}
                      />
                    </List.Content>
                    <List.Content>
                      <h3>{thisnewt.content}</h3>
                    </List.Content>
                  </Segment>
                </List.Item>
              ))}
          </List>
        </Segment>
      </div>
    );
  }
}

const mapState = ({ user, newt }) => ({ user, newt });
const mapDispatch = dispatch => ({
  updateNewt,
  destroy(id) {
    dispatch(deleteNewt(id));
  },
  add(content) {
    dispatch(createNewt(content));
  },
  loadInitialData() {
    dispatch(fetchNewts());
  }
});

export default connect(mapState, mapDispatch)(UserHome);
