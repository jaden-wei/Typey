import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";

import "./DataBox.scss";

export default function Data({ updateAverages, averageWpm, averageAccuracy }) {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            updateAverages();
        }
    }, [user]);

    return (
        <>
            {user !== null ? (
                <div className="average-data">
                    <p>Average WPM: {averageWpm}</p>
                    <p>Average Accuracy: {averageAccuracy}</p>
                </div>
            ) : (
                <div className="average-data">
                    <p>Please log in to save data</p>
                </div>
            )}
        </>
    );
}
