import { CartSlice } from "@/store/cart-slice";
import { UserSlice } from "@/store/userSlice";

export type Store = UserSlice & CartSlice;
