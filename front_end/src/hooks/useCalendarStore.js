import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { eventToDate } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvent } from '../store';


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
            // update
            /*const { data } = */await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                // console.log({ data });
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return
            }
            // creating 
            const { data } = await calendarApi.post('/events', calendarEvent)
            // console.log({ data })
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventDB.id, user }))

        } catch (error) {
            console.log(error)
            Swal.fire(`Save Error!! ${error.response.data?.msg} error`)
        }



    }

    const startDeletingEvent = async () => {
        // Todo: go to the backEnd
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent());

        } catch (error) {
            console.log(error)
            Swal.fire(`Eliminate Error!! ${error.response.data?.msg} error`)
        }
    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events')
            const events = eventToDate(data.event)
            // console.log(data.event)
            // console.log(events)
            dispatch(onLoadEvent(events))

        } catch (error) {
            console.log(`Loading event error!!`)
            console.log(error)
        }

    }

    return {
        //* properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* methods
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}
