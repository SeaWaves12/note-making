import React, { Component } from 'react';

import Header from './components/Header/Header';
import CreatNote from './components/CreateNote/CreateNote';
import Note from './components/Note/Note';
import FilterDropdown from './components/FilterDropdown/FilterDropdown';
import SortDropdown from './components/SortDropdown/SortDropdown';
import classes from './App.module.css'

class App extends Component {

  // To check week filtering notes: [{
  //   title: "ppp",
  //   content: 'ppp',
  //   lastModified: new Date().getTime() - (20 * 24 * 60 * 60 * 1000),
  //   }]

  state = {
    notes: [],
    note: {
      title: "Untitled...",
      content: '',
      lastModified: '',
    },
    searchString: ''
  };

  addNoteHandler = (e) => {
    e.preventDefault();
    this.oldestSort();
    let updatednotes = this.state.notes
    const { note } = this.state;
    note.lastModified = Date.now();
    updatednotes.push(note)
    this.setState({ ...this.state, notes: updatednotes })
    this.setState({ ...this.state, note: { ...this.state.note, title: 'Untitled...', content: '' } })
  }

  deleteHandler = (id) => {
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
      this.deleteHandler(id);
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
  cancelSearchHandler = (prevState) => {
    this.setState({ ...this.State, searchString: "" })
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

  filterHanlder = (v) => {
    if (!isNaN(Number(v))) {
      const newNotes = this.state.notes.filter(note => {
        return new Date(note.lastModified).getMonth() + 1 === Number(v) ||
          new Date(note.lastModified).getYear() + 1900 === Number(v)
      })
      this.setState({ ...this.state, notes: newNotes });
    }
    else {
      //var now = new Date();
      let yesterday = new Date(new Date().getTime() - (0));
      let last7Days = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
      const newNotes = this.state.notes.filter(note => new Date(note.lastModified) <= yesterday && new Date(note.lastModified) >= last7Days)
      this.setState({ ...this.state, notes: newNotes });
    }
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

        <div className={classes.Filter}>
          <SortDropdown className={classes.Sort}
            newestSort={this.newestSort}
            oldestSort={this.oldestSort}
          />
          <FilterDropdown
            weekFilter={''}
            monthFilter={this.monthFilter}
            yearFilter={''}
            filterHanlder={this.filterHanlder}
          />
        </div>
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