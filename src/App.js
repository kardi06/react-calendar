import React, {useState} from 'react';
import {getMonth} from './util.js';
import CalendarHeader from './components/CalendarHeader.js';
import Sidebar from './components/Sidebar.js';
import Month from './components/Month.js';
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth);
  

  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader/>
        <div className="flex">
          <Sidebar/>
          <Month month={currentMonth}/>
        </div>
      </div>
    </>
  );
}

export default App;
