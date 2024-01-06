import React, {useState} from 'react';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const locales = {
    "en-US" : require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek, 
    getDay,
    locales
})

const events = [
    {
        title: "Haircut",
        allDay: true,
        start: new Date(2023, 8, 2),
        end: new Date(2023, 8, 2),
    },

    {
        title: "Dressing",
        start: new Date(2023, 8, 3),
        end: new Date(2023, 8, 3),
    },

    {
        title: "Makeup",
        start: new Date(2023, 8, 2),
        end: new Date(2023, 8, 2),
    },

    {
        title: "Bridel",
        start: new Date(2023, 8, 5),
        end: new Date(2023, 8, 5),
    },
];

function Calen () {
    const [newEvents, setNewEvents] = useState({title:"", start:"", end:""})
    const [allEvents, setallEvents] = useState(events)

    function handleAddEvent(){
        setallEvents([...allEvents, newEvents])
    }

  return (
    <div className='Calen'>
        
        <h1>Calendar</h1>
        <h2>Add New Event</h2>
        <div>
            <input type = "text" placeholder="Add Title " style={{width: "20%", marginRight: "10px"}}
            value={newEvents.title} onChange={(e) => setNewEvents({ ...newEvents, title: e.target.value })}
            />
            <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvents.start} onChange={(start) => setNewEvents({ ...newEvents, start })} />
            <DatePicker placeholderText="End Date" selected={newEvents.end} onChange={(end) => setNewEvents({ ...newEvents, end })} />
            <button stlye={{ marginTop: "10px" , clour: "#ed95cc"}} onClick={handleAddEvent}>
                    Add Event
                </button>
        </div>
            <Calendar
            localizer= {localizer}
            events = {allEvents}
            startAccessor = "start"
            endAccessor = "end"
            style = {{height: 500, margin: "50px"}}
            />
        


    </div>
  )
}

export default Calen