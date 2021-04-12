import React, { Component } from 'react';

import Header from './components/Header/Header';
import CreatNote from './components/Create-Note/Create-Note';
import Note from './components/Note/Note';

class App extends Component {
  state = {
    notes: [],
    note: {
      title: "Untitled...",
      content: '',
      lastModified: Date.now(),
    },
    searchString: ''
  };

  addNoteHandler = (e, state) => {
    e.preventDefault();
    let updatednotes = this.state.notes
    updatednotes.push(this.state.note)
    this.setState({ ...this.state, notes: updatednotes })
    this.setState({ ...this.state, note: { ...this.state.note, title: 'Untitled...', content: '' } })
  }

  deleteHandler = (e, id) => {
    this.setState({
      ...this.state, notes: [...this.state.notes.filter((_, index) => {
        return (index !== id);
      })]
    })
  }

  editHandler = (e, id) => {
    let updatedNote = { title: '', content: '' };
    const updatedNotes = this.state.notes.map(note => {
      if (id === this.state.notes.indexOf(note)) {
        updatedNote.title = note.title;
        updatedNote.content = note.content;
      }
      return note;
    })
    this.setState({ ...this.state, notes: updatedNotes, note: { ...this.state.note, title: updatedNote.title, content: updatedNote.content } });
    setTimeout(() => {
      this.deleteHandler(e, id);
    }, 700)
  }

  titleChangeHandler = (e) => {
    this.setState({ ...this.state, note: { ...this.state.note, title: e.target.value } })
  }
  ContentChangeHandler = (e) => {
    this.setState({ ...this.state, note: { ...this.state.note, content: e.target.value } })
  }

  searchChangeHandler = (e) => {
    this.setState({ ...this.state, searchString: e})
  }
  cancelSearchHandler = () => {
    this.setState({ ...this.state, searchString: "" })
  }

  render() {
    return (
      <div>
        <Header
          value={this.state.searchString}
          searchChangeHandler={this.searchChangeHandler}
          cancelSearchHandler={this.cancelSearchHandler}
          searchHandler={''}

        />
        <CreatNote
          editModeHandler={this.editModeHandler}
          addNoteHandler={this.addNoteHandler}
          titleChangeHandler={this.titleChangeHandler}
          ContentChangeHandler={this.ContentChangeHandler}
          title={this.state.note.title}
          content={this.state.note.content}
        />
        {
          this.state.notes.map((note, i) => {
            return <Note
              key={i}
              id={i}
              title={note.title}
              content={note.content}
              lastModified={new Date(note.lastModified).toLocaleDateString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              editHandler={this.editHandler}
              deleteHandler={this.deleteHandler} />
          })
        }

      </div>
    );
  }
}

export default App;
