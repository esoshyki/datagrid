const faker = require('faker')
const fs = require('fs')

const statuses = [
  'production',
  'design',
  'support'
]

const dataCreator = () => {
  const fakeData = [];
  for (let i=0; i <= 1000; i++) {
    const person = {
      id: i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      nickName: faker.internet.userName(),
      age: Math.floor(18 + Math.random() * 40),
      status: faker.random.arrayElement(statuses),
      married: faker.random.boolean(),
      exam: faker.date.between('2020-01-01', '2021-01-01')
    }
    fakeData.push(person);
  }
  return fakeData
}

const json = JSON.stringify(dataCreator());

fs.writeFile('data.json', json, 'utf8', console.log);

