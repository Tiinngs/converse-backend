const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    const product = await prisma.product.findMany();
    if (product.length === 0) {
        await prisma.product.createMany({
            data: Products,
        });
    }
    const admin = await prisma.users.findUnique({
        where: {
            username: "admin",
        },
    });
    if (!admin) {
        bcrypt.hash("admin", 10, async function (err, hash) {
            await prisma.users.create({
                data: {
                    username: "admin",
                    password: hash,
                },
            });
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

const Products = [
    {
        title: "Converse x FRGMT T-Shirt White",
        price: "1290",
        description:
            "Converse x FRGMT: ความร่วมมืออย่างต่อเนื่องของเรากับตำนานสตรีทแวร์และศิลปินหลากหลายสาขา Hiroshi Fujiwara เน้นความเรียบง่ายเสมอ สร้างสไตล์ที่โดดเด่นและเน้นรายละเอียดด้วยสัมผัสที่เป็นเอกลักษณ์และเรียบง่าย ฟูจิวาระได้แรงบันดาลใจจากสไตล์กีฬาเรโทรและมรดกทางบาสเก็ตบอลของ Converse ใส่ลูกเล่นของเขาลงบนเสื้อยืดเจอร์ซีย์แบบคลาสสิก",
        img: `${process.env.SERVER}/img/Converse x FRGMT T-Shirt White.png`,
    },
    {
        title: "Converse x FRGMT T-Shirt Blue",
        price: "1290",
        description:
            "Converse x FRGMT: ความร่วมมืออย่างต่อเนื่องของเรากับตำนานสตรีทแวร์และศิลปินหลากหลายสาขา Hiroshi Fujiwara เน้นความเรียบง่ายเสมอ สร้างสไตล์ที่โดดเด่นและเน้นรายละเอียดด้วยสัมผัสที่เป็นเอกลักษณ์และเรียบง่าย ฟูจิวาระได้แรงบันดาลใจจากสไตล์กีฬาเรโทรและมรดกทางบาสเก็ตบอลของ Converse ใส่ลูกเล่นของเขาลงบนเสื้อยืดเจอร์ซีย์แบบคลาสสิก",
        img: `${process.env.SERVER}/img/Converse x FRGMT T-Shirt Blue.png`,
    },
    {
        title: "Converse x FRGMT Varsity Jacket",
        price: "7590",
        description:
            "ความงามที่แตกต่างของการออกแบบ FRGMT ของ Hiroshi Fujiwara บนแจ็คเก็ต Varsity สุดคลาสสิก",
        img: `${process.env.SERVER}/img/Converse x FRGMT Varsity Jacket.png`,
    },
    {
        title: "Converse x FRGMT Weapon",
        price: "5900",
        description:
            "Hiroshi Fujiwara ใส่สไตล์มินิมอลให้กับ Converse Weapon ด้วยการบล็อกสีแบบคลาสสิกที่ได้รับแรงบันดาลใจจากความดั่งเดิมของแบรนด์",
        img: `${process.env.SERVER}/img/Converse x FRGMT Weapon.png`,
    },
    {
        title: "Converse x Patta Four-Leaf Clover Cargo Pant",
        price: "4590",
        description:
            "Converse และ Patta แบรนด์สตรีทแวร์ที่เติบโตและเป็นที่รู้จักไปทั่วโลกในอัมสเตอร์ดัม ขอสดุดีสัญลักษณ์แห่งความโชคดีด้วยคอลเลกชั่นแคปซูล Four-Leaf Clover ผ้าใบคอตตอนฟอกนี้โดดเด่นด้วยคุณสมบัติที่เป็นประโยชน์และกราฟิกแบรนด์ร่วม Converse x Patta แบบปัก",
        img: `${process.env.SERVER}/img/Converse x Patta Four-Leaf Clover Cargo Pant.png`,
    },
    {
        title: "Converse x Patta Four-Leaf Clover Utility Fleece Hoodie",
        price: "4290",
        description:
            "Converse และ Patta แบรนด์สตรีทแวร์ที่เติบโตและเป็นที่รู้จักไปทั่วโลกในอัมสเตอร์ดัม ขอสดุดีสัญลักษณ์แห่งความโชคดีด้วยคอลเลกชั่นแคปซูล Four-Leaf Clover ตัดเย็บจากผ้าฟลีซเทอร์รีขนแปรงด้านหลัง เน้นประโยชน์ใช้สอย โดดเด่นด้วยโลโก้แบรนด์ร่วม Converse x Patta และงานปักตกแต่ง",
        img: `${process.env.SERVER}/img/Converse x Patta Four-Leaf Clover Utility Fleece Hoodie.png`,
    },
    {
        title: "Converse x Patta Four-Leaf Clover Short Sleeve Tee Green",
        price: "1890",
        description:
            "Converse และ Patta แบรนด์สตรีทแวร์ที่เติบโตในอัมสเตอร์ดัมและเป็นที่รู้จักไปทั่วโลก ขอสดุดีสัญลักษณ์แห่งความโชคดีด้วยคอลเล็กชั่นแคปซูล Converse x Patta Four-Leaf Clover Patta นำเสนอเสื้อยืดคอตตอนฟอกเอนไซม์รุ่นลิมิเต็ดเอดิชั่น โดดเด่นด้วยทรงโอเวอร์ไซส์และมีการปักลายที่ด้านหลัง",
        img: `${process.env.SERVER}/img/Converse x Patta Four-Leaf Clover Short Sleeve Tee Green.png`,
    },
    {
        title: "Converse x Patta Four-Leaf Clover Short Sleeve Tee Black",
        price: "1890",
        description:
            "Converse และ Patta แบรนด์สตรีทแวร์ที่เติบโตในอัมสเตอร์ดัมและเป็นที่รู้จักไปทั่วโลก ขอสดุดีสัญลักษณ์แห่งความโชคดีด้วยคอลเล็กชั่นแคปซูล Converse x Patta Four-Leaf Clover Patta นำเสนอเสื้อยืดคอตตอนฟอกเอนไซม์รุ่นลิมิเต็ดเอดิชั่น โดดเด่นด้วยทรงโอเวอร์ไซส์และมีการปักลายที่ด้านหลัง",
        img: `${process.env.SERVER}/img/Converse x Patta Four-Leaf Clover Short Sleeve Tee Black.png`,
    },
];
