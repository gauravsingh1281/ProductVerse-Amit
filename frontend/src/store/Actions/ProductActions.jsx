import axios from "../../api/Config";
import { loadproducts } from "../reducers/ProductSlice";

export const asyncloadpoducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    localStorage.setItem("products", JSON.stringify(data));
    dispatch(loadproducts(data));
    console.log("Products Loaded!");
  } catch (error) {
    console.log(error);
  }
};

export const asynccreateproduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post("/products", product);
    dispatch(asyncloadpoducts());
    console.log("Product Created!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncupdatepoduct = (id, product) => async (dispatch, getState) => {
  try {
    await axios.patch(`/products/${id}`, product);
    dispatch(asyncloadpoducts());
    console.log("products updated!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/products/${id}`);
    dispatch(asyncloadpoducts());
    console.log("Product Deleted!");
  } catch (error) {
    console.log(error);
  }
};
