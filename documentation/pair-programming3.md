#### Пара:
Деусов (тестировщик) - Макаревич (разработчик)
#### Стиль: 
Ping-pong
#### Разрабратывали:
CommonService - класс, являющийся Spring-bean'ом отвечащим за получение информации о пользователе, ранее авторизировавшемся в приложении
Тестировщик: написал тесты для получения пользовательских данных по его юзернейму
Разработчик: реализовал сервис CommonService, который получает юзернейм пользователя из Security Context и по нему находит остальные пользовательские данные
#### Понравилось: 
Тестировщик: получил опыт написания тестов для компонентов без реализации. Вероятность появления багов минимальна, следовательно качество и надежность кода возрастает
Разработчик: получил опыт написания компонентов по заранее написанным тестам, смог убедиться в работоспособности написанного мной bean'а
#### Вывод: 
Используя стиль парного программирования Ping-pong, удалось сократить количество возможных ошибок, а следовательно уменьшить время на выявление и исправление багов для разработчика и тестировщика в будущем. Плюс написания компонентов по заранее написанным тестам в том, что создается реализация с наименьшими потерями.

______________________________
#### Пара:
Гончаров(ведущий) - Деусов(ведомый)
#### Стиль: 
Ведущий - ведомый
#### Разрабратывали:
Адаптивная верстка для страницы Projects.
#### Понравилось: 
##### Ведомый: 
Ознакомился с принципом использования media-запросов и принципом построения адаптивной верстки.
##### Ведущий: 
Делиться знаниями и опытом.
#### Вывод: 
Используя стиль парного программирования ведущий-ведомый, удалось обучить напарника новой для него технологии, 
дать минимальные теоретические сведения (в данном случае - написание адаптивной верстки).
Ведомый научился использовать библиотеку Reactstrap для ускорения разработки адаптивной верстки.

______________________________
#### Пара:
Деусов (тестировщик) - Машуков (разработчик)
#### Стиль: 
Ping-pong
#### Разрабратывали:
Odt - класс, отвечащим за преобразование Entities в DataTransferObjects. Тестировщик: написал тесты для проверки правильности преобразования. Разработчик: реализовал класс Odt, который получает на вход Entities и трансформирует их в Dto.
#### Понравилось: 
##### Тестировщик: 
Сэкономил себе время - уменьшил количество ошибок, которые могут возникнуть в будущем. 
##### Разработчик: 
Научился писать код по заранее написанным тестам, что помогло сразу проверить его на правильность
#### Вывод: 
Используя стиль парного программирования Ping-pong, удалось сократить количество возможных ошибок, а следовательно уменьшить время на выявление и исправление багов для разработчика и тестировщика в будущем. Опробовали процесс разработки Test-driven development.
