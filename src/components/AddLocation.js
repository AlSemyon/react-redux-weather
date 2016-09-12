import React, { Component, PropTypes } from 'react'

class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInput  = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleInput(e) {
    this.setState({name: e.target.value.substr(0, 25)});
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.name.trim()) {
      this.props.actions.addLocation(this.state.name)
      this.setState({name: ''})
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Enter location name' 
          onChange={this.handleInput}
          value={this.state.name}  />
        <input type='submit' value='Add' />
      </form>
    )
  }
}

export default AddLocation