# Архитектура
1. [Проектирование архитектуры](#type) <br>
  1.1 [Тип приложения](#type) <br>
  1.2 [Стратегия развертывания](#strategy) <br>
  1.3 [Используемые технологии](#technology) <br>
  1.4 [Реализация сквозной функциональности](#throught) <br>
  1.5 [Показатели качества](#quality) <br>
  1.6 [Диаграммы](#diagram) <br>
2. [Анализ архитектуры](#analysis) <br>
3. [Пути улучшения архитектуры](#upgrade) <br>
4. [Вывод](#result) <br>

<a name='type'></a>
## 1. Проектирование архитектуры 
### 1.1 Тип приложения
  Данное приложение строится на монолитной архитектуре и будет состоять из трех модулей:
- Core - Основополагающий модуль системы, содержащий бизнес логику. Данный модуль непосредственно взаимодействует с базой данных.
- Web - модуль, решающий задачи специфичные для web-приложений ( принятие запросов, и отправка ответов ). Делигирует Core модулю решение бизнес задач.
- FrontEnd - отвечает за интерфейс системы и взамодействие с пользователем. Взаимодействует с Web модулем с помощью HTTP запросов.
 
<a name='strategy'></a>
### 1.2 Стартегия развертывания
  Для автоматизации развертывания будет применяться Docker. Какждый модуль будет помещен в отдельный снимок - исполняемый пакет, который будет содержать код, все необходимые зависимости и системные переменные. После того, как снимок будет запущен, то он становится отдельной средой выполнения - контейнером. Преимущество данного подхода заключается в том, приложения выполняется не на отдельной виртуальной машине, а в контейнере, который менее ресурсозатратный и запускается на любой ОС.
  
<a name='technology'></a>
### 1.3 Используемые технологии
  Для написания серверной части был выбран Spring Framework (5), поскольку он наиболее распространен и предоставляет очень широкий и удобный инструментарий, позволяющий в несколько строк кода и пару аннотаций создать с нуля полноценный REST веб-сервис. 
  Клиентская часть будет написана с использованием библиотеки React v16.8. Так как React предоставляет возможности разбивать код на компоненты, что облегчает его переиспользование и грамотное разбитие на независимые друг от друга классы и объекты, а также использует Virtual DOM, что существенно улучшает производительность клиентской части приложения.
<a name="throught"></a>
### 1.4 Реализация сквозной функциональности
  Система логгирования была написана путем вызова функций логгирования во всех участках кода. Для обработки ошибок, возникающих на уровне пакетов типа service реализованы отдельные контроллеры обработки ошибок, которые перехватывают пробрасываемые выше исключения и обрабатывают их. 
  Безопасность приложения будет реализована с примененим Spring Security, что ограничит доступ пользователей к чужим аккаунтам.
  
<a name="quality"></a>
### 1.5 Показатели качества
  - Доступность любой функциональности приложения в три клика.
  
<a name="diagrams"></a>
### 1.6 Диаграммы
  С диаграммами приложения можно ознакомиться по следующей [ссылке](https://github.com/evgenyv13/LaborExchange/blob/master/documentation/diagram.md)

<a name="analysis"></a>
## 2. Анализ архитектуры
  Архитектура Core модуля состоит из множества пакетов, описывающих сущности, каждый из которых, в свою очередь, может содержать следующие пакеты ( в зависимости от решаемых задач) :
  - dto - Содержат классы, которые представляют сущности в удобном формате для клиентской части приложения.
  - entity - Содержит классы, отображающие сущности и отношения между ними, с которыми работает данное приложение (проект, задача в проекте).
  - repository - В данном пакете находятся репозитории - интерфейсы, взаимодействующие непосредственно с базой данных.
  - service - Внутри классов данного пакета содержится вся бизнес-логика приложения. CRUD операции над объявлениями и пользовательскими аккаунтами находятся именно здесь.
  А так-же может содержать common пакет, включащий в себя следующее:
  - configuration - Классы, выполняющие настройку фреймворка.
  - odt - Классы, занимающиеся пребразованием сущностей в dto.

  
 Архитектура Web модуля имеет схожую структуру, однако имеет дополнительный пакет:
   - controller - Содержит внутри себя, контроллеры, отвечающие на запросы со стороны пользователя. 
 В том числе сюда входят Advice контроллеры, задача которых заключается в обработке ошибок, пробрасываемых классами пакета service.
 
 <a name="upgrade"></a>
## 3. Пути улучшения архитектуры
В целях улучшения архитектуры приложения, необходимо: .
  - [User Story](https://trello.com/c/K7ikv2xy/59-3%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D1%8F-%D1%85%D0%BE%D1%87%D1%83-%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D1%8B-%D0%B8%D1%81%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B9-%D0%B0-%D1%82%D0%B0%D0%BA%D0%B6%D0%B5-%D0%B8%D1%85-%D0%B3%D0%BB%D0%BE%D0%B1%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%B8-%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5-%D0%B2-%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B5-%D0%B2%D0%BE%D0%B7%D0%BD%D0%B8%D0%BA%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%B8%D1%8F) Добавить собственные классы исключений, а также их глобальные обработчики которые в случае возникновения исключения, будут отправлять соответствующие статус-коды.
  - [User Story](https://trello.com/c/3wyZpFfG/60-3%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D1%8F-%D1%85%D0%BE%D1%87%D1%83-%D0%B2%D1%8B%D0%BD%D0%B5%D1%81%D1%82%D0%B8-%D0%B2%D1%81%D1%8E-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D0%BB%D0%BE%D0%B3%D0%B8%D0%BA%D1%83-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B8%D0%B7-%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D0%BB%D0%B5%D1%80%D0%BE%D0%B2-%D0%B2-%D1%81%D0%BE%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D1%81%D1%82%D0%B2%D1%83%D1%8E%D1%89%D0%B8%D0%B5-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B5-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%82%D0%BE%D0%B3%D0%BE-%D1%87%D1%82%D0%BE%D0%B1%D1%8B-%D0%B0) Вынести всю бизнес логику приложения из контроллеров в соответствующие сервисные методы.
  - [User Story](https://trello.com/c/1xN2cLUa/61-3%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D1%8F-%D1%85%D0%BE%D1%87%D1%83-%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%83-%D0%BF%D0%BE%D0%B4%D1%82%D1%8F%D0%B3%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-%D0%BE%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9-%D0%B1%D0%B0%D0%B7%D1%8B-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%B4%D0%BB%D1%8F-%D1%82%D0%BE%D0%B3%D0%BE-%D1%87%D1%82%D0%BE%D0%B1%D1%8B-%D0%BE%D0%B1%D0%BB%D0%B5%D0%B3%D1%87%D0%B8%D1%82%D1%8C-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83) Добавить систему подтягивания обновлений базы данных с целью облегчения разработки (liquibase).
  - [User Story](https://trello.com/c/9N0Qnlew/62-1%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-%D1%8F-%D1%85%D0%BE%D1%87%D1%83-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C-feature-pack%D0%B0ging-%D0%B4%D0%BB%D1%8F-%D1%82%D0%BE%D0%B3%D0%BE-%D1%87%D1%82%D0%BE%D0%B1%D1%8B-%D1%83%D0%BB%D1%83%D1%87%D1%88%D0%B8%D1%82%D1%8C-%D1%87%D0%B8%D1%82%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C-%D0%BA%D0%BE%D0%B4%D0%B0) Применить Feature-packаging для улучшения читабельности кода.

 <a name="result"></a>
## 4. Вывод
  При применении предлагаемых изменений повысится читабельность кода, увеличится скорость разработки, увеличится производительность backend-сервера, при этом увеличится количество кода и добавится несколько новых пакетов, например, пакет exception, который будет иметь связи почти со всеми классами, в которых может возникнуть исключение. Также будет произведено логическое разбиение функциональности по пакетам, что увеличит их количество, однако не повлияет на количество связей между классами, т.о. диаграмма классов станет детальнее и объёмнее.
  Подводя итоги, можно с уверенностью сказать, что архитектура станет качественнее, что оправдывает проведение её рефакторинга.
