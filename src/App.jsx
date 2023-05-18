import { Component } from 'react';
import './App.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ReactLogo from './ReactLogo/ReactLogo';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Fermions Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const isNameInContacts = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (isNameInContacts) {
      const { name } = isNameInContacts;
      alert(` ${name} is already in contacts!`);
    } else {
      this.setState(prev => ({
        contacts: [...prev.contacts, newContact],
      }));
    }
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = (contacts, filter) => {
    if (filter) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return contacts;
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <>
        <ReactLogo />
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} value={filter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
