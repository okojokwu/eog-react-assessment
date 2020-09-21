import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useQuery } from 'urql';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const query = `
query{
  getMetrics
}
`;

export default () => {
  const [mets, getMets] = useState([]);
  const [sentInfo, getSentInfo] = useState('');
  const [result] = useQuery({
    query,
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) console.log(error.message);
    if (!data) return;
    getMets(data.getMetrics);
  }, [data, error]);
  if (fetching) return <LinearProgress />;
  console.log(sentInfo);
  return (
    <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group">
      {mets.map(met => (
        <Button onClick={() => getSentInfo(met)} key={mets.indexOf(met)}>
          {met}
        </Button>
      ))}
    </ButtonGroup>
  );
};
