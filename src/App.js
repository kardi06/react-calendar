import React, {useState, useContext, useEffect} from 'react';
import {getMonth} from './util.js';
import CalendarHeader from './components/CalendarHeader.js';
import Sidebar from './components/Sidebar.js';
import Month from './components/Month.js';
import GlobalContext from './context/GlobalContext.js';
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth);
  const {monthIndex} = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  },[monthIndex]);

  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader/>
        <div className="flex flex-1">
          <Sidebar/>
          <Month month={currentMonth}/>
        </div>
      </div>
    </>
  );
}

export default App;
