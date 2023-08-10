import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class ChartHistoryBet extends PureComponent {
   
  render() {
    const CustomizedAxisTick = ({ x, y, payload }) => {
        console.log(payload);
        const date = new Date(payload.value);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return <text x={x} y={y} dy={16} textAnchor="middle">{formattedDate}</text>;
      };
    const data = this.props.data
   
    return (
      <ResponsiveContainer width="100%" height="100%" >
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" padding={{ left: 30, right: 30 }} tick={<CustomizedAxisTick />} />
          <YAxis dataKey={"coinChange"} />
          <Tooltip />
          <Legend />
          <Line
            key={`line-x}`}
            type="monotone"
            dataKey="coinChange"
            stroke="#ffff"
            dot={{ r: 0 }}
          />
      
        </LineChart>


        
      </ResponsiveContainer>
    );
  }
}
