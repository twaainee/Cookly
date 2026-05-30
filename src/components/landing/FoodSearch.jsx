const categories = [
  'Pizza',
  'Burger',
  'Noodles',
  'Sub-sandwich',
  'Chowmein',
  'Steak',
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
            <article className="category-card" key={category}>
              <div className="category-image placeholder-image">
                <span>{category}</span>
              </div>
              <h3>{category}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoodSearch
