import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, createNewt } from '../store';
import {
  Menu,
  Icon,
  Grid,
  Popup,
  Button,
  Form,
  Input,
  TextArea
} from 'semantic-ui-react';

export class Navbar extends Component {
  constructor() {
    super();
    this.state = { activeItem: 'list' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { handleClick, isLoggedIn } = this.props;
    const { activeItem } = this.state;
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Menu>
                <Menu.Item
                  name="user"
                  active={activeItem === 'user'}
                  onClick={this.handleItemClick}
                >
                  <Popup
                    position="bottom right"
                    wide
                    trigger={<Icon size="huge" name="user circle outline" />}
                    on="click"
                  >
                    <Grid divided columns="equal">
                      <Grid.Column>
                        <Button fitted color="blue" content="INFO" fluid />
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          fitted
                          color="red"
                          onClick={handleClick}
                          content="LOGOUT"
                          fluid
                        />
                      </Grid.Column>
                    </Grid>
                  </Popup>
                </Menu.Item>
                <Menu.Item
                  href="/home"
                  name="list"
                  active={activeItem === 'list'}
                  onClick={this.handleItemClick}
                >
                  <Icon size="huge" name="list" />
                </Menu.Item>

                <Menu.Item
                  name="add"
                  active={activeItem === 'add'}
                  onClick={this.handleItemClick}
                >
                  <Popup
                    position="bottom right"
                    wide
                    trigger={<Icon fitted size="huge" name="add" />}
                    on="click"
                  >
                    <Grid divided rows="equal">
                      <Form>
                        <Grid.Row>
                          <Form.Field
                            control={Input}
                            label="Title"
                            placeholder="Title..."
                          />
                        </Grid.Row>
                        <Grid.Row>
                          <Form.Field
                            control={TextArea}
                            label="Newt"
                            placeholder="Start typing..."
                          />
                        </Grid.Row>
                      </Form>
                    </Grid>
                  </Popup>
                </Menu.Item>
                <Menu.Item>
                  <h1>NEWTS!</h1>
                </Menu.Item>
              </Menu>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links after you log in */}
              <Menu>
                <Menu.Item
                  name="user"
                  active={activeItem === 'user'}
                  onClick={this.handleItemClick}
                >
                  <Popup
                    position="bottom right"
                    wide
                    trigger={<Icon size="huge" name="user circle outline" />}
                    on="click"
                  >
                    <Grid divided columns="equal">
                      <Grid.Column>
                        <Button
                          href="/login"
                          content="LOGIN"
                          color="green"
                          fluid
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          href="/signup"
                          content="SIGNUP"
                          color="red"
                          fluid
                        />
                      </Grid.Column>
                    </Grid>
                  </Popup>
                </Menu.Item>
              </Menu>
              {/* The navbar will show these links before you log in */}
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
