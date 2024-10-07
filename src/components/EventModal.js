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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setShowEventModal, daySelected } = useContext(GlobalContext);
  return (
    <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center">
      <form className="bg-white shadow-2xl rounded-lg w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button
            onClick={() => {
              setShowEventModal(false);
            }}
          >
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
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
                  className={`${lblClass} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  <span className="material-icons-outlined text-white text-sm">
                    check
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
