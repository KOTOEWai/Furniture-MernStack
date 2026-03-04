const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

/**
 * Product API Tests - ပစ္စည်းအသစ်တင်တာနဲ့ ပစ္စည်းစာရင်းကြည့်တာတွေကို စမ်းသပ်ပါမယ်
 */

describe("Product API Tests (Myanmar Explained)", () => {

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // it("GET /api/products - ပစ္စည်းတွေ အကုန်လုံးကို ဖတ်လို့ရရမယ်", ...)
    it("GET /api/products - ပစ္စည်းစာရင်းကို အောင်မြင်စွာ ဖတ်လို့ရရမယ်", async () => {
        const res = await request(app).get("/api/products");

        // ပစ္စည်းတွေရှိရင် 200 OK ပြန်လာရမယ်
        expect(res.statusCode).toBe(200);

        // ပြန်လာတဲ့ result က object (သို့) array ဖြစ်ရမယ်
        expect(typeof res.body).toBe('object');
    });

    it("POST /api/products/create - Login မဝင်ထားရင် ပစ္စည်းအသစ် တင်ခွင့်မရှိရပါ (401)", async () => {
        // verifyToken middleware က login ဝင်ထားမှ ပေးလုပ်မှာမို့ 401 ပြန်လာပါလိမ့်မယ်
        const res = await request(app)
            .post("/api/products/create")
            .send({
                name: "Modern Sofa",
                price: 500,
                description: "A very comfortable modern sofa."
            });

        expect(res.statusCode).toBe(401);
    });

    /**
     * ဗဟုသုတအနေနဲ့ - 
     * တကယ့် project တွေမှာ test လုပ်တဲ့အခါ Database တစ်ခုလုံးကို 
     * တကယ်မသုံးဘဲ "Mocking" ဆိုတဲ့ နည်းလမ်းနဲ့ database က 
     * ပြန်လာမယ့် data အတုတွေကိုပဲ သုံးပြီး စမ်းသပ်လေ့ရှိပါတယ်။
     */
});
