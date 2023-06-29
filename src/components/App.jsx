import { Component } from 'react';

export class App extends Component {
  state = {};

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    this.setState({
      contacts: parsedContacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div
        style={{
          // height: '100vh',
          // display: 'flex',
          // justifyContent: 'center',
          // flexDirection: 'column',
          // alignItems: 'flex-start',
          // padding: 20,
          // fontSize: 30,
          // color: '#010101',

          display: 'grid',
          gridTemplateColumns: 1,
          gridGap: 16,
          paddingBottom: 24,
        }}
      ></div>
    );
  }
}
