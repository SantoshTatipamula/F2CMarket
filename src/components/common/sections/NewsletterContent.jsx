import delevery from "../../../assets/icons/fast-delivery.png";
import money from "../../../assets/icons/money.png";
import herbal from "../../../assets/icons/herbs.png";
 

export default function NewsletterContent() {
  return (
    <>
      <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        Join the F2CMARKET Community
      </h3>

      <p className="mt-4 text-green-50 text-lg leading-relaxed max-w-xl">
        Subscribe now and receive fresh product alerts, price drops and weekly
        farmer specials.
      </p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90 font-medium">
        <span className="flex items-center justify-center gap-2">
          {" "}
          <img src={herbal} alt="Fast Delivery" className="w-6" />
          <p>Fresh Updates</p>
        </span>
        <span className="flex items-center justify-center gap-2">
          {" "}
          <img src={money} alt="Fast Delivery" className="w-6" />
          <p>Special Discounts</p>
        </span>
        <span className="flex items-center justify-center gap-2">
          {" "}
          <img src={delevery} alt="Fast Delivery" className="w-6" />
          <p>Early Access</p>
        </span>
      </div>
    </>
  );
}
