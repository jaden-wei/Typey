import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";

import "./DataBox.scss";
import Graph from "./Graph";

export default function Data({ updateAverages, averageWpm, averageAccuracy }) {
    const [userData, setUserData] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            updateAverages();
        }
    }, [user]);

    return (
        <>
            {user !== null ? (
                <>
                    <div className="average-data">
                        <p>Average WPM: {averageWpm}</p>
                        <p>Average Accuracy: {averageAccuracy}</p>
                    </div>
                    <Graph updateAverages={updateAverages}/>
                </>
            ) : (
                <div className="average-data">
                    <p>Please log in to save data</p>
                </div>
            )}
        </>
    );
}
