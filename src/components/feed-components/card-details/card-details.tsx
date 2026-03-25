import React from "react";
import styles from "./card-details.module.css";
import { FeedIngredient } from "./feed-ingredient";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Status } from "../feed-common/status";
import { Price } from "../feed-common/price";
import { getOrderByNumber } from "../services/cash-selectors";
import { getOrderPriceByIngredients } from "../../burger-ingredients/services/selectors";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../services/hooks";
import { useGetIsUserFeed } from "../services/hooks";
import { useGetOrderByNumberQuery } from "../services/feed-api";
import { getUniqueIngredientsWithCount } from "../utils/utils";

export const CardDetails = () => {
  const { number } = useParams();

  const isUser = useGetIsUserFeed();
  const order = useAppSelector(
    getOrderByNumber(isUser ? "user" : "all", number || ""),
  );

  const { data, isLoading, isError } = useGetOrderByNumberQuery(number || "", {
    skip: !!order,
  });

  const displayOrder = order || data?.orders[0];
  const ingredientCounts = getUniqueIngredientsWithCount(
    displayOrder?.ingredients || [],
  );
  const price = useAppSelector(
    getOrderPriceByIngredients(displayOrder?.ingredients || []),
  );

  const uniqueIngredientIds = Object.keys(ingredientCounts);
  if (isLoading) return <span>Щас всё будет...</span>;
  if (isError) return <span>Ooops... чё-то не идёт :(</span>;
  console.log("displayOrder", displayOrder);
  return (
    <>
      {displayOrder && (
        <div className={styles.container}>
          <div className={styles.number}>#{number}</div>
          <div className={styles.name}>{displayOrder?.name}</div>
          <div className={styles.status}>
            <Status status={displayOrder?.status} />
          </div>
          <div className={styles.content}>Состав:</div>
          <ul className={styles.list_container}>
            {uniqueIngredientIds.map((item) => (
              <li key={item}>
                <FeedIngredient id={item} count={ingredientCounts[item] || 0} />
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <div className={styles.date}>
              <FormattedDate date={new Date(displayOrder?.createdAt)} />
            </div>
            <Price price={price || 0} />
          </div>
        </div>
      )}
    </>
  );
};
