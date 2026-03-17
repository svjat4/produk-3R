// components/CartItem.js
import { Trash2, Minus, Plus } from "lucide-react";

export default function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <div className="flex items-center p-4 md:p-6 border-b border-gray-50 last:border-0 group">
      {/* Thumbnail Produk */}
      <div className="h-20 w-20 bg-gray-100 rounded-2xl mr-4 flex-shrink-0 flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase text-center p-2">
        {item.name}
      </div>

      {/* Info Produk */}
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800 text-sm md:text-base">{item.name}</h3>
        <p className="text-xs text-gray-400 mb-2">Rp{item.price.toLocaleString()}</p>
        
        {/* Kontrol Jumlah (Opsional jika ingin tambah/kurang di keranjang) */}
        <div className="flex items-center gap-3 mt-1">
           <button 
             onClick={() => onUpdateQty(item.id, item.qty - 1)}
             className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
           >
             <Minus size={14} />
           </button>
           <span className="font-bold text-sm">{item.qty}</span>
           <button 
             onClick={() => onUpdateQty(item.id, item.qty + 1)}
             className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
           >
             <Plus size={14} />
           </button>
        </div>
      </div>

      {/* Harga Total per Item & Hapus */}
      <div className="flex flex-col items-end gap-2">
        <p className="font-black text-green-700">
          Rp{(item.price * item.qty).toLocaleString()}
        </p>
        <button 
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Hapus item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}