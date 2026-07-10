// File: src/pages/Payments.jsx
import React from "react";
import { transactions, payoutSummary } from "../data/transactions.js";
import "./Payments.css";

export default function Payments() {
  return (
    <div className="payments-page">
      <section className="payments-summary-grid">
        {payoutSummary.map((item) => (
          <div key={item.id} className="payments-summary-card">
            <p className="payments-summary-label">{item.label}</p>
            <p className="payments-summary-value">{item.value}</p>
            <p className="payments-summary-caption">{item.caption}</p>
          </div>
        ))}
      </section>

      <div className="panel payments-table-panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Transactions</h3>
            <p className="panel-subtitle">
              Billing, GST, discounts, commissions and payout status
            </p>
          </div>
        </div>

        <div className="payments-table-scroll">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Order ID</th>
                <th>Platform</th>
                <th>Method</th>
                <th>Subtotal</th>
                <th>Discount</th>
                <th>GST</th>
                <th>Final Amount</th>
                <th>Commission</th>
                <th>Net Payout</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="payments-table-id">{transaction.id}</td>
                  <td className="text-muted">{transaction.orderId}</td>
                  <td>{transaction.platform}</td>
                  <td className="text-muted">{transaction.method}</td>

                  <td className="payments-table-amount">
                    ₹{transaction.subtotal.toLocaleString("en-IN")}
                  </td>

                  <td className="payments-table-discount">
                    {transaction.discount > 0
                      ? `-₹${transaction.discount.toLocaleString("en-IN")}`
                      : "—"}
                  </td>

                  <td>₹{transaction.gst.toLocaleString("en-IN")}</td>

                  <td className="payments-table-amount">
                    ₹{transaction.finalAmount.toLocaleString("en-IN")}
                  </td>

                  <td>₹{transaction.commission.toLocaleString("en-IN")}</td>

                  <td className="payments-table-amount">
                    ₹{transaction.netPayout.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`payments-status payments-status--${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td className="text-muted">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}