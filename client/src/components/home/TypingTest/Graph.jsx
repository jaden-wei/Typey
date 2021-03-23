import React, { useEffect } from "react";
import Chart, { defaults } from "chart.js";

defaults.global.defaultFontFamily = "'Poppins', sans-serif";
defaults.global.defaultFontColor = "rgb(100,100,100)";

export default function Graph({ userData }) {
    useEffect(() => {
        drawWpmGraph();
        drawAccuracyGraph();
    }, [userData]);

    const drawWpmGraph = () => {
        console.log(defaults);
        let dates = [];
        let wpm = [];
        let total = 0;

        for (var i = 0; i < userData.length; i++) {
            dates.push(userData[i].createdAt);
            wpm.push(userData[i].wpm);
            total += userData[i].wpm;
        }

        let average = Math.round((total * 10) / wpm.length) / 10;

        const ctx1 = document.getElementById("wpm-chart");

        const data1 = {
            labels: dates,
            datasets: [
                {
                    label: "Your improvement over time",
                    data: wpm,
                    fill: false,
                    borderColor: "#0e87c4",
                },
            ],
        };
        const options1 = {
            title: {
                display: true,
                fontSize: 16,
                padding: 20,
                text: `Average Words Per Minute: ${average}`,
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            display: false,
                        },
                    },
                ],
            },
        };

        new Chart(ctx1, {
            type: "line",
            data: data1,
            options: options1,
        });
    };

    const drawAccuracyGraph = () => {
        let dates = [];
        let accuracy = [];
        let total = 0;

        for (var i = 0; i < userData.length; i++) {
            dates.push(userData[i].createdAt);
            accuracy.push(userData[i].accuracy);
            total += userData[i].accuracy;
        }

        let average = Math.round((total * 10) / accuracy.length) / 10;

        const ctx2 = document.getElementById("accuracy-chart");

        const data2 = {
            labels: dates,
            datasets: [
                {
                    label: "Your improvement in accuracy over time",
                    data: accuracy,
                    fill: false,
                    borderColor: "#d12626",
                },
            ],
        };
        const options2 = {
            title: {
                display: true,
                fontSize: 15,
                padding: 20,
                text: `Average Accuracy: ${average}%`,
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            display: false,
                        },
                    },
                ],
            },
        };

        new Chart(ctx2, {
            type: "line",
            data: data2,
            options: options2,
        });
    };

    return (
        <div>
            <div className="graph-container">
                <canvas id="wpm-chart" />
            </div>
            <div className="graph-container">
                <canvas id="accuracy-chart" />
            </div>
        </div>
    );
}
