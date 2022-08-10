import * as React from "react";
import "./styles/home_user.css";
import Chartbar from "./chartbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const HomeUser = () => {
  const dataFalsa = [
    { id:1,name: "mayo", stock: "123", sold_stock: "33", price: "2500" },
    { id:2,name: "coca-cola", stock: "77", sold_stock: "25", price: "2000" },
    { id:3,name: "lays", stock: "322", sold_stock: "200", price: "500" },
    { id:4,name: "donuts", stock: "44", sold_stock: "12", price: "900" },
    { id:5,name: "orange", stock: "65", sold_stock: "33", price: "2000" },
    { id:6,name: "bimbo", stock: "22", sold_stock: "11", price: "4500" },
    { id:7,name: "sprite", stock: "83", sold_stock: "32", price: "2000" },
    { id:8,name: "chettos", stock: "287", sold_stock: "22", price: "500" },
    { id:9,name: "chocolitos", stock: "50", sold_stock: "12", price: "600" },
    { id:10,name: "lapiz", stock: "300", sold_stock: "147", price: "100" },
  ];
  const [data, setData] = React.useState(dataFalsa);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalVentas, setModalventas] = React.useState(false);
  const [modalAddArticles, setModalAdd] = React.useState(false);
  const [productSelected, setProductSelected] = React.useState({
    name: "",
    stock: "",
    sold_stock: "",
    price: "",
  });

  const selectProduct = (product, caso) => {
    setProductSelected(product);
    caso === "Editar"
      ? setModalEdit(true)
      : caso === "Ventas"
      ? setModalventas(true)
      : setModalDelete(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const editProduct = (id) => {
    var dataNueva = data;
    dataNueva.map((product) => {
      if (product.id === productSelected.id) {
        product.is_active = productSelected.is_active;
        product.firstName = productSelected.firstName;
        product.lastName = productSelected.lastName;
        product.email = productSelected.email;
        editDataProduct(productSelected.id);
      }
    });

    setModalEdit(false);
  };
/* ******************************************************************************** */
/* ------------------------funciones de peticion de data--------------------------- */
const editDataProduct = (id) => {
  fetch(
    `https://api-project-business-inventory.herokuapp.com/api/users/products/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productSelected),
    }
  )
    .then((response) => {
      console.log("1");
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log("2");
      console.log(data);
      setData(data);
    })

    .catch((error) => {
      console.log(productSelected);
      console.log("fallo la peticion");
      console.log(error);
    });
};

/* ******************************************************************************** */
  function CardProduct(props) {
    const { product } = props;

    return (
      <React.Fragment>
        <Paper
          elevation={8}
          sx={{ maxWidth: 280, maxHeight: 470, marginLeft: 2, margin: 2 }}
        >
          <Card sx={{ maxWidth: 280, maxHeight: 460 }}>
            <CardMedia
              className="img"
              component="img"
              width=""
              height="240"
              image="https://picsum.photos/200/300"
              alt=""
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Stock: {product.stock}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Vendidas: {product.sold_stock}
              </Typography>
              <Typography variant="body2" color="text.primary">
                valor: ${product.price}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Ganancia: ${product.price * product.sold_stock}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginBottom: 2, justifyContent: "center" }}>
              <Button
                style={{ backgroundColor: "#F44336", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalDelete(true);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>

              <Button
                style={{ backgroundColor: "#FF9800", color: "white" }}
                variant="contained"
                onClick={() => selectProduct(product, "Editar")}
              >
                <ModeEditOutlineOutlinedIcon />
              </Button>

              <Button
                style={{ backgroundColor: "#32CD32", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalventas(true);
                }}
              >
                <AttachMoneyIcon />
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </React.Fragment>
    );
  }
  return (
    <>
      <div>
        <Chartbar />
      </div>
      <div className="title_icon">
        <h3 className="subtitleHomeUser">Artículos</h3>
        <Button
          onClick={() => {
            setModalAdd(true);
          }}
        >
          <Icon sx={{ color: "#32CD32", fontSize: 50 }} color="primary">
            add_circle
          </Icon>
        </Button>
      </div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 3,
              mx: 2,
              my: 5,
              width: 270,
              height: 440,
            },
          }}
        >
          {data.map((product) => {
            return <CardProduct key={product.id} product={product} />;
          })}
        </Box>
      </div>
      <div>
        <Modal
          style={{}}
          open={modalAddArticles}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="boxAdd" sx={style}>
            <div className="AddForm">
              <TextField
                style={{ width: 330, marginBottom: 15 }}
                required
                id="outlined-required"
                label="Nombre de Productos"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                style={{ width: 330, marginBottom: 15 }}
                id="outlined-number"
                label="Stock de productos"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                style={{ width: 330, marginBottom: 15 }}
                id="outlined-number"
                label="Valor de productos"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="buttonAdd">
              <Button
                style={{ backgroundColor: "#32CD32", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalAdd(false);
                }}
              >
                Aceptar
              </Button>
              &nbsp; &nbsp;
              <Button
                style={{ backgroundColor: "#F44336", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalAdd(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={modalDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="deleteForm">
              <TextField
                style={{ width: 330, marginBottom: 15 }}
                required
                id="outlined-required"
                label="Nombre de Productos"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                style={{ width: 330, marginBottom: 15 }}
                id="outlined-number"
                label="Stock de productos"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                style={{ width: 330, marginBottom: 15 }}
                id="outlined-number"
                label="Valor de productos"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="buttonDelete">
              <Button
                style={{ backgroundColor: "#32CD32", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalDelete(false);
                }}
              >
                Aceptar
              </Button>
              &nbsp; &nbsp;
              <Button
                style={{ backgroundColor: "#F44336", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalDelete(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={modalEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Modal Editar
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </div>
            <div className="buttonSales">
              <Button
                style={{ backgroundColor: "#32CD32", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalEdit(false);
                }}
              >
                Aceptar
              </Button>
              &nbsp; &nbsp;
              <Button
                style={{ backgroundColor: "#F44336", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalEdit(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={modalVentas}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="salesForm">
              <TextField
                id="outlined-number"
                label="Unidades Vendidas"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="buttonSales">
              <Button
                style={{ backgroundColor: "#32CD32", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalventas(false);
                }}
              >
                Aceptar
              </Button>
              &nbsp; &nbsp;
              <Button
                style={{ backgroundColor: "#F44336", color: "white" }}
                variant="contained"
                onClick={() => {
                  setModalventas(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default HomeUser;
