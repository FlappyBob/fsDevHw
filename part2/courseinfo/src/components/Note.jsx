const Courses = ({ courses }) => {
    return (
        <div>
            {courses.map(course => (<Course course={course} />))}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {

    return (
        <>
            {parts.map(part => <Part content={part} />)}
            <Sum parts={parts} />
        </>
    )
}

const Part = ({ content }) => {
    return (
        <div> {content.name} {content.exercises} </div>
    )
}

const Sum = ({ parts }) => {
    const sum = parts.reduce((sum, arr) => {
        return sum + arr.exercises
    }, 0)
    return (
        <b>total of {sum} exercises</b>
    )
}

export default Courses