import React, { useContext, useEffect, useState } from "react";
import Chart from "chart.js";
import axios from "axios";
import domain from "../../../util/domain";

import "./Graph.scss";
import UserContext from "../../../context/UserContext";

export default function Graph( {updateAverages} ) {
    const [userData, setUserData] = useState([]);

    const { user } = useContext(UserContext);

    let dates = [];
    let scores = [];

    const fetchData = async () => {
        setUserData(await (await axios.get(`${domain}/test`)).data);
        
        for (var i = 0; i < userData.length; i++) {
            dates.push(await(userData[i].createdAt));
            scores.push(await(userData[i].wpm));
        }

        drawGraph(dates, scores);
    };

    const drawGraph = async (dates, scores) => {
        const ctx = document.getElementById("myChart");

        const data = {
            labels: dates,
            datasets: [
                {
                    label: "Your improvement over time",
                    data: scores,
                    fill: false,
                },
            ],
        };
        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };

        new Chart(ctx, {
            type: "line",
            data: data,
            options: options,
        });
    };

    useEffect(() => {
        fetchData();
    }, [user, updateAverages]);

    return (
        <div>
            <div className="graph-container">
                <canvas id="myChart" width="400" height="400" />
            </div>
        </div>
    );
}
