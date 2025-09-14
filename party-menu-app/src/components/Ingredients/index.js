import dishes from './data/mockDishes'
import './index.css'

const Ingredients = props => {
  const {match, history} = props
  const onClickGoBack = () => {
    history.replace('/')
  }
  const {params} = match
  const {id} = params
  const [dishObj] = dishes.filter(each => each.id === id)
  const {name, description, image, id,ingredients} = dishObj
  return (
    <div className="ingredients-container">
      <button onClick={onClickGoBack}>{`< Ingredients List`}</button>
        <div className="content-container">
        <h1>{name}</h1>
        <p>{description}</p>
          <button>ingredient</button>
      </div>
      <div className="bgimg-container">
        <img src={image} alt={name} />
      </div>
      {ingredients.map(each => (
        <p>{each.name} {each.quantity}</p>
      ))}
    </div>
  )
}

export default Ingredients
