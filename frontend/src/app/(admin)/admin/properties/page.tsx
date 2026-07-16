"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Filter, X, Loader2, Save } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

interface Property {
  id: string;
  title: string;
  price: number;
  roomType: string;
  availability: string;
  createdAt: string;
  estate?: { name: string };
}

interface EditForm {
  title: string;
  price: string;
  availability: string;
}

export default function PropertiesManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Edit modal state
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ title: "", price: "", availability: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get("/houses");
      const data = res.data?.data || res.data || [];
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`/houses/${id}`);
        toast.success("Property deleted successfully");
        fetchProperties();
      } catch (error) {
        console.error("Failed to delete property", error);
        toast.error("Failed to delete property.");
      }
    }
  };

  const openEdit = (property: Property) => {
    setEditingProperty(property);
    setEditForm({
      title: property.title,
      price: String(property.price),
      availability: property.availability,
    });
  };

  const closeEdit = () => {
    setEditingProperty(null);
    setEditForm({ title: "", price: "", availability: "" });
  };

  const handleSave = async () => {
    if (!editingProperty) return;
    if (!editForm.title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await api.patch(`/houses/${editingProperty.id}`, {
        title: editForm.title.trim(),
        price: parseFloat(editForm.price),
        availability: editForm.availability,
      });
      toast.success("Property updated successfully!");
      closeEdit();
      fetchProperties();
    } catch (error) {
      console.error("Failed to update property", error);
      toast.error("Failed to update property. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#01452c]">Properties</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all listings on the platform</p>
        </div>
        <button className="flex items-center gap-2 bg-[#01452c] hover:bg-[#023120] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-[#01452c]/20 hover:scale-105 active:scale-95">
          <Plus className="w-5 h-5" />
          Add Property
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#01452c]/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#01452c]/10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Title / Estate</th>
                <th className="px-6 py-4">Price (KES)</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Added On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading properties...
                  </td>
                </tr>
              ) : filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No properties found
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#01452c]">{property.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{property.estate?.name || "No Estate"}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {property.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200">
                        {property.roomType.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          property.availability === "VACANT"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {property.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(property)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit property"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Edit Modal ──────────────────────────────────────────── */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeEdit}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#01452c]">Edit Property</h2>
                <p className="text-xs text-slate-400 mt-0.5">Update property details</p>
              </div>
              <button
                onClick={closeEdit}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#01452c] mb-1.5">
                  House Title / Name
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="e.g. Studio Room in Mwangaza"
                  className="w-full px-4 py-3 border border-emerald-100 bg-[#f0fbf5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-[#01452c] mb-1.5">
                  Monthly Rent (KES)
                </label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  placeholder="e.g. 8000"
                  min={0}
                  className="w-full px-4 py-3 border border-emerald-100 bg-[#f0fbf5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold text-[#01452c] mb-1.5">
                  Availability
                </label>
                <select
                  value={editForm.availability}
                  onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                  className="w-full px-4 py-3 border border-emerald-100 bg-[#f0fbf5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
                >
                  <option value="VACANT">VACANT</option>
                  <option value="OCCUPIED">OCCUPIED</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeEdit}
                className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#01452c] hover:bg-[#023120] text-white font-bold rounded-xl transition-all text-sm shadow-md shadow-emerald-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
