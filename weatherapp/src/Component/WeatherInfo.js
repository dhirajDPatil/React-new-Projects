import React, { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../Config.js/config";
import Loader from "./Loader";

const WeatherInfo = () => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({});
    const success = async ({coords}) => {
        const { latitude, longitude } = coords;
        const finalUrl = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

        const response = await fetch(finalUrl);
        const data = await response.json();
        setLoader(false); 
        const {
            sys: { country },
            name,
            main: { temp }
          } = data;
      
          const currentWeatherInfo = {
            formattedDate: new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              month: "long",
              year: "numeric",
              day: "numeric"
            }).format(new Date()),
            locationName: name,
            country,
            temparature: temp
          };
          setData(currentWeatherInfo);
    }
    const error = () => {
        console.log("Error while fetching information")
    }

    useEffect(()=> {
        setLoader(true);
        console.log("Api call on load")
        navigator.geolocation.getCurrentPosition(success, error);
    }, [])
    return (
    <div className="container">
        {loader? <Loader/>: <div>
            <p>Country : {data.country}</p>
            <p>Location : {data.locationName}</p>
            <p>Temparature : {data.temparature}</p>
            <p>Date : {data.formattedDate}</p>
            </div>}
    </div>
    )
}

export default WeatherInfo;