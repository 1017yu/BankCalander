// year(연), month(월), day(일)을 매개변수로 받아, 현재 날짜가 해당 연도의 몇 주차인지 구하는 함수.

function weekNumFn(year: number, month: number, day: number): number {
  const date = new Date(year, month - 1, day);
  const firstDayOfYear = new Date(year, 0, 1); // 해당 연도의 첫 날 (****-01-01)
  const daysDifference =
    // (date.valueof() - firstDayOfYear.valueOf()): 구하고자 하는 날짜와 해당 년도 첫째 날의 시간 차이 계산
    // 시간 차이를 일 단위로 변환하기 위해 (1000(ms) * 60(s) * 60(m) + 24(H))로 나눔.
    // daysDiffernece = 두 날짜 사이의 차 (일)
    (date.valueOf() - firstDayOfYear.valueOf()) / (1000 * 60 * 60 * 24);

  // 1월 1일이 1주차이므로, 1를 더한 뒤, 7로 나누어 주차 계산
  const weekNumber = Math.ceil((daysDifference + 1) / 7);

  return weekNumber;
}

export default weekNumFn;
