import React, { useContext } from "react";
import UserContext from "../../../context/UserContext";

import "./DataBox.scss";
import Graph from "./Graph";

export default function Data({ userData, updateUserData }) {
    const { user } = useContext(UserContext);

    return (
        <>
            {userData.length > 0 ? (
                <div className="average-data">
                    <Graph userData={userData} />
                </div>
            ) : !user && (
                <div className="average-data">
                    <p>Please log in to save data</p>
                </div>
            )}
        </>
    );
}
