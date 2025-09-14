import {Link} from 'react-router-dom'
import './index.css'

const Modal = props => {
  const {details, onToggleModalVisibility, added} = props
  const onClickToggleModalVisibility = () => {
    onToggleModalVisibility()
  }
  const {name, description, image, id} = details
  const onClickToggleDishes = () => {
    onToggleDishes(id)
  }
  return (
    <div className="modal-container">
      <button onClick={onClickToggleModalVisibility}>close</button>
      <img src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        <button onClick={onClickToggleDishes}>
          {added ? 'Remove' : 'Add'}
        </button>
      </div>
      <p>{description}</p>

      <Link to={`/dish/${id}`}>
        <button>ingredient</button>
      </Link>
    </div>
  )
}

export default Modal
