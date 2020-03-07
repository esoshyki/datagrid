### Функциональные требования

**✓** Минимум 1000 рядов <br>
**✓** Минимум 7 колонок. <br>
**✓** Значения в колонках минимум трёх разных типов
```javascript
const person = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  nickName: faker.internet.userName(),
  age: Math.floor(18 + Math.random() * 40),
  status: faker.random.arrayElement(statuses),
  married: faker.random.boolean(),
  exam: faker.date.between('2020-01-01', '2021-01-01')
  }
```
