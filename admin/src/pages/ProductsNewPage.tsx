// ProductsNewPage.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function ProductsNewPage() {
    const [categories, setCategories] = useState([]);
const [reportingCategories, setReportingCategories] = useState([]);
const [categoryId, setCategoryId] = useState("");
const [reportingCategoryId, setReportingCategoryId] = useState("");

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    status: "ACTIVE",
    visibility: "ONLINE",
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => alert("Failed to load categories"));
  
    fetch("/api/reporting-categories")
      .then((res) => res.json())
      .then(setReportingCategories)
      .catch(() => alert("Failed to load reporting categories"));
  }, []);
  

  const handleSave = async () => {
    const res = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        categoryId,
        reportingCategoryId,
      }),
    });
  
    if (res.ok) {
      alert("Product created");
      navigate("/products");
    } else {
      alert("Create failed");
    }
  };
  

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>

      <label className="block mb-2">Name</label>
      <input
        className="w-full mb-4 p-2 border"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />

      <label className="block mb-2">Slug</label>
      <input
        className="w-full mb-4 p-2 border"
        value={product.slug}
        onChange={(e) => setProduct({ ...product, slug: e.target.value })}
      />

      <label className="block mb-2">Status</label>
      <select
        className="w-full mb-4 p-2 border"
        value={product.status}
        onChange={(e) => setProduct({ ...product, status: e.target.value })}
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>

      <label className="block mb-2">Visibility</label>
      <select
        className="w-full mb-4 p-2 border"
        value={product.visibility}
        onChange={(e) => setProduct({ ...product, visibility: e.target.value })}
      >
        <option value="ONLINE">ONLINE</option>
        <option value="POS">POS</option>
        <option value="BOTH">BOTH</option>
      </select>
      <label className="block mb-2">Category</label>
<select
  className="w-full mb-4 p-2 border"
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
>
  <option value="">-- Select category --</option>
  {categories.map((cat: any) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>

<label className="block mb-2">Reporting Category</label>
<select
  className="w-full mb-4 p-2 border"
  value={reportingCategoryId}
  onChange={(e) => setReportingCategoryId(e.target.value)}
>
  <option value="">-- Select reporting category --</option>
  {reportingCategories.map((cat: any) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleSave}
      >
        Create Product
      </button>
    </div>
  );
}
