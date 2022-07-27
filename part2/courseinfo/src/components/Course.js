const Header = ({ course }) => <h2>{course}</h2>

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

export default Course