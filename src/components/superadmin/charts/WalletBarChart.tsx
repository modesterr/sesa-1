import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'



const estateData = Array.from({ length: 10 }).map((_, i) => ({
    name: (i >= 8 ? `${i - 7}pm` : `${i + 5}am`),
    pv: Math.floor(Math.random() * 200 + 10),
    uv: Math.floor(Math.random() * 200 + 10),
}))

export interface IEstateChart {
    color1?: string
    color2?: string
    outerRadius?: number
    data?: {
        name: string
        value: number
    }[]
}

export const EstateBarChart = ({
    color1,
    color2,
}: IEstateChart) => {
    return (
        <BarChart
            width={750}
            height={300}
            data={estateData}
            // margin={{
            //     top: 5,
            //     right: 30,
            //     left: 20,
            //     bottom: 5,
            // }}
        >
            <XAxis dataKey='name' />
            <YAxis tickCount={5} />
            <Tooltip />

            <Bar dataKey='pv' fill={color1} barSize={20} />
            <Bar dataKey='pv' fill={color2} barSize={20} />
        </BarChart>
    )
}

const data = [
    {
        name: 'Mon',
        pv: 25_000,
    },
    {
        name: 'Tue',
        pv: 30_000,
    },
    {
        name: 'Wed',
        pv: 18_000,
    },
    {
        name: 'Thur',
        pv: 15_000,
    },
    {
        name: 'Fri',
        pv: 22_000,
    },
    {
        name: 'Sat',
        pv: 21_000,
    },
    {
        name: 'Sun',
        pv: 22_000,
    },
]

interface WalletBarChart {
    width?: number,
    height?: number
    chartData?: {
        name: string,
        pv: number
    }[]
}

export default function WalletBarChart({width = 600, height = 300, chartData = data}: WalletBarChart) {
    return (
        <BarChart
            width={width}
            height={height}
            data={chartData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis dataKey='name'  />
            <YAxis
                tickCount={7}
                tickFormatter={(tick) => {
                    return '₦' + tick
                }}
            />
            <Tooltip />

            <Bar dataKey='pv' fill='#08D231' barSize={40} />
        </BarChart>
    )
}
