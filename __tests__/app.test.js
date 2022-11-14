const request = require('supertest');
const app = require('../app.js');
const {db} = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');
require('jest-sorted');

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


describe('/api/reviews/:review_id', () => {
    test('GET - 404: Review ID not in bounds', () => {
        return request(app)
        .get('/api/reviews/100')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Review not found!')
        })
    });

    test('GET - 400: Bad Request', () => {
        return request(app)
        .get('/api/reviews/bad_thing')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request!')
        })
    });

    test('GET respond with a specific review object.', () => {
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body).toEqual({
                review_id: 1,
                title: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number)
            })
        })
    })
});

describe('/api/reviews', () => {
    test('GET respond with an array of review objects.', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(expect.any(Array))
            res.body.forEach((review) => {
                expect(typeof review === 'object');
            })
            res.body.forEach((review) => {
                expect(review).toEqual({
                    review_id: expect.any(Number),
                    title: expect.any(String),
                    category: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number)
                })
            })
            expect(res.body).toBeSortedBy("created_at", { descending: true });

        });
    });
});