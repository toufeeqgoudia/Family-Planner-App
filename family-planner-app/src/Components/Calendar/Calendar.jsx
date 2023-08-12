import { useEffect, useState } from "react";
import { supabase } from "../../Config/supabaseClient"
import { useAuth } from "../../Hooks/useAuth";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMeeting from "./CalendarMeeting";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Calendar = () => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [meetings, setMeetings] = useState([])
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const { data, error } = await supabase
          .from("meetings")
          .select("*")
          .eq("user_id", user.id);
      
        if (error) throw error
        if (data) {
          console.log('data: ', data)
        }
      } catch (error) {
          console.log('Error fetching posts', error.message);
      }
    }

    fetchMeetings()
  }, [user.id])

  const addMeeting = async () => {
    try {
        const { error } = await supabase
            .from("meetings")
            .insert({
                user_id: user.id,
                description: description,
                startTime: startTime,
                endTime: endTime,
                date: date
            });
        if (error) throw error
    } catch (error) {
        console.log(error.message)
    }
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  const handleDialog = () => {
    setDialogOpen(!dialogOpen)
  }

  return (
    <div className="mt-20 mb-10 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold text-center">Calendar</h2>
      <Button onClick={handleDialog}>Add Meeting</Button>

      <Dialog open={dialogOpen} onClose={handleDialog}>
        <div className="p-5 w-80">
          <h4 className="text-base font-semibold pb-2">Add Meeting</h4>
          <Divider />
            <form className="flex flex-col" onSubmit={addMeeting}>
                <TextField label="Description" focused autoComplete="off" type="text" margin="normal" required onChange={(e) => setDescription(e.target.value)} />
                <TextField label="Date" focused type="date" required margin="normal" onChange={(e) => setDate(e.target.value)} />
                <TextField label="Start Time" focused type="time" required margin="normal" onChange={(e) => setStartTime(e.target.value)} />
                <TextField label="End Time" focused type="time" required margin="normal" onChange={(e) => setEndTime(e.target.value)} />
                <div className="pt-2 flex flex-row justify-between items-center">
                <Button variant="contained" type="button" onClick={handleDialog} sx={{ width: '45%' }}>Cancel</Button>
                <Button variant="contained" type="submit" sx={{ width: '45%' }}>Save</Button>
                </div>
            </form>
        </div>
      </Dialog>

      <div className="pt-10 pb-5">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5 px-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>

                    <div className="w-1 h-1 mx-auto mt-1">
                      {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMM dd, yyy")}
                </time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <CalendarMeeting meeting={meeting} description={description} date={date} startTime={startTime} endTime={endTime} key={meeting.id} />
                  ))
                ) : (
                  <p>No meetings for today.</p>
                )}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default Calendar;
