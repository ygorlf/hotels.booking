import Calendar from 'react-calendar';

const BookCalendar = (props: any) => { // eslint-disable-line
  return (
    <Calendar
      value={props.value}
      onChange={props.onChange}
      onClickDay={props.handleDayClick}
      minDate={new Date()}
      selectRange={true}
    />
  )
}

export default BookCalendar;