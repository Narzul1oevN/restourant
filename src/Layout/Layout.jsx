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

import bgFooter from "../assets/9696-1.jpg";
import logo from "../assets/Logo Good.png";
import Slide from "@mui/material/Slide";
import Portion from "../components/portion";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const API_URL = "https://bahtiyor.learn-it-academy.site/api/menu/";

const Layout = () => {
  const [cart, setCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Массив блюд с данными из API
  const [cartData, setCartData] = useState([]);   // Массив {id, count} из localStorage

  const cartDialog = () => setCart(true);
  const handleClose = () => setCart(false);

  // Получаем массив {id, count} из localStorage
  const getCartDataFromLocalStorage = () => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  };

  // Загрузка данных корзины при открытии
  useEffect(() => {
    if (!cart) return;

    const fetchCartItems = async () => {
      const storedCartData = getCartDataFromLocalStorage();
      if (storedCartData.length === 0) {
        setCartItems([]);
        setCartData([]);
        return;
      }

      try {
        // Загрузка данных о блюдах по ID
        const requests = storedCartData.map(({ id }) =>
          axios.get(`${API_URL}${id}/`)
        );
        const responses = await Promise.all(requests);
        const dishes = responses.map((res) => res.data);

        setCartItems(dishes);
        setCartData(storedCartData);
      } catch (error) {
        console.error("Ошибка при загрузке данных из корзины:", error);
      }
    };

    fetchCartItems();
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Увеличение количества
  const increaseCount = (id) => {
    const updatedCartData = cartData.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setCartData(updatedCartData);
  };

  // Уменьшение количества
  const decreaseCount = (id) => {
    let updatedCartData = cartData
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);

    setCartData(updatedCartData);

    if (updatedCartData.find((item) => item.id === id) === undefined) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Сохраняем cartData в localStorage при изменении cartData
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartData));
  }, [cartData]);

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

        <div onClick={cartDialog} className="relative cursor-pointer">
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
            {cartData.reduce((acc, item) => acc + item.count, 0)}
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
            <span className="text-[#BD1619] font-bold">Тел: 93 888 24 24</span>
          </p>
          <p className="text-[18px] flex flex-col md:flex-row gap-2 md:gap-[30px]">
            Адрес: ул. Сырдаринский 8А{" "}
            <span className="text-[#BD1619] font-bold">Тел: 99 300 57 57</span>
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
        open={cart}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
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
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <DialogContent sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <div className="flex flex-col justify-center items-center gap-[10px]">
            {cartItems.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cartItems.map((item) => {
                const cartItem = cartData.find((c) => c.id === item.id);
                const count = cartItem ? cartItem.count : 1;
                const price = item.portion_options?.[0]?.price || 0;
                const totalPrice = (price * count).toFixed(2);

                return (
                  <div
                    key={item.id}
                    className="w-full p-4 border border-[lightgray] rounded-xl flex items-center justify-between gap-4 bg-white shadow-md"
                  >
                    <img
                      src={item.portion_options?.[0]?.image || logo}
                      alt={item.name}
                      className="w-[80px] h-[80px] object-cover rounded-lg border border-gray-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-md font-bold text-[#1A1A1A]">
                        {item.name}
                      </h3>
                      <Portion port={item.portion_options} />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseCount(item.id)}
                          className="w-5 h-5 flex justify-center items-center rounded-full bg-[#BD1619] text-white text-lg hover:bg-[#a20f14]"
                        >
                          −
                        </button>
                        <span className="text-base font-semibold">{count}</span>
                        <button
                          onClick={() => increaseCount(item.id)}
                          className="w-5 h-5 flex justify-center items-center rounded-full bg-[#BD1619] text-white text-lg hover:bg-[#a20f14]"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-[#BD1619] font-bold text-lg min-w-[60px] text-end">
                        {totalPrice} сомони
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: "20px", mt: 2 }}>
          <Button
            onClick={handleClose}
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
            // Здесь можно добавить обработчик заказа
          >
            Заказать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Layout;
