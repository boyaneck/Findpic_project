let arrayOfObjects = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }, // 중복되는 객체
];

let uniqueObjects = arrayOfObjects.reduce((acc, obj) => {
  let objectString = JSON.stringify(obj);
  console.log('Object String:', objectString); // 중간 결과 출력
  if (!acc.includes(objectString)) {
    acc.push(objectString);
  }
  return acc;
}, []);

console.log('Unique Objects (as JSON strings):', uniqueObjects);