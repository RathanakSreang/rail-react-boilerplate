# README

### Khmerlang Account




### API doc
Generate API Doc
```
rake swagger:docs
```
Access API doc
`http://localhost:3000/swagger/index.html`

Setup database: Make you already install postgrest - `sudo -i -u postgres` - login to postgrest `psql` - the create user khmerlang_app

`CREATE ROLE khmerlang_app WITH SUPERUSER CREATEDB LOGIN ENCRYPTED PASSWORD 'RathanakPassword';`
PG error
https://gist.github.com/AtulKsol/4470d377b448e56468baef85af7fd614
