const mongoose = require("mongoose");
const User = require('../server/models/userModel');
const db = require('../db');

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe("Spotify User model DB unit testing", () => {
  it("create & save user successfully", async () => {
    const userData = { spotify_id: '12345', display_name: 'John', playlist_id: '18808' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.spotify_id).toBe(userData.spotify_id);
    expect(savedUser.display_name).toBe(userData.display_name);
    expect(savedUser.playlist_id).toBe(userData.playlist_id);
  });

  it("create user with Spotify ID", async () => {
    const userWithoutRequiredField = new User({ spotify_id: '12345', display_name: 'John' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.playlist_id).toBeDefined();
  });

  it("update user info successfully", async () => {
    const userData = { spotify_id: '12345', display_name: 'John', playlist_id: '18808' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    const newUser = await User.findOneAndUpdate({spotify_id: '12345'}, {display_name: 'Michael', playlist_id:'11111'}, {upsert:true, new:true})
    expect(newUser).toBeDefined();
    expect(newUser.spotify_id).toBe(userData.spotify_id);
    expect(newUser.display_name).toBe('Michael');
    expect(newUser.display_name).not.toBe(userData.display_name);
    expect(newUser.playlist_id).toBe('11111');
    expect(newUser.playlist_id).not.toBe(userData.playlist_id);
  });

  it("upsert user info successfully", async () => {
    const userData = { spotify_id: '12345', display_name: 'John', playlist_id: '18808' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    const newUser = await User.findOneAndUpdate({spotify_id: '123456'}, {spotify_id: '123456', display_name: 'Michael', playlist_id:'11111'}, {upsert:true, new:true})
    const arr = await User.find({});
    expect(arr.length).toEqual(2);
  });
});