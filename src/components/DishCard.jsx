// src/components/DishCard.jsx
import React, { useState, useEffect } from 'react';
import Portion from './portion';
import { useCart } from '../context/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';

const DishCard = ({ dish, onOpenModal, mode }) => {
  const { addToCart, increaseCount, decreaseCount, getCartItemCount } = useCart();
  const [selectedPortion, setSelectedPortion] = useState(null);

  useEffect(() => {
    if (dish?.portion_options && dish.portion_options.length > 0) {
      setSelectedPortion(dish.portion_options[0]); // Default to first portion
    }
  }, [dish]);

  const itemCountInCart = selectedPortion
    ? getCartItemCount(dish.id, selectedPortion.id)
    : 0;

  if (!dish || !selectedPortion) return null;

  const handleAddToCart = () => {
    if (selectedPortion) {
      addToCart(dish.id, selectedPortion.id);
    } else {
      toast.error('Выберите порцию для добавления в корзину.');
    }
  };

  const handleIncreaseCount = () => {
    if (selectedPortion) {
      increaseCount(dish.id, selectedPortion.id);
    }
  };

  const handleDecreaseCount = () => {
    if (selectedPortion) {
      decreaseCount(dish.id, selectedPortion.id);
    }
  };

  return (
    <div
      className="dish-card w-[370px] bg-white text-black flex flex-col" // Added dish-card class
    >
      <div className="dish-card-image-wrapper h-48"> {/* Added image wrapper and fixed height */}
        <img
          src={selectedPortion.image || dish.image}
          alt={dish.name}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
          onClick={() => onOpenModal(dish)}
        />
        <div className="dish-card-image-shine"></div> {/* Shine effect */}
      </div>

      <div className="p-6 flex flex-col flex-grow"> {/* Increased padding */}
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#BD1619] transition-colors"> {/* Larger font */}
          {dish.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">
          {dish.description || "Описание отсутствует"}
        </p>

        {/* Portion selection moved up */}
        <div className="mb-4"> {/* Added margin bottom for spacing */}
            <Portion
                portions={dish.portion_options}
                activePortionId={selectedPortion.id}
                onSelectPortion={setSelectedPortion}
            />
        </div>


        <div className="flex justify-between items-center mt-auto">
          <span className="text-[#BD1619] text-xl font-bold">
            {selectedPortion.price || "???"} сом
          </span>

          {mode === "delivery" && (
            <div className="flex items-center gap-2">
              {itemCountInCart === 0 ? (
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  <ShoppingCartIcon sx={{ fontSize: 18 }} />
                  <span>Добавить</span>
                </button>
              ) : (
                <div className="flex items-center bg-[#BD1619] text-white rounded-lg shadow-md overflow-hidden">
                  <button
                    className="px-2 py-1 hover:bg-[#a20f14] transition-colors"
                    onClick={handleDecreaseCount}
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </button>
                  <span className="px-3 font-semibold text-sm">
                    {itemCountInCart}
                  </span>
                  <button
                    className="px-2 py-1 hover:bg-[#a20f14] transition-colors"
                    onClick={handleIncreaseCount}
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;