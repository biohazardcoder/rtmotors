import React, { useEffect } from "react";
import gsap from "gsap";
import { Pane } from "tweakpane";

const NavItems: React.FC = () => {
  useEffect(() => {
    const config = {
      theme: "dark",
      spotlight: {
        speed: 0.25,
        deviation: 0.8,
        surface: 0.5,
        specular: 6,
        exponent: 65,
        light: "hsla(234, 14%, 72%, 0.25)",
        x: 0,
        y: 54,
        z: 82,
        pointer: false,
      },
      ambience: {
        deviation: 0.8,
        surface: 0.5,
        specular: 25,
        exponent: 65,
        light: "hsla(234, 14%, 72%, 0.25)",
        x: 120,
        y: -154,
        z: 160,
      },
    };

    const ctrl = new Pane({ title: "Config", expanded: true });
    const nav = document.querySelector("nav") as HTMLElement;
    const links = nav?.querySelectorAll("a") || [];

    const spotlightfeGaussianBlur = document.querySelector(
      "#spotlight feGaussianBlur"
    ) as SVGFEGaussianBlurElement;
    const spotlightfeSpecularLighting = document.querySelector(
      "#spotlight feSpecularLighting"
    ) as SVGFESpecularLightingElement;
    const spotlightfePointLight = document.querySelector(
      "#spotlight fePointLight"
    ) as SVGFEPointLightElement;

    const ambiencefeGaussianBlur = document.querySelector(
      "#ambience feGaussianBlur"
    ) as SVGFEGaussianBlurElement;
    const ambiencefeSpecularLighting = document.querySelector(
      "#ambience feSpecularLighting"
    ) as SVGFESpecularLightingElement;
    const ambiencefePointLight = document.querySelector(
      "#ambience fePointLight"
    ) as SVGFEPointLightElement;

    const syncLight = ({ x, y }: { x: number; y: number }) => {
      if (!nav) return;
      const navBounds = nav.getBoundingClientRect();
      spotlightfePointLight.setAttribute("x", String(Math.floor(x - navBounds.x)));
      spotlightfePointLight.setAttribute("y", String(Math.floor(y - navBounds.y)));
    };

    let monitoring = false;
    const update = () => {
      document.documentElement.dataset.theme = config.theme;

      // spotlight
      spotlightfeGaussianBlur.setAttribute("stdDeviation", String(config.spotlight.deviation));
      spotlightfeSpecularLighting.setAttribute("surfaceScale", String(config.spotlight.surface));
      spotlightfeSpecularLighting.setAttribute("specularConstant", String(config.spotlight.specular));
      spotlightfeSpecularLighting.setAttribute("specularExponent", String(config.spotlight.exponent));
      spotlightfeSpecularLighting.setAttribute("lighting-color", config.spotlight.light);

      // ambience
      ambiencefeGaussianBlur.setAttribute("stdDeviation", String(config.ambience.deviation));
      ambiencefeSpecularLighting.setAttribute("surfaceScale", String(config.ambience.surface));
      ambiencefeSpecularLighting.setAttribute("specularConstant", String(config.ambience.specular));
      ambiencefeSpecularLighting.setAttribute("specularExponent", String(config.ambience.exponent));
      ambiencefeSpecularLighting.setAttribute("lighting-color", config.ambience.light);

      const anchor = document.querySelector('[data-active="true"]') as HTMLElement;
      if (!anchor || !nav) return;

      const navBounds = nav.getBoundingClientRect();
      const anchorBounds = anchor.getBoundingClientRect();

      spotlightfePointLight.setAttribute(
        "x",
        String(anchorBounds.left - navBounds.left + anchorBounds.width * 0.5 + config.spotlight.x)
      );
      spotlightfePointLight.setAttribute("y", String(config.spotlight.y));
      spotlightfePointLight.setAttribute("z", String(config.spotlight.z));

      ambiencefePointLight.setAttribute("x", String(config.ambience.x));
      ambiencefePointLight.setAttribute("y", String(config.ambience.y));
      ambiencefePointLight.setAttribute("z", String(config.ambience.z));

      if (config.spotlight.pointer && !monitoring) {
        monitoring = true;
        window.addEventListener("pointermove", syncLight as any);
      } else if (!config.spotlight.pointer) {
        monitoring = false;
        window.removeEventListener("pointermove", syncLight as any);
      }
    };

    const selectAnchor = (anchor: HTMLElement) => {
      if (!config.spotlight.pointer) {
        const navBounds = nav.getBoundingClientRect();
        const anchorBounds = anchor.getBoundingClientRect();
        links.forEach((link) =>
          (link as HTMLElement).dataset.active = anchor === link ? "true" : "false"
        );
        gsap.to(spotlightfePointLight, {
          duration: config.spotlight.speed,
          attr: {
            x: anchorBounds.left - navBounds.left + anchorBounds.width * 0.5 + config.spotlight.x,
          },
        });
      }
    };

    ctrl.on("change", update);
    update();

    nav?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A") selectAnchor(target);
    });
  }, []);

  return (
    <>
      <a className="diamond" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z" />
        </svg>
      </a>
      <nav>
        <ul aria-hidden="true" className="lit">
          <li>Newsletter</li>
          <li>Course</li>
          <li>Pricing</li>
          <li>Subscribe</li>
        </ul>
        <ul className="content">
          <li>
            <a data-active="true" href="#newsletter"><span>Newsletter</span></a>
          </li>
          <li>
            <a href="#product"><span>Course</span></a>
          </li>
          <li>
            <a href="#price"><span>Pricing</span></a>
          </li>
          <li>
            <a href="#subscribe"><span>Subscribe</span></a>
          </li>
        </ul>
      </nav>
      {/* spotlight filters */}
      <svg className="sr-only">
        <filter id="spotlight">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting result="lighting" in="blur" surfaceScale="5" specularConstant="0.5" specularExponent="120" lightingColor="#ffffff">
            <fePointLight x="50" y="50" z="300" />
          </feSpecularLighting>
          <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite" />
          <feComposite in="merged" in2="composite" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
        </filter>
        <filter id="ambience">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting result="lighting" in="blur" surfaceScale="5" specularConstant="0.5" specularExponent="120" lightingColor="#ffffff">
            <fePointLight x="50" y="50" z="300" />
          </feSpecularLighting>
          <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite" />
          <feComposite in="merged" in2="composite" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
        </filter>
      </svg>
      <a
        className="bear-link"
        href="https://twitter.com/intent/follow?screen_name=jh3yy"
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg className="w-9" viewBox="0 0 969 955" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="161.191" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" />
          <circle cx="806.809" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" />
          <circle cx="695.019" cy="587.733" r="31.4016" fill="currentColor" />
          <circle cx="272.981" cy="587.733" r="31.4016" fill="currentColor" />
          <path d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z" fill="currentColor" />
          <rect x="310.42" y="448.31" width="343.468" height="51.4986" fill="#FF1E1E" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </>
  );
};

export default NavItems;
