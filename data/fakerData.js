const faker = require('faker')
const fs = require('fs')

const dataCreator = () => {
  const fakeData = [];
  for (let i=0; i <= 1000; i++) {
    const person = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      nickName: faker.internet.userName(),
      age: Math.floor(18 + Math.random() * 40),
    }
    fakeData.push(person);
  }
  console.log(fakeData)
  return fakeData
}

const json = JSON.stringify(dataCreator());

fs.writeFile('data.json', json, 'utf8', console.log);