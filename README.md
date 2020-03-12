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

### Критерии оценки:

## Максимальный балл за задание: 300 баллов

* **Non-interactive scope +30**
  * **✓ Данные отображаются в таблице в соответствии с функциональными требованиями. +30** 
* **Basic scope +70**
  * **✓ Реализована сортировка по одной колонке. +10**
  * **✓ Понятная индикация, по какой колонке применена сортировка и в каком направлении (по возрастанию или убыванию) +10**
  * **✓ Реализована фильтрация по введённому тексту (поиск подстроки как минимум в значениях одной колонки). +10**
  * **✓ (В дополнение к предыдущему) При фильтрации по тексту производится поиск подстроки в нескольких колонках. +10**
  * **✓ Реализована фильтрация по boolean колонке с помощью UI-элемента toggle иди аналогичного. +10**
  * **✓ Реализована фильтрация по enum колонке. Можно использовать react-select или аналогичный UI-элемент. +10**
  * **✓ (В дополнение к предыдущему) При фильтрации по enum колонке можно выбрать несколько значений (multiselect UI-элемент). +10**

## Advanced scope +150

  * С зажатым shift можно сортировать по нескольким колонкам. +20
  * **✓ Реализована виртуализация рядов для отображении большого объёма данных. +30.**
  * **✓ Функцию виртуализации можно выключить c помощью toggle и сравнить скорость работы и отрисовки страницы. +10**
  * **✓ Ряд таблицы можно выделить кликом и применить к нему какое-либо действие. Выделенный ряд должен отличатся визуально. Самый простой пример действия - удаление из таблицы, но можно придумать любое другое. +20**
  * **✓ (В дополнение к предыдущему) С помощью зажатых Ctrl/shift и/или колонки чекбоксов слева можно выделить одновременно несколько рядов и применить к ним действие. +20**
  * **✓ Можно настраивать видимость колонок (всех или некоторых) демо1, демо2 +20**
  * **✓ Фиксированный заголовок таблицы aka sticky header, то есть при скролле таблицы строка с названиями колонок остаётся видна поверх данных. +10**
  * Фиксированная левая колонка. Принцип тот же, что и для sticky header, но левая колонка (как правило идентифицирующая данные в ряде, например - имя человека) остаётся видна при горизонтальном скролле. +20

## Hacker scope +50

  * Сохранение значений для сортировки, фильтрации, видимости колонок (если реализовано) сохранаются в localStorage так, что при обновлении страницы состояние таблицы сохраняется. +20
  * Экспорт данных в CSV файл (только видимые ряды с сохранением сортировки). +20
  * Значения фильтров для текстовых и enum колонок можно передавать в querystring (приоритет выше, чем у localStorage). +10



  

