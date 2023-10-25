const Person = ({ person, deleteHandle }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deleteHandle}>delete</button>
    </li>
  )
}

const Notification = ({type, message}) => {
  if (message == '') return null
  if (type === 0) {
    return (
      <div className="errorMessage">
        {message}
      </div>
    )
  }
  return (
    <div className="successMessage">
      {message}
    </div>
  )
}
export default {Person, Notification }