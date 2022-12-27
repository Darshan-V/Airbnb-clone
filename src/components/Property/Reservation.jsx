import React, { useState } from "react"
import store from "../../../../airbnb-data/store.js"

const Reservation = () => {
  const [reserve, setReserve] = useState(store)
  return (
    <div className="flex  border border-black  justify-center mt-4 w-96 sticky">
      <div className="flex m-auto">
        <div className="flex m-auto ">
          <div className="flex m-auto">
            <div className="flex flex-col justify-center align-middle w-96 m-1">
              <div className="flex flex-col m-1">
                <div className="flex justify-between align-middle">
                  <span className="text-lg m-1 font-sans font-semibold">
                    {reserve.price} night
                  </span>
                  <i className="m-1">{reserve.stars}</i>
                </div>
                <div className="flex flex-col justify-evenly m-1 ">
                  <div className="flex justify-between border-2 border-black rounded-md">
                    <div className="border border-black w-1/2">
                      <i>Checkin date</i>
                      {/* <SelectDates /> */}
                    </div>
                    <div className="border border-black w-1/2">
                      <i>Checkout Date</i>
                      {/* <SelectDates /> */}
                    </div>
                  </div>
                  <div className="border border-black rounded-md">
                    <p>Select guests</p>
                  </div>
                </div>
                <div className="ml-auto m-1">
                  <button className="bg-red-600 border rounded-lg w-28 h-8 m-2">
                    Reserve
                  </button>
                </div>
              </div>
              <ul className="m-auto">
                <li>You won't be charged yet</li>
              </ul>
              <div className=" m-1 ">
                <section className="calculations sec">
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <p className="underline">Rs {reserve.price} x 2</p>
                      <span>{reserve.price * 2}</span>
                    </div>
                    <div className="flex justify-between">
                      <p className="underline">service fee</p>
                      <span>Rs 0</span>
                    </div>
                  </div>
                  <div className="total before taxes"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation
