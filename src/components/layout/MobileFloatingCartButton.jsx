import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { compactINR } from "../../utils/currency";

export default function MobileFloatingCartButton() {
  const { itemCount, subtotal } = useCart();
  if (!itemCount) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-4 bottom-24 z-30 md:hidden"
    >
      <Link to="/cart" className="flame-button flex w-full justify-between rounded-3xl px-5 py-4">
        <span className="flex items-center gap-2">
          <ShoppingBag size={20} /> {itemCount} item{itemCount > 1 ? "s" : ""}
        </span>
        <span>{compactINR(subtotal)}</span>
      </Link>
    </motion.div>
  );
}
