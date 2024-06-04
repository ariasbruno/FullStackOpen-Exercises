const PersonForm = (props) => {
    return(
        <form onSubmit={props.addPerson}>
            <div>name: <input type='text' value={props.newName} onChange={props.nameChange} required/></div>
            <div>number: <input type='text' value={props.newNumber} onChange={props.numberChange} required/></div>
            <div><button type='submit'>add</button></div>
        </form>
    )
}

export default PersonForm