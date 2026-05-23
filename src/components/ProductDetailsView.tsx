import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Star, ShoppingBag, Heart, Truck, ArrowRight, Check, Sparkles, MessageSquare } from "lucide-react";
import { Product, Review } from "../types";
import { PRODUCTS_DATA, REVIEWS_DATA } from "../data";

interface ProductDetailsViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailsView({
  product,
  onBack,
  onAddToCart,
  onSelectProduct
}: ProductDetailsViewProps) {
  const [activeImage, setActiveImage] = useState(product.img);
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Update active image when product changes
  useEffect(() => {
    setActiveImage(product.img);
    setQuantity(1);
    setJustAdded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  // Gallery images setup matching the detailed layouts
  const galleryImages = product.detailsImages || [
    product.img,
    // fallback details studio
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC1BIwRGXChYq9K-7NkT-3N6IHQ_m9R7dQnslt3iSRJyk_Jvm9rfVvAMCrtGTpjkTPu1UXQdP-Yvn8dqr13-fpzTVVTOtJW5tqj5m5uZqx5UWfkD3KpeEmyVCwKVx2mezfNPTQuxax662WJ3mvhXGDu23K9C1mepY-0H-jrmK0JbFBTYtIcPfreP2CAOrakosVStxxrcM2eyNY2yOXlYg2rZJuWWlnBYROUsCZwniRf0FgvItNX4opom7064ACRBdmigOts3MSJLo0",
    // fallback home decor
    "https://lh3.googleusercontent.com/aida-public/AB6AXuOn2T9lJnqKz1rikIMfJGhm1UTLY5r16DsGSv4kymixsMp_E7WHFy8JoFOp7AI6uwM5Cw4RHk9QnKI-5W-v2eeCcqIhwaxgNZjyCd9duPLZC00-FQcmcP4KGbiUV2FBCY7SO_gzhMXtf-q_qCm-mKlutH6OjH61IdcS_iwio6EPNIeBqRiCt4rj9vvTCLmhpz51P1hSLiL_b2p3xMp-ldc7r3AYA2FIiYA1R50h0xlMMs1SWiVqCbv7ft8dffyEUNzZKNRRNLdcxg"
  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, quantity);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 2500);
    }, 850);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const initials = newAuthor.trim().charAt(0).toUpperCase() || "A";
    const colors = [
      "bg-primary-container/20 text-primary",
      "bg-secondary-container text-on-secondary-container",
      "bg-tertiary-container text-on-tertiary-container"
    ];
    const borderBg = colors[Math.floor(Math.random() * colors.length)];

    const createdReview: Review = {
      id: "new-rev-" + Date.now(),
      author: newAuthor,
      rating: newRating,
      text: newComment,
      date: "Today",
      verified: true,
      avatarLetter: initials,
      avatarBg: borderBg
    };

    setReviews([createdReview, ...reviews]);
    setNewAuthor("");
    setNewComment("");
    setNewRating(5);
    setShowReviewForm(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Recommendations loader excludes current product
  const recommendations = PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-12 mt-24 space-y-16 animate-fadeIn pb-16 font-sans">
      
      {/* Return Navigation bar */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-sans font-semibold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Discovery</span>
        </button>
        <span className="text-xs text-on-surface-variant font-mono tracking-widest uppercase">
          Artisanal Catalog Index
        </span>
      </div>

      {/* Product Information Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery Column (Bento grid / multiperspective slider) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 aspect-[4/5] overflow-hidden rounded-2xl border border-outline-variant/30 shadow-sm relative group bg-surface-container-low">
            <img
              alt={product.title}
              className="w-full h-full object-cover select-none transition-all duration-700 hover:scale-[1.02]"
              src={activeImage}
              referrerPolicy="no-referrer"
            />
            <div className="pattern-overlay absolute inset-0 pointer-events-none"></div>
          </div>

          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`aspect-square overflow-hidden rounded-2xl border cursor-pointer transition-all relative ${
                activeImage === img
                  ? "border-primary ring-2 ring-primary-fixed/50"
                  : "border-outline-variant/30 hover:border-primary/50"
              }`}
            >
              <img
                alt={`Detail perspective ${idx + 1}`}
                className="w-full h-full object-cover select-none"
                src={img}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Product Details Side Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-tertiary">
              <MapPin className="w-4 h-4" />
              <span className="font-sans font-semibold text-xs tracking-wider uppercase">
                {product.region}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary leading-tight font-medium">
              {product.title}
            </h2>

            {/* Live review score tracker */}
            <div className="flex items-center gap-1.5 text-primary select-none">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 fill-current ${
                      star <= Math.round(product.rating) ? "text-primary" : "text-primary/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-on-surface-variant text-xs font-semibold font-sans ml-2">
                (48 Reviews)
              </span>
            </div>
          </div>

          {/* Pricing & Add to Cart Frame */}
          <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20 relative overflow-hidden shadow-sm">
            <div className="pattern-overlay absolute inset-0 pointer-events-none"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif text-primary font-semibold">
                  Values: ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-on-surface-variant line-through text-sm">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Changer */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-sans font-semibold text-on-surface-variant uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-outline-variant rounded-lg bg-background overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-surface-container-high transition-colors font-bold text-sm cursor-pointer"
                    title="Decrease"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-bold text-on-surface select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-surface-container-high transition-colors font-bold text-sm cursor-pointer"
                    title="Increase"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-outline-variant/20">
                <button
                  disabled={isAdding}
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl text-sm font-sans font-semibold uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer shadow-sm hover:shadow-md ${
                    justAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-primary hover:bg-primary-container text-on-primary"
                  }`}
                >
                  {isAdding ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      ADDING...
                    </span>
                  ) : justAdded ? (
                    <span className="flex items-center gap-2 animate-bounce">
                      <Check className="w-4 h-4" />
                      ADDED TO CART
                    </span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart (₹{(product.price * quantity).toLocaleString("en-IN")})
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`w-full border py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFavorited
                      ? "border-primary text-primary bg-primary/5 font-bold"
                      : "border-outline text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                  {isFavorited ? "In Favorites" : "Mark Favorite"}
                </button>
              </div>
            </div>
          </div>

          {/* Direct highlights checklist */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/30 font-sans">
            <div className="flex items-center gap-4">
              <div className="bg-primary/5 p-3 rounded-full text-primary">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-on-surface">Eco-friendly Materials</p>
                <p className="text-xs text-on-surface-variant">
                  Natural organic vegetable pigments and acid-free handmade paper
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/5 p-3 rounded-full text-primary">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-on-surface">Artisan Direct Dispatch</p>
                <p className="text-xs text-on-surface-variant">
                  Carefully wrapped & shipped directly from the rural cluster in 7-10 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Heritage Story Section */}
      {product.storyParagraphs && (
        <section className="relative py-16 bg-surface-container overflow-hidden rounded-3xl border border-outline-variant/20 shadow-sm">
          <div className="pattern-overlay absolute inset-0"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-16 items-center">
            <div className="space-y-6">
              <h3 className="font-serif text-3xl text-primary leading-tight">
                {product.storyTitle || "The Heritage Story"}
              </h3>
              <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed">
                {product.storyParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {product.artisanName && (
                <div className="pt-4 border-t border-outline-variant/30 flex items-center gap-2 text-primary font-semibold text-sm">
                  <span>Custodian: {product.artisanName}</span>
                </div>
              )}
            </div>

            {/* Portrait column */}
            {product.artisanImage && (
              <div className="relative group mx-auto max-w-sm lg:max-w-none w-full">
                <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-md bg-white p-4 border border-outline-variant/20">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                    <img
                      alt={product.artisanName || "Artisan Master"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                      src={product.artisanImage}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/5"></div>
                  </div>
                  {product.artisanQuote && (
                    <blockquote className="italic text-xs md:text-sm text-primary/95 text-center px-4 leading-relaxed font-serif">
                      "{product.artisanQuote}"
                    </blockquote>
                  )}
                  <p className="text-center font-sans font-bold text-xs text-on-surface uppercase tracking-widest mt-3">
                    {product.artisanName} • Master Craftsperson
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Customer Voices / Star Reviews Section */}
      <section className="space-y-6 border-t border-outline-variant/20 pt-16">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-primary font-medium">Customer Voices</h3>
            <p className="text-xs text-on-surface-variant font-sans mt-0.5">
              Reflecting verified experiences from direct art buyers
            </p>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-primary border border-primary/40 px-4 py-2 hover:bg-primary/5 rounded-xl font-sans font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {showReviewForm ? "Cancel Review" : "Write a Review"}
          </button>
        </div>

        {reviewSuccess && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl text-xs md:text-sm animate-pulse font-semibold">
            ✨ Thank you! Your review has been hand-logged onto the local storage ledger.
          </div>
        )}

        {/* Dynamic review writing form */}
        {showReviewForm && (
          <form
            onSubmit={handleAddReview}
            className="bg-surface-container/50 border border-outline-variant/20 p-6 rounded-2xl max-w-xl animate-fadeIn space-y-4"
          >
            <h4 className="font-serif text-lg text-primary">Log Your Product Review</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant font-semibold">Your Name</label>
                <input
                  required
                  placeholder="e.g. Rahul Sen"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="bg-background border border-outline-variant rounded-lg p-2.5 outline-none text-sm font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant font-semibold">Rating Score</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="bg-background border border-outline-variant rounded-lg p-2.5 outline-none text-sm font-sans"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                  <option value={2}>2 Stars ★★☆☆☆</option>
                  <option value={1}>1 Star ★☆☆☆☆</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-on-surface-variant font-semibold">Comments</label>
              <textarea
                required
                rows={3}
                placeholder="Describe the texture, colors, and artisan quality..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-background border border-outline-variant rounded-lg p-2.5 outline-none text-sm font-sans resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-container text-white py-2 px-6 rounded-lg text-xs font-semibold cursor-pointer transition-all self-end"
            >
              Submit Review
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-surface-bright border border-outline-variant/30 rounded-2xl space-y-4 shadow-sm"
            >
              <div className="flex text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 fill-current ${
                      star <= rev.rating ? "text-primary" : "text-primary/10"
                    }`}
                  />
                ))}
              </div>
              <p className="italic text-on-surface text-xs md:text-sm font-serif leading-relaxed">
                "{rev.text}"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div
                  className={`w-8 h-8 rounded-full ${rev.avatarBg} flex items-center justify-center font-bold text-xs`}
                >
                  {rev.avatarLetter}
                </div>
                <div>
                  <p className="font-sans font-bold text-xs text-on-surface">{rev.author}</p>
                  <p className="text-[10px] text-on-surface-variant">Verified Art Buyer • {rev.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rec List ("You May Also Like") */}
      <section className="space-y-8 border-t border-outline-variant/20 pt-16">
        <h3 className="font-serif text-2xl md:text-3xl text-primary text-center">You May Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => onSelectProduct(rec)}
              className="group cursor-pointer transform duration-300 hover:scale-[1.01]"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-outline-variant/30 mb-3 relative bg-surface-container-low shadow-sm">
                <img
                  alt={rec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  src={rec.img}
                  referrerPolicy="no-referrer"
                />
                {rec.isHandmade && (
                  <div className="absolute top-2 right-2 bg-tertiary text-on-tertiary px-2 py-0.5 rounded text-[8px] font-sans font-semibold tracking-wider uppercase">
                    HANDMADE
                  </div>
                )}
              </div>
              <h4 className="font-serif text-sm md:text-base font-medium text-on-surface group-hover:text-primary transition-colors truncate">
                {rec.title}
              </h4>
              <p className="text-primary font-bold text-xs md:text-sm mt-0.5">
                ₹{rec.price.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
