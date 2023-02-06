import './styles.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'

const series = [
    {
        name: 'Series 1',
        data: [
            { category: 'A', value: Math.random() },
            { category: 'B', value: Math.random() },
            { category: 'C', value: Math.random() },
            { category: 'D', value: Math.random() },
            { category: 'E', value: Math.random() },
        ],
    },
]

export default function App() {
    return (
        <LineChart width={500} height={300}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
                dataKey='category'
                type='category'
                allowDuplicatedCategory={false}
            />
            <YAxis dataKey='value' />
            <Tooltip />
            <Legend />
            {series.map((s) => (
                <Line
                    dataKey='value'
                    data={s.data}
                    name={s.name}
                    key={s.name}
                />
            ))}
        </LineChart>
    )
}
