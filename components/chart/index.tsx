'use client'
import { Line } from 'react-chartjs-2';

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
} from "chart.js";
import { ScrollArea, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

import classes from './chart.module.css'



type Props = {
    dataset: DataSet[],
    title?: string
    x: string[]
}

type DataSet = {
    label: string
    data: number[] | string[],
    borderColor: string,
    backgroundColor: string,
    pointRadius: number,
}


export default function LineChartComponentSquare2({ title, dataset, x }: Props) {



    const { height, width } = useViewportSize();

    const data = {
        labels: x,
        datasets: dataset
    }
    const options = {
        responsive: true,
        animation: {
            duration: 1000,
        },
        plugins: {
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'n'
                },
                max: 15
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Instructions executed'
                },
                max: width < 500 ? 60 : 20,
            }
        }


    }


    return <>
            <ScrollArea w={'100%'} h={'100%'}   >
        <div className={classes.chartContainer} >
                <Line data={data} style={{ position: 'relative' }} options={options} />
        </div>
            </ScrollArea>
    </>
        ;
}




