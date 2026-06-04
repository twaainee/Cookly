const categories = [
  { name: 'Pizza', tone: 'tomato' },
  { name: 'Burger', tone: 'charcoal' },
  { name: 'Noodles', tone: 'cream' },
  { name: 'Sub-sandwich', tone: 'green' },
  { name: 'Chowmein', tone: 'sage' },
  { name: 'Steak', tone: 'grill' },
]

function FoodSearch() {
  return (
    <section className="food-section" aria-labelledby="food-search-title">
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="food-search-title">Search by Food</h2>
          <div className="section-actions">
            <a href="/" className="view-all">
              View All
            </a>
            <button type="button" className="round-button" aria-label="Previous category">
              &lt;
            </button>
            <button type="button" className="round-button" aria-label="Next category">
              &gt;
            </button>
          </div>
        </div>

        <div className="category-row">
          {categories.map((category) => (
            <article className="category-card" key={category.name}>
              <div className={`category-image category-image--${category.tone}`} aria-label={`${category.name} image placeholder`}>
                <span>Image</span>
              </div>
              <h3>{category.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoodSearch
