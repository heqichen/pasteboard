import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import rest from "rest";
import mime from "rest/interceptor/mime";
import "./App.css";

var client = rest.wrap(mime);
var DEBUGHOST = "";
//var DEBUGHOST = "http://localhost:3303";

class App extends Component {

  constructor(props) {
    super(props);
    var pathname = window.location.pathname;
    var uri = pathname.split("/")[1];
    if (uri.length < 1) {
      alert("error");
    }
    this.title = uri;
    this.content = "";
    this.state = {
      initialized: false
    }
    var self = this;

    client({
      "path": DEBUGHOST+"/rest/"+this.title
    }).then(function(response) {
      //var entity = JSON.parse(response.entity);

      console.log('response: ', response.entity);
      if (response.entity.id) {
        self.content = response.entity.content;
        self.setState({
          initialized: true,
          //editorValue: RichTextEditor.createEmptyValue()
          editorValue: RichTextEditor.createValueFromString(response.entity.content, "html")
        });
      } else {
        self.content = "";
        self.setState({
          initialized: true,
          editorValue: RichTextEditor.createEmptyValue()
        });
      }
    });
  }

  onChange = (value) => {
    this.content = value.toString("html");
  	this.setState({editorValue: value});
  	//this.setState({value: RichTextEditor.createValueFromString("<h1>haha</h1>", 'html')})
  	
  	/*
  	console.log(value.toString("html"));
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }*/
  };

  onNewButtonCLick = () => {
    window.location.href="/";
  };

  onSaveButtonClick = () => {    
    var entity = {
      content: this.content
    };
    var entityStr = JSON.stringify(entity);
    console.log("send content, ", entity);
    rest({
      "method": "post",
      "path": DEBUGHOST+"/rest/"+this.title,
      "entity": entityStr,
      "headers": {
          'Content-Type': 'application/json'
      },
    }).then(function(resp) {
      var message = JSON.parse(resp.entity);
      if (message.message) {
        alert("OK");
      } else {
        alert("failed");
      }
    })
  };

  render () {
    if (this.state.initialized) {
      return (<div>
        <span className="button" onClick={this.onNewButtonCLick}>New</span>
        <span className="button" onClick={this.onSaveButtonClick}>Save</span>
        <RichTextEditor
        value={this.state.editorValue}
        onChange={this.onChange}
      /></div>);
    } else {
      return (<h1>Loading...</h1>);
    }

  };
}





export default App;
