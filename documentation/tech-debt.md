## Технический долг

### Преамбула:
- По результатам исследования проекта можно сделать вывод, что код в "back-end" части является легко
читабельным. В случае возникновения ошибки в "back-end" части ее исправление не будет
усложнено неграмотно спроектированной архитектурой или непонятным, запутанным кодом.

- В "front-end" части - компоненты страниц являются слишком большими, что затрудняет внесение новшеств и изменений в код.

- В настоящий момент - низкое покрытие тестами, так как на проекте один тестировщик.

- Благодаря использованию React легко поддерживать структуру приложения, что облегчает его разработку и позволяет быстро обнаружить возникшие проблемы, а также легко их исправить. Графическая составляющая сайта соответствует всем стилистическим ожиданиям.

### Технический долг:
Краткий список проблем выглядит следующим образом:
- Отсутствие тестовой среды
- Отсутсвие удаленно развернутого приложения
- Низкое покрытие тестами
- В компонентах страниц - нечитабельный код в "front-end" части

### Причины возникновения:
- Отсутствие тестовой среды объясняется тем, что тестировщик разворачивал окружение локально, поэтому в настройке тестовой среды не
было необходимости
- Отсутствие удаленно развернутого приложения вызвано отсутствием времени у команды разработчиков, реализующих функционал приложения
- Низкое покрытие кода тестами можно объяснить тем, что на проекте всего один тестировщик, а вся остальная команда занимается реализацией функционала, чтобы успеть реализовать его к demo

### Выводы:
- Большая часть функционала в "back-end" части приложения и в "front-end" части уже реализована. Код в "back-end" части написан читабельно,
архитекура приложения довольно простая, а потому и не запутанна. В настоящий момент
наибольшей проблемой является нечитабельный код в компонентах страниц "front-end" части, а также низкое покрытие тестами.
Эти проблемы вносят наибольший вклад в технический долг. После разбиения крупных компонентов на более мелкие в "front-end" части
и написания тестов, объем технического долга можно будет считать приемлимым.

### User Stories на устранение технического долга:
- [разбиения крупных компонентов в "front-end" части на более мелкие](https://trello.com/c/0M1B5Xtr/74-8-%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0-%D1%8F-%D1%85%D0%BE%D1%87%D1%83-%D1%80%D0%B0%D0%B7%D0%B1%D0%B8%D1%82%D1%8C-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86-%D0%B2-front-end-%D1%87%D0%B0%D1%81%D1%82%D0%B8-%D0%BD%D0%B0-%D0%BC%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE-%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B-%D1%87%D1%82%D0%BE%D0%B1%D1%8B-%D0%BE%D0%B1%D0%BB%D0%B5%D0%B3%D1%87%D0%B8%D1%82%D1%8C)
- [покрытие тестами](https://trello.com/c/4WdYNNPU/75-8%D0%BF%D0%BE%D0%BA%D1%80%D1%8B%D1%82%D1%8C-%D1%82%D0%B5%D1%81%D1%82%D0%B0%D0%BC%D0%B8-back-end)
