import { useState } from 'react'

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
  const [n_good, setGood] = useState(0);
  const [n_neutral, setNeutral] = useState(0);
  const [n_bad, setBad] = useState(0);
  const [n_all, setAll] = useState(0);
  const [n_average, setAverage] = useState(0);
  const [n_positive, setPositive] = useState(0);
  const [selected, setSelected] = useState(0)

  const addGoodHandle = () => {
    setGood(n => n + 1)
    const new_n_good = n_good + 1;
    const new_all = n_bad + n_neutral + new_n_good
    setAll(n => new_all);
    setPositive(n => (new_n_good / new_all) * 100)
    setAverage(n => (new_n_good - n_bad) / new_all)
  }
  const addNeutralHandle = () => {
    setNeutral(n => n + 1)
    const new_n_netural = n_neutral + 1;
    const new_all = n_bad + new_n_netural + n_good
    setAll(n => n_bad + new_n_netural + n_good)
    setPositive(n => (n_good / new_all) * 100)
    setAverage(n => (n_good - n_bad) / new_all)
  }
  const addBadHandle = () => {
    setBad(n => n + 1)
    const new_n_bad = n_bad + 1;
    const new_all = new_n_bad + n_neutral + n_good
    setAll(n => new_n_bad + n_neutral + n_good)
    setPositive(n => (n_good / new_all) * 100)
    setAverage(n => (n_good - new_n_bad) / new_all)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button texts="Good" handle={addGoodHandle} />
      <Button texts="Neutral" handle={addNeutralHandle} />
      <Button texts="Bad" handle={addBadHandle} />
      <h1>statistics</h1>
      <Statistics n_good={n_good} n_neutral={n_neutral} n_bad={n_bad} n_all={n_all} n_average={n_average} n_positive={n_positive} />
    </div >
  );
}

const Button = (props) => {
  return (
    <button onClick={props.handle}>
      {props.texts}
    </button>
  )
}

const StatisticLine = ({text, number}) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{number} </td>
    </tr>
  )
}

const Statistics = ({ n_good, n_neutral, n_bad, n_all, n_average, n_positive }) => {
  if (n_all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text={'Good '} number={n_good} />
            <StatisticLine text={'Neutral '} number={n_neutral} />
            <StatisticLine text={'Bad '} number={n_bad} />
            <StatisticLine text={'All '} number={n_all} />
            <StatisticLine text={'Average '} number={n_average} />
            <StatisticLine text={'Positive '} number={n_positive} />
          </tbody>
        </table>
      </div>

    )
  }
}
export default App