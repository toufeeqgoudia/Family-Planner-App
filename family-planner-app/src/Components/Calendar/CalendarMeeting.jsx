import { Fragment, useState } from "react";
import { supabase } from "../../Config/supabaseClient";
import { Menu, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import CircleIcon from "@mui/icons-material/Circle";
import TextField from "@mui/material/TextField";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const CalendarMeeting = ({ meeting }) => {
  let startDateTime = parseISO(meeting.startDateTime);
  let endDateTime = parseISO(meeting.endDateTime);
  const [editing, setEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editStartDateTime, setEditStartDateTime] = useState("");
  const [editEndDateTime, setEditEndDateTime] = useState("");

  const updateMeeting = async () => {
    try {
      const { error } = await supabase
        .from("meetings")
        .update({
          description: editDescription,
          startDateTime: editStartDateTime,
          endDateTime: editEndDateTime,
        })
        .eq("id", meeting.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMeeting = async () => {
    try {
      const { error } = await supabase
        .from("meetings")
        .delete()
        .eq("id", meeting.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {editing === false ? (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
          <div className="flex-auto">
            <p className="text-gray-900">{meeting.description}</p>
            <p className="mt-0.5">
              <time dateTime={meeting.startDateTime}>
                {format(startDateTime, "h:mm a")}
              </time>{" "}
              -{" "}
              <time dateTime={meeting.endDateTime}>
                {format(endDateTime, "h:mm a")}
              </time>
            </p>
          </div>
          <Menu
            as="div"
            className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
          >
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <CircleIcon
                  sx={{ width: "24px", height: "24px" }}
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => setEditing(true)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => deleteMeeting()}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Delete
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      ) : (
        <form
          onSubmit={() => updateMeeting()}
          className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
        >
          <div className="flex-auto">
            <TextField
              label="Description"
              focused
              size="small"
              autoComplete="off"
              type="text"
              margin="normal"
              required
              defaultValue={meeting.description}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <TextField
              label="Start Time"
              focused
              size="small"
              type="datetime-local"
              required
              margin="normal"
              onChange={(e) =>
                setEditStartDateTime(new Date(e.target.value).toISOString())
              }
            />
            <TextField
              label="End Time"
              focused
              size="small"
              type="datetime-local"
              required
              margin="normal"
              onChange={(e) =>
                setEditEndDateTime(new Date(e.target.value).toISOString())
              }
            />
          </div>
          <Menu
            as="div"
            className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
          >
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <CircleIcon
                  sx={{ width: "24px", height: "24px" }}
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Save
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => setEditing(false)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Cancel
                      </p>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </form>
      )}
    </>
  );
};

CalendarMeeting.propTypes = {
  meeting: PropTypes.object,
};

export default CalendarMeeting;
