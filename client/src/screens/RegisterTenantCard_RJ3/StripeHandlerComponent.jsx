// Custom Components
import RegisterTenantCard from "./RegisterTenantCard";

// Stripe Components
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe
const stripePromise = loadStripe("pk_test_r37z8vhuXVT8y17zrNPMRQ7d00XhEDZvQO");
// const stripePromise = loadStripe("pk_live_6p9ee84PINDA4OOZm6akKRFN004xTau8S7");

const StripeHandlerComponent = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <RegisterTenantCard />
      </Elements>
    </div>
  );
};

export default StripeHandlerComponent;
