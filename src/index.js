import React from 'react'
import ReactDom from 'react-dom'
import {Table, Navbar, Form} from 'react-bootstrap'

import './index.css'

function NavigationBar(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Markdown Previewer</Navbar.Brand>
      </Navbar>
    </div>
  )
}

function InputBox(props) {
  return (
    <Form.Group controlId="input" className="InputBox">
      <Form.Control as="textarea" className="InputArea"></Form.Control>
    </Form.Group>
  )
}

function OutputBox(props) {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

class MarkDownPreviewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      output: "",
    }
  }

  render() {
    return (
      <div className="MarkDownPreviewer">
        <NavigationBar />
        <Table bordered height="100%">
          <thead>
            <tr>
              <th width="50%">MARKDOWN</th>
              <th width="50%">PREVIEW</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:0}}><InputBox></InputBox></td>
              <td><OutputBox></OutputBox></td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

ReactDom.render(
  <MarkDownPreviewer></MarkDownPreviewer>,
  document.getElementById('root')
)
