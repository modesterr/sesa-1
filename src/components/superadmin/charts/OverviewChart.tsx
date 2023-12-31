import { PieChart, Pie, Cell } from 'recharts'
import { overviewChart_colors } from '../../../pages/superadmin/Overview'
import { overviewChart_data } from '../../../pages/superadmin/Wallet'
import { IEstateChart } from './WalletBarChart'

export const estateChart_data = [
    { name: 'security guard', value: 120 },
    { name: 'sesa', value: 120 },
]

export const EstateChart = ({
    color1 = '#08d231',
    color2 = '#f7e541',
    outerRadius = 80,
    data = estateChart_data,
}: IEstateChart) => {
    const estateChart_colors = [color1, color2]

    return (
        <PieChart width={253} height={253} className='relative'>
            <Pie
                data={data}
                className='overviewChart__pie'
                innerRadius={68}
                outerRadius={outerRadius}
                fill='#8884d8'
                paddingAngle={0}
                dataKey='value'
                startAngle={-270}
                endAngle={90}
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={
                            estateChart_colors[
                                index % estateChart_colors.length
                            ]
                        }
                    />
                ))}
            </Pie>
        </PieChart>
    )
}
export default function OverviewChart() {
    return (
        <PieChart width={253} height={253} className='relative'>
            <Pie
                data={overviewChart_data}
                className='overviewChart__pie'
                innerRadius={68}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={5}
                dataKey='value'
            >
                {overviewChart_data.map((_, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={
                            overviewChart_colors[
                                index % overviewChart_colors.length
                            ]
                        }
                    />
                ))}
            </Pie>
        </PieChart>
    )
}
