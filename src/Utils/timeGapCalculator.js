const timeGapCalculator = (date) => {
  const current = new Date();
  const whenCreated = new Date(date);
  const timeDifference = current - whenCreated;

  if (timeDifference < 60 * 1000) {
    const secondsAgo = Math.floor(timeDifference / 1000);
    if (secondsAgo === 0) return `1초 전`;
    return `${secondsAgo}초 전`;
  }

  if (timeDifference < 60 * 60 * 1000) {
    const minutesAgo = Math.floor(timeDifference / (60 * 1000));
    return `${minutesAgo}분 전`;
  }

  if (timeDifference < 24 * 60 * 60 * 1000) {
    const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
    return `${hoursAgo}시간 전`;
  }

  if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    return `${daysAgo}일 전`;
  }

  const year = whenCreated.getFullYear();
  const month = String(whenCreated.getMonth() + 1).padStart(2, '0');
  const day = String(whenCreated.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};

export default timeGapCalculator;
