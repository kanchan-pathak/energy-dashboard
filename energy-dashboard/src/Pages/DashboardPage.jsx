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
      await fetchBills()
    } catch (err) {
      console.error("Error adding bill:", err)
      // alert("Failed to add bill")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-primary font-bold mb-6">Your Energy Bills</h2>

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

        {/* Bill List */}
        <div className="bg-white p-6 rounded-xl shadow">
          {bills?.length === 0 ? (
            <p>No bills found.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-primaryhover-light">
                  <th className="text-left text-heading p-2">Type</th>
                  <th className="text-left text-heading p-2">Amount</th>
                  <th className="text-left text-heading p-2">Due Date</th>
                  <th className="text-left text-heading p-2">Paid?</th>
                </tr>
              </thead>
              <tbody>
                {bills?.map((bill) => (
                  <tr key={bill._id} className="border-t">
                    
                    <td className="text-black p-2 capitalize">{bill.type}</td>
                    <td className="text-black p-2">₹{bill.amount}</td>
                    <td className="text-black p-2">{new Date(bill.dueDate).toLocaleDateString()}</td>
                    <td className="text-black p-2">{bill.isPaid ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
