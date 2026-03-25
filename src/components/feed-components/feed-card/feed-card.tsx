import React from "react";
import styles from "./feed-card.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { ImageContainer } from "./image-container";
import { getUniqueThings } from "../../../utils/utils";
import { Link, useLocation } from "react-router-dom";
import { Price } from "../feed-common/price";
import { type TOrder } from "../../../common/types";
import { Status } from "../feed-common/status";
import { useGetIsUserFeed } from "../services/hooks";

export type FeedCardProps = {
  order: TOrder;
  price: number;
};

export const FeedCard = ({ order, price }: FeedCardProps) => {
  const location = useLocation();
  const { number, name, ingredients, createdAt, status } = order;
  const uniqueIds = getUniqueThings<string>(ingredients);
  const other = uniqueIds.length > 6 ? uniqueIds.length - 6 : undefined;
  const idsLimited = uniqueIds.slice(0, 6);
  const isUser = useGetIsUserFeed();
  const feedState = { feedBackground: location };
  const profileState = { profileBackground: location };

  return (
    <div className={styles.container}>
      <Link
        to={isUser ? `/profile/orders/${number}` : `/feed/${number}`}
        state={isUser ? profileState : feedState}
      >
        <div className={styles.element}>
          <div>
            <div className={styles.row}>
              <div className={styles.number}>#{number}</div>
              <div className={styles.date}>
                <FormattedDate date={new Date(createdAt)} />
              </div>
            </div>
            <div className={styles.name}>{name}</div>
            {isUser && <Status status={status} />}
            <div className={styles.row}>
              <ul className={styles.stack}>
                {idsLimited.map((id, key) => (
                  <li key={id}>
                    <ImageContainer id={id} pos={key} />
                  </li>
                ))}
              </ul>
              {other && <div className={styles.other}>+{other}</div>}
              <Price price={price} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
