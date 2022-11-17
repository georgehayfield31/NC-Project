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
        .get('/api/reviews/2')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body).toEqual({
                review_id: 2,
                title: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: 3
            })
        })
    })

    test('PATCH - 404: Review ID not in bounds', () => {
        const newVote = {
            inc_votes: 5
        }
        return request(app)
        .patch('/api/reviews/100')
        .send(newVote)
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Review not found!')
        })
    });

    test('PATCH - 400: Bad request', () => {
        const newVote = {
            inc_votes: 5
        }
        return request(app)
        .patch('/api/reviews/bad_request')
        .send(newVote)
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request!')
        })
    });

    test('PATCH - 400: Incomplete Key', () => {
        const newVote = {
            inc: 5
        }
        return request(app)
        .patch('/api/reviews/1')
        .send(newVote)
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Incomplete Object!')
        })
    });

    test('PATCH - 200: Update votes and return the updated review', () => {
        const newVote = {
            inc_votes: 5
        }
        return request(app)
        .patch('/api/reviews/1')
        .send(newVote)
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual(expect.any(Object))
            expect(body).toEqual({
                review_id: expect.any(Number),
                title: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number)
            })
            expect(body.votes).toBe(6)
        })
    });
});

describe('/api/reviews', () => {
    test('GET - 200: respond with an array of review objects when no query params given.', () => {
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

    test('GET - 200: respond with an array of review objects sorted in ASC order.', () => {
        return request(app)
        .get('/api/reviews?order=ASC')
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
            expect(res.body).toBeSortedBy("created_at", { descending: false });

        });
    });

    test('GET - 200: respond with an array of review objects sorted in ASC order of votes.', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes&order=ASC')
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
            expect(res.body).toBeSortedBy("votes", { descending: false });

        });
    });

    test('GET - 200: respond with an array of review objects sorted in ASC order of votes with a specific category.', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes&order=ASC&category=social deduction')
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
                    category: 'social deduction',
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number)
                })
            })
            expect(res.body).toBeSortedBy("votes", { descending: false });

        });
    });

    test('GET - 400: Bad sort_by value.', () => {
        return request(app)
        .get('/api/reviews?sort_by=bad_value')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Invalid query!')
        })
    });

    test('GET - 400: Bad order value.', () => {
        return request(app)
        .get('/api/reviews?order=bad_value')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Invalid query!')
        })
    });

    test('GET - 400: Bad sort_by value but acceptable order value.', () => {
        return request(app)
        .get('/api/reviews?sort_by=bad_value&order=ASC')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Invalid query!')
        })
    });
});

describe('/api/reviews/review_id/comments', () => {
    test('GET - 404: Review ID not in bounds', () => {
        return request(app)
        .get('/api/reviews/100/comments')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Review not found!')
        })
    });
    test('GET - 400: Bad review Id', () => {
        return request(app)
        .get('/api/reviews/bad_request/comments')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request!')
        })
    });
    test('GET respond with an array of comments for a given review id.', () => {
        return request(app)
        .get('/api/reviews/1/comments')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(expect.any(Array))
            res.body.forEach((comment) => {
                expect(comment).toEqual({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    review_id: expect.any(String)
                })
            })
            expect(res.body).toBeSortedBy("created_at", { descending: true });

        });
    });
});

describe('/api/reviews/review_id/comments', () => {
    test('POST - 400: Review ID not an int', () => {
        const newComment = {
            author: 'mallionaire',
            body: 'Hello There'
        }
        return request(app)
        .post('/api/reviews/bad_id/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request!')
        })
    });
    test('POST - 400: Comment not complete', () => {
        const newComment = {
            author: 'mallionaire'
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Incomplete Object!')
        })
    });
    test('POST - 400: Comment not complete', () => {
        const newComment = {
            body: 'Hello'
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Incomplete Object!')
        })
    });
    test('POST - 404: Review ID not in bounds', () => {
        return request(app)
        .post('/api/reviews/100/comments')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Review not found!')
        })
    });
    test('POST - 201: respond with the new created comment.', () => {
        const newComment = {
            author: 'mallionaire',
            body: 'Hello There'
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .expect(201)
        .send(newComment)
        .then((res) => {
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body).toEqual({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: 'mallionaire',
                body: 'Hello There',
                review_id: expect.any(Number)
            })
        });
    });
});

describe('/api/users', () => {
    test('GET - 200: Return array of user objects', () => {
        return request(app)
        .get('/api/users')
        .then((res) => {
            expect(res.body).toEqual(expect.any(Array))
            res.body.forEach((review) => {
                expect(typeof review === 'object');
            })
            expect(res.body.length > 0).toBe(true)
            res.body.forEach((user) => {
                expect(user).toEqual({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                })
            })
        })
    });
});

describe('/api/comments/:comment_id', () => {
    test('DELETE - 204: Remove a comment based off comment id', () => {
        return request(app)
        .delete('/api/comments/1')
        .then(({ body }) => {
            expect(body).toEqual({})
            expect(204)
        })
    });

    test('DELETE - 404: Comment ID not in bounds', () => {
        return request(app)
        .delete('/api/comments/100')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Comment not found!')
        })
    });

    test('DELETE - 400: Bad request', () => {
        return request(app)
        .delete('/api/comments/bad_request')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad request!')
        })
    });
});

describe.only('/api', () => {
    test('GET - 200: Should return all endpoints in a JSON object.', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((res) => {
            expect(res.body).toEqual(expect.any(Object))
            expect(Object.keys(res.body.endpoints).length).toBe(9)
        })
    });
});