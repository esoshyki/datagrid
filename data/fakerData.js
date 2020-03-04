const faker = require('faker');

const dataCreator = async () => {
  console.log('here')
  const fakeData = [];
  for (let i=0; i <= 10; i++) {
    const person = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      nickName: faker.internet.userName(),
      age: Math.floor(18 + Math.random() * 40)
    }
    fakeData.push(person);
  }
  return fakeData
}

export default dataCreator;