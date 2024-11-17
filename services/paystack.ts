import { TransactionData } from "@/types";
import axios from "axios";



const Paystack = {
    api: axios.create({
        baseURL: "https://api.paystack.co",
        headers: {
            "Authorization": `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_KEY!}`,
            "Content-Type": "application/json"
        }
    }),
    listBanks: async function () {
        const response = await this.api.get("/bank", {
            params: { country: "nigeria", perPage: 100 }
        })

        return response.data.data as {
            name: string,
            code: string
        }[]
    },
    initializeTransaction: async function (data: TransactionData) {
        const response = await this.api.post("/transaction/initialize", {
            currency: "NGN",
            email: data.email,
            amount: data.amount * 100,
            split: {
                type: "flat",
                bearer_type: "account",
                subaccounts: data.subaccounts
            },
            metadata: {
                user_id: data.cartItems[0].user_id,
                cart: data.cartItems,
                customer_name: data.customerName,
            }
        })

        return response.data.data as {
            authorization_url: string,
            reference: string,
            access_code: string
        }
    },
    verifyTransaction: async function (transactionReference: string) {
        const response = await this.api.get(`/transaction/verify/${transactionReference}`);
        return response.data.data.status === "success"
    }
}

export default Paystack;