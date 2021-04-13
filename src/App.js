import React, { Component } from 'react';

import Header from './components/Header/Header';
import CreatNote from './components/Create-Note/Create-Note';
import Note from './components/Note/Note';
// import note from './components/Note/Note';

class App extends Component {
  state = {
    notes: [],
    note: {
      title: "Untitled...",
      content: '',
      lastModified: '',
    },
    searchString: ''
  };

  addNoteHandler = (e, state) => {
    e.preventDefault();
    let updatednotes = this.state.notes
    const { note } = this.state;
    note.lastModified = Date.now();
    updatednotes.push(note)
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

  onChangeSearchHandler = (e) => {
    this.setState({ ...this.state, searchString: e })
  }
  cancelSearchHandler = () => {
    this.setState({ ...this.state, searchString: "" })
  }
  searchHandler = () => {
    const updatedNotes = this.state.notes.filter(note => {
      return note.title.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1 ||
        note.content.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1
    });
    this.setState({ ...this.state, notes: updatedNotes });
  }

  newestSort = () => {
    const { notes } = this.state;
    notes.sort((a, b) => {
      return new Date(b.lastModified) - new Date(a.lastModified);
    })
    this.setState({ notes })
  }

  oldestSort = () => {
    const { notes } = this.state;
    notes.sort((a, b) => {
      return new Date(a.lastModified) - new Date(b.lastModified);
    })
    this.setState({ notes })
  }

  monthFilter = () => {
    this.state.notes.map(note => {
      console.log(new Date(note.lastModified).getMonth()+1)
      return note;
    })
    
  }

  render() {
    return (
      <div>
        <Header
          value={this.state.searchString}
          onChangeSearchHandler={this.onChangeSearchHandler}
          cancelSearchHandler={this.cancelSearchHandler}
          searchHandler={this.searchHandler}
        />

        <CreatNote
          editModeHandler={this.editModeHandler}
          addNoteHandler={this.addNoteHandler}
          titleChangeHandler={this.titleChangeHandler}
          ContentChangeHandler={this.ContentChangeHandler}
          title={this.state.note.title}
          content={this.state.note.content}
          newestSort={this.newestSort}
          oldestSort={this.oldestSort}
          weekFilter={''}
          monthFilter={this.monthFilter}
          yearFilter={''}
        />
        {
          this.state.notes.map((note, i) => {
            return <Note
              key={i}
              id={i}
              title={note.title}
              content={note.content}
              lastModified={new Date(note.lastModified).toLocaleDateString("en", { hour: "2-digit", minute: "2-digit" })}
              editHandler={this.editHandler}
              deleteHandler={this.deleteHandler} />
          })
        }
      </div>
    );
  }
}

export default App;
