import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [searchTerms, setSearchTerms] = useState('')
  const [notificationAdd, setNotificationAdd] = useState(null);
  const [notificationDelete, setNotificationDelete] = useState(null);

useState(() => {
  personsService.getAll()
    .then(response => {
      setPersons(response.data)
    })
}, [])

const deletePersons = (id) => {
  const personToDelete = persons.find(person => person.id === id);
  if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
    personsService.remove(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
      })
      .catch(error => {
        console.error('Error deleting the person:', error);
      });
      setNotificationDelete(`Information of ${personToDelete.name} has already been remove from server`);
      setTimeout(() => {
        setNotificationDelete(null);
      }, 5000);
  }
}


const addPerson = (event) =>{
  event.preventDefault();
  const personIndex = persons.findIndex(person => person.name === newName);
  if (personIndex !== -1) {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new number?`)){
      const personToUpdate = {
        ...persons[personIndex],
        number: newNumber
      };
      personsService.update(personToUpdate.id, personToUpdate)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson.data));
        setNewName('');
        setNewNumber('');
      })
    }
  } else {
    const newPerson = {
      name: newName,
      number: newNumber
    };
    personsService.create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson.data));
      setNewName('');
      setNewNumber('');
      setNotificationAdd(`Added ${newName}`);
      setTimeout(() => {
        setNotificationAdd(null);
      }, 5000);
    })
    .catch(error => {
      setNotificationDelete(`Person validation failed: ${error.response.data.error}`);
      setTimeout(() => {
        setNotificationDelete(null);
      }, 5000);
      console.log(error.response.data.error)
    })
  }
}


const handleNameChange = (event) => {
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}
const handleSearchChange = (event) => {
  setSearchTerms(event.target.value)
}
const filteredPerson = persons.filter(person =>
  person.name.toLowerCase().includes(searchTerms.toLowerCase())
)

  return (
    <div>
      <h2>Phonebook</h2>
        {notificationAdd && <div className='notificationAdd' >{notificationAdd}</div>}
        {notificationDelete && <div className='notificationDelete'>{notificationDelete}</div>}
        <Filter action={handleSearchChange} />
      <h3>Add a new</h3>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} numberChange={handleNumberChange} nameChange={handleNameChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPerson} deletePerson={deletePersons} />
    </div>
  )
}


export default App