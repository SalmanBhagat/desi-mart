export const SkeletonLoader = ({ type = "table" }) => {

  // Product info skeleton
   if (type === "product-info") {
    return (
      <>
        {/* LEFT IMAGE */}
          <div className="bg-p-100 flex items-center justify-center h-105">
            {/* <div className="w-72 h-72 bg-p-200 rounded-xl"></div> */}
          </div>

          {/* RIGHT CONTENT */}
          <div className="px-10 py-7 flex flex-col gap-5">
            
            {/* TITLE */}
            <div className="h-8 w-3/4 bg-p-200 rounded"></div>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 bg-p-200 rounded"
                  ></div>
                ))}
              </div>
              <div className="h-4 w-20 bg-p-200 rounded"></div>
            </div>

            {/* PRICE */}
            <div className="h-8 w-32 bg-p-200 rounded"></div>

            {/* DESCRIPTION */}
            <div className="space-y-2 h-32">
              <div className="h-4 w-full bg-p-200 rounded"></div>
              <div className="h-4 w-full bg-p-200 rounded"></div>
              <div className="h-4 w-full bg-p-200 rounded"></div>
              <div className="h-4 w-full bg-p-200 rounded"></div>
              <div className="h-4 w-4/5 bg-p-200 rounded"></div>
            </div>

            {/* BUTTON */}
            <div className="h-12 w-full bg-p-200 rounded-xl mt-4"></div>
          </div>
      </>
    );
  }

  // 🟣 PRODUCT CARD SKELETON
  if (type === "product-card") {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        {/* Image */}
        <div className="h-56 bg-p-200"></div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Brand */}
          <div className="h-3 w-20 bg-p-200 rounded"></div>

          {/* Title */}
          <div className="h-5 w-3/4 bg-p-200 rounded"></div>

          {/* Price */}
          <div className="h-5 w-24 bg-p-200 rounded"></div>

          {/* Button */}
          <div className="h-10 w-full bg-p-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // 🟣 ORDER TABLE ROW SKELETON
  if (type === "order-table") {
    return (
      <tr className="animate-pulse">
        {/* 1. No */}
        <td className="px-4 py-3">
          <div className="h-4 w-6 bg-p-200 rounded"></div>
        </td>

        {/* 2. Order ID */}
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-p-200 rounded"></div>
        </td>

        {/* 3. Image */}
        <td className="px-4 py-3">
          <div className="h-12 w-12 bg-p-200 rounded-lg"></div>
        </td>

        {/* 4. Title */}
        <td className="px-4 py-3">
          <div className="h-4 w-32 bg-p-200 rounded"></div>
        </td>

        {/* 5. Category */}
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-p-200 rounded"></div>
        </td>

        {/* 6. Price */}
        <td className="px-4 py-3">
          <div className="h-4 w-16 bg-p-200 rounded"></div>
        </td>

        {/* 7. Quantity */}
        <td className="px-4 py-3 text-center">
          <div className="h-4 w-8 bg-p-200 rounded mx-auto"></div>
        </td>

        {/* 8. Total */}
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-p-200 rounded"></div>
        </td>

        {/* 9. Status */}
        <td className="px-4 py-3">
          <div className="h-6 w-16 bg-p-200 rounded-full"></div>
        </td>

        {/* 10. Name */}
        <td className="px-4 py-3">
          <div className="h-4 w-24 bg-p-200 rounded"></div>
        </td>

        {/* 11. Address */}
        <td className="px-4 py-3">
          <div className="h-4 w-40 bg-p-200 rounded"></div>
        </td>

        {/* 12. Pincode */}
        <td className="px-4 py-3">
          <div className="h-4 w-16 bg-p-200 rounded"></div>
        </td>

        {/* 13. Phone */}
        <td className="px-4 py-3">
          <div className="h-4 w-24 bg-p-200 rounded"></div>
        </td>

        {/* 14. Email */}
        <td className="px-4 py-3">
          <div className="h-4 w-32 bg-p-200 rounded"></div>
        </td>

        {/* 15. Date */}
        <td className="px-4 py-3">
          <div className="h-4 w-20 bg-p-200 rounded"></div>
        </td>

        {/* 16. Delete */}
        <td className="px-4 py-3 text-center">
          <div className="h-8 w-16 bg-p-200 rounded-md mx-auto"></div>
        </td>
      </tr>
    );
  }

  // 🟣 USER TABLE ROW SKELETON
  if (type === "user-table") {
  return (
    <tr className="animate-pulse">
      {/* 1. No */}
        <td className="px-4 py-3">
          <div className="h-4 w-6 bg-p-200 rounded"></div>
        </td>
      {/* 2. User ID */}
      <td className="px-6 py-4">
        <div className="h-4 w-16 bg-p-200 rounded"></div>
      </td>

      {/* 3. Name */}
      <td className="px-6 py-4">
        <div className="h-4 w-28 bg-p-200 rounded"></div>
      </td>

      {/* 4. Email */}
      <td className="px-6 py-4">
        <div className="h-4 w-44 bg-p-200 rounded"></div>
      </td>

      {/* 5. Role Badge */}
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-p-200 rounded-full"></div>
      </td>

      {/* 6. Date */}
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-p-200 rounded"></div>
      </td>

      {/* 7. Remove Button */}
      <td className="px-6 py-4 text-center">
        <div className="h-7 w-20 border border-pink-300 bg-p-100 rounded-md mx-auto"></div>
      </td>
    </tr>
  );
  }


  // 🟣 DEFAULT: TABLE ROW SKELETON
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 w-6 bg-p-200 rounded"></div>
      </td>

      <td className="px-6 py-4">
        <div className="h-12 w-12 bg-p-200 rounded-lg"></div>
      </td>

      <td className="px-6 py-4">
        <div className="h-4 w-32 bg-p-200 rounded"></div>
      </td>

      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-p-200 rounded-full"></div>
      </td>

      <td className="px-6 py-4">
        <div className="h-4 w-16 bg-p-200 rounded"></div>
      </td>

      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-p-200 rounded"></div>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-3">
          <div className="h-8 w-8 bg-p-200 rounded-full"></div>
          <div className="h-8 w-8 bg-p-200 rounded-full"></div>
        </div>
      </td>
    </tr>
  );
};
