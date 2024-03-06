

# Converter Service

Hello! Thank you for considering me for the position, and I appreciate the opportunity to work on such an interesting task.

## Overview

The Converter Service is a versatile backend application designed to transform data between different formats. It supports EDI, JSON, and XML, providing a convenient way to handle various data transformations required in modern software integrations.

## Technologies

This service leverages a robust stack of technologies:

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, bringing strong typing and object-oriented improvements to the language.
- **Node.js**: A JavaScript runtime for building fast and scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Node-cache**: A simple caching library for Node.js, providing temporary data storage.
- **Swagger API**: An interface description language for describing RESTful APIs expressed using JSON.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.

## Running the Project

### There are two primary ways to get the project up and running:

## Option 1: Local Setup

### `clone repo: git clone https://github.com/DenysMakarov/orderful.git`

### `npm install` to install dependencies

### `npm run dev` on localhost:5100 - Server

## Option 2: Docker Setup

### Create a shell script to build your Docker image
###  `docker build -t converter_edi .`
### Create a shell script to run your Docker container
###  `docker run -p 5100:5100 converter_edi`

## EXAMPLE API POST
### http://localhost:5100/api/v1/convert/edi/json
### http://localhost:5100/api/v1/convert/edi/xml
**TEXT Payload Example:** `ProductID*4*8*15*16*23~ProductID*a*b*c*d*e~AddressID*42*108*3*14~ContactID*59*26~`


### http://localhost:5100/api/v1/convert/json/edi
### http://localhost:5100/api/v1/convert/json/xml
**JSON Payload Example:**

```json
{
  "ProductID": [
    {
      "ProductID1": "4",
      "ProductID2": "8",
      "ProductID3": "15",
      "ProductID4": "16",
      "ProductID5": "23"
    },
    {
      "ProductID1": "a",
      "ProductID2": "b",
      "ProductID3": "c",
      "ProductID4": "d",
      "ProductID5": "e"
    }
  ],
  "AddressID": [
    {
      "AddressID1": "42",
      "AddressID2": "108",
      "AddressID3": "3",
      "AddressID4": "14"
    }
  ],
  "ContactID": [
    {
      "ContactID1": "ads",
      "ContactID2": "26"
    }
  ]
}
```



### http://localhost:5100/api/v1/convert/xml/json
### http://localhost:5100/api/v1/convert/xml/edi
### `req type: application/xml`
**XML Payload Example:**

```xml
<root>
  <ProductID>
    <ProductID1>4</ProductID1>
  </ProductID>
  <ProductID>
    <ProductID1>a</ProductID1>
    <ProductID2>b</ProductID2>
    <ProductID3>c</ProductID3>
    <ProductID4>d</ProductID4>
    <ProductID5>e</ProductID5>
  </ProductID>
  <AddressID>
    <AddressID1>42</AddressID1>
    <AddressID2>108</AddressID2>
    <AddressID3>3</AddressID3>
    <AddressID4>14</AddressID4>
  </AddressID>
  <ContactID>
    <ContactID1>59</ContactID1>
    <ContactID2>26</ContactID2>
  </ContactID>
</root>
```





