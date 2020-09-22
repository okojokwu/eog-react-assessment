import React, { useState, useEffect } from 'react';
import { useQuery } from 'urql';
import Chart from '../../components/Chart';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

const heartbeat = `
query{
  heartBeat
}
`;
const measurements = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;
const getMetricNames = state => {
  const { metricNames } = state.metricNames;
  return {
    metricNames,
  };
};

export default () => {
  const { metricNames } = useSelector(getMetricNames);
  // time query
  const [res] = useQuery({
    query: heartbeat,
  });
  // state variables
  const [heart, getHeart] = useState(0);
  const [mes, getMes] = useState([]);

  // Object to query variable
  const input = {
    metricName: metricNames,
    before: heart,
    after: heart - 30000,
  };

  // measurement object
  const [result] = useQuery({
    query: measurements,
    variables: { input: input },
  });
  // event life cycle
  useEffect(() => {
    //   handle errors
    if (res.error) console.log(res.error.message);
    if (result.error) console.log(result.error.message);
    if (!result.data || !res.data) return;
    getMes(result.data.getMeasurements);
    getHeart(res.data.heartBeat);
  }, [res.error, res.data, result.error, result.data]);
  if (res.fetching || result.fetching) return <LinearProgress />;

  return <Chart data={mes} />;
};
