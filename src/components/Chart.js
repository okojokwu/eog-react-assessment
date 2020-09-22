import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Value : ${payload[0].value}, at: ${moment.unix(label).format('hh:mm')}`}</p>
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
    <>
      {props.data[0] ? (
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
      ) : (
        <>
          <Typography variant="h2" gutterBottom>
            Welcome to Peter's EOG React Assessment
          </Typography>
          <Typography variant="h5" gutterBottom>
            lets start by selecting one of the metrics on the list to the left.
          </Typography>
        </>
      )}
    </>
  );
};
