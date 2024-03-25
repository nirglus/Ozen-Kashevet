const { register , login, deleteUser, updateUser, getUsers, showUser} = require("../../controllers/user.controller");


describe('User Controller', () =>{
    test('returns user object and token after registration', async() =>{
        const req = {body:
            {
                "user_name":"test",
                "email":"wwww@wwww.com",
                "birth_date":"1998-12-01",
                "password":"123",
                "bio":"best of the best",
                "gender": "M"
            }
        }
        
        const res = {
            result : {}, 
            send: (input) =>{
                this.result = input
            },
            status_code : 200,
            status: (code) =>{
                this.status_code = code;
                return this;
            }
        }

        await register(req, res);
        
        expect(res.status_code).toEqual(200);
        expect(res.result.message).toEqual("User registered!");

    });

    // test('returns user object')
})