import './FichaPersonal.css';

function FichaPersonal({ person, onClose }) {
  if (!person) return null;

  return (
    <div className="ficha-overlay">
      <div className="ficha-modal">
        <h2>Ficha Personal</h2>
        <p><strong>Nombre:</strong> {person.name.first} {person.name.last}</p>
        <p><strong>Edad:</strong> {person.dob.age}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default FichaPersonal;
