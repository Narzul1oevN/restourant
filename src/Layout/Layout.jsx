import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Pinterest as PinterestIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add'; // Import AddIcon
import RemoveIcon from '@mui/icons-material/Remove'; // Import RemoveIcon

import bgFooter from "../assets/9696-1.jpg";
import logo from "../assets/Logo Good.png";
import Slide from "@mui/material/Slide";
import Portion from "../components/portion"; // Keep Portion component
import dc from "../assets/dc_logo.svg";
import eskhata from "../assets/eskhata_logo.jpg";
import alif from "../assets/alif.png";
import { useCart } from "../context/CartContext"; // Import useCart hook
import toast from "react-hot-toast"; // убедись, что импорт есть


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const API_URL = "https://bahtiyor.learn-it-academy.site/api/menu/"; // Not directly used here anymore for individual item fetches

const Layout = () => {
  const {
    cartData,
    getTotalItems,
    increaseCount,
    decreaseCount,
    clearCart,
    getCartItemsDetails,
    getTotalPrice,
  } = useCart(); // Use cart context
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [detailedCartItems, setDetailedCartItems] = useState([]); // Array of detailed dishes for display
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);


  const handleCartOpen = async () => {
    setCartDialogOpen(true);
    const details = await getCartItemsDetails();
    setDetailedCartItems(details);
    const price = await getTotalPrice();
    setTotalCartPrice(price);
  };
  const handleCartClose = () => {
    setCartDialogOpen(false);
    setShowOrderForm(false); // Reset form state on close
  };

  // Update detailed cart items and total price whenever cartData changes
  useEffect(() => {
    if (cartDialogOpen) {
      const updateCartDetails = async () => {
        const details = await getCartItemsDetails();
        setDetailedCartItems(details);
        const price = await getTotalPrice();
        setTotalCartPrice(price);
      };
      updateCartDetails();
    }
  }, [cartData, cartDialogOpen, getCartItemsDetails, getTotalPrice]);


  const [rest, setRest] = useState([]);

  async function getResy() {
    try {
      const response = await axios.get(
        "https://bahtiyor.learn-it-academy.site/api/restaurants/"
      );
      setRest(response.data); // Здесь важно: .data
    } catch (error) {
      console.error("Ошибка при получении списка ресторанов:", error);
    }
  }

  const makeOrder = async () => {
  try {
    const customerName = document.querySelector('input[placeholder="Введите ваше имя"]').value;
    const customerPhone = document.querySelector('input[placeholder="+992 9XX XXX XXX"]').value;
    const customerAddress = document.querySelector('textarea[placeholder="Улица, дом, квартира..."]').value;
    const restaurantId = document.querySelector('.restaurant-selection').value;

    if (!customerName || !customerPhone || !customerAddress || !restaurantId) {
      toast.error("Пожалуйста, заполните все поля.");
      return;
    }

    const orderItems = detailedCartItems.map(item => ({
      portion_option: item.selectedPortion.id,
      quantity: item.count,
    }));

    if (orderItems.length === 0) {
      toast.error("Корзина пуста.");
      return;
    }

    const orderPayload = {
      restaurant: Number(restaurantId) || null,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      order_items: orderItems,
    };

    const loadingToast = toast.loading("Оформляем заказ...");

    const response = await axios.post(
      "https://bahtiyor.learn-it-academy.site/api/orders/",
      orderPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.dismiss(loadingToast);

    if (response.status === 201 || response.status === 200) {
      toast.success("Заказ успешно оформлен!");
    } else {
      toast.error("Ошибка при оформлении заказа.");
    }
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    toast.error("Произошла ошибка. Попробуйте позже.");
  }
};


  useEffect(() => {
    getResy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Increase/Decrease count (now directly from context)
  const handleIncreaseCount = (dishId, portionId) => {
    increaseCount(dishId, portionId);
  };

  const handleDecreaseCount = (dishId, portionId) => {
    decreaseCount(dishId, portionId);
  };


  return (
    <div
      className="w-full relative z-50"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <header
        className={`w-full fixed z-40 h-[80px] text-white flex justify-evenly items-center px-4 md:px-8 transition-all duration-300 ${
          isScrolled
            ? "bg-black/40 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <Link to={"aboutus"} className="flex items-center gap-4">
          <img className="w-[50px] rounded-[10px]" src={logo} alt="logo" />
          <h1 className="text-[18px] font-bold hidden sm:block md:text-[20px]">
            Ресторан Бахтиёр
          </h1>
        </Link>

        <nav className="flex gap-4 md:gap-8 items-center">
          <Link
            className="text-sm md:text-base font-semibold hover:text-[#BD1619]"
            to="/aboutus"
          >
            Ресторан
          </Link>
          <Link
            className="text-sm md:text-base font-semibold hover:text-[#BD1619]"
            to="/"
          >
            Меню
          </Link>
        </nav>

        <div onClick={handleCartOpen} className="relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="absolute -top-2 -right-2 bg-[#BD1619] text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
            {getTotalItems()}
          </span>
        </div>
      </header>

      <Outlet />

      <footer
        className="relative w-full h-[350px] flex flex-col items-center justify-center text-white pt-[100px] pb-[100px]"
        style={{
          backgroundImage: `url(${bgFooter})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/90 z-0" />
        <div className="relative z-10 flex flex-col gap-4 items-center text-center">
          <img className="w-[120px] rounded-[20px]" src={logo} alt="Logo" />
          <p className="text-[18px] flex flex-col md:flex-row gap-2 md:gap-[30px]">
            Адрес: Аминчон Шукухи 31б{" "}
            <span className="text-[#BD1619] font-bold">Тел: 93 888 24 24</span>
          </p>
          <p className="text-[18px] flex flex-col md:flex-row gap-2 md:gap-[30px]">
            Адрес: ул. Сырдаринский 8А{" "}
            <span className="text-[#BD1619] font-bold">Тел: 99 300 57 57</span>
          </p>
          <div className="flex gap-4 mt-2 text-[#BD1619]">
            <FacebookIcon />
            <InstagramIcon />
            <PinterestIcon />
            <TwitterIcon />
          </div>
        </div>
      </footer>

      <Dialog
        open={cartDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCartClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor: "#ffffff",
            padding: "20px",
          },
        }}
      >
        <div className="w-[80%] m-auto flex justify-between items-center text-gray text-[18px] font-[700]">
          <p className="text-[26px]">Корзина</p>
          <button
            onClick={() => {
              handleCartClose();
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <DialogContent sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
          {!showOrderForm ? (
            <div className="flex flex-col justify-center items-center gap-[10px]">
              {detailedCartItems.length === 0 ? (
                <p>Корзина пуста</p>
              ) : (
                detailedCartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedPortion.id}`} // Unique key for dish + portion
                    className="w-full p-4 border border-[lightgray] rounded-xl flex items-center justify-between gap-4 bg-white shadow-md cart-item-transition"
                  >
                    <img
                      src={item.image || logo} // Use portion image
                      alt={item.name}
                      className="w-[80px] h-[80px] object-cover rounded-lg border border-gray-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-md font-bold text-[#1A1A1A]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.selectedPortion.portion_type_name}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecreaseCount(item.id, item.selectedPortion.id)}
                          className="w-5 h-5 flex justify-center items-center rounded-full bg-[#BD1619] text-white text-lg hover:bg-[#a20f14]"
                        >
                          <RemoveIcon sx={{ fontSize: 16 }} />
                        </button>
                        <span className="text-base font-semibold">
                          {item.count}
                        </span>
                        <button
                          onClick={() => handleIncreaseCount(item.id, item.selectedPortion.id)}
                          className="w-5 h-5 flex justify-center items-center rounded-full bg-[#BD1619] text-white text-lg hover:bg-[#a20f14]"
                        >
                          <AddIcon sx={{ fontSize: 16 }} />
                        </button>
                      </div>
                      <div className="text-[#BD1619] font-bold text-lg min-w-[60px] text-end">
                        {(item.selectedPortion.price * item.count).toFixed(2)}{" "}
                        сомони
                      </div>
                    </div>
                  </div>
                ))
              )}
              {detailedCartItems.length > 0 && (
                <div className="w-full text-right text-xl font-bold mt-4 text-[#1A1A1A]">
                  Итого: {totalCartPrice.toFixed(2)} сомони
                </div>
              )}
            </div>
          ) : (
            <form className="flex flex-col gap-4 text-sm md:text-base">
              {/* ФИО */}
              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">ФИО</span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#BD1619] transition"
                />
              </label>

              {/* Телефон */}
              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">Телефон</span>
                <input
                  type="tel"
                  placeholder="+992 9XX XXX XXX"
                  className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#BD1619] transition"
                />
              </label>

              {/* Адрес */}
              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">
                  Адрес доставки
                </span>
                <textarea
                  placeholder="Улица, дом, квартира..."
                  className="border border-gray-300 px-4 py-2 rounded-lg outline-none resize-none focus:ring-2 focus:ring-[#BD1619] transition"
                  rows={3}
                />
              </label>

              {/* Способ оплаты */}
              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">Способ оплаты</span>
                <select
                  className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#BD1619] transition"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Выберите способ оплаты
                  </option>
                  <option value="cash">Наличные при получении</option>
                  <option value="card">Картой при получении</option>
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-gray-700 font-medium">Рестораны</span>
                <select
                  className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#BD1619] transition restaurant-selection"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Выберите адресс ресторана
                  </option>
                  {rest.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="w-[90%] m-auto flex justify-evenly items-center">
                <div className="w-[60px] h-[50px] flex justify-center items-center ">
                  {" "}
                  <img className="rounded-[10px]" src={dc} alt="" />{" "}
                </div>
                <div className="w-[60px] h-[50px] flex justify-center items-center ">
                  {" "}
                  <img className="rounded-[10px]" src={eskhata} alt="" />{" "}
                </div>
                <div className="w-[60px] h-[50px] flex justify-center items-center">
                  {" "}
                  <img className="rounded-[10px]" src={alif} alt="" />{" "}
                </div>
              </div>
            </form>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: "20px", mt: 2, flexDirection: "column" }}>
          {!showOrderForm ? (
            <>
              {detailedCartItems.length > 0 && (
                <Button
                  onClick={() => clearCart()}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "16px",
                    borderRadius: "8px",
                    color: "#BD1619",
                    borderColor: "#BD1619",
                    px: 3,
                    py: 1,
                    mb: 1, // Margin bottom for spacing
                    "&:hover": { backgroundColor: "#BD1619", color: "#fff" },
                  }}
                >
                  Очистить корзину
                </Button>
              )}
              <div className="flex gap-4">
                <Button
                  onClick={handleCartClose}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "16px",
                    borderRadius: "8px",
                    color: "#000",
                    borderColor: "#000",
                    px: 3,
                    py: 1,
                    "&:hover": { backgroundColor: "#000", color: "#fff" },
                  }}
                >
                  Отмена
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#BD1619",
                    px: 3,
                    py: 1,
                  }}
                  onClick={() => setShowOrderForm(true)}
                  disabled={detailedCartItems.length === 0} // Disable if cart is empty
                >
                  Заказать
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                onClick={() => setShowOrderForm(false)}
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "#BD1619",
                }}
              >
                Назад
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#BD1619",
                  px: 3,
                  py: 1,
                }}
                onClick={() => {
                  // здесь логика подтверждения заказа
                  handleCartClose();
                  makeOrder();
                  setShowOrderForm(false);
                  clearCart(); // Clear cart after successful order
                }}
              >
                Подтвердить
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Layout;