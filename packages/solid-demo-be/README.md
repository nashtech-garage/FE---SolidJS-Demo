# solid-demo-BE


## Require:
 + Node: 16
## Getting started

### Install Medusa CLI

```
yarn add @medusajs/medusa-cli -g
```
OR
```
npm install @medusajs/medusa-cli -g
```

### Install packages

```
yarn add
```
OR
```
npm i
```

## Setup tool:

- [ ] [Set up MinIO](https://min.io/docs/minio/linux/index.html?ref=docs-redirect)
- [ ] [Set up Redis](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)
- [ ] [Set up Portgresql](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)


## After setup tool, run MinIO and Redis

- MinIO runs port 9000
- Redis runs port 6379

## Create a MinIO bucket

- View MinIO Console at localhost:9000
- Then following these steps:
 + Click on the “Create Bucket” button
 + For the Bucket Name field, enter a name for the bucket. By MinIO’s requirement, the name can only consist of lower case characters, numbers, dots (.), and hyphens (-).
 + Click on the Create Bucket button.
 + On the bucket's page, click on the cog icon at the top right to configure the bucket.
 + Click on the edit icon next to Access Policy.
 + In the pop-up that opens, change the selected value to “public” and click Set.

## Generate Access Keys of MinIO

To generate access keys for your plugin:
 + From the sidebar of your MinIO console, click on Access Keys
 + Click on the "Create access key" button
 + This will open a new form with randomly-generated keys. Click on the Create button.
 + A pop-up will then show the value for your Access Key and Secret Key. Copy them to use in the next section.

## Create postgresql DB

## Create .env file:
```
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret

DATABASE_TYPE=postgres
DATABASE_URL=your_db_url

REDIS_URL=redis://localhost:6379
MINIO_ENDPOINT=http://localhost:9000
MINIO_BUCKET=your_bucket_name
MINIO_ACCESS_KEY=your_access_key
MINIO_SECRET_KEY=your_secret_key

ADMIN_CORS=http://localhost:7000
STORE_CORS=http://localhost:8000
```

## After complete steps above, you can run
```
yarn start
```
OR
```
npm start
```

## Init DB
```
yarn seed
```
OR
```
npm run seed
```
