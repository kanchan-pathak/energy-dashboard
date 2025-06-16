import React, { useState, useEffect } from "react"
import axios from "axios"

const Dashboard = () => {
  const [bills, setBills] = useState([])
  const [type, setType] = useState("electricity")
  const [amount, setAmount] = useState("")

  const [dueDate, setDueDate] = useState(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
  });
  
  const [isPaid, setIsPaid] = useState(false)
  const [loading, setLoading] = useState(false)

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const[searchQuery,setSearchQuery]=useState("")

  const [editingBill, setEditingBill] = useState(null)
  const [formData, setFormData] = useState({
  type: "",
  amount: "",
  dueDate: "",
  isPaid: false
  })

  useEffect(() => {
    fetchBills()
  }, [])

  const fetchBills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/bills/mybills`, {
        withCredentials: true,
      })
      console.log("this is response of fetch bill",response.data)
      setBills(response.data.data)
    } catch (err) {
      console.error("Error fetching bills:", err)
      // alert("Could not load bills")
    }
  }

  const handleAddBill = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/bills/uploadbill`,
        { type, amount, dueDate, isPaid },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      alert("Bill added!")
      console.log(bills)
      setAmount("")
      setDueDate("")
      setSearchQuery("")
      setSelectedMonth("")
      setSelectedYear("")
      await fetchBills()
    } catch (err) {
      console.error("Error adding bill:", err)
      // alert("Failed to add bill")
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (bill) => {
  setEditingBill(bill)
  setFormData({
    type: bill.type,
    amount: bill.amount,
    dueDate: bill.dueDate.split("T")[0],
    isPaid: bill.isPaid
  })
}
const handleFilter = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/bills/filter?month=${selectedMonth}&year=${selectedYear}&search=${searchQuery}`,
      { withCredentials: true }
    );
    console.log(response.data)
    setBills(response.data.data);
  } catch (err) {
    console.error("Error filtering bills", err);
    alert("Filter failed. Try again.");
  }
};
  const handleUpdate = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/bills/updatebill/${editingBill._id}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      }
    )

    alert("Bill updated!")
    setEditingBill(null)
    fetchBills() // refresh list
  } catch (err) {
    console.error("Update failed", err)
    alert("Update failed")
  }
}

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-primary font-bold mb-6">Your Energy Bills</h2>
       

<select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
  <option value="">All Years</option>
  {[2023, 2024, 2025].map((year) => (
    <option key={year} value={year}>{year}</option>
  ))}
</select>

<button onClick={handleFilter}>Filter</button>
        <form onSubmit={handleAddBill} className="mb-8 bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-xl font-semibold">Add New Bill</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 text-black rounded border"
            >
              <option value="electricity">Electricity</option>
              <option value="gas">Gas</option>
            </select>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
              className="text-black p-2 rounded border flex-1"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="text-black p-2 rounded border"
            />
          </div>

            <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id="isPaid"
      checked={isPaid}
      onChange={(e) => setIsPaid(e.target.checked)}
      className="h-4 w-4 text-primary"
    />
    <label htmlFor="isPaid" className="text-gray-800">
      Mark as paid
    </label>
  </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primaryhover-light disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Bill"}
          </button>
        </form>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded text-black"
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="p-2 border rounded text-black"
          >
            <option value="">All Months</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2 border rounded text-black"
          >
            <option value="">All Years</option>
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button
            onClick={handleFilter}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryhover-light"
          >
            Filter
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">

          {bills?.length === 0 ? (
            <p className="text-primary font-bold">No bills found.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-primaryhover-light">
                  <th className="text-left text-heading p-2">Type</th>
                  <th className="text-left text-heading p-2">Amount</th>
                  <th className="text-left text-heading p-2">Due Date</th>
                  <th className="text-left text-heading p-2">Paid?</th>
                  <th className="text-left text-heading p-2"></th>
                </tr>
              </thead>
              <tbody>
                {bills?.map((bill) => (
                  <tr key={bill._id} className="border-t">
                    
                    <td className="text-black p-2 capitalize">{bill.type}</td>
                    <td className="text-black p-2">₹{bill.amount}</td>
                    <td className="text-black p-2">{new Date(bill.dueDate).toLocaleDateString()}</td>
                    <td className="text-black p-2">{bill.isPaid ? "✅" : "❌"}</td>
                    <td className="text-black p-2">
                    <button
                    className="px-3 py-1 text-sm bg-secondary text-white rounded font-semibold hover:bg-primaryhover-light"
                    onClick={() => handleEditClick(bill)}>
                    Edit
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {editingBill && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg w-[300px]">
      <h2 className="text-lg text-primary font-bold mb-2">Edit Bill</h2>

      <label className="text-primary font-semibold">Type:</label>
      <input
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="text-black w-full mb-2 p-2 border rounded"
      />

      <label className="text-primary font-semibold">Amount:</label>
      <input
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="text-black w-full mb-2 p-2 border rounded"
      />

      <label className="text-primary font-semibold">Due Date:</label>
      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="text-black w-full mb-2 p-2 border rounded"
      />

      <label className="text-primary font-semibold">Paid:</label>
      <input
        type="checkbox"
        checked={formData.isPaid}
        onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
        className="text-black ml-2"
      />

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => setEditingBill(null)} className="px-3 py-1 bg-secondary rounded">Cancel</button>
        <button onClick={handleUpdate} className="px-3 py-1 bg-primary text-white rounded">Save</button>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
