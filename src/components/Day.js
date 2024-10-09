import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);

  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvents } =
    useContext(GlobalContext);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full"
      : "";
  };

  useEffect(() => {
    const events = savedEvents.filter(
      (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((event, idx) => (
          <div
            className={`${
              event.label === "indigo"
                ? "bg-indigo-300"
                : event.label === "gray"
                ? "bg-gray-300"
                : event.label === "green"
                ? "bg-green-300"
                : event.label === "blue"
                ? "bg-blue-300"
                : event.label === "red"
                ? "bg-red-300"
                : "bg-purple-300"
            } p-1 mr-3 w-full text-gray-600 text-sm rounded mb-1 truncate`}
            key={idx}
            onClick={() => setSelectedEvents(event)}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
