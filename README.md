# Cp Microservices

A Cutting-Edge Microservice for Efficient Storage, Retrieval, and Collaboration of Competitive Programming Language Templates, and Event Management..

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Project Description
Introducing "Cp Microservices": Your Microservice for Effortless Template Storage, Retrieval, and Empowering Competitive Programmers..
Cp Microservices is a powerful microservice designed specifically for programmers. It offers a simple and convenient solution for storing and retrieving template solutions, tailored to competitive programming languages. Our microservice aims to empower developers by providing an effortless experience and ready-to-use templates that simplify coding tasks and boost productivity.
Cp Microservices is not only a hub for programming language templates but also a powerful resource for staying updated on upcoming contests across various platforms. Our microservice ensures that you are well-informed about coding competitions, challenges, and hackathons hosted on popular platforms like Codeforces, Topcoder, AtCoder, LeetCode, and more.
## Installation

To install and run this project locally, you'll need to have the following dependencies installed:
- Node.js
- npm
- grpc
- express
- cors
- axios

## Usage


This project is a microservice with an API gateway that accepts requests in JavaScript and sends them to two microservices using gRPC architecture.

The API gateway exposes the following endpoints:

- `GET /creator/:id`: Retrieve templates based on the provided `id`, which is in the format of `creator-language` (e.g., 'iheb-cpp').

- `POST /template`: Create a new template.

  Example Request Body:

  ```json
  {
    "creator": "John Doe",
    "description": "Template description",
    "language": "English"
  }
  ```
  Example Response:

  ```json
  {
    "creator": "John Doe","token": "abcd1234"
  }
  ```
  
  - DELETE /del/:id: Delete a template based on the provided id = tocken.

    Example Response:

  ```json
  {
    "success": true
  }
  ```
  
  - GET /templates/:id: Retrieve a template based on the provided id = tocken.
  - GET /contest: Get upcoming contests.

    Example Response:

  ```json
  {
    [
  {
    "name": "Codeforces Round (Div. 1)",
    "startTimeSeconds": "1687098900"
  },
  {
    "name": "Codeforces Round (Div. 2)",
    "startTimeSeconds": "1687098900"
  }
    ]
  }
  ```

## Contact

iheb.rachdi@polytechnicien.en.

