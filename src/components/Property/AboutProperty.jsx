import React from "react"

const AboutProperty = ({ data }) => {
  return (
    <div className="flex flex-col m-auto w-3/5 mt-2">
      <div className="w-42">
        <h1 className="text-black font-mono font-bold text-2xl">
          Hosted by HOST
        </h1>
      </div>
      <div className="flex flex-row  border-b-2 max-w-4/5 mt-1">
        <span className="text-slate-700 font-sans text-sm italic m-1">
          __ guests
        </span>
        <span className="text-slate-700 font-sans text-sm italic m-1">
          __ bedroom
        </span>
        <span className="text-slate-700 font-sans text-sm italic m-1">
          __ beds
        </span>
        <span className="text-slate-700 font-sans text-sm italic m-1">
          __ bathroom
        </span>
      </div>
      <div className="flex flex-col justify-center mr-auto">
        <div className="mt-2 w-60">
          <h2 className="text-black text-sm font-bold">
            Some specs about the place
          </h2>
          <p className="text-slate-700 text-sm italic">
            More description about the place
          </p>
        </div>
        <div className="mt-2 w-60">
          <h2 className="text-black text-sm font-bold">About the host</h2>
          <p className="text-slate-700 text-sm italic">
            More details about the host
          </p>
        </div>
        <div className="mt-2 w-60">
          <h2 className="text-black text-sm font-bold">
            about the type of the place
          </h2>
          <p className="text-slate-700 text-sm italic">
            more about the type of this place
          </p>
        </div>
      </div>
      <div className="w-full mt-3 border-t-2 ">
        <div className="m-1">
          <p className="text-slate-700 text-md italic font-thin">
            Long text about the place : We specialise in resorts and have an
            array of beach villas, water villas and suites available. Contact me
            for more information or to know about any of our promotions* The
            perfect example of affordable luxury, these villas have a built-in
            wow factor. Incredibly spacious decks are furnished with an
            oversized daybed, dining area, sun loungers, a private pool and
            steps straight down to the lagoon. Inside, the king size bedroom
            boasts an alcoved daybed and a spectacular bathroom.
          </p>
        </div>
        <div className="m-3 border-t-2">
          <h2 className="text-xl text-black font-mono font-bold underline m-auto">
            Key specs
          </h2>
          <ul>
            <li className="text-slate-700 font-thin italic">feature</li>
            <li className="text-slate-700 font-thin italic">feature</li>
            <li className="text-slate-700 font-thin italic">feature</li>
            <li className="text-slate-700 font-thin italic">feature</li>
            <li className="text-slate-700 font-thin italic">feature</li>
          </ul>
        </div>
      </div>
      <div className="w-full h-96">
        <iframe
          src={`https://maps.google.com/maps?q=${data?.address?.lat},${data?.address?.long}&output=embed`}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default AboutProperty
