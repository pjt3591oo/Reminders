# API 테스트

# dependencies

```bash
$ npm install
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
    - 1.1. reminder
    - 1.2. reminderItem

# 인터페이스 상세내역


### 1. reminder

* 1.1 reminder 조회

method: GET
path: /
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

path: /
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

path: /:listId
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

path: /:listId
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
path: /listId
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