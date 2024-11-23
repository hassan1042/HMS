import React from 'react'
import './bookButton.css'

function BookButton({text, setIsBooking, isBooking}) {
  return (
    /* From Uiverse.io by milegelu */ 
<div>
  <button
   className="button mt-3 mx-auto"
   onClick={() => setIsBooking(!isBooking)}

   >
    <svg
      viewBox="0 0 16 16"
      class="bi bi-lightning-charge-fill"
      fill="currentColor"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
      ></path></svg
    >{text}
  </button>
</div>

  )
}

export default BookButton
