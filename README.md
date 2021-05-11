# Entities

## user

- id
- username
- email
- password
- role [superadmin => 0, admin => 1, user => 2]
- createdAt
- updatedAt

- tweets => one to many

## tweets

- id
- user => (many to one)
- content
- comments => (one to many)
