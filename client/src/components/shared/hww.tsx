import React from "react";
import { useTranslation } from "react-i18next";
import "./hww.css";

interface Step {
  title: string;
  description: string;
  image: string;
}

export const Hww: React.FC = () => {
  const { t } = useTranslation();

  const steps = t("hww.steps", { returnObjects: true }) as Step[];

  return (
    <section className="timeline">
      {steps.map((step, i) => (
        <article key={i}>
          <div className="timeline__content">
            <h1>{step.title}</h1>
            <hr />
            <p>{step.description}</p>
          </div>
          <div className="timeline__icon">
            <img src={step.image} alt={step.title} className="bg-white" />
          </div>
        </article>
      ))}
    </section>
  );
};
