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

import CanvaRest from "../components/canvatwo";
import Portion from "../components/portion";
import logo from "../assets/Logo Good.png";
import "../pages/rest.css";

// Анимация для открытия модального окна
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Restaurant = () => {
  // Состояния
  const [open, setOpen] = useState(false); // Управление модальным окном
  const [data, setData] = useState([]); // Все блюда
  const [selectedItem, setSelectedItem] = useState(null); // Одно выбранное блюдо

  const api = "https://bahtiyor.learn-it-academy.site/api/menu/";

  // Получение одного блюда по ID (для модалки)
  async function getById(id) {
    try {
      const response = await axios.get(`${api}${id}/`);
      setSelectedItem(response.data); // Сохраняем данные блюда
      setOpen(true); // Открываем модалку
    } catch (error) {
      console.error("Ошибка при получении блюда по ID:", error);
    }
  }

  // get категориев
  var apiCateg = "https://bahtiyor.learn-it-academy.site/api/categories/";
  const [category, setCategory] = useState([]);
  async function getCateg() {
    try {
      const response = await axios.get(apiCateg);
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Получение всех блюд
  async function getAllDishes() {
    try {
      const response = await axios.get(api);
      setData(response.data); // Сохраняем список блюд
    } catch (error) {
      console.error("Ошибка при получении списка блюд:", error);
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(null);

  async function get(categoryId = "") {
    try {
      // Если categoryId пустой, то запрос без фильтра
      const url = categoryId ? `${api}?category=${categoryId}` : api;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  // Запрос на сервер при первом рендере
  useEffect(() => {
    getAllDishes();
    getCateg();
    get();
  }, []);

  // Закрытие модального окна
  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null); // Очистим выбранный элемент
  };

  const [mode, setMode] = useState("dine-in");

  return (
    <div
      className="w-[100%] bg-white flex flex-col justify-center items-center"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      {/* Канва сверху */}
      <CanvaRest />

      {/* Типы доставки */}
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

      {/* Фильтры */}
      <div className="w-[50%] flex flex-wrap justify-center items-center gap-[10px] pt-[30px]">
        {/* Кнопка "Все" */}
        <p
          key="all"
          className="filter-button cursor-pointer"
          onClick={() => {
            setSelectedCategory(null); // или "" — для "Все"
            get(); // без параметров — загрузить всё
          }}
        >
          Все
        </p>

        {/* Категории из массива */}
        {category.map((elem) => (
          <p
            key={elem.id}
            className="filter-button cursor-pointer"
            onClick={() => {
              setSelectedCategory(elem.id);
              get(elem.id);
            }}
          >
            {elem.name}
          </p>
        ))}
      </div>

      {/* Список карточек блюд */}
      <div className="w-[80%] m-auto flex flex-wrap justify-start items-center gap-6 pt-[100px] pb-[100px] px-4">
        {data.map((element) => (
          <div
            key={element.id}
            className="w-[370px] bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={element.image}
              alt={element.name}
              className="w-full h-48 object-cover"
              onClick={() => {
                // Тут вызов setSelectedItem(element) и setOpen(true) если нужно
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#BD1619] mb-2">
                {element.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {element.description || "Описание отсутствует"}
              </p>
              <div className="flex justify-between items-center mt-6">
                <span className="text-[#BD1619] text-xl font-bold">
                  {element.portion_options?.[0]?.price || "???"} сом
                </span>

                {/* Твой компонент выбора порции */}
                <Portion port={element.portion_options} />

                {/* Кнопка "Add to cart" появляется только если режим - доставка */}
                {mode === "delivery" && (
                  <button className="add-to-cart-button">Add to cart</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно блюда */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            color: "#fff",
            borderRadius: 3,
            textAlign: "center",
            px: 3,
            py: 2,
          },
        }}
        aria-describedby="dish-dialog-description"
      >
        <button onClick={handleClose} className="text-[#BD1619] text-end">
          <CloseIcon />
        </button>

        {/* Если блюдо выбрано */}
        {selectedItem && (
          <>
            {/* Фото блюда */}
            <CardMedia
              component="img"
              sx={{
                height: 180,
                width: 450,
                borderRadius: 3,
                mx: "auto",
                mb: 2,
                marginTop: 2,
              }}
              image={selectedItem.image}
              alt={selectedItem.name}
            />

            {/* Название */}
            <DialogTitle
              sx={{ fontWeight: "bold", fontSize: 22, color: "#BD1619" }}
            >
              {selectedItem.name}
            </DialogTitle>

            {/* Описание */}
            <DialogContent>
              <DialogContentText
                id="dish-dialog-description"
                sx={{
                  fontSize: 15,
                  color: "gray",
                  mb: 3,
                  textAlign: "justify",
                }}
              >
                {selectedItem.description || "Нет описания"}
              </DialogContentText>
            </DialogContent>

            {/* Порция + цена + кнопка */}
            <DialogActions
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                pt: 2,
              }}
            >
              <div className="flex flex-col gap-[20px]">
                <div className="text-lg text-black flex flex-wrap gap-[20px] justify-evenly items-center">
                  <Portion port={selectedItem.portion_options} />
                  <p>
                    Цена:{" "}
                    <span className="text-[#BD1619] font-[600]">
                      {selectedItem.portion_options?.[0]?.price || "???"} сомони
                    </span>
                  </p>
                </div>
                <button className="add-to-cart-button">Add to cart</button>
              </div>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Restaurant;

// <div
//   onClick={() => {
//     setSelectedItem(element);
//     setOpen(true);
//   }}
//   key={element.id}
//   className="group w-full sm:w-[400px] rounded-2xl bg-white shadow-xl relative overflow-visible transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
// >
//   {/* Картинка блюда */}
//   <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
//     <img
//       src={element.portion_options?.[0]?.image || logo}
//       alt={element.name}
//       className="w-full h-[150px] rounded-[10px] object-cover border-4 border-white shadow-md transition-all duration-300 group-hover:scale-105"
//     />
//   </div>

//   {/* Название, описание, цена, кнопка */}
//   <div className="pt-[110px] px-5 pb-6 text-center flex flex-col justify-between">
//     <div>
//       <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#BD1619]">
//         {element.name}
//       </h2>
//       <p className="text-gray-500 text-sm leading-relaxed">
//         {element.description || "Delicious and hot. Ready to eat!"}
//       </p>
//     </div>

//     <div className="flex justify-between items-center mt-6">
//       <span className="text-[#BD1619] text-xl font-bold">
//         {element.portion_options?.[0]?.price || "???"} сом
//       </span>

//       {/* Компонент выбора порции */}
//       <Portion port={element.portion_options} />

//       {/* Кнопка "Add to cart" */}
//       <button className="add-to-cart-button">Add to cart</button>
//     </div>
//   </div>
// </div>
