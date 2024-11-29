# Blog 
This  is a full-stack blogging web application where users can manage blog posts through an admin dashboard and view them on a public-facing site.
## Features 

- User authentication and authorization with JWTs (Passport and Passport JWT Strategy).
 
- Create, Read, Update, and Delete (CRUD) functionality for:
  - Blog Posts

  - Comments

  - Users

- Public-facing frontend for viewing blogs.

- Admin frontend for managing content.

- Responsive UI built with Tailwind CSS and ShadCN.

## Tech Stack 
 
- **Frontend:**  React, Vite, Tailwind CSS, ShadCN
 
- **Backend:**  Node.js, Express, Passport
 
- **Database:**  PostgreSQL
 
- **ORM:**  Prisma
 
- **Hosting:** 
  - Backend: Railway

  - Frontend: Vercel

# API Routes 

## Posts 
| Method | Endpoint | Notes | 
| --- | --- | --- | 
| GET | /posts | Public | 
| POST | /posts | Requires authentication | 
| GET | /posts/all | Requires authentication | 
| GET | /posts/:postId | Public | 
| PUT | /posts/:postId | Requires authentication | 
| DELETE | /posts/:postId | Requires authentication | 

## Comments 
| Method | Endpoint | Notes | 
| --- | --- | --- | 
| GET | /posts/:postId/comments | Public | 
| POST | /posts/:postId/comments | Public | 
| DELETE | /posts/:postId/comments/:commentId | Requires authentication | 

## Users 
| Method | Endpoint | Notes | 
| --- | --- | --- | 
| GET | /users |  | 
| GET | /users/user |  | 
| DELETE | /users/:userId |  | 

## Authentication 
| Method | Endpoint | Notes | 
| --- | --- | --- | 
| POST | /auth/sign-up |  | 
| POST | /auth/login |  | 

---

## Usage 
 
- **Public Client:** 
  - View all blogs from all users.

  - Non-users can add comments to posts.
 
- **Private Client:** 
  - Perform CRUD operations on own posts & comments.

## Deployment 
 
- Public frontend: Hosted on [Vercel](https://public-blog-ochre.vercel.app/)

- Private frontend: Hosted on [Vercel](https://private-blog-rubinimeris-projects.vercel.app/)
 
- Backend: Hosted on [Railway](https://railway.app/)

## License 

This project is licensed under the MIT License.

## Acknowledgments 
 
- [Prisma](https://www.prisma.io/)  for database ORM.
 
- [Tailwind CSS](https://tailwindcss.com/)  and [ShadCN](https://shadcn.dev/)  for UI design.


---
