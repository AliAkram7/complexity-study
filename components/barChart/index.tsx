'use client'
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    BarElement,
} from "chart.js";


import { ScrollArea } from '@mantine/core';

import classes from './chart.module.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    BarElement

);





export default function BarChart() {


    const chart =  {
        type : 'bar',
        data : {
            labels: ['insertion sort', 'selection sort', 'Merge sort', 'quick sort', 'heap sort'],
            datasets: [{
                label: 'best case',
                data: [0.143, 47.529, 1.59, 1.648, 3.711],
                backgroundColor: [
                    '#2b8a3e',
                ],
                borderColor: [

                    '#087f5b',
                ],
                borderWidth: 1
            },
            {
                label: 'average case',
                data: [43.07, 51.727, 1.668, 1.673, 3.771],
                backgroundColor: [
                    '#fcc419',

                ],
                borderColor: [
                    '#f59f00'
                ],
                borderWidth: 1
            },
            {
                label: 'worst case',
                data: [63.316, 67.228, 1.704, 2.344, 5.513],
                backgroundColor: [
                    '#f03e3e'
                ],
                borderColor: [
                    '#c92a2a'
                ],
                borderWidth: 1
            }
            ]
        },

        options : {
            responsive: true,
            animation: {
                duration: 200,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'title ',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'sorting algorithms'
                    },
                    max: 20
                },
                y: {
                    title: {
                        display: true,
                        text: 'execution time by ms'
                    },
                    max: 70,
                }
            }


        }
    }



    return (<>
        <ScrollArea w={'100%'} h={'100%'}   >
            <div className={classes.chartContainer} >
                <Bar data={chart.data} style={{ position: 'relative' }} options={chart.options} />
            </div>
        </ScrollArea>
    </>)

}
