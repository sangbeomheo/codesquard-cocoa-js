'use-strict';

// 전역변수
let logArr = new Array();

// getArea()
// 1. 매개변수들을 숫자형 배열로 변환하는 함수 호출
// 2. shape 별로 넓이 값(area)을 구하는 함수를 호출
// 3. 함수호출로그(shape, area)를 로그배열(logArr)에 저장
function getArea(shape, ...size) {
  const numTypeSize = convertToNumber(...size);
  let area;

  switch (shape) {
    case 'rect':
      area = getRect(...numTypeSize);
      break;
    case 'trapezoid':
      area = getTrapezoid(...numTypeSize);
      break;
    case 'circle':
      area = Math.round(getCircle(...numTypeSize));
      break;
    default:
      console.log('도형을 정확하게 입력해주세요.');
      return false;
  }
  saveExecutionSequence(shape, area);
}

// convertToNumber()
// 1. 매개변수들의 자료형을 숫자로 -> 배열 생성
function convertToNumber(...value) {
  let valueArr = new Array();
  valueArr.push(...value);
  let numberArr = valueArr.map(Number);
  return numberArr;
}

// getRect()
// 1. 넓이 값 계산 -> 리턴
function getRect(width, height) {
  return width * height;
}

// Trapezoid()
// 1. 넓이 값 계산 -> 리턴
function getTrapezoid(shortBase, longBase, height) {
  return ((shortBase + longBase) * height) / 2;
}

// getCircle()
// 1. if radius2의 값이 있으면 sumCircles() 리턴
// 2. 아니면 넓이 값 계산 -> 리턴
function getCircle(radius1, radius2) {
  const PI = Math.PI;

  if (radius2 !== undefined) {
    return sumCircles(radius1, radius2);
  }
  return radius1 * radius1 * PI;
}

// sumCircles()
// 1. 반지름이 radius1~radius2인 원 넓이의 합 계산 -> 리턴
function sumCircles(radius1, radius2) {
  const PI = Math.PI;
  let sum = 0;
  for (let i = radius1; i < radius2 + 1; i++) {
    sum += i * i * PI;
  }
  return sum;
}

// saveExecutionSequence()
// 1. 배열 logArr에 shape, area값 문자열 저장
function saveExecutionSequence(shape, area) {
  logArr.push(`${shape}, ${area}`);
}

// printExecutionSequence()
// 1. 배열 logArr를 문자열로 변환 -> 출력
function printExecutionSequence() {
  const stringLog = logArr.join(' / ');
  console.log(`log: ${stringLog}`);
}

// node.js 로 입력 값 받아서 결과 도출하기
// 참고 링크 https://nscworld.net/2020/12/28/node-js%EC%97%90%EC%84%9C-%EC%9E%85%EB%A0%A5%EB%B0%9B%EB%8A%94-%EB%B0%A9%EB%B2%95/
// ex)
// 사용자 입력 : circle,10/circle,1,10/rect,10,20/trapezoid,10,20,50
// 예상 출력 내용 : log: circle, 314 / circle, 1210 / rect, 200 / trapezoid, 750

const readline = require('readline');
const std = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

std
  .on('line', (line) => {
    // 1. 입력 받은 내용을 ['shape,number,number', 'shape,number,number'] 형태로 분리해 배열 만듬
    // 2. 반복문으로 getArea(shape, number, number) 호출
    logArr = [];
    userInputArr = line.split('/');
    userInputArr.forEach((value) => {
      const singleArr = value.split(',');
      getArea(...singleArr);
    });
    printExecutionSequence();

    std.close();
  })
  .on('close', () => process.exit());

// 테스트 하기!
// 예상 출력 내용 : log: circle, 314 / circle, 1210 / rect, 200 / trapezoid, 750
function testCase() {
  logArr = [];
  getArea('circle', 10);
  getArea('circle', 1, 10);
  getArea('rect', 10, 20);
  getArea('trapezoid', 10, 20, 50);
  printExecutionSequence();
}
testCase();
