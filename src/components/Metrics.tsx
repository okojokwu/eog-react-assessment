import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'urql';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as actions from '../store/actions';
import { useDispatch } from 'react-redux';

const query = `
query{
  getMetrics
}
`;

export default () => {
  // const { click } = useContext(GlobalContext);
  const [mets, getMets] = useState([]);
  const [metricNames, getSentInfo] = useState('');

  const [result] = useQuery({
    query,
  });
  const { fetching, data, error } = result;
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    getMets(data.getMetrics);
    dispatch({ type: actions.DATA_NAME_UPDATED, metricNames });
  }, [dispatch, data, error, metricNames]);
  if (fetching) return <LinearProgress />;
  return (
    <>
      <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group">
        {mets.map(met => (
          <Button onClick={() => getSentInfo(met)} key={mets.indexOf(met)}>
            {met}
          </Button>
        ))}
      </ButtonGroup>
      <Typography variant="h3">{metricNames.toLocaleUpperCase()}</Typography>
    </>
  );
};
