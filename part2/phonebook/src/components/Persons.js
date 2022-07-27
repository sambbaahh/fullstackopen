import Person from "./Person"

const Persons = ({ contactsToShow, }) => {
    return (
        contactsToShow.map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
        )
    )
}

export default Persons