import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/UserContext";

export default function Data({ updateAverages, averageWpm, averageAccuracy }) {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            updateAverages();
        }
    }, [user]);

    return (
        <div>
            {user !== null ? (
                <div className="averageData">
                    <p>Average WPM: {averageWpm}</p>
                    <p>Average Accuracy: {averageAccuracy}</p>
                </div>
            ) : (
                <div className="averageData">
                    <p>Please log in to save data</p>
                </div>
            )}
        </div>
    );
}
