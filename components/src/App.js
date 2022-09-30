import './App.css';
import {useState} from 'react';

function FilterProductTable({products}){
  const[filterText,setFilterText] = useState('');
  const[showOnlyAvailable,setShowOnlyAvailable] = useState(false);
  return(
    <div>
      <SearchBar
      filterText={filterText}
      showOnlyAvailable={showOnlyAvailable}
      onFilterTextChange={setFilterText}
      onShowOnlyAvailableChange={setShowOnlyAvailable}/>
      <ProductTable
        products={products}
        filterText={filterText}
        showOnlyAvailable={showOnlyAvailable}
      />
    </div>
  );
}


function SearchBar({filterText,showOnlyAvailable,onFilterTextChange, onShowOnlyAvailableChange}){
  return(
    <div className="search-bar">
      <form>
        <input
          type='text'
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          placeholder='Search...'/>
        <br/>
        <br/>
        <input type='submit' value='Search' />
      </form>
      <br/>
      <form>
        <input
          type="checkbox"
          id='instock'
          onChange={(e) => onShowOnlyAvailableChange(e.target.checked)}
          value={showOnlyAvailable} />
        <label htmlFor='instock'>Only show products in stock</label>
      </form>
    </div>
  );
}

function ProductTable({products, filterText, showOnlyAvailable}){
  const rows = [];
  let category = null;

  products.forEach((product) => {
    if(product.category !== category){
      category = product.category;
      rows.push(
        <ProductCategoryRow category={category} key={category}/>
      );
    }
    if(product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
      return;
    }
    if(showOnlyAvailable && !product.stocked){
      return;
    }
    rows.push(
      <ProductRow product={product} key={product.name}/>
    );
  });
  return(
    <table className='product-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function ProductCategoryRow({category}){
  return(
  <tr className='header-row'>
    <td colSpan='2'>
      {category}
    </td>
  </tr>
  );
}

function ProductRow({product}){
  const stocked = product.stocked;
  return(
    <tr>
      {(stocked)
      ? <td>{product.name}</td>
      : <td><span className='unavailable'>{product.name}</span></td>
        }
      <td>{product.price}</td>
    </tr>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

export default function App(){
  return(
    <div className="filter-product-table">
      <FilterProductTable products={PRODUCTS}/>
    </div>
  );
};
