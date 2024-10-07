import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function EventModal() {
  //   const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
  const labelsClasses = [
    "bg-indigo-500",
    "bg-gray-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-purple-500",
  ];

  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvents } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvents ? selectedEvents.title : "");
  const [description, setDescription] = useState(
    selectedEvents ? selectedEvents.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvents
      ? labelsClasses.find((label) => label === selectedEvents.label)
      : labelsClasses[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvents ? selectedEvents.id : Date.now(),
    };
    if (selectedEvents) {
      dispatchCalEvent({
        type: "update",
        payload: calendarEvent,
      });
    } else {
      dispatchCalEvent({
        type: "push",
        payload: calendarEvent,
      });
    }

    setShowEventModal(false);
  };
  return (
    <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center">
      <form className="bg-white shadow-2xl rounded-lg w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvents && (
              <span
                className="material-icons-outlined text-gray-400 cursor-pointer"
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvents });
                  setShowEventModal(false);
                }}
              >
                delete
              </span>
            )}
            <button
              onClick={() => {
                setShowEventModal(false);
              }}
            >
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add Description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />

            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => {
                    setSelectedLabel(lblClass);
                  }}
                  className={`${lblClass} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
