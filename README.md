# API 테스트

# dependencies

* modules

```bash
$ npm install
```

* db config file

``path`` : /config/db.json

```
{
    "development": {
      "username": "root",
      "password": "password",
      "database": "API_test_dev",
      "host": "localhost",
      "dialect": "mysql",
      "logging" : true
    },
    "test": {
      "username": "root",
      "password": "password",
      "database": "API_test_test",
      "host": "localhost",
      "dialect": "mysql",
      "logging" : false
  
    },
    "production": {
      "username": "root",
      "password": "password",
      "database": "API_test",
      "host": "localhost",
      "dialect": "mysql",
      "logging" : false
    }
  }
```

# start

* 개발 서버

```bash
$ npm run development
```

* 테스트 서버

```bash
$ npm run test
```

* 운영 서버

```bash
$ npm run production
```

# END POINT

**IP:PORT** : x.x.x.x:3000

* ADMIN 

```
/ADMIN
```

* version 1.0 API 

```
/API_V_1
```

# 인터페이스 내역

* 1 API 1.0
    - 1.1. [reminder](https://github.com/pjt3591oo/Reminders/#1-reminder)
    - 1.2. [reminderItem](https://github.com/pjt3591oo/Reminders/#2-reminderitem)

# 인터페이스 상세내역


### 1. reminder

* 1.1 reminder 조회

method: GET
path: /reminder
response:

```code```: 200

```json
{
    "lists": [
        {
            "id": 3,
            "name": "test",
            "createdAt": "2018-10-14T07:17:41.000Z",
            "updatedAt": "2018-10-14T07:17:41.000Z"
        },
        {
            "id": 2,
            "name": "test",
            "createdAt": "2018-10-14T07:17:40.000Z",
            "updatedAt": "2018-10-14T07:17:40.000Z"
        }
        . . . 중 략 . . .
    ]
}
```



* 1.2 reminder 생성

path: /reminder
method: POST
request: BODY

```json
{
    "name": ""
}
```

response:

```code```: 201
```json
{
    "id": 4,
    "name": "test",
    "updatedAt": "2018-10-14T07:30:52.421Z",
    "createdAt": "2018-10-14T07:30:52.421Z"
}
```

``code``: 404

```json
{
    "msg": "parameter가 충분하지 않습니다.(name)"
}
```



* 1.3 reminder 수정

path: /reminder/:listId
method: PUT
request: BODY

```json
{
    "name": ""
}
```

response: 

``code``: 201

```json
{
    "id": 2,
    "createdAt": "2018-10-14T07:17:40.000Z"
}
```

``code``: 404
```json
{
    "msg": "${listId}는 존재하지 않습니다."
}
```



* 1.4 reminder 삭제

path: /reminder/:listId
method: DELETE
response:

``code``: 201
```json
{
    "msg": "성공적으로 삭제되었습니다."
}
```

``code``: 404
```json
{
    "msg": "삭제 대상없음"
}
```

### 2. reminderItem

* 2.1 reminderItem 조회

method: GET
path: /reminderitem/:listId
response:

``code``: 200
```json
{
    {
    "id": 2,
    "name": "ttttt112",
    "createdAt": "2018-10-14T07:17:40.000Z",
    "updatedAt": "2018-10-14T07:34:43.000Z",
    "reminderListItems": [
        {
            "id": 6,
            "name": "name_test",
            "status": "123",
            "createdAt": "2018-10-14T07:17:57.000Z",
            "updatedAt": "2018-10-14T07:17:57.000Z",
            "reminderId": 2
        },
        {
            "id": 7,
            "name": "name_test",
            "status": "to do",
            "createdAt": "2018-10-14T07:18:28.000Z",
            "updatedAt": "2018-10-14T07:18:28.000Z",
            "reminderId": 2
        },
        . . . 중 략 . . . 
    ]
}
}
```

```json
{
    "msg": "1에 등록된 item이 없습니다."
}
```

* 2.2 reminderItem 생성

method: POST
path: /reminderitem/:listId
request: BODY

```json
{
    "name" : "",
    "status" : ""
}
```

response:

``code``: 201
```json
{
    "id": 11,
    "name": "name_test",
    "status": "to do",
    "reminderId": "2",
    "updatedAt": "2018-10-14T07:41:54.848Z",
    "createdAt": "2018-10-14T07:41:54.848Z"
}
```

``code``: 404
```json
{
    "msg": "parameter가 충분하지 않습니다.(name, status)"
    
}
```

```json
{
    "msg": "parameter가 충분하지 않습니다.(listId)"
}
```

* 2.3 reminderItem 수정

method: PUT
path: /reminderitem/:listId/:itemId
request: BODY
```json
{
   "name": "",
   "status": "" 
}
```

response:

``code``: 404
```json
{
    "msg": "parameter가 충분하지 않습니다.(listId, itemId)"
}
```

``code``: 404
```json
{
    "msg": "${listId}의 ${itemId}는 존재하지 않습니다."
}
```

``code``: 201
```json
{
    "id": 6,
    "name": "name_test1",
    "status": "update_test2",
    "createdAt": "2018-10-14T07:17:57.000Z",
    "updatedAt": "2018-10-14T07:46:19.000Z",
    "reminderId": 2
}
```

* 2.4 reminderItem 삭제

method: PUT
path: /reminderitem/:listId/:itemId

response:

``code``: 404
```json
{
    "msg": "parameter가 충분하지 않습니다.(listId, itemId)"
}
```

``code``: 404
```json
{
    "msg": "${listId}의 ${itemId}는 존재하지 않습니다."
}
```

``code``: 201
```json
{
    "id": 6,
    "name": "name_test1",
    "status": "deleted",
    "createdAt": "2018-10-14T07:17:57.000Z",
    "updatedAt": "2018-10-14T07:46:19.000Z",
    "reminderId": 2
}
```