import React from 'react'
import ReactDom from 'react-dom'
import {Table, Navbar, Form} from 'react-bootstrap'
import marked from 'marked'
import DOMPurify from 'dompurify';

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
    const initialInput =
`
# This is a heading

## This is a sub heading

This is a link [links](https://www.freecodecamp.com)

\`Here is some code\`

\`\`\`
function multiLineCode {

}
\`\`\`

**A bold text**

> A Block Quote

- Lists
  - Intented list

![A image!](https://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png)
`
    const initialOutput = {
      __html:marked(initialInput, {breaks:true})
    }

    this.state = {
      input: initialInput,
      output: initialOutput,
    }
    this.convert = this.convert.bind(this)
  }

  convert(change) {
    let rawMarkup = marked(change.target.value, {breaks:true})
    rawMarkup = DOMPurify.sanitize(rawMarkup)
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
