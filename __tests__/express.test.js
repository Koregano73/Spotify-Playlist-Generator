const userController = require('../server/controllers/userController');

const request = require('supertest');
const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const { ContextExclusionPlugin } = require('webpack');


// run the command below to test just this file
// npm test expressTest

// things SY needs for testing getToken
// const app = new express();
const apiRouter = require('../server/routes/api');

// SY attempts to mock spotifyAPI
const spotifyApi = require('../server/utils/apiWrapper');
jest.mock('../server/utils/apiWrapper', () => {
  return {
    authorizationCodeGrant: jest.fn().mockResolvedValue({
      body: {
        access_token: 'thisisamockaccesstoken',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'thisisamockrefreshtoken',
        scope: 'mockscope'
      },
      statuseCode: 200
    }),
    setAccessToken: jest.fn().mockResolvedValue({ response: 'access token set'}),
    setRefreshToken: jest.fn().mockResolvedValue({response: 'refresh token set'})
  }
});

jest.mock('../server/models/userModel.js', () => {
  return {
    findOneAndUpdate: jest.fn().mockResolvedValue({
      spotify_id: 'test info here',
    })
  }
})


/***********************************************************************************************/
/***********************************************************************************************/
// const MONGO_URI = 'mongodb+srv://pantless-thundergoose:thundergeese@cluster0.uhu1iyu.mongodb.net/?retryWrites=true&w=majority'
/***********************************************************************************************/

// import { NextFunction, Request, Response } from 'express';

const app = require("../server/app.js"); // Link to your server file
const supertest = require("supertest");
// const request = supertest(app);

describe('Test Middleware Controllers', () => {

  const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
  });

  const mockResponse = () => {
    const res = {};
    res.locals = {
      spotify_id: 'sample_spotify_id',
      display_name: 'sample_display_name'
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };


  const mockedNext = jest.fn()

  test('userController.checkIfUserExists should place a user in the res.locals.doc', async () => {
    const req = mockRequest(
      {},
      { password: 'boss' }
    );
    const res = mockResponse();
    const next = mockedNext

    request(app)
    await userController.checkIfUserExists(req, res, next);
    
    // console.log('res test', res.locals)
    
    // expect(typeof res.locals.doc).toBe('object')
    expect(typeof res.locals.doc).toBe('object')
    expect(res.locals.doc.spotify_id).toBe('test info here')
    
  });

})

/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/

describe('Test Route Handlers', function () {

  afterEach(() => jest.resetAllMocks());

  // authorizationCodeGrant data.body:  {
  //   access_token: 'BQAi-WlUg2PVneYlMAJ5v3aKdovUGjMcvvKp89A4IAqmTUjhqvMz4w2LVkbC09a8uiIfqdr5rk5T4i8_N75zghFB8A0lFRNGzaG9v77sNfkNYc9kSLX_P3cBpyPIkDAtNYSES4BMynpPy959hUEDCDLKa6onss2vAQJK3Cx32pXjTqKxTn3geCAS4V4g_9L0-UWYpM5z2onnioYcQJq-AvTHGQJRKJbqacgCZg',
  //   token_type: 'Bearer',
  //   expires_in: 3600,
  //   refresh_token: 'AQDSf4T6IM0n-O1dDLyl2UxmYWDRja6Gh_PZ8Yh6IkzC_W0K50soZYcJsPbHgb3b3PnfkiL-QmQOMhSTPbXohfikWbkzpSy9Ulz8hkzyG_QfTnWEaApacP-Mz0Le29AdHiw',
  //   scope: 'playlist-modify-public'
  // }

  test('GET method to /getToken should redirect to /player', () => {

    return request(app)
      .get('/api/getToken')
      .expect(302)
      .then(res => {
        expect(res.headers.location).toContain('#/player');
    })
  })

  test('GET method to /auth should redirect to spotify OAuth', () => {
    // app.use('/api', apiRouter);
    return request(app)
      .get('/api/auth')
      .then(res => {
        expect(res.statusCode).toBe(302); // 302 indicates a successful temporary redirection
        expect(res.headers.location).toContain('https://accounts.spotify.com/authorize?');
      });
  })

});

/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/



