import { useState, useCallback } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (initalValue = null) => {
  const [data, setData] = useState(initalValue);

  const handler = useCallback(
    (e) => {
      const { value, name } = e.target;
      setData({
        ...data,
        user: {
          ...data.user,
          [name]: value,
        },
      });
    },
    [data],
  );
  return [data, handler];
};
