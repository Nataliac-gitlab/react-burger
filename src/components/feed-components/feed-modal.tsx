import React from "react";
import { Modal } from "../shared/modal/modal";
import { CardDetails } from "./card-details/card-details";
import { useNavigate } from "react-router-dom";

export const FeedModal = () => {
  const navigate = useNavigate();
  const handleOnClose = () => {
    navigate("/feed");
  };
  return (
    <Modal  onClose={handleOnClose}>
      {<CardDetails />}
    </Modal>
  );
};