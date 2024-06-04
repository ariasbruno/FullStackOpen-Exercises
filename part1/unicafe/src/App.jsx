import { useState } from 'react'
const Boton = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text,value}) =>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = total ? (good / total) * 100 : 0;

  if (total === 0) {
    return(
    <tr>
      <td colSpan="2">No feedback given</td>
    </tr>
    )
  } else {
    return (
      <>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive + '%'} />
      </>
    )
  }
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Boton handleClick={handleGoodClick} text={"good"} />
      <Boton handleClick={handleNeutralClick} text={"neutral"} />
      <Boton handleClick={handleBadClick} text={"bad"} /> <br />
      <strong>statistics</strong><br />
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad}/>
        </tbody>
      </table>
    </div>
  )
}

export default App