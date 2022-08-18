const userController = require('../server/controllers/userController');

const request = require('supertest');
const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const { ContextExclusionPlugin } = require('webpack');


// run the command below to test just this file
// npm test expressTest

// things SY needs for testing getToken
const app = new express();
const apiRouter = require('../server/routes/api');

// SY attempts to mock spotifyAPI
const spotifyApi = require('../utils/apiWrapper');
jest.mock('../utils/apiWrapper');

const mockedSpotifyApi = jes.mocked(spotifyApi, true);

// const { mocked } = require('ts-jest/utils');
// const mockSpotifyApi = mocked();

/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/

import { NextFunction, Request, Response } from 'express';

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

  // const mockReq = () => {
  //   const req = {};
  //   // ...from here assign what properties you need on a req to test with
  //   return req;
  // };

  // const mockRes = () => {
  //   const res = {};
  //   res.locals = {
  //     spotify_id: 'sample_spotify_id',
  //     display_name: 'sample_display_name'
  //   };

  //   res.status = jest.fn().mockReturnValue(res);
  //   res.json = jest.fn().mockReturnValue(res);
  //   return res;
  // };

  const mockedNext = jest.fn()

  test('userController.checkIfUserExists should place a user in the res.locals.doc', async () => {
    const req = mockRequest(
      {},
      { password: 'boss' }
    );
    const res = mockResponse();
    const next = mockedNext
    await userController.checkIfUserExists(req, res, next);
    console.log('res test', res)
    expect(typeof res.locals.doc).toBe('Object')
    // expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: 'username and password are required'
    // });
  });


  // test('should 400 if username is missing from body', async () => {
  // const req = {}
  // const res = {
  //   locals: {
  //     spotify_id: 'sample_spotify_id',
  //     display_name: 'sample_display_name'
  //   }
  // }

  // const next = () => true;
  // userController.checkIfUserExists(mockReq, mockRes, next)
  // userController.getAllUsers(req, res)
  // .then(( ) => console.log('res', res))
  // console.log('res', res)

  // expect(typeof res.locals.doc).toBe('Object')


  // })


})

/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/

describe('Test Handlers', function () {
  // {
  //   "_id": "62fd2fcc4cb7c0fba9a157e3",
  //   "spotify_id": "31qr2pztpwio2zzt2rhjjt3m46ta",
  //   "__v": 0,
  //   "display_name": "goose",
  //   "playlist_id": "0xQP1CHAI6J1tKg7FkiYHy"
  // }

  // currently this is erroring out because it calls to spotify api for authentication
  // and the authentication 

  // authorizationCodeGrant data.body:  {
  //   access_token: 'BQAi-WlUg2PVneYlMAJ5v3aKdovUGjMcvvKp89A4IAqmTUjhqvMz4w2LVkbC09a8uiIfqdr5rk5T4i8_N75zghFB8A0lFRNGzaG9v77sNfkNYc9kSLX_P3cBpyPIkDAtNYSES4BMynpPy959hUEDCDLKa6onss2vAQJK3Cx32pXjTqKxTn3geCAS4V4g_9L0-UWYpM5z2onnioYcQJq-AvTHGQJRKJbqacgCZg',
  //   token_type: 'Bearer',
  //   expires_in: 3600,
  //   refresh_token: 'AQDSf4T6IM0n-O1dDLyl2UxmYWDRja6Gh_PZ8Yh6IkzC_W0K50soZYcJsPbHgb3b3PnfkiL-QmQOMhSTPbXohfikWbkzpSy9Ulz8hkzyG_QfTnWEaApacP-Mz0Le29AdHiw',
  //   scope: 'playlist-modify-public'
  // }
  test('redirect after /getToken', () => {
    // SY attempts to mock spotifyAPI
    const spotifyApi = require('../utils/apiWrapper');
    jest.mock('../utils/apiWrapper');

    const mockedSpotifyApi = jes.mocked(spotifyApi, true);
    
    app.use('/api', apiRouter);
    return request(app)
      .get('/api/getToken')
      .expect(301)
      .then(res => {
        expect(res.headers.location).toContain('#/player');
        done();
      })
    // status 301 indicates a successful redirection
    // expect(res.status).toEqual(301);
    // expect(res.headers.location).toContain('#/player')

  })

  test('GET method to /auth should redirect to spotify OAuth', () => {
    app.use('/api', apiRouter);
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



