import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../authorization/AxiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = () => {
    axiosWithAuth()
      .get('/colors')
      .then((response) => {
        setColorList(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        fetchColors={fetchColors}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
