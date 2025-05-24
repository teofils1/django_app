// Item Card component
import React from 'react';
import Button from '../../common/Button/Button';
import { formatPrice, formatDate } from '../../../utils/helpers';
import './ItemCard.css';

const ItemCard = ({ item, onEdit, onDelete, onView }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  return (
    <div className="item-card">
      <div className="item-card-header">
        <h3 className="item-card-title">{item.name}</h3>
        <span className="item-card-price">{formatPrice(item.price)}</span>
      </div>
      
      <div className="item-card-body">
        <p className="item-card-description">{item.description}</p>
        <p className="item-card-date">
          Created: {formatDate(item.created_at)}
        </p>
      </div>
      
      <div className="item-card-footer">
        <div className="item-card-actions">
          {onView && (
            <Button 
              variant="outline" 
              size="small" 
              onClick={() => onView(item)}
            >
              View
            </Button>
          )}
          {onEdit && (
            <Button 
              variant="secondary" 
              size="small" 
              onClick={() => onEdit(item)}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="danger" 
              size="small" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
