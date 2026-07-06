// File: src/pages/Menu.jsx
import React, { useMemo, useState } from "react";
import { menuItems, menuCategories } from "../data/menu.js";
import "./Menu.css";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState(menuItems);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  function toggleAvailability(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  }

  function editPrice(id) {
    const selectedItem = items.find((item) => item.id === id);
    const newPrice = prompt(
      `Enter new price for ${selectedItem.name}`,
      selectedItem.price
    );

    if (!newPrice) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, price: Number(newPrice) } : item
      )
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-page-filters">
        {menuCategories.map((category) => (
          <button
            key={category}
            className={
              "menu-page-filter" + (activeCategory === category ? " is-active" : "")
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}

        <button className="menu-page-add">+ Add Item</button>
      </div>

      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-card">
            <div className="menu-card-image-wrap">
              <img src={item.image} alt={item.name} loading="lazy" />

              <span
                className={
                  "menu-card-badge " +
                  (item.available ? "is-available" : "is-unavailable")
                }
              >
                {item.available ? "Available" : "Out of Stock"}
              </span>
            </div>

            <div className="menu-card-body">
              <div className="menu-card-top">
                <h4>{item.name}</h4>
                <span className="menu-card-rating">★ {item.rating}</span>
              </div>

              <p className="menu-card-category">{item.category}</p>

              <div className="menu-card-footer">
                <span className="menu-card-price">₹{item.price}</span>

                <div className="menu-actions">
                  <button
                    className="menu-card-edit"
                    onClick={() => editPrice(item.id)}
                  >
                    Edit Price
                  </button>

                  <button
                    className={
                      "menu-card-toggle " +
                      (item.available ? "is-on" : "is-off")
                    }
                    onClick={() => toggleAvailability(item.id)}
                  >
                    {item.available ? "Mark Out" : "Mark Available"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}