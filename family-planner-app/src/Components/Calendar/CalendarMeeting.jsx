import { Fragment } from "react"
import { Menu, Transition } from '@headlessui/react'
import PropTypes from "prop-types"
import { format, parseISO } from 'date-fns'
import CircleIcon from '@mui/icons-material/Circle';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function CalendarMeeting({ meeting }) {
    let startDateTime = parseISO(meeting.startTime)
    let endDateTime = parseISO(meeting.endTime)
  
    return (
      <li className="flex justify-center items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-900">{meeting.description}</p>
          <p className="mt-0.5">
            <time dateTime={meeting.startTime}>
              {format(startDateTime, 'h:mm a')}
            </time>{' '}
            -{' '}
            <time dateTime={meeting.endTime}>
              {format(endDateTime, 'h:mm a')}
            </time>
          </p>
        </div>
        <Menu
          as="div"
          className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
        >
          <div>
            <button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <CircleIcon className="w-6 h-6" aria-hidden="true" />
            </button>
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
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Cancel
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>
    )
  }

  CalendarMeeting.propTypes = {
    meeting: PropTypes.object
  }

  export default CalendarMeeting