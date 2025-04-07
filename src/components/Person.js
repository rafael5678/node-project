import './Person.css';

function Person({ person, onClick }) {
  return (
    <div className="person-card">
      <img src={person.picture.medium} alt={`${person.name.first}`} />
      <h3>{person.name.first} {person.name.last}</h3>
      <p>{person.location.country}</p>
      <button className="ver-ficha-btn" onClick={onClick}>
        Ver ficha personal
      </button>
    </div>
  );
}

export default Person;
