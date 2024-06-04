import { useState } from 'react'

const Boton = ({action,text}) => <button onClick={action}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const [selected, setSelected] = useState(0)

  const buttonSelect = () => {
    setSelected((Math.floor(Math.random() * anecdotes.length)))
  }
  
  const vote = () => {
    const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
  }

  if (votes[selected] > votes[mostVotes])
    {
      setMostVotes(selected)
    }

  return (
    <div>
      {anecdotes[selected]} <br />
      {votes[selected]} <br />
      <Boton action={buttonSelect} text="Next ancedote" />
      <Boton action={vote} text="Vote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]} <br />
      {votes[mostVotes]}
    </div>
  )
}

export default App