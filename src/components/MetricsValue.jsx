import React, { useState, useEffect } from 'react';
import { useSubscription } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from './Chip';

const query = `
subscription{
  newMeasurement{
    metric,
    value
   }
}
`;
const handleSubscription = (measurements = [], response) => {
  return [response.newMeasurement, ...measurements];
};
const MetricsValue = () => {
  const [result] = useSubscription(
    {
      query,
    },
    handleSubscription,
  );
  const { fetching, data, error } = result;
  const [mets, getMets] = useState([]);
  useEffect(() => {
    if (error) console.log(error.message);
    if (!data) return;
    getMets(data);
  }, [data, error]);
  if (!fetching) return <LinearProgress />;

  const styles = {
    tezzy: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
    },
  };

  const ftp = mets.filter(measurement => measurement.metric === 'tubingPressure');
  const tpRes = ftp.slice(0, 1).map(measurement => measurement.value);
  const fft = mets.filter(measurement => measurement.metric === 'flareTemp');
  const ftRes = fft.slice(0, 1).map(measurement => measurement.value);
  const fcp = mets.filter(measurement => measurement.metric === 'casingPressure');
  const cpRes = fcp.slice(0, 1).map(measurement => measurement.value);
  const fivo = mets.filter(measurement => measurement.metric === 'injValveOpen');
  const ivoRes = fivo.slice(0, 1).map(measurement => measurement.value);
  const fot = mets.filter(measurement => measurement.metric === 'oilTemp');
  const otRes = fot.slice(0, 1).map(measurement => measurement.value);
  const fwt = mets.filter(measurement => measurement.metric === 'waterTemp');
  const wtRes = fwt.slice(0, 1).map(measurement => measurement.value);
  return (
    <div style={styles.tezzy}>
      <Chip label={'Tubing Pressure: ' + tpRes} />
      <Chip label={'Water Temperature: ' + wtRes} />
      <Chip label={'Oil Temperature: ' + otRes} />
      <Chip label={'Injvalve Open: ' + ivoRes} />
      <Chip label={'Casing Pressure: ' + cpRes} />
      <Chip label={'Flare Temperature: ' + ftRes} />
    </div>
  );
};
export default MetricsValue;
