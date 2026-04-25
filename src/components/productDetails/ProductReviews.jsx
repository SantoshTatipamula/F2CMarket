// // src/components/productDetails/ProductReviews.jsx

// import { useState } from "react";
// import {
//   Star,
//   BadgeCheck,
//   ThumbsUp,
//   MessageCircle,
// } from "lucide-react";

// import { reviewsData } from "@/data/reviewsData";

// export default function ProductReviews({ product }) {
//   const [visibleCount, setVisibleCount] = useState(3);

//   const reviews = reviewsData.slice(0, visibleCount);

//   const rating = product?.rating || 4.8;
//   const totalReviews = reviewsData.length;

//   const ratingDistribution = [
//     { stars: 5, count: 95, percentage: 76 },
//     { stars: 4, count: 22, percentage: 18 },
//     { stars: 3, count: 5, percentage: 4 },
//     { stars: 2, count: 2, percentage: 1 },
//     { stars: 1, count: 1, percentage: 1 },
//   ];

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 3);
//   };

//   const hasMoreReviews = visibleCount < reviewsData.length;

//   return (
//     <section className="mt-20">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-[var(--text-primary)]">
//           Customer Reviews
//         </h2>

//         <p className="mt-2 text-[var(--text-secondary)]">
//           Real feedback from verified buyers
//         </p>
//       </div>

//       {/* Rating Summary */}
//       <div className="mb-10 grid gap-6 lg:grid-cols-3">
//         {/* Overall Rating */}
//         <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-amber-50 via-white to-white p-8 shadow-lg">
//           <div className="text-center">
//             <div className="mb-3 text-6xl font-bold text-[var(--text-primary)]">
//               {rating}
//             </div>

//             <div className="mb-2 flex justify-center gap-1">
//               {[...Array(5)].map((_, index) => (
//                 <Star
//                   key={index}
//                   size={20}
//                   fill="#F59E0B"
//                   className="text-amber-500"
//                 />
//               ))}
//             </div>

//             <p className="text-sm font-medium text-[var(--text-muted)]">
//               Based on {totalReviews} reviews
//             </p>

//             <div className="mt-4 flex items-center justify-center gap-2 text-sm">
//               <BadgeCheck
//                 size={16}
//                 className="text-green-600"
//               />
//               <span className="font-medium text-green-700">
//                 All Verified Purchases
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Rating Distribution */}
//         <div className="lg:col-span-2 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-lg">
//           <h3 className="mb-5 text-lg font-bold text-[var(--text-primary)]">
//             Rating Distribution
//           </h3>

//           <div className="space-y-3">
//             {ratingDistribution.map((item) => (
//               <div
//                 key={item.stars}
//                 className="flex items-center gap-3"
//               >
//                 <div className="flex w-16 items-center gap-1 text-sm font-medium">
//                   <span>{item.stars}</span>

//                   <Star
//                     size={14}
//                     fill="#F59E0B"
//                     className="text-amber-500"
//                   />
//                 </div>

//                 <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
//                   <div
//                     className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
//                     style={{
//                       width: `${item.percentage}%`,
//                     }}
//                   />
//                 </div>

//                 <span className="w-12 text-right text-sm font-medium text-[var(--text-muted)]">
//                   {item.count}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Reviews Grid */}
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//         {reviews.map((review) => (
//           <div
//             key={review.id}
//             className="group rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
//           >
//             {/* Header */}
//             <div className="mb-4 flex items-start justify-between">
//               <div className="flex items-start gap-3">
//                 <img
//                   src={review.avatar}
//                   alt={review.name}
//                   className="h-12 w-12 rounded-full border-2 border-[var(--border)] object-cover"
//                 />

//                 <div>
//                   <div className="flex items-center gap-2">
//                     <p className="font-bold text-[var(--text-primary)]">
//                       {review.name}
//                     </p>

//                     {review.verified && (
//                       <BadgeCheck
//                         size={16}
//                         className="text-green-600"
//                       />
//                     )}
//                   </div>

//                   <p className="text-xs text-[var(--text-muted)]">
//                     {review.location} • {review.date}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Rating */}
//             <div className="mb-3 flex gap-1">
//               {[...Array(5)].map((_, index) => (
//                 <Star
//                   key={index}
//                   size={16}
//                   fill={
//                     index < review.rating
//                       ? "#F59E0B"
//                       : "none"
//                   }
//                   className={
//                     index < review.rating
//                       ? "text-amber-500"
//                       : "text-gray-300"
//                   }
//                 />
//               ))}
//             </div>

//             {/* Review */}
//             <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
//               {review.review}
//             </p>

//             {/* Footer */}
//             <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
//               <button className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--primary)]">
//                 <ThumbsUp size={16} />
//                 <span>
//                   Helpful ({review.helpful})
//                 </span>
//               </button>

//               <button className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--primary)]">
//                 <MessageCircle size={16} />
//                 <span>Reply</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Load More */}
//       {hasMoreReviews && (
//         <div className="mt-8 text-center">
//           <button
//             onClick={handleLoadMore}
//             className="rounded-full border-2 border-[var(--border)] bg-white px-8 py-3 font-semibold text-[var(--text-primary)] transition-all hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
//           >
//             Load More Reviews
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }