// File: src/data/transactions.js
import { allOrders } from "./orders.js";

const GST_RATE = 0.05;
const TAKEAWAY_DISCOUNT_RATE = 0.2;

const paymentMethodsByOrderId = {
  "SPT-10482": "UPI",
  "SPT-10481": "Card",
  "SPT-10480": "Cash",
  "SPT-10479": "UPI",
  "SPT-10478": "Wallet",
  "SPT-10477": "UPI",
  "SPT-10476": "Card",
  "SPT-10475": "Cash",
  "SPT-10461": "UPI",
  "SPT-10444": "Card",
  "SPT-10428": "Wallet",
  "SPT-10453": "UPI",
  "SPT-10436": "Card",
  "SPT-10449": "Cash",
  "SPT-10431": "UPI",
};

const platformCommissionRates = {
  Zomato: 0.18,
  Swiggy: 0.18,
  Direct: 0,
  "Walk-in": 0,
};

function getTransactionStatus(order) {
  if (order.paymentStatus === "Refunded" || order.status === "Cancelled") {
    return "Refunded";
  }

  if (order.paymentStatus === "Pending") {
    return "Processing";
  }

  return "Settled";
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calculateBill(order) {
  const subtotal = order.amount;

  const discount =
    order.platform === "Walk-in" || order.platform === "Direct"
      ? Math.round(subtotal * TAKEAWAY_DISCOUNT_RATE)
      : 0;

  const taxableAmount = subtotal - discount;
  const gst = Math.round(taxableAmount * GST_RATE);
  const finalAmount = taxableAmount + gst;

  const commission = Math.round(
    finalAmount * (platformCommissionRates[order.platform] || 0)
  );

  const netPayout = finalAmount - commission;

  return {
    subtotal,
    discount,
    taxableAmount,
    gst,
    finalAmount,
    commission,
    netPayout,
  };
}

export const transactions = allOrders.map((order, index) => {
  const bill = calculateBill(order);

  return {
    id: `TXN-${88231 - index}`,
    orderId: order.id,
    platform: order.platform,
    method: paymentMethodsByOrderId[order.id] || "UPI",
    status: getTransactionStatus(order),
    date: formatDate(order.createdAt),
    ...bill,
  };
});

const validTransactions = transactions.filter(
  (transaction) => transaction.status !== "Refunded"
);

const settledTransactions = transactions.filter(
  (transaction) => transaction.status === "Settled"
);

const processingTransactions = transactions.filter(
  (transaction) => transaction.status === "Processing"
);

const grossRevenue = validTransactions.reduce(
  (sum, transaction) => sum + transaction.finalAmount,
  0
);

const totalCommission = validTransactions.reduce(
  (sum, transaction) => sum + transaction.commission,
  0
);

const netPayout = settledTransactions.reduce(
  (sum, transaction) => sum + transaction.netPayout,
  0
);

const pendingSettlement = processingTransactions.reduce(
  (sum, transaction) => sum + transaction.netPayout,
  0
);

export const payoutSummary = [
  {
    id: "gross",
    label: "Gross Revenue",
    value: `₹${grossRevenue.toLocaleString("en-IN")}`,
    caption: "Calculated from orders",
  },
  {
    id: "commission",
    label: "Platform Commission",
    value: `₹${totalCommission.toLocaleString("en-IN")}`,
    caption: "Zomato + Swiggy",
  },
  {
    id: "net",
    label: "Net Payout",
    value: `₹${netPayout.toLocaleString("en-IN")}`,
    caption: "Settled amount",
  },
  {
    id: "pending",
    label: "Pending Settlement",
    value: `₹${pendingSettlement.toLocaleString("en-IN")}`,
    caption: `${processingTransactions.length} transaction(s)`,
  },
];