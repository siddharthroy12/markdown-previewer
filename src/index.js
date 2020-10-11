import React from 'react'
import ReactDom from 'react-dom'
import { Table, Navbar, Form } from 'react-bootstrap'
import marked from 'marked'

import './index.css'

function NavigationBar(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{marginLeft:"50px", fontSize:"1rem", width:"100%"}}>
          Markdown Previewer
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Text style={{width:"150px"}}>By Siddharth Roy</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

function InputBox(props) {
  return (
    <Form.Group className="InputBox">
      <Form.Control
        as="textarea"
        className="InputArea"
        id="editor"
        onChange={props.onChange}
        value={props.input}>
      </Form.Control>
    </Form.Group>
  )
}

function OutputBox(props) {
  return (
    <div id="preview" dangerouslySetInnerHTML={props.elements} className="OutputBox">
    </div>
  )
}

class MarkDownPreviewer extends React.Component {
  constructor(props) {
    super(props)
    marked.setOptions({
      gfm:true,
      breaks: true,
    })
    const initialInput =
`
# This is a heading

## This is a sub heading

This is a link [Click Me!](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

\`Here is some code\`

\`Had to remove dompurifier beacuse of freecodecamp test suit\`

\`\`\`
function multiLineCode {

}
\`\`\`

**A bold text**

> A Block Quote

- Lists
  - Intented list

![A image!](https://www.photoshopessentials.com/newsite/wp-content/uploads/2012/10/80j.jpg)
`
    const initialOutput = {
      __html:marked(initialInput)
    }

    this.state = {
      input: initialInput,
      output: initialOutput,
    }
    this.convert = this.convert.bind(this)
  }

  convert(change) {
    let rawMarkup = marked(change.target.value)
    // Had to remove this because of freecodecamp test suite
    //rawMarkup = DOMPurify.sanitize(rawMarkup)
    this.setState({
      input:change.target.value,
      output:{__html:rawMarkup}
    })
  }

  render() {
    return (
      <div className="MarkDownPreviewer">
        <NavigationBar />
        <Table bordered height="100%">
          <thead>
            <tr>
              <th width="50%" style={{color:"grey"}}>MARKDOWN</th>
              <th width="50%" style={{color:"grey"}}>PREVIEW</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:0}}><InputBox input={this.state.input} onChange={this.convert}/></td>
              <td style={{
                overflow: "scroll"
              }}>
                <OutputBox elements={this.state.output}/>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

ReactDom.render(
  <MarkDownPreviewer />,
  document.getElementById('root')
)
