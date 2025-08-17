
```bash
npm i
```

```bash
cp .example.env .env
```

Fill  ***.env***


| VARIABLE                       | EXAMPLE       | DESCRIPTION                       |
|--------------------------------|---------------|-----------------------------------|
| NODE_ENV                       | development   | system environment variable       |
| SERVER_PORT                    | 3000          | server port                       |
| SERVER_PORT_EXTERNAL           | 3000          | external server port              |
| PRIMARY_DATABASE_HOST          | database      | database container name           |
| PRIMARY_DATABASE_PORT          | 3306          | internal database port            |
| PRIMARY_DATABASE_PORT_EXTERNAL | 3306          | external database port for docker |
| PRIMARY_DATABASE_PASSWORD      | user          | database user password            |
| PRIMARY_DATABASE_USERNAME      | user          | default database username         |
| PRIMARY_DATABASE_NAME          | user          | default database name             |
| JWT_SECRET                     | secret_string | jwt secret string                 |


run docker app
```bash
docker compose up
```


Создание юзеров с ролью админ не предусмотрено. Админ создается при старте системы.

Креды админа:


| email             | password     |
|-------------------|--------------|
| admin@admin.com   | adminPassword|