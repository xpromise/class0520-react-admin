import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less';

class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"
          editorClassName="rich-text-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/*<textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />*/}
      </div>
    );
  }
}

export default RichTextEditor;