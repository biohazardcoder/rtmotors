import "./hww.css";

const howWeWork = [
  {
      image: "https://media.istockphoto.com/id/1356054725/vector/3d-vector-render-search-icon-cartoon-character-hand-holds-big-magnifying-glass-lens-business.jpg?s=612x612&w=0&k=20&c=UHLg8FC8HIBJKLGHVbf3O6uwSVu8uNz7LTlNu30dXkw=",
    title: "Explore Vehicles",
    description:
      "Browse and discover cars through RT Motors – from reliable dealers, verified platforms, and official auto auctions.",
  },
  {
    image: "https://cdn3d.iconscout.com/3d/premium/thumb/transfer-money-3d-icon-png-download-4797151.png",
    title: "Get an Estimate",
    description:
      "Request a detailed cost estimate in USD or EUR, covering both the vehicle price and shipping charges, prepared by our team.",
  },
  {
    image: "https://media.istockphoto.com/id/1427330624/vector/3d-credit-card-secure-payment-with-chackmark-money-financial-security-for-online-shopping.jpg?s=612x612&w=0&k=20&c=XuRKnfWBKB0vmcCfV5VrecBlMIIdl2PhewVaggesSwQ=",
    title: "Confirm & Pay",
    description:
      "Finalize your order and complete the payment securely via international bank transfer for the provided invoice.",
  },
  {
    image: "https://cdn3d.iconscout.com/3d/premium/thumb/container-ship-3d-icon-png-download-4288058.png",
    title: "Arrange Shipment",
    description:
      "We organize the quickest and most efficient shipping option for you, whether via container or Ro-Ro service.",
  },
  {
    image: "https://img.freepik.com/premium-vector/document-3d-icon-sheet-paper-clipboard-todo-list-with-check-marks-3d-realistic-design-element_363543-556.jpg",
    title: "Track & Receive Documents",
    description:
      "Monitor your shipment with the container number and receive all necessary import documents through express courier for customs clearance.",
  },
];

export const Hww = () => {
  return (
    <section className="timeline">
      {howWeWork.map((step, i) => {
        return (
          <article key={i}>
            <div className="timeline__content">
              <h1>{step.title}</h1>
              <hr />
              <p>{step.description}</p>
            </div>
            <div className="timeline__icon">
              <img  src={step.image} className="bg-white"/>
            </div>
          </article>
        );
      })}
    </section>
  );
};
