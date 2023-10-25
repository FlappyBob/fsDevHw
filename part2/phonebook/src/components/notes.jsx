const Person = ({ person, deleteHandle}) => {
    return (
      <div>
        {person.name} {person.number}
        <button onClick={deleteHandle}>delete</button>
      </div>
    )
 }

export default {Person}