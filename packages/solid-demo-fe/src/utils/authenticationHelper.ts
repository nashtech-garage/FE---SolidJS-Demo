import { setIsLoggin } from "../layouts/SubHeader";
import { medusaClient } from "./medusaClient";


  export async function customerRegister(email: string, password: string, first_name: string,last_name: string) {
    let customerId = sessionStorage.getItem('customerId');
    // Init cart
    if (!customerId) {
        medusaClient.customers.create({
            email,
            password,
            first_name,
            last_name,
          })
          .then(({ customer }) => {
          })
    }
  }

  export async function customerLogin(email: string, password: string) {
    medusaClient.auth.authenticate({
        email,
        password,
      })
      .then(({ customer }) => {
        sessionStorage.setItem('customerId', customer.id);
      })
  }

  export async function customerLogout() {
    medusaClient.auth.deleteSession()
    .then(() => {
      sessionStorage.removeItem('customerId');
      setIsLoggin(false)
      // success
    })
  }
  
  export async function getCurrentCustomer():Promise<any> {
    return medusaClient.auth.getSession();
  }

