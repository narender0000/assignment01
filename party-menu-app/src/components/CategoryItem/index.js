import './index.css'

const CategoryItem = props => {
  const {details, isSelected, onChangeSelectedCategory} = props
  const {categoryId, count} = details

  const selected = isSelected && 'selected'

  const onClickCategory = () => {
    onChangeSelectedCategory(categoryId)
  }

  return (
    <li>
      <button
        className={`category-btn ${selected}`}
        onClick={onClickCategory}
      >{`${categoryId} ${count}`}</button>
    </li>
  )
}

export default CategoryItem
