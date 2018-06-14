<img src="assets/a-count-logo.svg" width="100" heigh="100" style="display: block; margin: 0 auto"/>

# a-count

simple accounting universal application  

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [about](#about)
- [website](#website)
- [developers](#developers)
  - [domain supported](#domain-supported)
  - [as an React exercice](#as-an-react-exercice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## about

An accounting app, where you can:

- create an account
- manage customers
- manage quotations/invoices lifetime
- print any quotations/invoices from the browser
- select a currency for **presentational purpose only**

## website

[https://a-count.herokuapp.com/](https://a-count.herokuapp.com/)  

## developers

see [README_DEV.md](/README_DEV.md) for building the application

This project was based on [codemancer code](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/)

Here are some of the things I wanted to experiment with:

### domain supported 

- should work without JS activated on the client
- clear separation of the app & the API (mono-repository)
- authentication
- i18n

### as an React exercice

- could integrate with some browser API (IntersectionObserver)
- could use some pre-build react components
- build some custom components
- should stay close to JS (no typescript, no experimental JS specs)
- shouldn't use too much external modules
