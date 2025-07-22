import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import logo from "../assets/Снимок экрана 2025-07-09 095904.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Delivery = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }} className="w-[100%]">
      <div className="w-[80%] m-auto flex flex-col items-center">
        <h1
          className="text-[48px] font-[800]"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Наше Меню Для Доставки
        </h1>

        <p
          className="text-[18px] w-[50%] text-center"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Откройте для себя изысканные блюда восточной кухни, приготовленные с
          любовью нашими мастерами
        </p>
      </div>

      <div className="w-[80%] flex flex-wrap gap-[40px] items-start m-auto pt-[50px] pb-[50px]">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={logo}
            title="Плов"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Плов
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Плов — самая вкусная и популярная еда восточной кухни и имеет очень много любителей.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Заказать</Button>
            <Button size="small" onClick={handleClickOpen}>Подробнее</Button>
          </CardActions>
        </Card>
      </div>

      {/* Модальное окно */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Плов — король восточной кухни"}</DialogTitle>
        <DialogContent>
        <CardMedia
            sx={{ height: 140 }}
            image={logo}
            title="Плов"
          />
          <DialogContentText id="alert-dialog-slide-description">
            Плов — это не просто блюдо, а часть культуры. Приготовленный из отборного риса, мяса и специй, он идеально подходит как для повседневного обеда, так и для праздничного стола.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Delivery;
