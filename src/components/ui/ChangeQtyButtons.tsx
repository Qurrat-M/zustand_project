import { useStore } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { Button } from "./button";
import { useEffect } from "react";

type Props = { productId: string };

export function ChangeQtyButtons({ productId }: Props) {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce(
            (acc, product) => acc + product.price * product.qty,
            0
          )
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);
  
  return (
    <>
      {product && (
        <div className="flex gap-2 itms-center">
          <Button onClick={() => decQty(product.id)}>
            <Minus />
          </Button>
          {product.qty}
          <Button onClick={() => incQty(product.id)}>
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
}
