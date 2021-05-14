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

## Designing Tweet endpoints

- [x] adding tweet (addTweetByUserId)
- [x] get all tweets of a user (getTweetsByUserId)

- [x] get single tweet (getTweetById)
- [x] user cannot delete others tweet so (deleteTweetByUserIdAndTweetId)
- [x] similary for updating tweet (updateTweetByUserIdAndTweetId)
