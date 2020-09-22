import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';

const CustomToolTip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="desc">cooming up with solution</p>
      </div>
    );
  }
  return null;
};

export default props => {
  if (!props.data) return <LinearProgress />;
  let xAxisFormatter = date => {
    return moment.unix(date).format('hh:mm');
  };
  return (
    <LineChart
      width={900}
      height={600}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis type={'category'} tickFormatter={xAxisFormatter} dataKey="at" />
      <YAxis unit={props.data.unit} type="number" domain={['auto', 'auto']} />
      <Tooltip content={CustomToolTip} />
      <br />

      <Line
        name={props.data.metric}
        unit={props.data.unit}
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 5 }}
      />
    </LineChart>
  );
};
