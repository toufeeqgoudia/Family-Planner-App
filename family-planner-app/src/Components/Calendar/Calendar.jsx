import { useEffect, useState } from "react";
import { supabase } from "../../Config/supabaseClient";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMeeting from "./CalendarMeeting";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Calendar = () => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [meetings, setMeetings] = useState([]);
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

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

        if (error) throw error;
        if (data) {
          setMeetings(data);
        }
      } catch (error) {
        console.log("Error fetching posts", error.message);
      }
    };

    fetchMeetings();
  }, [user.id]);

  const addMeeting = async () => {
    try {
      const { error } = await supabase
        .from("meetings")
        .insert({
          user_id: user.id,
          description: description,
          startDateTime: startDateTime,
          endDateTime: endDateTime,
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDateTime), selectedDay)
  );

  const handleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div className="mt-20 mb-24 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold text-center">Calendar</h2>
      <Button onClick={handleDialog}>Add Meeting</Button>

      <Dialog open={dialogOpen} onClose={handleDialog}>
        <div className="p-5 w-80">
          <h4 className="text-base font-semibold pb-2">Add Meeting</h4>
          <Divider />
          <form className="flex flex-col" onSubmit={() => addMeeting()}>
            <TextField
              label="Description"
              focused
              autoComplete="off"
              type="text"
              margin="normal"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Start Time"
              focused
              type="datetime-local"
              required
              margin="normal"
              onChange={(e) =>
                setStartDateTime(new Date(e.target.value).toISOString())
              }
            />
            <TextField
              label="End Time"
              focused
              type="datetime-local"
              required
              margin="normal"
              onChange={(e) =>
                setEndDateTime(new Date(e.target.value).toISOString())
              }
            />
            <div className="pt-2 flex flex-row justify-between items-center">
              <Button
                variant="contained"
                type="button"
                onClick={handleDialog}
                sx={{ width: "45%" }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" sx={{ width: "45%" }}>
                Save
              </Button>
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
                  <ChevronLeftIcon
                    sx={{ width: "24px", height: "24px" }}
                    aria-hidden="true"
                  />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon
                    sx={{ width: "24px", height: "24px" }}
                    aria-hidden="true"
                  />
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
                        isSameDay(parseISO(meeting.startDateTime), day)
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
                    <CalendarMeeting meeting={meeting} key={meeting.id} />
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

// import dayjs from "dayjs";
// import { useState } from "react";
// // import { supabase } from "../../Config/supabaseClient";
// // import { useAuth } from "../../Hooks/useAuth";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// const generateDate = (
// 	month = dayjs().month(),
// 	year = dayjs().year()
// ) => {
// 	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
// 	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

// 	const arrayOfDate = [];

// 	// create prefix date
// 	for (let i = 0; i < firstDateOfMonth.day(); i++) {
// 		const date = firstDateOfMonth.day(i);

// 		arrayOfDate.push({
// 			currentMonth: false,
// 			date,
// 		});
// 	}

// 	// generate current date
// 	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
// 		arrayOfDate.push({
// 			currentMonth: true,
// 			date: firstDateOfMonth.date(i),
// 			today:
// 				firstDateOfMonth.date(i).toDate().toDateString() ===
// 				dayjs().toDate().toDateString(),
// 		});
// 	}

// 	const remaining = 42 - arrayOfDate.length;

// 	for (
// 		let i = lastDateOfMonth.date() + 1;
// 		i <= lastDateOfMonth.date() + remaining;
// 		i++
// 	) {
// 		arrayOfDate.push({
// 			currentMonth: false,
// 			date: lastDateOfMonth.date(i),
// 		});
// 	}
// 	return arrayOfDate;
// };

// const months = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December",
// ];

// function cn(...classes) {
// 	return classes.filter(Boolean).join(" ");
// }

// export default function Calendar() {
// 	const days = ["S", "M", "T", "W", "T", "F", "S"];
// 	const currentDate = dayjs();
// 	const [today, setToday] = useState(currentDate);
// 	const [selectDate, setSelectDate] = useState(currentDate);

// 	return (
// 		<div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
// 			<div className="w-96 h-96 ">
// 				<div className="flex justify-between items-center">
// 					<h1 className="select-none font-semibold">
// 						{months[today.month()]}, {today.year()}
// 					</h1>
// 					<div className="flex gap-10 items-center ">
// 						<ChevronLeftIcon
// 							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
// 							onClick={() => {
// 								setToday(today.month(today.month() - 1));
// 							}}
// 						/>
// 						<ChevronRightIcon
// 							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
// 							onClick={() => {
// 								setToday(today.month(today.month() + 1));
// 							}}
// 						/>
// 					</div>
// 				</div>
// 				<div className="grid grid-cols-7 ">
// 					{days.map((day, index) => {
// 						return (
// 							<h1
// 								key={index}
// 								className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
// 							>
// 								{day}
// 							</h1>
// 						);
// 					})}
// 				</div>

// 				<div className=" grid grid-cols-7 ">
// 					{generateDate(today.month(), today.year()).map(
// 						({ date, currentMonth, today }, index) => {
// 							return (
// 								<div
// 									key={index}
// 									className="p-2 text-center h-14 grid place-content-center text-sm border-t"
// 								>
// 									<h1
// 										className={cn(
// 											currentMonth ? "" : "text-gray-400",
// 											today
// 												? "bg-red-600 text-white"
// 												: "",
// 											selectDate
// 												.toDate()
// 												.toDateString() ===
// 												date.toDate().toDateString()
// 												? "bg-black text-white"
// 												: "",
// 											"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
// 										)}
// 										onClick={() => {
// 											setSelectDate(date);
// 										}}
// 									>
// 										{date.date()}
// 									</h1>
// 								</div>
// 							);
// 						}
// 					)}
// 				</div>
// 			</div>
// 			<div className="h-96 w-96 sm:px-5">
// 				<h1 className=" font-semibold">
// 					Schedule for {selectDate.toDate().toDateString()}
// 				</h1>
// 				<p className="text-gray-400">No meetings for today.</p>
// 			</div>
// 		</div>
// 	);
// }
