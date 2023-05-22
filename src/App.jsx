import { useEffect, useState } from 'react';
import './App.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ReactLogo from 'components/ReactLogo/ReactLogo';
import $localStorage from 'helpers/$localStorage';
import isHaveContact from 'helpers/isHaveContact';

const CONTACTS_STORAGE_KEY = 'phonebook-contacts';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const storageContacts = $localStorage.get(CONTACTS_STORAGE_KEY);

        if (storageContacts) setContacts(storageContacts);
    }, []);

    useEffect(() => {
        contacts.length && $localStorage.set(CONTACTS_STORAGE_KEY, contacts);
    }, [contacts]);

    const addContact = newContact => {
        if (isHaveContact(contacts, newContact)) {
            alert(` ${newContact.name} is already in contacts!`);
        } else {
            setContacts(prev => [...prev, newContact]);
        }
    };

    const handleFilterChange = ({ target: { value } }) => {
        setFilter(value);
    };

    const filterContacts = (contacts, filter) => {
        if (filter) {
            return contacts.filter(contact =>
                contact.name.toLowerCase().includes(filter.toLowerCase())
            );
        }
        return contacts;
    };

    const deleteContact = id => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const filteredContacts = filterContacts(contacts, filter);

    return (
        <>
            <ReactLogo />
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact} />

            <h2>Contacts</h2>
            <Filter onChange={handleFilterChange} value={filter} />
            <ContactList
                contacts={filteredContacts}
                deleteContact={deleteContact}
            />
        </>
    );
};

export default App;
