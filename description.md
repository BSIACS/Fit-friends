# Fit-friends

## 1. Запустить контейнер базы данных

```bash
docker-compose up -d
```
Запуск контейнеров БД Postgres и интерфейса администрирования

## 2. Сгенерировать клиент ORM Prisma

```bash
nx run backend:db-generate
```

## 3. Выполнить миграцию БД

```bash
nx run backend:db-migrate
```

## 3. Заполнить БД тестовыми данными

```bash
nx run backend:db-fill
```

## 4. Запуск rest-api приложения

```bash
nx run backend:serve 
```
