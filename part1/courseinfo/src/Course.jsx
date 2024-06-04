const Course = ({course}) => {
    return (
        <div>
        <h2>
            {course.name}
        </h2>
        <>
            {course.parts.map(part => 
            <p key={part.id}>
            {part.name} {part.exercises}
            </p>
        )}
        </>
        <strong><p>
            Total of  {course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises
        </p></strong>
        </div>
    )
}


export default Course