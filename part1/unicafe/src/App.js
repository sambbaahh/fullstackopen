import { useState } from 'react'

const Header = ({ text }) => <h1> {text} </h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const StatisticLine = ({ text, value, unit}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} {unit}</td>
      </tr>
    </tbody>
  )
}


const Statistic = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  let average = ((good - bad) / (total))
  let positive = (((good / (total)) * 100))
  average.toFixed(2)
  positive.toFixed(2)

  if (total == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} unit = '%' />
    </table>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const textGood = 'good'
  const textNeutral = 'neutral'
  const textBad = 'bad'


  return (
    <div>
      <Header text='give feedback' />

      <Button handleClick={increaseGood} text={textGood} />
      <Button handleClick={increaseNeutral} text={textNeutral} />
      <Button handleClick={increaseBad} text={textBad} />

      <Header text='statistics' />
      <Statistic good={good} neutral={neutral} bad={bad} />



    </div>
  )
}

export default App
