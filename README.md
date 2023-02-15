# ptudw-21880144
template: https://htmlcodex.com/bootstrap-ecommerce-template/

# npm
- sudo npm i -g sequelize-cli
- npm i -s -g pg

# database
terminal: sequelize init
   - config: setting connect to database
   - models: create table
   - seeders: example Statement

# create database
 - create table ---> sequelize model:create --name Image --attributes name:string
 - create data in table ---> sequelize db:seed:all

# install SUDO in PC
   0. Windows PowerShell
   1. Set-ExecutionPolicy RemoteSigned -Scope CurrentUser 
   2. irm get.scoop.sh | iex
   3. scoop install sudo
   4. sudo

