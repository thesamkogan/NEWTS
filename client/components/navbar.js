import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, createNewt} from '../store'
import { Menu, Icon, Grid, Popup, Button} from 'semantic-ui-react'

export class Navbar extends Component{
  constructor(){
    super()
    this.state = {activeItem: 'list'}
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { handleClick, isLoggedIn, newNewt } = this.props
    const {activeItem} = this.state
    return (
    <div>
    <h1>NEWTS!</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Menu>
        <Menu.Item name="user" active={activeItem === 'user'} onClick={this.handleItemClick}>
   <Popup
   position="bottom right"
   wide
   trigger={<Icon size="huge" name="user circle outline" />}
   on="click">
    <Grid divided columns="equal">
      <Grid.Column>
        <Button color="blue" content="INFO" fluid />
      </Grid.Column>
      <Grid.Column>
        <Button color="red" onClick={handleClick} content="LOGOUT" fluid />
      </Grid.Column>
    </Grid>
  </Popup>
        </Menu.Item>
        <Menu.Item name="list" active={activeItem === 'list'} onClick={this.handleItemClick}>
          <Icon size="huge" name="list" />
          <Link to="/newts" />
        </Menu.Item>

        <Menu.Item name="add" active={activeItem === 'add'} onClick={this.handleItemClick}>
          <Icon size="huge" name="add" />
        </Menu.Item>
      </Menu>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links after you log in */}
          <Menu>
        <Menu.Item name="user" active={activeItem === 'user'} onClick={this.handleItemClick}>
   <Popup
   position="bottom right"
   wide
   trigger={<Icon size="huge" name="user circle outline" />}
   on="click">
    <Grid divided columns="equal">
      <Grid.Column>
        <Button color="green" fluid>
        <Link to="/login">LOGIN</Link>
        </Button>
      </Grid.Column>
      <Grid.Column>
        <Button color="red" fluid>
        <Link to="/signup">SIGNUP</Link>
        </Button>
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
)}
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    newNewt() {
      console.log(this.props.user.id);

      dispatch(createNewt())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
