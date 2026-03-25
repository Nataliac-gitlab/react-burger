import React from "react";
import { Modal } from "../shared/modal/modal";
import { CardDetails } from "./card-details/card-details";
import { useNavigate } from "react-router-dom";
import { useGetIsUserFeed } from "./services/hooks";

export const FeedModal = () => {
  const navigate = useNavigate();
  const isUser = useGetIsUserFeed();
  const handleOnClose = () => {
    navigate(isUser ? "/profile/orders" : "/feed");
  };
  return <Modal onClose={handleOnClose}>{<CardDetails />}</Modal>;
};
