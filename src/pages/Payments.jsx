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
            <p className="panel-subtitle">Latest settlements across all platforms</p>
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
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="payments-table-id">{txn.id}</td>
                  <td className="text-muted">{txn.orderId}</td>
                  <td>{txn.platform}</td>
                  <td className="text-muted">{txn.method}</td>
                  <td className="payments-table-amount">₹{txn.amount.toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`payments-status payments-status--${txn.status.toLowerCase()}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="text-muted">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
