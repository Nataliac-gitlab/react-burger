import React from "react";
import { Modal } from "../shared/modal/modal";
import { IngredientDetails } from "./ingredient-details/ingredient-details";
import { useNavigate } from "react-router-dom";

export const IngredientModal = () => {
  const navigate = useNavigate();
  const handleOnClose = () => {
    navigate("/");
  };
  return (
    <Modal title="Детали ингридиента" onClose={handleOnClose}>
      {<IngredientDetails />}
    </Modal>
  );
};
