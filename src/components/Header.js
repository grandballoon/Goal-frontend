import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

const Header = (props) => {
  const textAlignment = {color: 'white', width:'auto', padding: 10, margin: 10}
  return (
  <div>
    <div className="ui blue inverted menu">
      <h2 style={textAlignment}>Goooooaaaaal</h2>
    </div><br/>
  </div>
)


}

export default Header
