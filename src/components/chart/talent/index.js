import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default class ChartHistoryBet extends PureComponent {
  render() {
    const data = this.props.data;

    const getIntroOfPage = (label) => {
      if (label) {
        return `Page A is about men's clothing`;
      }
      return "";
    };

    const CustomizedAxisTick = ({ x, y, payload }) => {
      const date = new Date(payload.value);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return (
        <text x={x} y={y} dy={16} textAnchor="middle">
          {formattedDate}
        </text>
      );
    };
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
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
            <p className="intro">{getIntroOfPage(label)}</p>
            <p className="desc">Anything you want can be displayed here.</p>
          </div>
        );
      }

      return null;
    };

    const off = gradientOffset();

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="createdAt"
            padding={{ left: 30, right: 30 }}
            tick={<CustomizedAxisTick />}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="coinChange"
            stroke="#000"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
