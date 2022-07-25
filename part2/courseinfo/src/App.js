const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ part }) =>
  <>
    <Part
      part={part}
    />
  </>

const Course = ({ course }) => {
  const total = course.parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exercises,
    0
  )
  

  return (
    <div>
      <Header course={course.name} />

      <>{course.parts.map(part =>
        <Content key={part.id} part={part} />
      )}
      </>

      <Total sum = {total}/>


    </div>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App