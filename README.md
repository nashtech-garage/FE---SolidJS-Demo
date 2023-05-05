# FE---SolidJS-Demo

## Install packages

```bash
$ lerna bootstrap --hoist
```

## Run MinIO and Redis on MacOS

- MinIO runs port 9000
```bash
$ minio server /etc/default/minio
```

- Redis runs port 6379
```bash
$ redis-server
```

## Run:

```
yarn
yarn start
```

```
http://localhost:8000/
```

## Admin

admin@medusa-test.com/supersecret
```
http://localhost:7000/
```



## Use Postgress db

- Create your new postgres db
- Then restore to import DB from 'packages/db/db.sql'

## Use bucket minio

- Create your bucket
- Go to folder containing your bucket
- Copy all items in 'packages/db/my-store' then paste to your bucket folder 