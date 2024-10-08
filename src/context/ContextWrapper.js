import { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const saveEventsReducer = (state, {type, payload}) => {
    switch(type) {
        case 'push':
            return [...state, payload];
        case 'update':
            return state.map(event => event.id === payload.id ? payload : event);
        case 'delete':
            return state.filter(event => event.id !== payload.id);
        default:
            throw new Error();
    }
}

const initEvents = () => {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [labels,setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(saveEventsReducer, [], initEvents);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) => 
      labels.filter((lbl)=> lbl.checked).map(lbl => lbl.label).includes(evt.label)
    )
  },[savedEvents, labels]);

  useEffect(() => {
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  },[savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
        return [...new Set(savedEvents.map(evt => evt.label))].map((label) =>{
          const currentLabel = prevLabels.find((lbl) => lbl.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        });
    })
},[savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if(!showEventModal){
      setSelectedEvents(null);
    }
  }, [showEventModal]);


  const updatedLabel = (label) => {
    setLabels(labels.map((lbl)=> lbl.label === label.label ? label : lbl))
  };
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvents,
        setSelectedEvents,
        setLabels,
        labels,
        updatedLabel,
        filteredEvents
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
