import {Link} from 'react-router-dom'
import './index.css'

const DisCard = props => {
  const {details, onToggleModalVisibility, onToggleDishes, added} = props

  const {name, description, image, id} = details

  const onClickToggleModalVisibility = () => {
    onToggleModalVisibility(id)
  }
  const onClickToggleDishes = () => {
    onToggleDishes(id)
  }

  return (
    <li onClick={onClickToggleModalVisibility}>
      <div className="content-container">
        <h1>{name}</h1>
        <p>{description}</p>
        <Link to={`/dish/${id}`}>
          <button>ingredient</button>
        </Link>
      </div>
      <div className="bgimg-container">
        <img src={image} alt={name} />
        <button onClick={onClickToggleDishes}>
          {added ? 'Remove' : 'Add'}
        </button>
      </div>
    </li>
  )
}

export default DisCard
