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


### 11. reminder

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



* 2.2 reminder 생성

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



* 2.2 reminder 수정

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

```