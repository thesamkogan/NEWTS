/**
 * COMPONENT
 */
// export class UserHome extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { text: '', mountedEditor: false };
//     this.quillRef = null;
//     this.reactQuillRef = null;
//     this.handleChange = this.handleChange.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//     this.attachQuillRefs = this.attachQuillRefs.bind(this);
//   }

//   componentDidMount() {
//     this.attachQuillRefs();
//     // this.props.fetchInitialData(this.props.user.id);
//   }

//   componentDidUpdate() {
//     this.attachQuillRefs();
//     this.props.updateNewt({ content: this.state.text, userId: this.props.user.id })
//   }
//   componentWillUnmount(){
//     if (!this.state.text) this.props.deleteNewt(this.props.newt.id)
//   }

//   attachQuillRefs() {
//     // Ensure React-Quill reference is available:
//     if (typeof this.reactQuillRef.getEditor !== 'function') return;
//     // Skip if Quill reference is defined:
//     if (this.quillRef !== null) return;

//     const quillRef = this.reactQuillRef.getEditor();
//     if (quillRef !== null) this.quillRef = quillRef;
//   }

//   handleClick() {
//     var range = this.quillRef.getSelection();
//     let position = range ? range.index : 0;
//     this.quillRef.insertText(position, 'Hello, World! ');
//   }

//   handleChange(html) {
//     if (html) {
//       this.props.updateNewt(1, {
//       content: html
//     });
//   }}

//   render() {
//     return (
//       <Segment>
//         <ReactQuill
//           ref={el => {
//             this.reactQuillRef = el;
//           }}
//           theme={'snow'}
//           onChange={this.handleChange}
//           modules={UserHome.modules}
//           formats={UserHome.formats}
//           defaultValue={this.state.editorHtml}
//           placeholder={this.props.placeholder}
//         />
//         <Button onClick={this.handleClick}>Insert Text</Button>
//       </Segment>
//     );
//   }
// }

// class UserHome extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { editorState: EditorState.createEmpty() };

//     this.onChange = editorState => {
//       console.log();

//       const contentState = editorState.getCurrentContent();
//       updateNewt(convertToRaw(contentState));
//       this.setState({ editorState });
//     };

//     this._onBoldClick = () => {
//       this.onChange(
//         RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
//       );
//     };

//     this.handleKeyCommand = this.handleKeyCommand.bind(this);
//   }

//   handleKeyCommand(command, editorState) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return 'handled';
//     }
//     return 'not-handled';
//   }

//   componentDidMount() {
//     this.props.fetchInitialData();
//   }

//   render() {
//     const { newt } = this.props;
//     console.log(this.props)
//     return (
//       <div>
//         <Button type="primary" onClick={this._onBoldClick.bind(this)}>
//           Bold
//         </Button>
//         <Divider orientation="left">Text v</Divider>
//         <Segment>
//         <Editor
//           editorState={this.state.editorState}
//           handleKeyCommand={this.handleKeyCommand}
//           onChange={this.onChange}
//         />
//         </Segment>
//         <Divider>TEXT^</Divider>
//       </div>
//     );
//   }
// }

// UserHome.modules = {};
// UserHome.modules.toolbar = [
//   ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//   ['blockquote', 'code-block'], // blocks
//   [{ header: 1 }, { header: 2 }], // custom button values
//   [{ list: 'ordered' }, { list: 'bullet' }], // lists
//   [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
//   [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
//   [{ color: [] }, { background: [] }], // dropdown with defaults
//   [{ font: [] }], // font family
//   [{ align: [] }], // text align
//   ['clean'],
//   ['image'] // remove formatting
// ];
// UserHome.formats = [
//   'header',
//   'font',
//   'background',
//   'color',
//   'code',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'script',
//   'align',
//   'direction',
//   'link',
//   'image',
//   'code-block',
//   'formula',
//   'video'
// ];
