import { format, formatDistance, formatDistanceToNow, parseISO } from 'date-fns';
import { space } from 'postcss/lib/list';
import React from 'react'

const Time = ({timestamp}) => {
    let timeAgo = "";
    if(timestamp){
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo= `${timePeriod} ago`
    }
  return (
    <span className='timestamp'>
        &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default Time