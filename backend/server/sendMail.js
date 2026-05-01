const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const sendOrderMail = async (email, orderId, total, cart = [], user = {}) => {
  try {
    const filePath = `invoice_${orderId}.pdf`;

    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.rect(0, 0, doc.page.width, 80).fill("#8e44ad");

    doc.fillColor("white")
      .fontSize(20)
      .text("PlumGoodness Pvt Ltd", 50, 30);

    doc.fillColor("black");

    doc.fontSize(18)
      .fillColor("#8e44ad")
      .text("TAX INVOICE", 0, 90, { align: "center" });

    let y = 120;

    doc.fontSize(10);
    doc.text(`Order ID: ${orderId}`, 50, y);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 50, y + 15);

    y += 40;

    doc.text(`Customer: ${user.name || ""}`, 50, y);
    doc.text(`Email: ${email}`, 50, y + 15);
    doc.text(`Phone: ${user.phone || ""}`, 50, y + 30);
    doc.text(`Address: ${user.address || ""}`, 50, y + 45);

    y += 80;

    const tableTop = y;
    const col1 = 50;
    const col2 = 300;
    const col3 = 370;
    const col4 = 450;

    doc.rect(col1, tableTop, 500, 20).fill("#f2e6ff");

    doc.fillColor("black").fontSize(11);
    doc.text("Item", col1 + 5, tableTop + 5);
    doc.text("Qty", col2 + 5, tableTop + 5);
    doc.text("Price", col3 + 5, tableTop + 5);
    doc.text("Total", col4 + 5, tableTop + 5);

    let rowY = tableTop + 20;
    let subtotal = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * (item.qty || 1);
      subtotal += itemTotal;

      const itemHeight = doc.heightOfString(item.name, { width: 240 });
      const rowHeight = Math.max(itemHeight, 20);

      doc.rect(col1, rowY, 500, rowHeight + 10).stroke();

      doc.text(item.name, col1 + 5, rowY + 5, { width: 240 });
      doc.text(item.qty || 1, col2 + 10, rowY + 5);
      doc.text(`₹${item.price}`, col3 + 5, rowY + 5);
      doc.text(`₹${itemTotal}`, col4 + 5, rowY + 5);

      rowY += rowHeight + 10;
    });

    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const grandTotal = subtotal + cgst + sgst;

    rowY += 20;

    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 350, rowY);
    rowY += 15;
    doc.text(`CGST (9%): ₹${cgst.toFixed(2)}`, 350, rowY);
    rowY += 15;
    doc.text(`SGST (9%): ₹${sgst.toFixed(2)}`, 350, rowY);
    rowY += 20;

    doc.fontSize(14)
      .fillColor("#8e44ad")
      .text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 350, rowY);

    rowY += 40;

    doc.fontSize(10)
      .fillColor("gray")
      .text("Thank you for shopping with us", 0, rowY, { align: "center" });

    doc.end();

    await new Promise((resolve) => stream.on("finish", resolve));

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vaishali16204@gmail.com",
        pass: "tvzhzrrzauovgniq",
      },
    });

    await transporter.sendMail({
      from: '"PlumGoodness" <vaishali16204@gmail.com>',
      to: email,
      subject: "Your Order Invoice",
      text: "Your order is confirmed. Invoice attached.",
      attachments: [
        {
          filename: `invoice_${orderId}.pdf`,
          path: filePath,
        },
      ],
    });

    fs.unlinkSync(filePath);

  } catch (err) {
    console.log("MAIL ERROR:", err);
  }
};

module.exports = sendOrderMail;