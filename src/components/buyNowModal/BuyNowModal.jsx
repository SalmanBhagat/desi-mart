import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <button onClick={() => setOpen(true)} className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg text-lg cursor-pointer">
        Buy now
      </button>
      {/* Popup */}
      {open && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* Popup Card */}
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-pink-400 px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Delivery Details
                </h2>
                <p className="text-sm text-pink-100">
                  Please enter your shipping information
                </p>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={addressInfo.name}
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        name : e.target.value
                      })
                    }}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    rows="1"
                    type="text"
                    placeholder="Enter your Address"
                    value={addressInfo.address}
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        address : e.target.value
                      })
                    }}
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                  />
                </div>

                {/* Pincode + Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pincode
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 400001"
                      value={addressInfo.pincode}
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        pincode : e.target.value
                      })
                    }}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="10 digit number"
                      value={addressInfo.mobileNumber}
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        mobileNumber : e.target.value
                      })
                    }}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex bg-gray-50 px-4 py-3">
                <div className="flex w-full gap-2">
                  <button onClick={() => {
                    buyNowFunction();
                    handleOpen();
                  }} className="w-2/3 rounded-lg bg-pink-500 px-6 py-2 text-sm font-medium text-white hover:bg-pink-600">
                    Place Order
                  </button>
                  <button onClick={() => setOpen(false)} className="w-1/3 rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyNowModal;
