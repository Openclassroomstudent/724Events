import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // State to track pause
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1// Corrected sort order
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Always return a cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) =>
          prevIndex < (byDateDesc?.length || 0) - 1 ? prevIndex + 1 : 0
        );
      }, 5000);

      return () => clearTimeout(timeout);
    }

    // Return undefined explicitly when paused
    return undefined;
  }, [index, isPaused, byDateDesc?.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || idx}> {/* Use event.id as a unique key, fallback to idx if undefined */}
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((evt, radioIdx) => (
                <input
                  key={`${event.id || idx}-radio-${evt.id || radioIdx}`} // Ensure unique key for each radio button
                  type="radio"
                  name={`radio-button-${event.id || idx}`} // Ensure radio button group uniqueness
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)} // Allow changing slide on radio button click
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;