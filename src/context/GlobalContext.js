import { createContext} from "react";

const GlobalContext = createContext({
    monthIndex : 0,
    setMonthIndex : (index) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal:false,
    setShowEventModal: () => {},
    dispatchCalEvent: () => {},
})

export default GlobalContext;