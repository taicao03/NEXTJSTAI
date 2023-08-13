import React, { PureComponent } from "react";
import numeral from 'numeral';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export default class ChartHistoryBet extends PureComponent {
  render() {
    const data = this.props.data;

    const processedData = data.reduce((result, current) => {
      const date = new Date(current.createdAt).toLocaleDateString();
      if (!result[date]) {
        result[date] = { date, totalValue: 0 };
      }
      result[date].totalValue += current.coinChange;
      return result;
    }, {});
    
    const processedChartData = Object.values(processedData);

    const CustomizedAxisTick = ({ x, y, payload }) => {
      const date = new Date(payload.value);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
            {formattedDate}
          </text>
        </g>
      );
    }
    const gradientOffset = () => {
      const dataMax = Math.max(...data.map((i) => i.coinChange));
      const dataMin = Math.min(...data.map((i) => i.coinChange));

      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }

      return dataMax / (dataMax - dataMin);
    };
    const off = gradientOffset();
    const yAxisFormatter = (value) => {
      return numeral(value).format('0.0a');
    };

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const date = new Date(label);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const formattedValue = numeral(payload[0].value).format('0,0a');
        return (
          <div className="custom-tooltip">
            <p className="label">{`Ngày: ${formattedDate}`}</p>
            <p className="value">{`Coin: ${formattedValue}`}</p>
          </div>
        );
      }

    return null;
    };

  
    return (
      <ResponsiveContainer width="100%" height="100%">
      
        <AreaChart
          width={500}
          height={400}
          data={processedChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            padding={{ left: 30, right: 30 }}
            tick={<CustomizedAxisTick />}
          />
          <YAxis tickFormatter={yAxisFormatter} />

          <Tooltip content={<CustomTooltip />} />

          <Area type="monotone" dataKey="totalValue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
         
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
