// src/pages/restaurant.jsx
import React, { useEffect, useState } from "react";
import {
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';

import CanvaRest from "../components/canvatwo";
import Portion from "../components/portion";
import DishCard from "../components/DishCard";
import logo from "../assets/Logo Good.png";
import "../pages/rest.css";
import { useCart } from "../context/CartContext";

// Анимация для открытия модального окна
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const API_DISHES_URL = "https://bahtiyor.learn-it-academy.site/api/menu/";
const API_CATEGORIES_URL = "https://bahtiyor.learn-it-academy.site/api/categories/";


const Restaurant = () => {
  // States
  const [open, setOpen] = useState(false); // Modal window state
  const [dishes, setDishes] = useState([]); // All dishes
  const [selectedDish, setSelectedDish] = useState(null); // The currently selected dish for the modal
  const [selectedPortionInModal, setSelectedPortionInModal] = useState(null); // Selected portion within the modal
  const [categories, setCategories] = useState([]); // Categories
  const [selectedCategory, setSelectedCategory] = useState(null); // Currently selected category filter
  const [mode, setMode] = useState("dine-in"); // dine-in or delivery mode

  const { addToCart, increaseCount, decreaseCount, getCartItemCount } = useCart();

  // Function to open modal and set selected dish/portion
  const handleOpenModal = (dish) => {
    setSelectedDish(dish);
    if (dish?.portion_options && dish.portion_options.length > 0) {
      setSelectedPortionInModal(dish.portion_options[0]); // Default to first portion
    } else {
      setSelectedPortionInModal(null);
    }
    setOpen(true);
  };

  // Fetch categories
  async function getCategories() {
    try {
      const response = await axios.get(API_CATEGORIES_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
    }
  }

  // Fetch dishes (with optional category filter)
  async function getDishes(categoryId = "") {
    try {
      const url = categoryId ? `${API_DISHES_URL}?category=${categoryId}` : API_DISHES_URL;
      const response = await axios.get(url);
      setDishes(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  // Initial data fetch on component mount
  useEffect(() => {
    getCategories();
    getDishes(); // Load all dishes initially
  }, []);

  // Close modal window
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedDish(null);
    setSelectedPortionInModal(null);
  };

  const itemCountInModalCart = selectedDish && selectedPortionInModal
    ? getCartItemCount(selectedDish.id, selectedPortionInModal.id)
    : 0;

  const handleAddToCartModal = () => {
    if (selectedDish && selectedPortionInModal) {
      addToCart(selectedDish.id, selectedPortionInModal.id);
    } else {
      toast.error('Выберите порцию для добавления в корзину.');
    }
  };

  const handleIncreaseCountModal = () => {
    if (selectedDish && selectedPortionInModal) {
      increaseCount(selectedDish.id, selectedPortionInModal.id);
    }
  };

  const handleDecreaseCountModal = () => {
    if (selectedDish && selectedPortionInModal) {
      decreaseCount(selectedDish.id, selectedPortionInModal.id);
    }
  };


  return (
    <div
      className="w-[100%] bg-white flex flex-col justify-center items-center"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      {/* Canva at the top */}
      <CanvaRest Scroll="#menuScrol"/>

      {/* Delivery/Dine-in modes */}
      <div className="w-[100%] flex flex-wrap justify-center items-center gap-[10px] pt-[30px]">
        <p
          className={`delivery-button cursor-pointer ${
            mode === "dine-in" ? "active" : ""
          }`}
          onClick={() => setMode("dine-in")}
        >
          В заведении
        </p>
        <p
          className={`delivery-button cursor-pointer ${
            mode === "delivery" ? "active" : ""
          }`}
          onClick={() => setMode("delivery")}
        >
          Доставка
        </p>
      </div>

      {/* Category filters */}
      <div className="w-[50%] flex flex-wrap justify-center items-center gap-[10px] pt-[30px]">
        {/* "All" button */}
        <p
          key="all"
          className={`filter-button cursor-pointer ${selectedCategory === null ? 'active-filter' : ''}`}
          onClick={() => {
            setSelectedCategory(null);
            getDishes();
          }}
        >
          Все
        </p>

        {/* Categories from array */}
        {categories.map((elem) => (
          <p
            key={elem.id}
            className={`filter-button cursor-pointer ${selectedCategory === elem.id ? 'active-filter' : ''}`}
            onClick={() => {
              setSelectedCategory(elem.id);
              getDishes(elem.id);
            }}
          >
            {elem.name}
          </p>
        ))}
      </div>

      {/* List of dish cards */}
      <div id="menuScrol" className="w-[80%] m-auto flex flex-wrap justify-center items-stretch gap-6 pt-[100px] pb-[100px] px-4">
        {dishes.map((element) => (
          <DishCard
            key={element.id}
            dish={element}
            onOpenModal={handleOpenModal}
            mode={mode}
          />
        ))}
      </div>

      {/* Dish Modal Window */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            color: "#fff",
            borderRadius: 3,
            textAlign: "center",
            px: 3,
            py: 2,
            backgroundColor: "#ffffff", // Ensure white background for modal
            boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 40px rgba(189, 22, 25, 0.7)', // Glow for modal
            transition: 'box-shadow 0.3s ease-in-out',
          },
        }}
        aria-describedby="dish-dialog-description"
      >
        <button onClick={handleCloseModal} className="text-[#BD1619] text-end">
          <CloseIcon />
        </button>

        {/* If a dish is selected */}
        {selectedDish && selectedPortionInModal && (
          <>
            {/* Dish Photo */}
            <div className="dish-card-image-wrapper h-56 mx-auto w-full max-w-[450px] rounded-xl mb-4"> {/* Larger image in modal, added wrapper */}
                <img
                    src={selectedPortionInModal.image || selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="dish-card-image-shine"></div> {/* Shine effect in modal */}
            </div>


            {/* Name */}
            <DialogTitle
              sx={{ fontWeight: "bold", fontSize: '2.5rem', color: "#BD1619", textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }} // Larger font, text shadow
            >
              {selectedDish.name}
            </DialogTitle>

            {/* Portion + Price + Button section */}
            <DialogContent sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <div className="flex flex-col gap-4 items-center">
                    {/* Portion selection moved up in modal */}
                    <Portion
                        portions={selectedDish.portion_options}
                        activePortionId={selectedPortionInModal.id}
                        onSelectPortion={setSelectedPortionInModal}
                    />
                    <p className="text-black text-xl font-bold"> {/* Made price more prominent */}
                        Цена:{" "}
                        <span className="text-[#BD1619] font-extrabold">
                            {selectedPortionInModal.price || "???"} сомони
                        </span>
                    </p>
                </div>

                {/* Description */}
                <DialogContentText
                    id="dish-dialog-description"
                    sx={{
                        fontSize: 15,
                        color: "gray",
                        mt: 3, // Margin top for spacing
                        textAlign: "justify",
                        px: 2, // Added horizontal padding for text
                    }}
                >
                    {selectedDish.description || "Нет описания"}
                </DialogContentText>
            </DialogContent>


            <DialogActions
              sx={{
                justifyContent: "center", // Center the button
                px: 3,
                pt: 2,
              }}
            >
                {mode === "delivery" && (
                  <div className="flex items-center gap-2">
                    {itemCountInModalCart === 0 ? (
                      <button className="add-to-cart-button" onClick={handleAddToCartModal}>
                        <ShoppingCartIcon sx={{ fontSize: 18 }} />
                        <span>Добавить</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#BD1619] text-white rounded-lg shadow-md overflow-hidden">
                        <button
                          className="px-2 py-1 hover:bg-[#a20f14] transition-colors"
                          onClick={handleDecreaseCountModal}
                        >
                          <RemoveIcon sx={{ fontSize: 18 }} />
                        </button>
                        <span className="px-3 font-semibold text-sm">
                          {itemCountInModalCart}
                        </span>
                        <button
                          className="px-2 py-1 hover:bg-[#a20f14] transition-colors"
                          onClick={handleIncreaseCountModal}
                        >
                          <AddIcon sx={{ fontSize: 18 }} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Restaurant;