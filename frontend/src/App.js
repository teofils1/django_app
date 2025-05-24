import React, { useState, useEffect } from 'react';
import { itemService } from './services/itemService';
import ItemCard from './components/items/ItemCard/ItemCard';
import Button from './components/common/Button/Button';
import Loading from './components/common/Loading/Loading';
import { MESSAGES } from './utils/constants';
import { validateItemForm } from './utils/validators';
import './App.css';
import './styles/globals.css';
import './styles/components.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await itemService.getAll();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(MESSAGES.ERROR_FETCH);
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateItemForm(newItem);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
    
    try {
      await itemService.create(newItem);
      setNewItem({ name: '', description: '', price: '' });
      setFormErrors({});
      fetchItems(); // Refresh the list
    } catch (err) {
      setError(MESSAGES.ERROR_CREATE);
      console.error('Error creating item:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(MESSAGES.CONFIRM_DELETE)) {
      try {
        await itemService.delete(id);
        fetchItems(); // Refresh the list
      } catch (err) {
        setError(MESSAGES.ERROR_DELETE);
        console.error('Error deleting item:', err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  if (loading) return <Loading message={MESSAGES.LOADING} />;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Item Manager</h1>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <div className="container">
          <div className="form-section">
            <div className="card">
              <div className="card-header">
                <h2>Add New Item</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="item-form">
                  <div className="form-group">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter item name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                      placeholder="Enter item description"
                      value={newItem.description}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    />
                    {formErrors.description && <span className="form-error">{formErrors.description}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                      placeholder="Enter price"
                      value={newItem.price}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.price && <span className="form-error">{formErrors.price}</span>}
                  </div>
                  
                  <Button type="submit" variant="primary" size="medium">
                    Add Item
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="items-section">
            <h2>Items ({items.length})</h2>
            {items.length === 0 ? (
              <div className="alert alert-info">
                {MESSAGES.NO_ITEMS}
              </div>
            ) : (
              <div className="grid grid-cols-3">
                {items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
