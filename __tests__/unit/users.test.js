const db = require('../../db/dzle-pool')
const {getUsers, getUser} = require('../../controllers/userCtlr')


jest.mock('../../db/dzle-pool', ()=>{
    return {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn()
    }
})

describe('user constroller test', ()=>{
    beforeEach(() => {
        db.from.mockReset()
        db.where.mockReset()
        db.select.mockReturnThis()
        db.from.mockReturnThis()
    })
    describe('getUsers controller', ()=>{
        describe('it tests getUsers success response', ()=>{
        it('should get called with resolved data from db', async()=>{
            db.from.mockResolvedValue([{user_id: 1, username: "raghav"}])
            const req = {}
            const res = {
                json: jest.fn()
            }
            await getUsers(req, res)
            expect(res.json).toHaveBeenCalledWith([{user_id: 1, username: "raghav"}])
        })

        })
        describe('it tests getUsers error response', ()=>{
            it("should throw error with status code 500", async()=>{
                db.from.mockRejectedValue(new Error('something went wrong'))
                const req = {}
                const res = {
                    json: jest.fn(),
                    status: jest.fn().mockReturnThis()
                }
                await getUsers(req, res)
                expect(res.status).toHaveBeenCalledWith(500)
                expect(res.json).toHaveBeenCalledWith({error: "something went wrong"})
            })
        })
    })
    describe('getUser controller', ()=>{
        describe('getUser -> succesful data fetch', ()=>{
            it('it should give user data', async()=>{
                db.where.mockResolvedValue({user_id: 1, username: 'raghav'})
                const req = {
                    params: {id: 1}
                }
                const res = {
                    json: jest.fn(),
                    status: jest.fn().mockReturnThis()
                }
                await getUser(req, res)
                expect(db.where).toHaveBeenCalled()
                expect(res.json).toHaveBeenCalledWith({user_id: 1, username: 'raghav'})
            })
        })
        describe('getUser -> error in data fetch', ()=>{
            it('should throw error with status code 500', async()=>{
                db.where.mockRejectedValue(new Error('something went wrong'))
                const req = {
                    params: {id: 1}
                }
                const res = {
                    json: jest.fn(),
                    status: jest.fn().mockReturnThis()
                }
                await getUser(req, res)
                expect(res.status).toHaveBeenCalledWith(500)
                expect(res.json).toHaveBeenCalledWith({error: "something went wrong"})
            })
        })
    })
})