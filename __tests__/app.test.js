const request = require('supertest');
const app = require('../app.js');
const {db} = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');

beforeAll(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
});

describe('/api/categories', () => {
    test('GET respond with an array of category objects with the properties slug and description.', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(expect.any(Array))
            res.body.forEach((category) => {
                expect(typeof category === 'object');
            })
            res.body.forEach((category) => {
                expect(category).toEqual({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })
        });
    });
});