// File: src/pages/Menu.jsx
import React, { useMemo, useState } from "react";
import { menuItems } from "../data/menu.js";
import "./Menu.css";

const baseCategories = [
  "All",
  "Pasta",
  "Artisan Pizzas",
  "Burgers",
  "Fries",
  "Sides",
  "Beverages",
];

const beverageSubCategories = [
  "Signature Mocktails",
  "Premium Shakes",
  "Coffee",
];

function normalizeItem(item) {
  if (item.category === "Premium Shakes") {
    return {
      ...item,
      category: "Beverages",
      subCategory: "Premium Shakes",
      type: "Vegetarian",
      addOns: [],
    };
  }

  if (item.category === "Coffee") {
    return {
      ...item,
      category: "Beverages",
      subCategory: "Coffee",
      type: "Vegetarian",
      addOns: [],
    };
  }

  if (item.category === "Beverages") {
    return {
      ...item,
      subCategory: "Signature Mocktails",
      type: "Vegetarian",
      addOns: [],
    };
  }

  if (item.category === "Pasta") {
    return {
      ...item,
      type: "Vegetarian",
      addOns: [
        { name: "Chicken Add-On", price: 60, enabled: true },
      ],
    };
  }

  if (item.category === "Fries") {
    return {
      ...item,
      type: "Vegetarian",
      addOns: [
        { name: "Chicken Add-On", price: 60, enabled: true },
      ],
    };
  }

  return {
    ...item,
    addOns: item.addOns || [],
  };
}

function getInitialFormState() {
  return {
    name: "",
    category: "Pasta",
    subCategory: "Signature Mocktails",
    type: "Vegetarian",
    price: "",
    image: "",
    available: true,
    addChicken: false,
  };
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [activeBeverageSubCategory, setActiveBeverageSubCategory] = useState("All");

  const [items, setItems] = useState(menuItems.map(normalizeItem));
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState(getInitialFormState());

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesType =
        activeType === "All" || item.type === activeType;

      const matchesBeverageSubCategory =
        activeCategory !== "Beverages" ||
        activeBeverageSubCategory === "All" ||
        item.subCategory === activeBeverageSubCategory;

      return matchesCategory && matchesType && matchesBeverageSubCategory;
    });
  }, [items, activeCategory, activeType, activeBeverageSubCategory]);

  function editPrice(id) {
    const selectedItem = items.find((item) => item.id === id);

    const newPrice = prompt(
      `Enter new price for ${selectedItem.name}`,
      selectedItem.price
    );

    if (!newPrice) return;

    const numericPrice = Number(newPrice);

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, price: numericPrice } : item
      )
    );
  }

  function openEditItem(item) {
    setEditingItem({
      ...item,
      addChicken: item.addOns?.some((addOn) => addOn.name === "Chicken Add-On" && addOn.enabled) || false,
    });
  }

  function saveEditedItem(event) {
    event.preventDefault();

    const numericPrice = Number(editingItem.price);

    if (!editingItem.name.trim() || Number.isNaN(numericPrice) || numericPrice <= 0) {
      alert("Please enter valid item details.");
      return;
    }

    const updatedItem = {
      ...editingItem,
      name: editingItem.name.trim(),
      price: numericPrice,
      addOns:
        ["Pasta", "Fries"].includes(editingItem.category) && editingItem.addChicken
          ? [{ name: "Chicken Add-On", price: 60, enabled: true }]
          : [],
    };

    delete updatedItem.addChicken;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );

    setEditingItem(null);
  }

  function handleAddItem(event) {
    event.preventDefault();

    const numericPrice = Number(newItem.price);

    if (!newItem.name.trim() || Number.isNaN(numericPrice) || numericPrice <= 0) {
      alert("Please enter item name and valid price.");
      return;
    }

    const createdItem = {
      id: `custom-${Date.now()}`,
      name: newItem.name.trim(),
      category: newItem.category,
      price: numericPrice,
      available: newItem.available,
      image:
        newItem.image.trim() ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      type:
        ["Pasta", "Fries", "Beverages"].includes(newItem.category)
          ? "Vegetarian"
          : newItem.type,
      addOns:
        ["Pasta", "Fries"].includes(newItem.category) && newItem.addChicken
          ? [{ name: "Chicken Add-On", price: 60, enabled: true }]
          : [],
    };

    if (newItem.category === "Beverages") {
      createdItem.subCategory = newItem.subCategory;
    }

    setItems((prevItems) => [createdItem, ...prevItems]);
    setNewItem(getInitialFormState());
    setShowAddForm(false);
  }

  return (
    <div className="menu-page">
      <div className="menu-page-filters">
        {baseCategories.map((category) => (
          <button
            key={category}
            className={
              "menu-page-filter" +
              (activeCategory === category ? " is-active" : "")
            }
            onClick={() => {
              setActiveCategory(category);
              setActiveBeverageSubCategory("All");
            }}
          >
            {category}
          </button>
        ))}

        <button className="menu-page-add" onClick={() => setShowAddForm(true)}>
          + Add Item
        </button>
      </div>

      {activeCategory === "Beverages" && (
        <div className="menu-type-filters">
          {["All", ...beverageSubCategories].map((subCategory) => (
            <button
              key={subCategory}
              className={
                "menu-type-filter" +
                (activeBeverageSubCategory === subCategory ? " is-active" : "")
              }
              onClick={() => setActiveBeverageSubCategory(subCategory)}
            >
              {subCategory}
            </button>
          ))}
        </div>
      )}

      <div className="menu-type-filters">
        {["All", "Vegetarian", "Non-Vegetarian"].map((type) => (
          <button
            key={type}
            className={
              "menu-type-filter" + (activeType === type ? " is-active" : "")
            }
            onClick={() => setActiveType(type)}
          >
            {type === "All" ? "All Types" : type}
          </button>
        ))}
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
                <span
                  className={
                    "menu-card-type " +
                    (item.type === "Vegetarian" ? "is-veg" : "is-nonveg")
                  }
                >
                  {item.type === "Vegetarian" ? "Veg" : "Non-Veg"}
                </span>
              </div>

              <p className="menu-card-category">
                {item.category}
                {item.subCategory ? ` · ${item.subCategory}` : ""}
              </p>

              {item.addOns?.length > 0 && (
                <p className="menu-card-category">
                  Add-on: Chicken ₹60
                </p>
              )}

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
                    className="menu-card-secondary"
                    onClick={() => openEditItem(item)}
                  >
                    Edit Item
                  </button>

                  <button
                    className={
                      "menu-card-toggle " +
                      (item.available ? "is-on" : "is-off")
                    }
                    onClick={() =>
                      setItems((prevItems) =>
                        prevItems.map((menuItem) =>
                          menuItem.id === item.id
                            ? { ...menuItem, available: !menuItem.available }
                            : menuItem
                        )
                      )
                    }
                  >
                    {item.available ? "Mark Out" : "Mark Available"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="menu-modal-backdrop" onClick={() => setEditingItem(null)}>
          <form
            className="menu-modal"
            onClick={(event) => event.stopPropagation()}
            onSubmit={saveEditedItem}
          >
            <div className="menu-modal-header">
              <div>
                <p className="menu-modal-eyebrow">Menu Master</p>
                <h2>Edit Item</h2>
              </div>

              <button type="button" onClick={() => setEditingItem(null)}>
                ×
              </button>
            </div>

            <div className="menu-form-grid">
              <label>
                Item Name
                <input
                  value={editingItem.name}
                  onChange={(event) =>
                    setEditingItem({ ...editingItem, name: event.target.value })
                  }
                />
              </label>

              <label>
                Category
                <select
                  value={editingItem.category}
                  onChange={(event) =>
                    setEditingItem({
                      ...editingItem,
                      category: event.target.value,
                      subCategory:
                        event.target.value === "Beverages"
                          ? "Signature Mocktails"
                          : "",
                      type:
                        ["Pasta", "Fries", "Beverages"].includes(event.target.value)
                          ? "Vegetarian"
                          : editingItem.type,
                    })
                  }
                >
                  {baseCategories
                    .filter((category) => category !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </label>

              {editingItem.category === "Beverages" && (
                <label>
                  Beverage Sub Category
                  <select
                    value={editingItem.subCategory || "Signature Mocktails"}
                    onChange={(event) =>
                      setEditingItem({
                        ...editingItem,
                        subCategory: event.target.value,
                      })
                    }
                  >
                    {beverageSubCategories.map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {!["Pasta", "Fries", "Beverages"].includes(editingItem.category) && (
                <label>
                  Type
                  <select
                    value={editingItem.type}
                    onChange={(event) =>
                      setEditingItem({ ...editingItem, type: event.target.value })
                    }
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </label>
              )}

              <label>
                Price
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(event) =>
                    setEditingItem({ ...editingItem, price: event.target.value })
                  }
                />
              </label>

              <label>
                Availability
                <select
                  value={editingItem.available ? "Available" : "Out of Stock"}
                  onChange={(event) =>
                    setEditingItem({
                      ...editingItem,
                      available: event.target.value === "Available",
                    })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </label>

              {["Pasta", "Fries"].includes(editingItem.category) && (
                <label>
                  Chicken Add-On
                  <select
                    value={editingItem.addChicken ? "Enabled" : "Disabled"}
                    onChange={(event) =>
                      setEditingItem({
                        ...editingItem,
                        addChicken: event.target.value === "Enabled",
                      })
                    }
                  >
                    <option value="Enabled">Enabled - ₹60</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </label>
              )}

              <label className="menu-form-wide">
                Image URL
                <input
                  value={editingItem.image}
                  onChange={(event) =>
                    setEditingItem({ ...editingItem, image: event.target.value })
                  }
                />
              </label>
            </div>

            <div className="menu-form-actions">
              <button type="button" onClick={() => setEditingItem(null)}>
                Cancel
              </button>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {showAddForm && (
        <div className="menu-modal-backdrop" onClick={() => setShowAddForm(false)}>
          <form
            className="menu-modal"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleAddItem}
          >
            <div className="menu-modal-header">
              <div>
                <p className="menu-modal-eyebrow">Menu Master</p>
                <h2>Add New Item</h2>
              </div>

              <button type="button" onClick={() => setShowAddForm(false)}>
                ×
              </button>
            </div>

            <div className="menu-form-grid">
              <label>
                Item Name
                <input
                  value={newItem.name}
                  onChange={(event) =>
                    setNewItem({ ...newItem, name: event.target.value })
                  }
                  placeholder="Example: Peri Peri Pasta"
                />
              </label>

              <label>
                Category
                <select
                  value={newItem.category}
                  onChange={(event) =>
                    setNewItem({
                      ...newItem,
                      category: event.target.value,
                      subCategory:
                        event.target.value === "Beverages"
                          ? "Signature Mocktails"
                          : "",
                      type:
                        ["Pasta", "Fries", "Beverages"].includes(event.target.value)
                          ? "Vegetarian"
                          : newItem.type,
                    })
                  }
                >
                  {baseCategories
                    .filter((category) => category !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </label>

              {newItem.category === "Beverages" && (
                <label>
                  Beverage Sub Category
                  <select
                    value={newItem.subCategory}
                    onChange={(event) =>
                      setNewItem({ ...newItem, subCategory: event.target.value })
                    }
                  >
                    {beverageSubCategories.map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {!["Pasta", "Fries", "Beverages"].includes(newItem.category) && (
                <label>
                  Type
                  <select
                    value={newItem.type}
                    onChange={(event) =>
                      setNewItem({ ...newItem, type: event.target.value })
                    }
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </label>
              )}

              <label>
                Price
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(event) =>
                    setNewItem({ ...newItem, price: event.target.value })
                  }
                  placeholder="249"
                />
              </label>

              {["Pasta", "Fries"].includes(newItem.category) && (
                <label>
                  Chicken Add-On
                  <select
                    value={newItem.addChicken ? "Enabled" : "Disabled"}
                    onChange={(event) =>
                      setNewItem({
                        ...newItem,
                        addChicken: event.target.value === "Enabled",
                      })
                    }
                  >
                    <option value="Disabled">Disabled</option>
                    <option value="Enabled">Enabled - ₹60</option>
                  </select>
                </label>
              )}

              <label className="menu-form-wide">
                Image URL
                <input
                  value={newItem.image}
                  onChange={(event) =>
                    setNewItem({ ...newItem, image: event.target.value })
                  }
                  placeholder="Paste image URL or leave blank"
                />
              </label>
            </div>

            <div className="menu-form-actions">
              <button type="button" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit">Add Item</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}