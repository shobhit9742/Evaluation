const request = require("supertest");
const app = require("../server");

DESCRIBE('GET /api/users/:userId/orders', () => {
    it('should return all orders for a specific user', async () => {
        const res = await request.app.get('/api/users/1/orders').set('Authorization', `Bearer ${token}`);
        // export(res.statuscode).toE
    })
})