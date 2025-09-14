import {Component} from 'react'
import CategoryItem from '../CategoryItem'
import DishCard from '../DishCard'
import Modal from './Modal'
import dishes from './data/mockDishes'

import './index.css'

const categories = [
  {categoryId: 'Starters', count: 0},
  {categoryId: 'Slides', count: 0},
  {categoryId: 'Main Course', count: 0},
  {categoryId: 'Dessert', count: 0},
]

class Home extends Component {
  state = {
    selectedCategory: 'Main Course',
    searchTerm: '',
    vegOnly: '',
    selectedDiishes: [],
    isModalOpen: false,
    activeDishId: '',
    filtereddishes: [],
    dishes: dishes,
    categorieslist: categories,
    addedDishesList: [],
  }

  onToggleDishes = id => {
    const {addedDishesList, dishes} = this.state
    const [dishObj] = dishes.filter(each => each.id === activeDishId)
    const contains = addedDishesList.includes(id)
    if (contains) {
      this.setState(prevState => ({
        addedDishesList: [...prevState.addedDishesList, id],
        categorieslist: prevState.categorieslist.map(each =>
          each.categoryId === dishObj.mealType
            ? {categoryId: each.categoryId, count: each.count - 1}
            : each,
        ),
      }))
    } else {
      this.setState(prevState => ({
        addedDishesList: prevState.addedDishesList.filter(each => each !== id),
        categorieslist: prevState.categorieslist.map(each =>
          each.categoryId === dishObj.mealType
            ? {categoryId: each.categoryId, count: each.count + 1}
            : each,
        ),
      }))
    }
  }

  onToggleModalVisibility = id => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      activeDishId: id,
    }))
  }

  filterDishes = () => {
    const {selectedCategory, dishes, searchTerm, vegOnly} = this.state
    const filtereddishes = dishes.filter(
      each =>
        each.mealType === selectedCategory &&
        each.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        vegOnly &&
        each.type === 'VEG',
    )
    this.setState({filtereddishes})
  }
  componentDidMount() {
    this.filterDishes()
  }
  onChangeSearchTerm = event => {
    this.setState({searchTerm: event.target.value}, this.filterDishes())
  }
  onChangeSelectedCategory = categoryId => {
    this.setState({selectedCategory: categoryId}, this.filterDishes())
  }

  onClickToggleVegOnly = () => {
    this.setState(
      prevState => ({vegOnly: !prevState.vegOnly}),
      this.filterDishes(),
    )
  }

  reder() {
    const {
      searchTerm,
      selectedCategory,
      categories,
      vegOnly,
      filtereddishes,
      addedDishesList,
      activeDishId,
      isModalOpen,
      dishes,
    } = this.state

    const totalCount = categories.reduce((total, each) => total + each.count)
    const filterCategory = categories.map(
      each => each.categoryId === selectedCategory,
    )
    const [selectedCategoryObj] = filterCategory
    const count = selectedCategoryObj.count

    const [dishObj] = dishes.filter(each => each.id === activeDishId)
    return (
      <div className="app-container">
        <div className="search-container">
          <input
            type="search"
            value={searchTerm}
            onChange={this.onChangeSearchTerm}
            placeholder={searchTerm}
          />
        </div>
        <ul className="category-container">
          {categorieslist.map(each => (
            <CategoryItem
              Key={each.categoryId}
              details={each}
              isSelected={each.categoryId === selectedCategory}
              onChangeSelectedCategory={this.onChangeSelectedCategory}
            />
          ))}
        </ul>
        <div className="checkbox-container">
          <p> {`${selectedCategory} Selected (${count})`}</p>
          <button
            className={`vegonly-btn ${vegOnly && 'selected'}`}
            onClick={this.onClickToggleVegOnly}
          >
            VEG ONLY
          </button>
        </div>
        <ul className="filtered-dishes-list">
          {filtereddishes.map(each => (
            <DishCard
              Key={each.id}
              details={each}
              onToggleModalVisibility={this.onToggleModalVisibility}
              onToggleDishes={this.onToggleDishes}
              added={addedDishesList.includes(each.id)}
            />
          ))}
        </ul>
        <div className="slected-summary-container">
          <p>{`Total Dishes Selected ${totalCount}`}</p>
          <button>continue</button>
        </div>
        {isModalOpen && (
          <Modal
            details={dishObj}
            onToggleModalVisibility={this.onToggleModalVisibility}
            added={addedDishesList.includes(dishObj.id)}
            onToggleDishes={this.onToggleDishes}
          />
        )}
        /* i am gng to use position relative for modal*/
      </div>
    )
  }
}
export default Home
