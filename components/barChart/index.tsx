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


    const data = {
        labels: ['insertion sort', 'selection sort', 'Merge sort', 'quick sort', 'heap sort' ],
        datasets: [{
            label: 'best case',
            data: [0.701, 68.742, 1.698, 1.673,  3.906 ],
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
            data: [1.744, 71.972, 1.638, 1.702, 8.419],
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
            data: [81.264,  75.919, 2.961, 2.079, 8.297],
            backgroundColor: [
                '#f03e3e'
            ],
            borderColor: [
                '#c92a2a'
            ],
            borderWidth: 1
        }
    ]
    };

      const options = {
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
                max: 80,
            }
        }


    }



    return (<>
        <ScrollArea w={'100%'} h={'100%'}   >
            <div className={classes.chartContainer} >
                <Bar data={data} style={{ position: 'relative' }} options={options} />
            </div>
        </ScrollArea>
    </>)

}
