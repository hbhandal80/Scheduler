import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";

// Renders students and spots for day
export default function DayListItem(props) {
  const DayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  // Output for the number of spots remaining
  const formatSpots = spots => {
    if (spots < 1) {
      return ("no spots remaining");
    }
    if (spots === 1) {
      return ("1 spot remaining");
    }
    if (spots > 1) {
      return (spots + " spots remaining");
    }
  }

  return (
    <li
      className={DayClass} data-testid="day"
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};