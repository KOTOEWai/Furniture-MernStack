const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userModel");

/**
 * Backend Testing ဆိုတာ ကိုယ်ရေးထားတဲ့ API တွေ အလုပ်လုပ်၊ မလုပ်ကို 
 * လက်နဲ့ manual စမ်းစရာမလိုဘဲ code နဲ့ အလိုအလျောက် စမ်းသပ်တာဖြစ်ပါတယ်။
 */

// describe ဆိုတာ test တွေကို component အလိုက် စုစည်းပေးတာပါ (ဥပမာ - User API တွေအတွက် တစ်စု)
describe("User API Tests (Myanmar Explained)", () => {

    // Test တွေမစခင် Database ချိတ်ဆက်မှုရှိမရှိ စစ်ဆေးတာပါ
    beforeAll(async () => {
        // Test လုပ်ဖို့အတွက် temporary DB connection တစ်ခုလိုပါမယ်
        // (မှတ်ချက် - တကယ့် production DB ကို test မလုပ်မိဖို့ သတိထားရပါမယ်)
    });

    // Test တွေအားလုံးပြီးရင် Database connection ကို ပြန်ပိတ်ရပါမယ်
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // it/test ဆိုတာကတော့ တကယ့် test case တစ်ခုချင်းစီကို ပြောတာပါ
    it("GET /api/user/me - အကောင့်ထဲဝင်မထားရင် 401 Unauthorized ပြရမယ်", async () => {
        // request(app) က ကျွန်တော်တို့ရဲ့ Express app ကို API ခေါ်သလိုမျိုး စမ်းပေးတာပါ
        const res = await request(app).get("/api/user/me");

        // expect ဆိုတာကတော့ ရလဒ်က ကိုယ်ဖြစ်စေချင်တဲ့အတိုင်း ဖြစ်ရဲ့လားဆိုတာ စစ်တာပါ
        expect(res.statusCode).toEqual(401);

        // status က false ဖြစ်နေရမယ် (CustomError logic အတိုင်း)
        // res.body.con ဟာ Backend က ပြန်ပို့လိုက်တဲ့ format ပေါ်မူတည်ပါတယ်
    });

    it("POST /api/user/login - Email ဒါမှမဟုတ် Password မပါရင် 400 Bad Request ပြရမယ်", async () => {
        const res = await request(app)
            .post("/api/user/login")
            .send({
                email: "", // email လွတ်နေတယ်
                password: "password123"
            });

        // Validations တွေအလုပ်လုပ်လား စစ်ဆေးတာပါ
        expect(res.statusCode).toEqual(400);
    });

});
