const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/img", express.static("img"));

// ##################################################################################################

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    return res.json(products);
});

app.get("/products/:id", async (req, res) => {
    const products = await prisma.product.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    return res.json(products);
});

// ##################################################################################################

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.users.findUnique({
        where: {
            username,
        },
    });
    if (!user)
        return res.json({ code: 400, msg: "username or password incorrect." });
    const result = bcrypt.compareSync(password, user.password);
    if (!result) return res.json({ code: 400, msg: "username or password incorrect.", });
    const token = jwt.sign({ id: user.id, username: user.username }, "shh");
    return res.json({ code: 200, msg: "login success, wait..", token });
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.users.findUnique({
        where: {
            username,
        },
    });
    if (user) return res.json({ code: 400, msg: "username already exist." });
    const pwd = bcrypt.hashSync(password, 10);
    const newUser = await prisma.users.create({
        data: {
            username,
            password: pwd,
        },
    });
    await prisma.address.create({
        data: {
            address: "",
            phone: "",
            usersId: newUser.id,
        },
    });
    return res.json({ code: 200, msg: "Register success." });
});

app.post("/auth", async (req, res) => {
    const { token } = req.body;
    if (!token) return;
    const decode = jwt.verify(token, "shh");
    if (!decode) return;
    return res.json({ code: 200, data: decode });
});

// ##################################################################################################

app.post("/updateAddress", async (req, res) => {
    const { token, address, phone } = req.body;
    if (!token) return;
    const decode = jwt.verify(token, "shh");
    await prisma.address.update({
        where: {
            usersId: decode.id,
        },
        data: {
            address,
            phone,
        },
    });
    return res.json({ code: 200, msg: "update success." });
});

app.post("/getAddress", async (req, res) => {
    const { token } = req.body;
    if (!token) return;
    const decode = jwt.verify(token, "shh");
    const address = await prisma.address.findUnique({
        where: {
            usersId: decode.id
        }
    })
    return res.json({ code: 200, address });
});

// ##################################################################################################

app.post("/order", async (req, res) => {
    const { token, order, price } = req.body;
    if (!token) return res.json({ code: 400, msg: "Please login." });
    const decode = jwt.verify(token, "shh");
    if (decode.username === "admin") return res.json({ code: 400, msg: "you are admin." });
    await prisma.orders.create({
        data: {
            order,
            price,
            usersId: decode.id,
        },
    });
    return res.json({ code: 200, msg: "order successfully." });
});

app.get("/order", async (req, res) => {
    const order = await prisma.orders.findMany({
        include: {
            users: true
        }
    })
    return res.json(order);
});

// ##################################################################################################

app.listen(process.env.PORT || 5050, () => {
    console.log("Server running");
});
