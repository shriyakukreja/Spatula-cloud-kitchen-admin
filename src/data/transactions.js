// File: src/data/transactions.js
// Dummy payment/transaction data. Replace with GET /api/payments.

export const transactions = [
  { id: "TXN-88231", orderId: "SPT-10482", platform: "Zomato", method: "UPI", amount: 648, status: "Settled", date: "2 Jul 2026" },
  { id: "TXN-88230", orderId: "SPT-10481", platform: "Swiggy", method: "Card", amount: 342, status: "Settled", date: "2 Jul 2026" },
  { id: "TXN-88229", orderId: "SPT-10480", platform: "Walk-in", method: "Cash", amount: 460, status: "Settled", date: "2 Jul 2026" },
  { id: "TXN-88228", orderId: "SPT-10479", platform: "Direct", method: "UPI", amount: 398, status: "Processing", date: "2 Jul 2026" },
  { id: "TXN-88227", orderId: "SPT-10478", platform: "Zomato", method: "UPI", amount: 512, status: "Settled", date: "1 Jul 2026" },
  { id: "TXN-88226", orderId: "SPT-10476", platform: "Walk-in", method: "Card", amount: 780, status: "Refunded", date: "1 Jul 2026" },
];

export const payoutSummary = [
  { id: "gross", label: "Gross Revenue", value: "₹6,49,200", caption: "This month" },
  { id: "commission", label: "Platform Commission", value: "₹86,420", caption: "Zomato + Swiggy" },
  { id: "net", label: "Net Payout", value: "₹5,62,780", caption: "Settled to bank" },
  { id: "pending", label: "Pending Settlement", value: "₹18,340", caption: "3 transactions" },
];
